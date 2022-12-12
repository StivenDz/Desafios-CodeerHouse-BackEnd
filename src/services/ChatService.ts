import { MessageTable } from "../database/Messages.Table";

export class ChatService {
    private static async validateTable(){
        const result = await JSON.parse(JSON.stringify(await MessageTable.CheckTableExistence()));
        if(!result.length){
            await MessageTable.CREATE_TABLE();
        }
    }
    public static async getAllMessages(){
        await this.validateTable();
        return await MessageTable.SELECT();
    }
    public static async addNewMessage(msg:string,username:string){
        try{
            await this.validateTable();
            await MessageTable.INSERT(msg,username);
        }catch(err){
            console.log("error in function addNewMessage, line ...");
        }
    }
    
}