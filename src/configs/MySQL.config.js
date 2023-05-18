import dotenv from "dotenv";
import Path from "path";
import { __dirname } from "../constants/Dirname.js";
dotenv.config({ path: Path.join(__dirname, "../../.env") });


const development = {
    host: process.env.DEV_MYSQL_DBHOST || "",
    port: Number(process.env.DEV_MYSQL_DBPORT) || 0,
    user: process.env.DEV_MYSQL_DBUSER || "",
    password: process.env.DEV_MYSQL_DBPASS || "",
    database: process.env.DEV_MYSQL_DBNAME || ""
}
const production = {
    host: process.env.PRD_MYSQL_DBHOST || "",
    user: process.env.PRD_MYSQL_DBUSER || "",
    password: process.env.PRD_MYSQL_DBPASS || "",
    database: process.env.PRD_MYSQL_DBNAME || "",
    ssl: {
        rejectUnauthorized: false
    }
}

export const MySQLConfig = {
    development,
    production
}[`${process.env.NODE_ENV}`];
