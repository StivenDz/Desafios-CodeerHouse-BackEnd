import { API_KEY, PRIVATE_KEY } from "./KEYS"
import { HOST } from "./HOST";
import { ENV } from "./Environment";
import dotenv from "dotenv";
import Path from "path";
import { ENV as Environment } from "@types";
import { MySQLConfig } from "../configs/MySQL.config";
import { Transporter } from "../configs/Transporter.config";
dotenv.config({ path: Path.join(__dirname, "../../.env") });

export class Constants {
    public static API_KEY = API_KEY;
    public static PRIVATE_KEY = PRIVATE_KEY;
    public static HOST = HOST;
    public static ENV: Environment = ENV;
    public static ADMIN = process.env.ADMIN || "";
    public static MySQLConfig = MySQLConfig;
    public static Transporter = Transporter;

    public static getAll() {
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
