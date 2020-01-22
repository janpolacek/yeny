import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import { seedDatabase } from './seedDatabase';
import { ConnectionOptions } from 'typeorm';

TypeORM.useContainer(Container);

async function bootstrap() {
    const config = {
        ...(process.env.TYPEORM_DRIVER_EXTRA ? JSON.parse(process.env.TYPEORM_DRIVER_EXTRA) : {}),
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
        synchronize: true,
    } as ConnectionOptions;

    await TypeORM.createConnection(config).then(async connection => await connection.runMigrations());

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
