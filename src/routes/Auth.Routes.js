import { Router } from "express";
import { UserValidator } from "../validators/User.Validator.js";
import { AuthController } from "../controllers/Auth.Controller.js";
import { JWT } from "../middlewares/JWT.Middleware.js";

const router = Router();

router.post("/",
    UserValidator.SignUp.bind(UserValidator) ,
    AuthController.SignUp.bind(AuthController));

router.post("/sessions",
    UserValidator.Auth.bind(UserValidator),
    AuthController.Authenticate.bind(AuthController));

router.get("/",
    JWT.verifyToken.bind(JWT),
    AuthController.users.bind(AuthController));

export default router