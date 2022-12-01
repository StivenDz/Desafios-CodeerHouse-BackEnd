import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import { app as Router } from "./routes";
import morgan from "morgan";

// Initializations
const app:Application = express();


// Settings
app.set("port",process.env.PORT || 7999);
const PORT:number = app.get("port");
dotenv.config({ path: path.resolve(".env")});

// Middleweares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))

// Routes
app.use(Router);

// Running Server
app.listen( PORT,() => {
    if(PORT === 7999) console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`);
})