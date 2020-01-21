import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import { seedDatabase } from './seedDatabase';
import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();
TypeORM.useContainer(Container);

async function bootstrap() {
    await TypeORM.createConnection({
        host: process.env.TYPEORM_HOST,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        port: process.env.TYPEORM_PORT,
        type: 'postgres',
        entities: [__dirname + '/entities/**/*.{ts,js}'],
        migrations: [__dirname + '/migrations/**/*.{ts,js}'],
        subscribers: [__dirname + '/subscribers/**/*.{ts,js}'],
        logging: true,
        dropSchema: true,
        synchronize: true,
    } as ConnectionOptions).then(async connection => await connection.runMigrations());

    await seedDatabase();
    const schema = await TypeGraphQL.buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        container: Container,
    });

    return await new ApolloServer({ schema, cors: true }).listen(process.env.APP_PORT);
}

try {
    bootstrap();
} catch (e) {
    console.error(e);
}
