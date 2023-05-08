import { MySQLClient } from "./MySQL.Client";
import { MySQLConfig } from "../configs/MySQL.config";
import { Pool } from "mysql2/promise";



export class Connections{

    public static SQLClient:MySQLClient = new MySQLClient(MySQLConfig);
    public static SQLConnection:Pool;

    public static async execute(){
        return await new Promise(async(resolve,rejected)=>{
            try{
                const Connection = await this.SQLClient.connect();
                if(!Connection){
                    rejected({
                        DataBases_Status:{
                            MySQL:`Error ❌`
                        }
                    })
                }
                this.SQLConnection = await this.SQLClient.getConnection();
                resolve({DataBases_Status:{
                    MySQL:`Connected 🚀`
                }});
            }catch(err){
                rejected(err);
            }
        })
    }
}