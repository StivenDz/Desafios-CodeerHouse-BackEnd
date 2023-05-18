// import { Controller } from "../decorators/Controller.dec.js";
// import { GET, POST } from "../decorators/Http.dec.js";
// import { UserValidator } from "../validators/User.Validator.js";
// import { Inject } from "../decorators/Injectable.dec.js";
// import { Middleware } from "../decorators/Middleware.dec.js";
// import { ControllerBase } from "../interfaces/IControllerBase.js";
import { UserDTO } from "../models/DTO/User.DTO.js";
import { JWT as JWT_util } from "../utils/JWT.util.js";
import { JWT } from "../middlewares/JWT.Middleware.js";
import { AuthService } from "../services/Auth.Service.js";

// @Controller("users")
export class AuthController{
    prototype = Object.getOwnPropertyNames(AuthController.prototype);

    // @Inject("authService")
    // authService;

    // @Middleware(UserValidator.SignUp)
    // @POST()
    static async SignUp(req, res) {
        const user = req.body;
        try {
            const response = await AuthService.Register(new UserDTO(
                user.name, user.lastName, user.password, user.email, user.image
            ).toEntity());
            if (response) {
                const userEntity = await AuthService.getUserByEmail(user.email);
                const token = userEntity ? JWT_util.CreateToken(userEntity) : null;
                res.status(201).json({
                    successfully: "user Created",
                    token
                })
            } else {
                res.status(400).json({ error: "This email already exist" })
            }
        } catch (ex) {
            res.status(500).json({ error: ex.message })
        }
    }
    // @Middleware(UserValidator.Auth)
    // @POST("sessions")
    static async Authenticate(req, res) {
        const user = req.body;
        try {
            const response = await AuthService.Authenticate(user);
            if (response.validUser && response.user) {
                const token = JWT_util.CreateToken(response.user);
                res.status(200).json({
                    successfully: response.message,
                    token
                })
            } else {
                res.status(400).json({ error: response.message })
            }
        } catch (ex) {
            res.status(500).json({ error: ex.message })
        }
    }

    // @Middleware(JWT.verifyToken)
    // @GET()
    static async users(req, res) {
        try {
            const user = JWT_util.DecryptToken(JWT.getToken(req))
            res.status(200).json(user);
        } catch (ex) {
            res.status(500).json({ error: ex.message })
        }
    }
}