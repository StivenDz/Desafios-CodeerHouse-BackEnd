export interface IService<type>{
    getAll():Promise<Array<type>>;
    save():void;
    updateById():void;
    deleteById():void;
}