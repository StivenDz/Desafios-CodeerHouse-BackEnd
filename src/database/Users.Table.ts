import {Connections} from "../connections/index.Connections"
import { ITable } from "../interfaces/ITable";
import { UserEntity } from "../models/Entity/User.Entity";
import { ParseToEntity } from "../utils/ParseToEntity";

export class UsersTable  implements ITable<UserEntity>{
    private async DB(){
        const db = await Connections.getMySQLConnection();
        return db;
    }
    public async SELECT(): Promise<Array<UserEntity>> {
        const db = await this.DB();
        const [result] = await db.query("SELECT id,userId,firstName,lastName,email,address,phone,gender,birthDay,profileImage,profileImagePath FROM users");
        return ParseToEntity.ToArrayUserEntity(result);
    }
    public UPDATE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    public DELETE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    public INSERT(_entity: UserEntity): boolean {
        throw new Error("Method not implemented.");
    }
    public async SELECT_ID():Promise<UserEntity>{
        throw new Error("Method not implemented.");
    }
}