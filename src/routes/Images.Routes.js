import { Router } from "express";
import { Multer } from "../middlewares/multer.Middleware.js";
import { ImagesController } from "../controllers/Images.Controller.js";

const router = Router();

router.post("/",
    Multer.uploadImage,
    ImagesController.upload.bind(ImagesController));

export default router

