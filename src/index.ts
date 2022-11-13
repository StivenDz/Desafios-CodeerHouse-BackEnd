import express from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/routes";
import http from "http";
import {Server as SocketServer} from "socket.io";
import Sockets from "./sockets";

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);
Sockets(io);

// Setting
app.set("port",process.env.PORT || process.argv[2]);
app.set("views",path.join(__dirname,"public/views"));
app.set("view engine","ejs");
const PORT = app.get("port");
dotenv.config({ path: path.resolve(".env")});

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

// Routes
app.use(router);

server.listen(PORT,()=>{
    if(PORT === process.argv[2]) console.log(`server running on port ${PORT}:\nVisit http://localhost:${PORT}`);
});