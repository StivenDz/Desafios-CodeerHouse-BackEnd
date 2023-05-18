import colors from "colors";
import { MySQLConfig } from "../configs/MySQL.config.js";

export class Query {
    static FILTER_BY_COLUMN(table, columnName, equalTo, columnsSelected) {
        console.log(colors.green(`SELECT ${typeof columnsSelected == "string" ? "*" : columnsSelected.join(",")} FROM ${table} WHERE ${columnName} LIKE '%${equalTo}%' `));
        return `SELECT ${typeof columnsSelected == "string" ? "*" : columnsSelected.join(",")} FROM ${table} WHERE ${columnName} LIKE '%${equalTo}%' `;
    }
    static SELECT_BY_COLUMN(table, columnName, equalTo) {
        console.log(colors.green(`SELECT * FROM ${table} WHERE ${columnName} = ${equalTo} `));
        return [`SELECT * FROM ${table} WHERE ${columnName} = ? `, [equalTo]];
    }
    static SELECT(table) {
        console.log(colors.green(`SELECT * FROM ${table}`));
        return `SELECT * FROM ${table}`;
    }
    static CHECK_TABLE(table) {
        return `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${table}' AND TABLE_SCHEMA = '${MySQLConfig.database}' LIMIT 1`;
    }
}