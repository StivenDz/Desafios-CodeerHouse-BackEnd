import express from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/routes";

// Initializations
const app = express();
dotenv.config({ path: path.resolve(".env")});

// Setting
app.set("port",process.env.PORT || process.argv[2]);
app.set("views",path.join(__dirname,"public/views"));
app.set("view engine","ejs");
const PORT = app.get("port");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public"))) 

// Routes
app.use(router);

app.listen(PORT,()=>{
    if(PORT === process.argv[2]) console.log(`server running on port ${PORT}:\nVisit http://localhost:${PORT}`);
})