import express,{Application} from "express";
import {green,bgBlue,red} from "colors";
import { Connections } from "./connections/index.Connections";
import { Firebase } from "./connections/Firebase.Client";
import { firebaseConfig } from "./configs/Firebase.config";
import { ProductCollection } from "./databases/Firebase/Product.Collection";

// Initializations
const app:Application = express();

// Database Connections
export const FirebaseConnection = new Firebase(firebaseConfig).connect()
Connections.execute()
    .then( (data) => {
        console.table(data);
        console.log(bgBlue("🚀 DataBases Connecteds!!! 🚀"));
    })
    .catch((err) =>{
        console.table(err);
        console.error(red("Error Connecting to Databases❗❗❗"));
    })
ProductCollection.SELECT();

// Configurations
app.set("port",process.env.PORT || process.argv[2]);
const PORT = app.get("port");

// Middleweares

// Routes

// Running Server
app.listen(PORT,()=>{
    console.clear();
    if(PORT === process.argv[2]) console.log(`\nServer Running on Port ${PORT}\nVisit ${green(`http://127.0.0.1:${PORT}`)}`);
});