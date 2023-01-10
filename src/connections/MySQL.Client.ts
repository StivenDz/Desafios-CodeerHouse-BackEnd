import {createPool} from "mysql2/promise";
import { dbConfig } from "../configs/MySQL.config";

export class MySQLDB{
    public config:object;
    public static db = createPool(dbConfig.development);
    constructor(config:object){
        this.config = config
    }
    public async connect(){
        try{
            return await createPool(this.config).getConnection();
        }catch(err){
            return null;
        }
    }
}