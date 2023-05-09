import { RouteContext } from "@types";


export class RouterContext {
    public static routes: Array<RouteContext> = [];

    public static addEndPoint = (route: RouteContext) => {
        this.routes.push(route);
    }

    public static getRoutes = () => {
        return this.routes;
    }

    public static addMiddleware(controllerName: string, methodName: string, func: Function) {
        const route = this.routes.filter((route: RouteContext) =>
            route.controllerName == controllerName && route.controllerMethod == methodName
        )[0]
        if (route) this.routes[this.routes.indexOf(route)] = { ...route, middlewares: [...route.middlewares, func] }
    }

    public static BasicController(controllerName: string, controllerClass: any) {
        const methods = Object.getOwnPropertyNames(controllerClass.prototype);
        const currentName = controllerClass.name.replace("Controller", "");
        this.routes = this.getRoutes().map((route: RouteContext) => {
            const method = methods.filter((m) => route.path.includes(`${currentName}/${m}`))[0]
            if (method) {
                return {
                    ...route,
                    path: route.path.replace(`${currentName}/${method}`, controllerName)
                }
            }
            return route
        })
    }
}