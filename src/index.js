import express from "express";
import morgan from "morgan";
import { Connections } from "./connections/index.Connections.js";
import color from "colors";
import dotenv from "dotenv";
import Path from "path";
import { API_KEY } from "./middlewares/ApiKey.Middleware.js";
import { IndexRouter } from "./routes/index.Routes.js";
import session from "express-session";
import { Tables } from "./context/Tables.Context.js";
import { Constants } from "./constants/index.contants.js";
import { __dirname } from "./constants/Dirname.js";

// INITIALIZATIONS
const app = express();

// CONFIGURATIONS
app.set("port", process.env.PORT || process.argv[2]);
dotenv.config({ path: Path.join(__dirname, "../.env") });
const PORT = app.get("port");

// CONNECTIONS
Connections.execute()
    .then(async (table) => {
        await Tables.CheckTablesExistence()

        // MIDDLEWARES
        app.use(session({
            secret: Constants.PRIVATE_KEY || "",
            resave: false,
            saveUninitialized: true
        }))
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan("dev"));
        app.use(API_KEY.Validate);
        app.use(express.static(Path.join(__dirname, "../public")))

        // ROUTES
        app.use(IndexRouter.getRoutes());

        // SERVER
        app.listen(PORT, () => {
            console.log(color.green(`\nEnable mode ${Constants.ENV.toUpperCase()}\n`));
            console.table(table);
            console.log(`\nServer Running on PORT ${PORT}, Make request to ${color.blue(`http://localhost:${PORT}`)}\n`);
        });
    })
    .catch(table => console.table(table))

