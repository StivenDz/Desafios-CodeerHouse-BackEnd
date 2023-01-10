import { MongoDB } from "./MongoDB.Client";
import { MySQLDB } from "./MySQL.Client";

import { dbConfig as MongoConfig } from "../configs/MongoDB.config";
import { dbConfig as MySQLConfig } from "../configs/MySQL.config";

import { FirebaseConnection as Firebase } from "..";

export class Connections{
    public static async execute(){
        return new Promise(async(resolve,rejected)=>{
            try{
                const MongoDBConnection = await new MongoDB(MongoConfig.development).connect();
                const MySQLConnection = await new MySQLDB(MySQLConfig.development).connect();
                const FirebaseConnection = await Firebase;
                
                if(!MongoDBConnection || !MySQLConnection || !FirebaseConnection){
                    rejected({
                        DataBases_Status:{
                            MySQL:!MySQLConnection ? `Error ❌` : `Connected 🚀`,
                            MongoDb:!MongoDBConnection ? `Error ❌` : `Connected 🚀`,
                            Firebase:!FirebaseConnection ? `Error ❌` : `Connected 🚀`,
                            LocalJSON:null
                        }
                    })
                }
                resolve({DataBases_Status:{
                    MySQL:`Connected 🚀`,
                    MongoDb:`Connected 🚀`,
                    Firebase:`Connected 🚀`,
                    LocalJSON:null
                }});
            }catch(err){
                rejected(err);
            }
        })
    }
}