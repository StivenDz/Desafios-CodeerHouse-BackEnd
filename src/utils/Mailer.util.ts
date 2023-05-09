import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Constants } from "../constants/index.contants";
import { Logger } from "./Logger.util";
import { HTMLTables } from "./HTMLTables.util";
import { OrderEntity } from "../models/Entity/Order.Entity";
import { UserEntity } from "../models/Entity/User.Entity";

interface MailOptions {
    from: string,
    to: string | Array<string>,
    replyTo: string,
    subject: string,
    html: string
}

export class Mailer {
    private static transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport(Constants.Transporter);

    private static mailOptions: MailOptions = {
        from: Constants.Transporter.auth.user,
        to: "",
        replyTo: Constants.Transporter.auth.user,
        subject: "",
        html: ""
    }

    public static async NotifyOrder(order: OrderEntity, user: UserEntity) {
        await this.sendMail(user.email, `¡HI ${user.name} THANKS FOR YOUR ORDER!`, HTMLTables.OrderTableTemplate(order));
        await this.sendMail(Constants.ADMIN, `¡NEW ORDER NOTIFICATION!`, HTMLTables.NotifyAdminOrderTableTemplate(order));
        await this.sendMail("stivendiazh@gmail.com", `¡NEW ORDER NOTIFICATION!`, HTMLTables.NotifyAdminOrderTableTemplate(order));
    }

    public static async sendMail(
        to: string | Array<string>,
        subject: string,
        html: string) {
        try {
            this.createMailOptions(to, subject, html);
            await this.transporter.sendMail(this.mailOptions, (err, info) => {
                return err ? false : info
            })
        } catch (ex: any) {
            Logger.ServerError(ex.message);
        }
    }

    private static createMailOptions(to: string | Array<string>, subject: string, html: string) {
        this.setTo = to;
        this.setSubject = subject;
        this.setHtml = html;
    }


    public static set setTo(value: string | Array<string>) {
        this.mailOptions.to = value;
    }
    public static set setSubject(value: string) {
        this.mailOptions.subject = value;
    }
    public static set setHtml(value: string) {
        this.mailOptions.html = value;
    }
}