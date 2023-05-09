export interface IService<type>{
    getAll():Promise<Array<type>>;
    save(entity:type):Promise<void>;
    updateById(dto:any,id:string|number):Promise<type | null>;
    deleteById(id:string|number):Promise<Boolean | null | type>;
}