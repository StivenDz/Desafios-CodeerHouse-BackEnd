import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import http,{Server} from "http";
import {engine}  from 'express-handlebars';
import {Server as SocketServer} from "socket.io";
import Sockets from "./sockets";
import { app as router } from "./routes";
import { db } from "./configs/db.config";
import color from "colors";

// Initializations
const app : Application = express();
const server : Server = http.createServer(app);
const io: SocketServer = new SocketServer(server,{
  cors:{
    origin:["http://localhost:8080"]
  }
});
Sockets(io);

// Setting
app.set("port",process.env.PORT || process.argv[2]);
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname,"views", 'layouts'),
    partialsDir: path.join(__dirname,"views", 'partials'),
    extname: '.hbs'
  }))
app.set('view engine', 'hbs');
app.set("views",path.join(__dirname,"views"));  


const PORT = app.get("port");
dotenv.config({ path: path.resolve(".env")});

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
db.getConnection()
  .then((_res:any)=> console.log(color.green("Database is Connected")))
  .catch((err:any)=>console.log(color.red(`Error connecting to database\n${err}`)))
  

// Routes
app.use(router);

server.listen(PORT,()=>{
    if(PORT === process.argv[2]) console.log(`server running on port ${PORT}:\nVisit http://localhost:${PORT}`);
});