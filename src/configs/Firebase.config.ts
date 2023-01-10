import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(".env")});

export const firebaseConfig:any = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROYECT_ID,
    storageBucket:process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGINSID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MESUREMENT_ID
};