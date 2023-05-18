import { API_KEY, PRIVATE_KEY } from "./KEYS.js"
import { HOST } from "./HOST.js";
import { ENV } from "./Environment.js";
import dotenv from "dotenv";
import Path from "path";
import { MySQLConfig } from "../configs/MySQL.config.js";
import { Transporter } from "../configs/Transporter.config.js";
import { __dirname } from "./Dirname.js";
dotenv.config({ path: Path.join(__dirname, "../../.env") });

export class Constants {
    static API_KEY = API_KEY;
    static PRIVATE_KEY = PRIVATE_KEY;
    static HOST = HOST;
    static ENV = ENV;
    static ADMIN = process.env.ADMIN || "";
    static MySQLConfig = MySQLConfig;
    static Transporter = Transporter;

    static getAll() {
        return {
            API_KEY: this.API_KEY,
            PRIVATE_KEY: this.PRIVATE_KEY,
            HOST: this.HOST,
            ENV: this.ENV,
            ADMIN: this.ADMIN,
            MySQLConfig: this.MySQLConfig,
            Transporter: this.Transporter
        }
    }
}
