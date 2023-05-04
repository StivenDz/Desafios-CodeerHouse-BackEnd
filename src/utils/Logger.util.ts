import { green, yellow,red } from "colors";
import { DatePaser } from "./DateParser.util";
import { RouteContext } from "@types";

export class Logger {
    public static routeInserted(route:RouteContext){
        const date = DatePaser.curentDateInISOFormat();
        console.log(`${green("[API REST] -")} ${date} ${green("LOG")} ${yellow("[EndPointInserted]")} ${green(`[${route.httpMethod.toUpperCase()}] - ${route.path}/`)}`);
    }
    public static Error(route:RouteContext,errorMessage:string){
        const date = DatePaser.curentDateInISOFormat();
        console.log(`${green("[API REST] -")} ${date} ${green("LOG")} ${red("[ERROR]")} ${green(`[${route.httpMethod.toUpperCase()}] - ${route.path}/`)} ${errorMessage}`);
    }
    public static DependencyInjection(_class:string,dependency:string){
        const date = DatePaser.curentDateInISOFormat();
        console.log(`${green("[API REST] -")} ${date} ${green("LOG")} ${yellow("[DepedencyInjected]")} ${green(`[${dependency} 💉 ${_class}]`)}`);
    }
}