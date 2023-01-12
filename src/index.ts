import express, { Application, Request, Response } from "express";
import session from "express-session";
import { Server, Socket } from "socket.io";
import http from "http";
import path from "path";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import morgan from "morgan";
import cors from "cors";

// Types
declare module 'express-session' {
    interface SessionData {
        user: string | null,
        views: number
    }
}
interface User {
    userName:string,
    views:number
}


// Initializations
const app: Application = express();
const server = http.createServer(app);
const socketServer = new Server(server,{
    cors: {
      origin: "*"
    }
  });
socketServer.on("connection", (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    console.log(socket.id);
})

// Settings
app.set("port", process.env.PORT || process.argv[2])
const PORT = app.get("port");
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "./views"))

// Middleware
app.use(session({
    secret: "askdjbaikosdjbkjbnlkquhlakjbkl_-_-_-_-jbasd32032163845321354354384a6s8d4q",
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"./public")));
app.use(morgan("dev"));
app.use(cors({origin:"http://127.0.0.1:5491"}))

// Routes
app.get("/", (req: Request, res: Response) => { // is logged
    const userData = {
        user: req.session.user || null,
        views: req.session.views || 0
    }
    if(!userData.user || !userData.user.length){
        return res.redirect("/login");
    }
    req.session.views = req.session.views ?  req.session.views+=1 :  1;
    res.render("index",{views:req.session.views,userName:userData.user});
});

app.post("/logout",(req: Request, res: Response) =>{
    req.session.user = null;
    req.session.views = 0;
    res.redirect("/login");
});


app.get("/login", (req: Request, res: Response) => {
    const userData = {
        user: req.session.user || null,
        views: req.session.views || 0
    }
    if(userData.user){
        console.log("/login redirect to /");
        return res.redirect("/");
    }
    console.log("/login render login.ejs");
    res.render("login");
});

app.post("/login", (req: Request, res: Response)=>{
    const userData:User = req.body;
    req.session.user = userData.userName;
    req.session.views = 0;
    res.redirect("/");
});

// Server
server.listen(PORT, () => console.log(`Server Running On PORT ${PORT}\nVisit http://127.0.0.1:${PORT}`))