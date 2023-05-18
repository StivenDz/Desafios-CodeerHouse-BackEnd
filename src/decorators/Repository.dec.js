import { container } from "../container.js"
import { Tables } from "../context/Tables.Context.js"

export const Repository = (target) =>{
    const dependency = target.name;
    const repository = container.getDependency(dependency.charAt(0).toLowerCase() + dependency.substring(1,dependency.length));
    Tables.addTable({
        name:repository.getTableName,
        checkTable:repository.CHECK_TABLE_EXISTENCE.bind(repository),
        createTable:repository.CREATE_TABLE.bind(repository),
        repository
    })
}