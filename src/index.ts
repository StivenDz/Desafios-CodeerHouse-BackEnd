import express,{Application} from "express";
import morgan from "morgan";
import { Connections } from "./connections/index.Connections";
import {blue,green} from "colors";
import dotenv from "dotenv";
import Path from "path";
import { API_KEY } from "./middlewares/ApiKey.Middleware";
import { routes } from "./routes/index.Routes";


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
app.use(API_KEY.Validate);

// ROUTES
app.use(routes);

// SERVER
app.listen(PORT,()=>{
    console.clear();
    console.log(`Server Running on PORT ${PORT}\nMake request to ${blue(`http://localhost:${PORT}`)}`);
});