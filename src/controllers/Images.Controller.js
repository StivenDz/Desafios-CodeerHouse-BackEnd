// import { Controller } from "../decorators/Controller.dec.js";
// import { POST } from "../decorators/Http.dec.js";
// import { Middleware } from "../decorators/Middleware.dec.js";
import { Multer } from "../middlewares/multer.Middleware.js";

// @Controller("images")
export class ImagesController {

    // @Middleware(Multer.uploadImage)
    // @POST()
    static async upload(_req, res) {
        try {
            const path = Multer.getPath();
            if (!path.length) {
                const errorMessage = Multer.getError();
                const error = !errorMessage.error ? {error:"Invalid Image"} : errorMessage
                res.status(400).json(error);
                return;
            }
            res.status(201).json({ path });
        } catch (ex) {
            res.status(400).json({ error: ex.message });
        }
    }
}