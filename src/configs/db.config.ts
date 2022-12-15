import {createPool} from "mysql2/promise";
import knex from "knex";
import dotenv from "dotenv";
import path from "path";
// import { Product } from "../types";
dotenv.config({ path: path.resolve(".env")});

// const env = process.env.NODE_ENV;
const dbConfig = {
    development: {
        host: process.env.DEV_DBHOST,
        port: Number(process.env.DEV_DBPORT),
        user: process.env.DEV_DBUSER,
        password: process.env.DEV_DBPASS,
        database: process.env.DEV_DBNAME
    },
    production: {
        host:process.env.PRD_DBHOST,
        user: process.env.PRD_DBUSER,
        password: process.env.PRD_DBPASS,
        database: process.env.PRD_DBNAME,
        ssl:{
            rejectUnauthorized:false
        }
    }
  }

export const db = createPool(dbConfig.development);

export const database = knex({
    client:"mysql2",
    connection:dbConfig.development
});

database<any>("messages").select("*")
    .then((data:any)=> console.log(data))
// database<Product>("products").select("*").where("price","<",550000)
//     .then((data:any)=> console.log(data))
// database<Product>("products").select("*").where("productId","=","MCO943311946")
//     .then((data:any)=> console.log(data))
