export class RouterContext {
    static routes = [];

    static addEndPoint = (route) => {
        this.routes.push(route);
    }

    static getRoutes = () => {
        return this.routes;
    }

    static addMiddleware(controllerName, methodName, func) {
        const route = this.routes.filter((route) =>
            route.controllerName == controllerName && route.controllerMethod == methodName
        )[0]
        if (route) this.routes[this.routes.indexOf(route)] = { ...route, middlewares: [...route.middlewares, func] }
    }

    static BasicController(controllerName, controllerClass) {
        const methods = Object.getOwnPropertyNames(controllerClass.prototype);
        const currentName = controllerClass.name.replace("Controller", "");
        this.routes = this.getRoutes().map((route) => {
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