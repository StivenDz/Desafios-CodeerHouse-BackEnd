import {createPool} from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env")});
export const db = createPool({
    host:process.env.DEV_DBHOST,
    port: Number(process.env.DEV_DBPORT),
    user: process.env.DEV_DBUSER,
    password: process.env.DEV_DBPASS,
    database: process.env.DEV_DBNAME
});