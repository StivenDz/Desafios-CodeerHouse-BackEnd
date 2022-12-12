import { db } from "../configs/db.config";

export class MessageTable {

    static async CheckTableExistence(){
        const [result] = await db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'messages' LIMIT 1")
        return result
    }

    static async CREATE_TABLE() {
        return await db.query("CREATE TABLE messages (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,userName VARCHAR(60) NOT NULL,message TEXT NOT NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    }

    static async INSERT(message: string,username:string) {
        return await db.query("INSERT INTO messages(userName,message) VALUES(?,?)", [username,message]);
    }

    static async SELECT() {
        const [messages] = await db.query("SELECT * FROM messages");
        return messages
    }
}