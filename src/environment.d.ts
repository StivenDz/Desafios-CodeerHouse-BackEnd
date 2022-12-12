declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string;
            NODE_ENV: 'development' | 'production';
            DEV_DBPASS:string;
            DEV_DBHOST:string;
            DEV_DBPORT:number;
            DEV_DBUSER:string;
            DEV_DBNAME:string;
            PRD_DBPASS:string;
            PRD_DBHOST:string;
            PRD_DBUSER:string;
            PRD_DBNAME:string;
        }
    }
}

export { }