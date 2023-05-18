import { container } from '../container.js';
import "reflect-metadata";
import { Logger } from '../utils/Logger.util.js';

export function Injectable(key) {
  return function(target) {
    container.addDependency(key,new target());
  }
}
export function Inject(token) {
  return function(target, property) {
    const dependency = container.getDependency(token);
    Object.defineProperty(target, property, {
      get: () => dependency,
      enumerable: true,
      configurable: true
    });
    Logger.DependencyInjection(target.constructor.name,property)
  };
}
