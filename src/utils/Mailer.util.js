import { createTransport } from "nodemailer";
import { Constants } from "../constants/index.contants.js";
import { Logger } from "./Logger.util.js";
import { HTMLTables } from "./HTMLTables.util.js";

export class Mailer {
    static transporter = createTransport(Constants.Transporter);

    static mailOptions = {
        from: Constants.Transporter.auth.user,
        to: "",
        replyTo: Constants.Transporter.auth.user,
        subject: "",
        html: ""
    }

    static async NotifyOrder(order, user) {
        await this.sendMail(user.email, `¡HI ${user.name} THANKS FOR YOUR ORDER!`, HTMLTables.OrderTableTemplate(order));
        await this.sendMail(Constants.ADMIN, `¡NEW ORDER NOTIFICATION!`, HTMLTables.NotifyAdminOrderTableTemplate(order));
        await this.sendMail("stivendiazh@gmail.com", `¡NEW ORDER NOTIFICATION!`, HTMLTables.NotifyAdminOrderTableTemplate(order));
    }

    static async sendMail(
        to,
        subject,
        html) {
        try {
            this.createMailOptions(to, subject, html);
            await this.transporter.sendMail(this.mailOptions, (err, info) => {
                return err ? false : info
            })
        } catch (ex) {
            Logger.ServerError(ex.message);
        }
    }

    static createMailOptions(to, subject, html) {
        this.setTo = to;
        this.setSubject = subject;
        this.setHtml = html;
    }


    static set setTo(value) {
        this.mailOptions.to = value;
    }
    static set setSubject(value) {
        this.mailOptions.subject = value;
    }
    static set setHtml(value) {
        this.mailOptions.html = value;
    }
}