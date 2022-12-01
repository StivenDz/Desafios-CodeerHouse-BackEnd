import {createPool} from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env")});
const db = createPool({
    host:"localhost",
    port: 3306,
    user: "admin",
    password: process.env.PASSDB,
    database: "chat"
});

export default db;