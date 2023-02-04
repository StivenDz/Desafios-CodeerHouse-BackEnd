import express, { Application, NextFunction, Request, Response } from "express";
import session from "express-session";
import { Server, Socket } from "socket.io";
import http from "http";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Types
declare module 'express-session' {
    interface SessionData {
        user: string | null,
        views: number,
        token: string
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
dotenv.config({path:".env"})

// Middleware
app.use(session({
    secret: process.env.PRIVATE_KEY || "",
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"./public")));
app.use(morgan("dev"));
app.use(cors({origin:"http://127.0.0.1:5491"}))
// const auth = (req:Request,res:Response,next:NextFunction) =>{
//     const auth = req.headers.authorization;
//     if(!auth) return res.status(401).json({error:"not authenticated"});
//     const authType = auth.split(" ")[0];
//     if(authType != "Bearer") return res.status(401).json({error:`authentication method ${authType} is not allowed, use Bearer Token`});
//     const token = auth.split(" ")[1];
//     try{
//         const result = jwt.verify(token,process.env.PRIVATE_KEY || "");
//         console.log(result);
//         return next();
//     }catch(ex:any){
//         return res.status(403).json({error:"Authentication Error, Invalid token or has expired"});
//     }
// }
const authMVC = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.session.token;
    if(!token) return res.render("login");
    try{
        const result:any = jwt.verify(token,process.env.PRIVATE_KEY || "");
        req.session.user = result.userName || "";
        console.log(result);
        return next();
    }catch(ex:any){
        return res.status(403).json({error:"Authentication Error, Invalid token or has expired"});
    }
}

// Routes
app.get("/",authMVC, (req: Request, res: Response) => { // is logged
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
    res.render("login");
});

app.post("/login", (req: Request, res: Response)=>{
    const userData:User = req.body;
    const token = jwt.sign({userName:userData.userName},process.env.PRIVATE_KEY || "",{expiresIn:60});
    req.session.views = 0;
    req.session.token = token;
    res.redirect("/");
});

// Server
server.listen(PORT, () => console.log(`Server Running On PORT ${PORT}\nVisit http://127.0.0.1:${PORT}`))