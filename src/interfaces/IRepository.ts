export interface IRepository<Entity> {
    tableName:string;
    get getTableName():string;
    CHECK_TABLE_EXISTENCE():any;
    CREATE_TABLE():any
    SELECT():Promise<Array<Entity>>;
    SELECT_ID(id:number|string):Promise<Entity>;
    INSERT(entity:Entity):Promise<boolean>;
    UPDATE(dto:any,id:number|string):Promise<boolean>;
    DELETE(id:number|string):Promise<boolean>;
}