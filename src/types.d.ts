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