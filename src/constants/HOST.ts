import dotenv from "dotenv";
import Path from "path";

dotenv.config({path:Path.join(__dirname,"../../.env")});

export const HOST:string = process.env.HOST || "";