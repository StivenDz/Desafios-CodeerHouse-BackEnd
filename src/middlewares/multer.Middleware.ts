import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { Logger } from "../utils/Logger.util";

export class Multer {
    private static path = "";
    private static error = {};
    public static uploadImage = multer({
        storage: multer.diskStorage({
            destination: path.join(__dirname, `../public/images`),
            filename: (req, file, cb) => {
                const filename_ = `${randomUUID()}` + path.extname((file.originalname).toLowerCase());
                this.path = `${req.protocol}://${req.get("host")}/images/${filename_}`;
                cb(null, filename_);
            }
        }),
        dest: path.join(__dirname, "../public/images"),
        limits: {
            fileSize: 3000000 // 3MB
        },
        fileFilter: (req, file, cb) => {
            const filetypes = /jpeg|jpg|png|gif|svg/;
            const minetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

            if (minetype && extname) return cb(null, true);
            else {
                this.error = { error: "file should be a valid image" }
                Logger.Error({
                    controller: null,
                    httpMethod: "post",
                    path: req.url,
                    controllerMethod: null,
                    controllerName: "",
                    middlewares: []
                }, "file should be a valid image")
                return cb(null, false);
            };
        }

    }).single("image");

    public static get getPath() {
        const path = this.path;
        this.setPath = "";
        return path;
    }

    public static set setPath(path: string) {
        this.path = path;
    }
    public static get getError() {
        const error = this.error;
        this.setError = {};
        return error;
    }

    public static set setError(error: object) {
        this.error = error;
    }
}