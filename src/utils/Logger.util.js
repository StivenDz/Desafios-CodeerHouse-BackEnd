import colors from "colors";
import { DatePaser } from "./DateParser.util.js";

export class Logger {
    static routeInserted(route) {
        const date = DatePaser.currentDateInISOFormat();
        console.log(`${colors.green("[API REST] -")} ${date} ${colors.green("LOG")} ${colors.yellow("[EndPointInserted]")} ${colors.green(`[${route.httpMethod.toUpperCase()}] - ${route.path}/`)}`);
    }
    static Error(route, errorMessage) {
        const date = DatePaser.currentDateInISOFormat();
        console.log(`${colors.green("[API REST] -")} ${date} ${colors.green("LOG")} ${colors.red("[ERROR]")} ${colors.green(`[${route.httpMethod.toUpperCase()}] - ${route.path}/`)} ${errorMessage}`);
    }
    static ServerError(errorMessage) {
        const date = DatePaser.currentDateInISOFormat();
        console.log(`${colors.green("[API REST] -")} ${date} ${colors.green("LOG")} ${colors.red("[SERVER-ERROR]")} ${colors.yellow(`[${errorMessage}]`)}`);
    }
    static DependencyInjection(_class, dependency) {
        const date = DatePaser.currentDateInISOFormat();
        console.log(`${colors.green("[API REST] -")} ${date} ${colors.green("LOG")} ${colors.yellow("[DepedencyInjected]")} ${colors.green(`[${dependency} 💉 ${_class}]`)}`);
    }
    static TableCreated(table) {
        const date = DatePaser.currentDateInISOFormat();
        console.log(`${colors.green("[API REST] -")} ${date} ${colors.green("LOG")} ${colors.yellow("[TableCreated]")} ${colors.green(`[${table.toUpperCase()}]`)}`);
    }
    static TableVerified(table) {
        const date = DatePaser.currentDateInISOFormat();
        console.log(`${colors.green("[API REST] -")} ${date} ${colors.green("LOG")} ${colors.yellow("[TableVerified]")} ${colors.green(`[${table.toUpperCase()}]`)}`);
    }
}