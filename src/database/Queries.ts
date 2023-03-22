import { Query as QueryType } from "@types";
import { green } from "colors";

export class Query{
    public static FILTER_BY_COLUMN(table:string,columnName:string,equalTo:string,columnsSelected:Array<string> | "*"){
        console.log(green(`SELECT ${typeof columnsSelected == "string" ? "*" : columnsSelected.join(",")} FROM ${table} WHERE ${columnName} LIKE '%${equalTo}%' `));
        return `SELECT ${typeof columnsSelected == "string" ? "*" : columnsSelected.join(",")} FROM ${table} WHERE ${columnName} LIKE '%${equalTo}%' `;
    }

    public static SELECT_BY_COLUMN(table:string,columnName:string,equalTo:string):QueryType{
        console.log(green(`SELECT * ${table == "users" ? ",CONCAT(firstName,' ',lastName) AS fullName":""} FROM ${table} WHERE ${columnName} = ${equalTo} `));
        return [`SELECT * ${table == "users" ? ",CONCAT(firstName,' ',lastName) AS fullName":""} FROM ${table} WHERE ${columnName} = ? `,[equalTo]];
    }
    public static SELECT(table:string){
        console.log(green(`SELECT * FROM ${table}`));
        return `SELECT * FROM ${table}`;
    }
}