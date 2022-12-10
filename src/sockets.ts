import {Server} from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ChatService } from "./services/ChatService";
import color from "colors";

interface User {
    id: string,
    userName:string
}

const socketHandler = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    let users:Array<User> = [];

    io.on("connection", async (socket)=>{
        console.log(color.green("New User Connected"),socket.id);

        const messages = await ChatService.getAllMessages();
        console.log(messages);
        
        socket.on("messageToSend",(msg:string)=>{
            const user:User = (users.filter((user:User)=> user.id === socket.id))[0];
            if(!user){
                socket.emit("login",true);
            }else{
                ChatService.addNewMessage(msg,user.userName);
                socket.broadcast.emit("newMessage",{message:msg,userName:user.userName})
            }
        })
        
        socket.on("newUser",(username:string,cb)=>{
            if(users.length > 0){
                users.forEach((user:User,i:number) => {
                    if((user.userName).toLowerCase() === (username).toLowerCase()){
                        cb(false);
                    }else{
                        if(i === (users.length - 1)){
                            users.push({id:socket.id,userName:username});
                            socket.emit("loadMessages",messages);
                            io.sockets.emit("newConnection",users);
                            cb(true);
                        }
                    }
                })
            }else{
                users.push({id:socket.id,userName:username});
                socket.emit("loadMessages",messages);
                io.sockets.emit("newConnection",users);
                cb(true);
            }
            
        })

        socket.on("disconnect",()=>{
            socket.emit("login",true);
            users.forEach((user:User,i:number) => {
                if(user.id == socket.id){
                    console.log(color.bgRed.white(`${user.userName} has left`));
                    users = users.filter((user:User) => socket.id != user.id)
                    io.sockets.emit("newConnection",users);
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