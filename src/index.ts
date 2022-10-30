import express from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/routes";

// Initializations
const app = express();
dotenv.config({ path: path.resolve(".env")});

// Setting
app.set("port",process.env.PORT || 9999);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const PORT = app.get("port");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(router);

app.listen(PORT,()=>{
    if(PORT === 9999) console.log(`server running on port ${PORT}:\nVisit http://localhost:${PORT}`);
})