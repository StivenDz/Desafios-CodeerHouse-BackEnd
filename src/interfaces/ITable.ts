export interface ITable<Entity> {
    SELECT():Entity;
    UPDATE(id:number):boolean;
    DELETE(id:number):boolean;
    INSERT(entity:Entity):boolean
}