import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import { seedDatabase } from './seedDatabase';
import dbConfig from '../ormconfig.json';

TypeORM.useContainer(Container);

async function bootstrap() {
    try {
        // create TypeORM connection
        await TypeORM.createConnection({
            ...dbConfig,
            type: 'postgres',
            entities: [__dirname + '/entities/**/*.ts'],
            migrations: [__dirname + '/migrations/**/*.ts'],
            subscribers: [__dirname + '/subscribers/**/*.ts'],
            logging: true,
            cli: {
                entitiesDir: __dirname + '/entities',
                migrationsDir: __dirname + '/migrations',
                subscribersDir: __dirname + '/subscribers'
            },
            dropSchema: true,
            synchronize: true
        }).then(async connection => await connection.runMigrations());

        // seed database with some data
        await seedDatabase();
        const schema = await TypeGraphQL.buildSchema({
            resolvers: [__dirname + '/resolvers/**/*.ts'],
            container: Container
        });

        const server = new ApolloServer({ schema, cors: true });

        // Start the server
        const { url } = await server.listen(4000);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    } catch (err) {
        console.error(err);
    }
}

bootstrap();
