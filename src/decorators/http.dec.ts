import { HttpMethod } from "@types";
import { RouterContext } from "../context/Router.Context";
console.clear();

export function GET(path?: string) {
    return http("get", path);
}
export const POST = (path?: string) => {
    return http("post", path);
}
export const PUT = (path?: string) => {
    return http("put", path);
}
export const DELETE = (path?: string) => {
    return http("delete", path);
}

const http = (httpMethod: HttpMethod, path?: string) => {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        path = getPath(target, methodName, path);
        RouterContext.addRoute({ path, controller: descriptor.value, httpMethod,controllerName:target.constructor.name,controllerMethod:methodName });

        // return descriptor.value;
    };
}

const getPath = (target: any, methodName: string, path?: string) => {
    const controller = (target.constructor.name).replace("Controller", "");
    return `/api/${controller}/${methodName}${path ? path?.includes("/") ? path : `/${path}` : ""}`;
}