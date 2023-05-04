import { container } from '../container';
import "reflect-metadata";
import { Logger } from '../utils/Logger.util';

export function Injectable(key:string): any {
  return function(target: any): any {
    container.addDependency(key,new target());
  }
}
export function Inject(token: string) {
  return function(target: any, property: string):any {
    const dependency = container.getDependency(token);
    Object.defineProperty(target, property, {
      get: () => dependency,
      enumerable: true,
      configurable: true
    });
    Logger.DependencyInjection(target.constructor.name,property)
  };
}
