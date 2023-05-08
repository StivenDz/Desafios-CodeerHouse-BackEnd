import { MySQLCredentials } from "@types";
import {createPool} from "mysql2/promise";

export class MySQLClient{
    public config:MySQLCredentials;
    constructor(config:MySQLCredentials){
        this.config = config
    }
    public async connect(){
        try{
            return await createPool(this.config).getConnection();
        }catch(err){
            return null;
        }
    }

    public  getConnection(){
        return  createPool(this.config);
    }
}