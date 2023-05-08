import express, { NextFunction, Request, Response } from "express";
import {RouterContext}  from "../context/Router.Context";
import { RouteContext } from "@types";
import { controllers } from "../context/Controller.Context";

export class IndexRouter{
    public static defaultMiddleware(_req:Request,_res:Response,next:NextFunction){
        next();
    }
    public static getRoutes(){
        const app = express();
        RouterContext.getRoutes().map((route:RouteContext)=>{
            const controller = controllers[route.controllerName.toLowerCase()]
            app[route.httpMethod](route.path,route.middleware ? route.middleware : this.defaultMiddleware, controller[route.controllerMethod].bind(controller)) //bind to keep the this object
        })
        return app;
    }
}