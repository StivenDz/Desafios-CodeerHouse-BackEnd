import {createPool} from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(".env")});

// const env = process.env.NODE_ENV;
const dbConfig = {
    development: {
        host:process.env.DEV_DBHOST,
        port: Number(process.env.DEV_DBPORT),
        user: process.env.DEV_DBUSER,
        password: process.env.DEV_DBPASS,
        database: process.env.DEV_DBNAME
    },
    production: {
        host:process.env.PRD_DBHOST,
        user: process.env.PRD_DBUSER,
        password: process.env.PRD_DBPASS,
        database: process.env.PRD_DBNAME,
        ssl:{
            rejectUnauthorized:false
        }
    }
  }

export const db = createPool(dbConfig.production);