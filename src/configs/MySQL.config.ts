import {createPool} from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(".env")});

export const dbConfig = {
    development: {
        host: process.env.DEV_MYSQL_DBHOST,
        port: Number(process.env.DEV_MYSQL_DBPORT),
        user: process.env.DEV_MYSQL_DBUSER,
        password: process.env.DEV_MYSQL_DBPASS,
        database: process.env.DEV_MYSQL_DBNAME
    },
    production: {
        host:process.env.PRD_MYSQL_DBHOST,
        user: process.env.PRD_MYSQL_DBUSER,
        password: process.env.PRD_MYSQL_DBPASS,
        database: process.env.PRD_MYSQL_DBNAME,
        ssl:{
            rejectUnauthorized:false
        }
    }
}

export const db = createPool(dbConfig.development);
