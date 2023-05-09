import { Query as QueryType } from "@types";
import { green } from "colors";
import { MySQLConfig } from "../configs/MySQL.config";

export class Query{
    public static FILTER_BY_COLUMN(table:string,columnName:string,equalTo:string,columnsSelected:Array<string> | "*"){
        console.log(green(`SELECT ${typeof columnsSelected == "string" ? "*" : columnsSelected.join(",")} FROM ${table} WHERE ${columnName} LIKE '%${equalTo}%' `));
        return `SELECT ${typeof columnsSelected == "string" ? "*" : columnsSelected.join(",")} FROM ${table} WHERE ${columnName} LIKE '%${equalTo}%' `;
    }
    public static SELECT_BY_COLUMN(table:string,columnName:string,equalTo:any):QueryType{
        console.log(green(`SELECT * FROM ${table} WHERE ${columnName} = ${equalTo} `));
        return [`SELECT * FROM ${table} WHERE ${columnName} = ? `,[equalTo]];
    }
    public static SELECT(table:string){
        console.log(green(`SELECT * FROM ${table}`));
        return `SELECT * FROM ${table}`;
    }
    public static CHECK_TABLE(table:string){
        return `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${table}' AND TABLE_SCHEMA = '${MySQLConfig.database}' LIMIT 1`;
    }
}