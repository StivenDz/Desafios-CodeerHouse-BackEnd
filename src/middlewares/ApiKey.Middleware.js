import { Constants } from "../constants/index.contants.js";


export class API_KEY{
    static Validate(req,res,next) {
        const {api_key} = req.headers;
        if(api_key && api_key === Constants.API_KEY || req.path.includes("/images/")) return next();
        res.status(401).json({
            error:"Invalid API KEY"
        })
    }
}
