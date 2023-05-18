import dotenv from "dotenv";
import Path from "path";
import { __dirname } from "./Dirname.js";
dotenv.config({ path: Path.join(__dirname, "../../.env") });

export const API_KEY = process.env.API_KEY || "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";