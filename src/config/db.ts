import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";


dotenv.config();

const db = new Sequelize(process.env.POSTGRESQL_DB!, process.env.POSTGRESQL_USER!, process.env.POSTGRESQL_PASSWORD!, {
    host: process.env.POSTGRESQL_HOST,
    port: parseInt(process.env.POSTGRESQL_PORT!),
    dialect: 'postgres',
    logging: false,
  }, 
);

db.addModels([__dirname + '/../models/**/*']);

export default db;