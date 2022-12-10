import { db } from "../configs/db.config";

export class MessageTable {

    static async CheckTableExistence(){
        return await db.query(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'messages' LIMIT 1`)
    }

    static async CREATE_TABLE() {
        return await db.query(`
        CREATE TABLE messages (
            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
            userName VARCHAR(60) NOT NULL,
            message TET NOT NULL,
            created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          )`)
    }

    static async INSERT(message: string,username:string) {
        return await db.query("INSERT INTO messages(userName,message) VALUES(?,?)", [username,message]);
    }

    static async SELECT() {
        const [messages] = await db.query("SELECT * FROM messages");
        return messages
    }
}