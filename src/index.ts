import express,{Application} from "express";
import {green,bgBlue,red} from "colors";
import { Connections } from "./connections/index.Connections";
// import { ProductCollection } from "./databases/Firebase/Product.Collection";

// Initializations
const app:Application = express();

// Database Connections
Connections.execute()
    .then( (data) => {
        console.table(data);
        console.log(bgBlue("🚀 DataBases Connecteds!!! 🚀"));
    })
    .catch((err) =>{
        console.table(err);
        console.error(red("Error Connecting to Databases❗❗❗"));
    })

// Configurations
app.set("port",process.env.PORT || process.argv[2]);
const PORT = app.get("port");

// Middleweares
// ProductCollection.CREATE({
//     productId: "MCO657791576",
//     title: "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
//     price: 3049900,
//     stock: 1,
//     thumbnail: "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg"
// }).then(res=>console.log(res))

// Routes

// Running Server
app.listen(PORT,()=>{
    console.clear();
    if(PORT === process.argv[2]) console.log(`\nServer Running on Port ${PORT}\nVisit ${green(`http://127.0.0.1:${PORT}`)}`);
});