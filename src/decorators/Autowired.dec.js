import { container } from '../container.js';
import { Logger } from '../utils/Logger.util.js';

export function Autowired(token) {
    return function (target, property) {
        const dependency = container.getDependency(token);
        Object.defineProperty(target, property, {
            get: () => dependency,
            enumerable: true,
            configurable: true
        });
        Logger.DependencyInjection(target.constructor.name,property)
    };
}