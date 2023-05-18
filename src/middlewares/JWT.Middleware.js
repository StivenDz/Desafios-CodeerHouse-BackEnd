import jwt from "jsonwebtoken";
import { JWT as JWT_util } from "../utils/JWT.util.js";
import { Constants } from "../constants/index.contants.js";

export class JWT {
    static getToken(req) {
        return req.session.token || (req.headers.authorization?.split(" ")[1] || "");
    }
    static verifyToken(req, res, next) {
        try {
            const token = req.session.token || req.headers.authorization?.split(" ")[1];
            const authType = req.headers.authorization?.split(" ")[0];

            if (!token) return res.status(401).json({ error: "not authenticated" });
            if (!JWT_util.isLogged(token)) return res.status(401).json({ error: "not authenticated" });
            if (authType && authType != "Bearer") return res.status(401).json({ error: `authentication method ${authType} is not allowed, use Bearer Token` });

            jwt.verify(token, Constants.PRIVATE_KEY || "");
            return next();
        } catch (ex) {
            return res.status(403).json({ error: "Authentication Error, Invalid token or has expired" });
        }
    }
    static isAdmin(req, res, next) {
        const token = JWT.getToken(req);
        const user = JWT_util.DecryptToken(token);
        if (user.email === Constants.ADMIN) next();
        else res.status(403).json({ error: "only admin users can execute this function" })
    }
}