import cluster from "cluster";
import os from 'os';
import { Server } from "./server.js";

if(process.env.exec_mode && process.env.exec_mode.includes("fork") || process.argv[2] == "8081"){
    const PORT = process.argv[2];
    const server = new Server();
    server.runServer(PORT);
}else{
    if (cluster.isPrimary) {
        const numCPUs = os.cpus().length;
    
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', (worker, code, signal) => {
            cluster.fork();
        });
    } else {
        const PORT = process.argv[2];
        const server = new Server();
        server.runServer(PORT);
    }
}


