import { RouterContext } from "../context/Router.Context";

export function Controller(controllerPath?: string): any {
	return function <T extends { new(...args: any[]): {} }>(constructor: T) {
		if (controllerPath) { 
			RouterContext.BasicController(controllerPath, constructor); 
			return constructor
		}
		else {
			return class extends constructor {
				controllerPath = !controllerPath ? `${constructor.name.replace("Controller", "")}` : controllerPath;
			}
		}
	}
}
