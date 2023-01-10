import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(".env")});

const DEV_HOST = process.env.DEV_MONGODB_DBHOST
const DEV_DBNAME = process.env.DEV_MONGODB_DBNAME
const PRD_DBHOST = process.env.PRD_MONGODB_DBHOST
const PRD_DBUSER = process.env.PRD_MONGODB_DBUSER
const PRD_DBPASS = process.env.PRD_MONGODB_DBPASS
const PRD_DBNAME = process.env.PRD_MONGODB_DBNAME

// mongodb+srv://user:password@host/DatabaseName?retryWrites=true&w=majority
export const dbConfig = {
    development:  `mongodb://${DEV_HOST}/${DEV_DBNAME}`,
    production: `mongodb+srv://${PRD_DBUSER}:${PRD_DBPASS}@${PRD_DBHOST}/${PRD_DBNAME}?retryWrites=true&w=majority`
}