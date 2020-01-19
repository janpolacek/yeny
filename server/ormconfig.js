const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_DATABSE = process.env.DB_DATABSE || 'yeny';
const DB_USERNAME = process.env.DB_USERNAME || 'yeny';
const DB_PASSWORD = process.env.DB_PASSWORD || 'qwerty123';

module.exports = {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABSE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    type: 'postgres',
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts'],
    logging: true,
    dropSchema: true,
    synchronize: true,
};
