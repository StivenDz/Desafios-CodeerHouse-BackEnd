import { RouterContext } from "../context/Router.Context.js";

export const Middleware = (func) => {
    return function (target, methodName, _descriptor) {
        RouterContext.addMiddleware(target.constructor.name,methodName,func)
    };
}