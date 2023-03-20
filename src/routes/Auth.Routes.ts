import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";

const AuthRouter = Router();


AuthRouter.get("/users",AuthController.getUsers);


export {AuthRouter};