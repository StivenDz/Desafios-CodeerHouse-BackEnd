export interface ITable<Entity> {
    SELECT():Promise<Array<Entity>>;
    UPDATE(id:number):boolean;
    DELETE(id:number):boolean;
    INSERT(entity:Entity):Promise<boolean>
}