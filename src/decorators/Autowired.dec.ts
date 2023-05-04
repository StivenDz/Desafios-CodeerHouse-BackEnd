import { container } from '../container';
import { Logger } from '../utils/Logger.util';

export function Autowired(token: string): any {
    return function (target: any, property: string): any {
        const dependency = container.getDependency(token);
        Object.defineProperty(target, property, {
            get: () => dependency,
            enumerable: true,
            configurable: true
        });
        Logger.DependencyInjection(target.constructor.name,property)
    };
}