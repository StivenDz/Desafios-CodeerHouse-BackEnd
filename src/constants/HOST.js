import dotenv from "dotenv";
import Path from "path";
import { __dirname } from "./Dirname.js";
dotenv.config({ path: Path.join(__dirname, "../../.env") });

export const HOST = process.env.HOST || "";