import { ENV as Environment } from "@types";
import dotenv from "dotenv";
import Path from "path";
dotenv.config({ path: Path.join(__dirname, "../../.env") });

export const ENV: Environment = process.env.NODE_ENV;