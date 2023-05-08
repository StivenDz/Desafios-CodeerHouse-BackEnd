import { RouterContext } from "../context/Router.Context";

export const Middleware = (func:Function) => {
    return function (target: any, methodName: string, _descriptor: PropertyDescriptor) {
        RouterContext.addMiddleware(target.constructor.name,methodName,func)
    };
}