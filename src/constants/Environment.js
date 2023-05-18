import dotenv from "dotenv";
import Path from "path";
import { __dirname } from "./Dirname.js";
dotenv.config({ path: Path.join(__dirname, "../../.env") });

export const ENV = process.env.NODE_ENV;