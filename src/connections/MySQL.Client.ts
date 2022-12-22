import {createPool} from "mysql2/promise";

export class MySQLDB{
    public config:object;
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