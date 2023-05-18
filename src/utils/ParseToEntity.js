export class EntityParser {

    static ToArrayEntity(result) {
        const entity = JSON.parse(JSON.stringify(result));
        return entity
    }
    static ToEntity(result) {
        const entity = JSON.parse(JSON.stringify(result))[0];
        return entity
    }
}