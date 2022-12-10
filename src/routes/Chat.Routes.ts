import { Router, Response } from "express";
const chatRouter = Router();

chatRouter.get("/", (_req, res:Response) => {
    res.render("index");
});

export {chatRouter}