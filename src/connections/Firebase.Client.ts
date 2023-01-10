import {initializeApp} from "firebase/app";

export class Firebase{
    public config:object;
    constructor(config:object){
        this.config = config
    }
    public async connect(){
        try{
            const app = initializeApp(this.config);
            return app;
        }catch(err){
            return null;
        }
    }
}