import { RouterContext } from "../context/Router.Context.js";
console.clear();

export function GET(path) {
    return http("get", path);
}
export const POST = (path) => {
    return http("post", path);
}
export const PUT = (path) => {
    return http("put", path);
}
export const DELETE = (path) => {
    return http("delete", path);
}

const http = (httpMethod, path) => {
    return function (target, methodName, descriptor) {
        path = getPath(target, methodName, path);
        RouterContext.addEndPoint({ path, controller: descriptor.value, httpMethod,controllerName:target.constructor.name,controllerMethod:methodName,middlewares:[] });
    };
}

const getPath = (target, methodName, path) => {
    const controller = (target.constructor.name).replace("Controller", "");
    return `/api/${controller}/${methodName}${path ? path?.includes("/") ? path : `/${path}` : ""}`;
}