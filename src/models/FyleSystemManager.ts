import * as fs from "fs";

export class FyleSystemManager {
    constructor(){

    }

    writeData(path:string,data:string):void | unknown{
        try{
            return fs.writeFileSync(path,data);
        }catch(err){
            return err
        }
    }

    readData(path:string):JSON | unknown{
        try{
            return JSON.parse(fs.readFileSync(path,"utf-8"));
        }catch(err){
            return err
        }
    }

    async addData(path:string,data:string){
        try{
            await fs.promises.appendFile(path,data)
        }catch(err){
            return err
        }
    }

    deleteFile(path:string):void | unknown{
        try{
            return fs.unlinkSync(path)
        }catch(err){
            return err
        }
    }
}