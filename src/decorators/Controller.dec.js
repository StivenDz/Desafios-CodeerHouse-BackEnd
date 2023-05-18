import { RouterContext } from "../context/Router.Context.js";

export function Controller(controllerPath) {
	return function (constructor) {
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
