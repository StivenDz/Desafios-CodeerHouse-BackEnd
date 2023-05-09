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
    public static ServerError(errorMessage:string){
        const date = DatePaser.curentDateInISOFormat();
        console.log(`${green("[API REST] -")} ${date} ${green("LOG")} ${red("[SERVER-ERROR]")} ${yellow(`[${errorMessage}]`)}`);
    }
    public static DependencyInjection(_class:string,dependency:string){
        const date = DatePaser.curentDateInISOFormat();
        console.log(`${green("[API REST] -")} ${date} ${green("LOG")} ${yellow("[DepedencyInjected]")} ${green(`[${dependency} 💉 ${_class}]`)}`);
    }
    public static TableCreated(table:string){
        const date = DatePaser.curentDateInISOFormat();
        console.log(`${green("[API REST] -")} ${date} ${green("LOG")} ${yellow("[TableCreated]")} ${green(`[${table.toUpperCase()}]`)}`);
    }
    public static TableVerified(table:string){
        const date = DatePaser.curentDateInISOFormat();
        console.log(`${green("[API REST] -")} ${date} ${green("LOG")} ${yellow("[TableVerified]")} ${green(`[${table.toUpperCase()}]`)}`);
    }
}