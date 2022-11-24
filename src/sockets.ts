import {Server} from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import color from "colors";

interface User {
    id: string,
    username:string
}

const socketHandler = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    let users:Array<User> = [];

    io.on("connection",(socket)=>{
        console.log(color.green("New User Connected"),socket.id);

        
        socket.on("messageToSend",(msg:string)=>{
            const user:User = (users.filter((user:User)=> user.id === socket.id))[0];
            socket.broadcast.emit("newMessage",{msg,username:user.username})
        })
        
        socket.on("newUser",(username:string,cb)=>{
            if(users.length > 0){
                users.forEach((user:User,i:number) => {
                    if((user.username).toLowerCase() === (username).toLowerCase()){
                        cb(false);
                    }else{
                        if(i === (users.length - 1)){
                            users.push({id:socket.id,username});
                            io.sockets.emit("newConnection",users.length);
                            cb(true);
                        }
                    }
                })
            }else{
                users.push({id:socket.id,username});
                io.sockets.emit("newConnection",users.length);
                cb(true);
            }
            
        })

        socket.on("disconnect",()=>{
            users.forEach((user:User,i:number) => {
                if(user.id == socket.id){
                    console.log(color.bgRed.white(`${user.username} has left`));
                    users = users.filter((user:User) => socket.id != user.id)
                    io.sockets.emit("newConnection",users.length);
                }else{
                    if(i === (users.length - 1)){
                        console.log(color.bgRed.white("unknow has left"));
                    }
                }
            })
        })
    })
}

export default socketHandler;