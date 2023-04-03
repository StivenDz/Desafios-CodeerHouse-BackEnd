export interface IService<type>{
    getAll():Array<type>;
    save():void;
    updateById():void;
    deleteById():void;
}