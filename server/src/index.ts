import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";

import { EventResolver } from "./resolvers/EventResolver";
import { Event } from "./entities/Event";
import { seedDatabase } from "./helpers";

export interface Context {
    event: Event;
}

TypeORM.useContainer(Container);

async function bootstrap() {
    try {
        // create TypeORM connection
        await TypeORM.createConnection({
            type: "mysql",
            database: "type-graphql",
            username: "root", // fill this with your username
            password: "qwerty123", // and password
            port: 3306,
            host: "localhost",
            entities: [Event],
            synchronize: true,
            logger: "advanced-console",
            logging: "all",
            dropSchema: true,
            cache: true,
        });

        // seed database with some data
        const { defaultEvent } = await seedDatabase();

        // build TypeGraphQL executable schema
        const schema = await TypeGraphQL.buildSchema({
            resolvers: [EventResolver],
            container: Container,
        });

        // create mocked context
        const context: Context = { event: defaultEvent };

        // Create GraphQL server
        const server = new ApolloServer({ schema, context });

        // Start the server
        const { url } = await server.listen(4000);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    } catch (err) {
        console.error(err);
    }
}

bootstrap();
