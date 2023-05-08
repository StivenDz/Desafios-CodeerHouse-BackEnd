import express,{Application} from "express";
import morgan from "morgan";
import { Connections } from "./connections/index.Connections";
import {blue,green} from "colors";
import dotenv from "dotenv";
import Path from "path";
import { API_KEY } from "./middlewares/ApiKey.Middleware";
import { IndexRouter } from "./routes/index.Routes";
import { loadControllers } from "./context/Controller.Context";
import session from "express-session";
import { Tables } from "./context/Tables.Context";

// INITIALIZATIONS
const app:Application = express();

// CONFIGURATIONS
app.set("port",process.env.PORT || process.argv[2]);
dotenv.config({path:Path.join(__dirname,"../.env")});
const PORT = app.get("port");

// CONNECTIONS
Connections.execute()
.then(async(table)=> {
    await Tables.CheckTablesExistence()

    // MIDDLEWARES
    app.use(session({
        secret:process.env.PRIVATE_KEY || "",
        resave: false,
        saveUninitialized: true
    }))
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(morgan("dev"));
    app.use(API_KEY.Validate);
    app.use(express.static(Path.join(__dirname,"./public")))
    loadControllers()
    
    // ROUTES
    app.use(IndexRouter.getRoutes());
    
    
    // SERVER
    app.listen(PORT,()=>{
        console.log(green(`\nEnable mode ${process.env.NODE_ENV.toUpperCase()}\n`));
        console.table(table);
        console.log(`\nServer Running on PORT ${PORT}, Make request to ${blue(`http://localhost:${PORT}`)}\n`);
    });
})
.catch(table=> console.table(table))

