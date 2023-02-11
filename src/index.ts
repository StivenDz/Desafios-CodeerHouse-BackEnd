import express, { Application, Request, Response } from "express";
import http from "http";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import child_process from "child_process";


// Initializations
const app: Application = express();
const server = http.createServer(app);

// Settings
app.set("port", process.env.PORT || process.argv[2])
const PORT = app.get("port");
dotenv.config({path:".env"})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"./public")));
app.use(morgan("dev"));
app.use(cors({origin:"http://127.0.0.1:5491"}))

//process
app.get("/info",(_req:Request,res:Response)=>{
    res.json({
        args:process.argv,
        platform:process.platform,
        nodeVersion:process.version,
        memoryUsage:process.memoryUsage().rss,
        path:process.execPath,
        id:process.pid,
        folder:process.cwd()
    });
})

//fork
app.get("/api/randoms",(req:Request,res:Response)=>{
    const forked = child_process.fork(path.resolve(__dirname,"./process.ts"));
    const quantity = req.query?.q || 100_000_000;
    console.log(quantity);
    forked.send(quantity);

    forked.on("message",(total:Object)=>{
        forked.kill()
        res.json(total).end();
    });
})

// Server
server.listen(PORT, () => console.log(`Server Running On PORT ${PORT}\nVisit http://127.0.0.1:${PORT}`))