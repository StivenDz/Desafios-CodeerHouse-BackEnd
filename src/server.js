import express from "express";
import path from "path";

export class Server{
    #getServer(){
        const app = express()

        // Settings
        app.set("port",process.argv[2] || 8081);

        // Middlewares
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Routes
        app.get("/datos", (_req, res) => {
            res.json({
                args: process.argv,
                platform: process.platform,
                nodeVersion: process.version,
                memoryUsage: process.memoryUsage().rss,
                path: process.execPath,
                PID: process.pid,
                folder: process.cwd(),
                mode: process.env.exec_mode
            });
        })
    
        app.get("/api/randoms", (req, res) => {
            const forked = child_process.fork(path.join(__dirname, "./process.js"));
            const quantity = req.query?.q || 100_000_000;
            forked.send(quantity);
    
            forked.on("message", (total) => {
                forked.kill()
                res.json(total).end();
            });
        })

        return app;
    }
    runServer(PORT){
        const app = this.#getServer();
        app.listen(PORT, () => console.log(`Server Running with PID ${process.pid}`));
    }
}