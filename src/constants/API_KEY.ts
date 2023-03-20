import dotenv from "dotenv";
import Path from "path";

dotenv.config({path:Path.join(__dirname,"../../.env")});

export const API_KEY:string = process.env.API_KEY || "";