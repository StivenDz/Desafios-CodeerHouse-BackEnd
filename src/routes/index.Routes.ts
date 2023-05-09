import express, { NextFunction, Request, Response } from "express";
import {RouterContext}  from "../context/Router.Context";
import { RouteContext } from "@types";
import { controllers } from "../context/Controller.Context";
import { Logger } from "../utils/Logger.util";

export class IndexRouter{
    public static defaultMiddleware(_req:Request,_res:Response,next:NextFunction){
        next();
    }
    public static getRoutes(){
        const app = express();
        RouterContext.getRoutes().map((route:RouteContext)=>{
            const controller = controllers[route.controllerName.toLowerCase()];
            if(!route.middlewares.length) route.middlewares.push(this.defaultMiddleware);
            app[route.httpMethod](route.path,...(route.middlewares), controller[route.controllerMethod].bind(controller));
            Logger.routeInserted(route);
        });
        return app;
    }
}