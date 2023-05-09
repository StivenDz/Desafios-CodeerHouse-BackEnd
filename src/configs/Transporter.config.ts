import dotenv from "dotenv";
import Path from "path";
dotenv.config({ path: Path.join(__dirname, "../../.env") });


export const Transporter = {
    host: process.env.MAIL_HOST || "",
    port: Number(process.env.MAIL_PORT) || 0,
    auth: {
        user: process.env.MAIL_AUTH_USER || "",
        pass: process.env.MAIL_AUTH_PASS || "",
    }
}