export interface MySQLCredentials {
    host: string,
    port?: number,
    user: string,
    password: string,
    database: string,
    ssl?: {
        rejectUnauthorized: boolean
    }
}
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: ENV
      }
    }
}

export type ENV = "production" | "development";

export type QuantitySelected = {
  productId:number,
  cartId:string,
  selected:number
}

export type Query = [string, [string]]

export interface AuthResponse {
  validUser: boolean,
  message: string,
  user?: UserData
}

export interface RouteContext {
  path:string;
  controller:any;
  httpMethod:HttpMethod;
  controllerName:string;
  controllerMethod:any;
  middleware:any | null;
}

declare module 'express-session' {
  interface SessionData {
      token: string | null
  }
}
export type Table = {
  name:string;
  checkTable:any;
  createTable:any;
  repository:any
}
export type HttpMethod = 'get' | 'post' | 'put' | 'delete'