import jwt from "jsonwebtoken";
import { Constants } from "../constants/index.contants.js";

export class JWT {
    static tokens = [];

    static CreateToken(user) {
        const token = jwt.sign(user, Constants.PRIVATE_KEY || "");
        this.addToTokenList(token);
        return token;
    }
    static DecryptToken(token) {
        const user = JSON.parse(JSON.stringify(jwt.verify(token, Constants.PRIVATE_KEY || "")));
        return user;
    }
    static addToTokenList(token) {
        const user = this.DecryptToken(token);
        const exist = this.tokens.map((_token, i) => {
            if (user.email == this.DecryptToken(_token).email) {
                this.tokens[i] = token;
                return true
            }
            return false
        })
        if (!exist.filter((val) => val === true).length) {
            this.tokens.push(token);
        }
    }
    static isLogged(token){
        const isLogged = this.tokens.filter((tok)=>tok == token);
        return isLogged.length > 0
    }
}