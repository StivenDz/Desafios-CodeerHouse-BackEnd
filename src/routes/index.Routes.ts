import express from "express";
import {RouterContext}  from "../context/Router.Context";
import { RouteContext } from "@types";
import { controllers } from "../context/Controller.Context";

export class IndexRouter{
    
    public static getRoutes(){
        const app = express();
        RouterContext.getRoutes().map((route:RouteContext)=>{
            const controller = controllers[route.controllerName.toLowerCase()]
            app[route.httpMethod](route.path,controller[route.controllerMethod].bind(controller)) //bind to keep the this object
            //app["get"]("/Auth/GetUsers",(_req:Request,res:Response)=>res.send("ok") )
            
        })
        return app;
    }
}