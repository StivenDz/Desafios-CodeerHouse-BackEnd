import {Server} from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


const socketHandler = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    io.on("connection",(socket)=>{
        console.log("Connected",socket.id);
    })
}

export default socketHandler;