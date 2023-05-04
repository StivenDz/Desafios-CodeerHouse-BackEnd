import {  OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export type Type = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export class ParseToEntity{
    
    public static ToArrayEntity<EntityType>(result:Type):Array<EntityType>{
        const entity:Array<EntityType> = JSON.parse(JSON.stringify(result));
        return entity
    }
}