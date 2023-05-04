import { MySQLClient } from "./MySQL.Client";
import { MySQLConfig } from "../configs/MySQL.config";
import { ENV } from "@types";

const environment:ENV = process.env.NODE_ENV;

export class Connections{
    public static async getMySQLConnection(){
        return await new MySQLClient(MySQLConfig[`${environment}`]).getConnection();
    }
    public static async execute(){
        return new Promise(async(resolve,rejected)=>{
            try{
                const MySQLConnection = await new MySQLClient(MySQLConfig[`${environment}`]).connect();
                
                if(!MySQLConnection){
                    rejected({
                        DataBases_Status:{
                            MySQL:!MySQLConnection ? `Error ❌` : `Connected 🚀`
                        }
                    })
                }
                resolve({DataBases_Status:{
                    MySQL:`Connected 🚀`
                }});
            }catch(err){
                rejected(err);
            }
        })
    }
}