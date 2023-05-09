import { RouterContext } from "../context/Router.Context";

export function Controller(controllerPath?: string): any {
	return function <T extends { new(...args: any[]): {} }>(constructor: T) {
		if (controllerPath) { 
			RouterContext.BasicController(controllerPath, constructor); 
			return constructor
		}
		// RouterContext.BasicController(`${constructor.name.replace("Controller","")}`,constructor);
		else {
			return class extends constructor {
				controllerPath = !controllerPath ? `${constructor.name.replace("Controller", "")}` : controllerPath;
			}
		}
	}
}

// const BasicRoute = (target: any, methodName: string, path?: string) => {
//     const controller = (target.constructor.name).replace("Controller", "");
//     return `/api/${controller}/${methodName}${path ? path?.includes("/") ? path : `/${path}` : ""}`;
// }
