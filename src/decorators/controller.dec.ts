export function Controller(controllerPath?: string): any {	
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			controllerPath = !controllerPath ? `${constructor.name.replace("Controller","")}` : controllerPath;
		}
	}
}

