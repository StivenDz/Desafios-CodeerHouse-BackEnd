import { MessageTable } from "../database/Messages.Table";

export class ChatService {
    public static async getAllMessages(){
        return await MessageTable.SELECT();
    }
    public static async addNewMessage(msg:string,username:string){
        await MessageTable.INSERT(msg,username);
    }
    
}