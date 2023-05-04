import { RouteContext } from "@types";
import { Logger } from "../utils/Logger.util";


export class RouterContext {
    public static routes:Array<RouteContext> = [];
    
    public static addRoute = (route:RouteContext) =>{
        this.routes.push(route);
        Logger.routeInserted(route);
    }

    public static getRoutes = () =>{
        return this.routes;
    }
}