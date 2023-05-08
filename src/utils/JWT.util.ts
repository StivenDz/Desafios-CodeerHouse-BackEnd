import jwt from "jsonwebtoken";
import { UserEntity } from "../models/Entity/User.Entity";

export class JWT{
    public static tokens:Array<string> = [];

    public static CreateToken(user:UserEntity):string{
        const token = jwt.sign(user,process.env.PRIVATE_KEY || "");
        this.addToTokenList(token);
        return token;
    }
    public static DecryptToken(token:string){
        const user:UserEntity = JSON.parse(JSON.stringify(jwt.verify(token,process.env.PRIVATE_KEY || "")));
        return user;
    }
    private static addToTokenList(token:string){
        const user:UserEntity = this.DecryptToken(token);
        const exist = this.tokens.map((_token:string,i:number)=>{
            if(user.email == this.DecryptToken(_token).email){
                this.tokens[i] = token;
                return true
            }
            return false
        })
        if(!exist.filter( (val:boolean) => val === true).length){
            this.tokens.push(token);
        }
    }
}