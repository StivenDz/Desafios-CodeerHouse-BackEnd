import {  OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import {UserEntity} from "../models/Entity/User.Entity";

export type Type = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export class ParseToEntity{
    
    public static ToArrayUserEntity(result:Type):Array<UserEntity>{
        const entity:Array<UserEntity> = JSON.parse(JSON.stringify(result));
        return entity
    }
}