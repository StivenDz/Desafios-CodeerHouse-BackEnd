import { RouteContext } from "@types";
import { Logger } from "../utils/Logger.util";


export class RouterContext {
    public static routes:Array<RouteContext> = [];
    
    public static addEndPoint = (route:RouteContext) =>{
        this.routes.push(route);
        Logger.routeInserted(route);
    }

    public static getRoutes = () =>{
        return this.routes;
    }

    public static addMiddleware(controllerName:string,methodName:string,func:Function){
        const route = this.routes.filter((route:RouteContext)=>
            route.controllerName == controllerName && route.controllerMethod == methodName
        )[0]
        if(route)this.routes[this.routes.indexOf(route)] = {...route,middleware:func}
    }
}