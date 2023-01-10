import mongoose from "mongoose";

export class MongoDB{
    public URI:string;
    constructor(URI:string){
        this.URI = URI
    }
    public async connect(){
        try{
            mongoose.set("strictQuery", false);
            return await mongoose.connect(this.URI);
        }catch(err){
            return null
        }
    }
}
