export interface IRepository<Entity> {
    get getTableName():string;
    SELECT():Promise<Array<Entity>>;
    SELECT_ID(id:number|string):Promise<Entity>;
    UPDATE(id:number|string):boolean;
    DELETE(id:number|string):boolean;
    INSERT(entity:Entity):Promise<boolean>;
    CHECK_TABLE_EXISTENCE():any;
    CREATE_TABLE():any
}