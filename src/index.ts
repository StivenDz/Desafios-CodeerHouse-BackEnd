import express,{Application,Request,Response} from "express";
import morgan from "morgan";
import { Connections } from "./connections/index.Connections";
import {blue,green} from "colors";
import dotenv from "dotenv";
import Path from "path";


// INITIALIZATIONS
const app:Application = express();


// CONFIGURATIONS
app.set("port",process.env.PORT || process.argv[2]);
dotenv.config({path:Path.join(__dirname,"../.env")});
const PORT = app.get("port");

// Connections
Connections.execute()
    .then(table=> {
        console.table(table);
        console.log(green(`Enable mode '${process.env.NODE_ENV}'`));
    })
    .catch(table=> console.table(table))

// MIDDLEWARES
app.use(morgan("dev"));


// ROUTES
app.get("/",(_req:Request,res:Response)=>{
    res.send("ok")
});


// SERVER
app.listen(PORT,()=>{
    console.clear();
    console.log(`Server Running on PORT ${PORT}\nMake request to ${blue(`http://localhost:${PORT}`)}`);
});