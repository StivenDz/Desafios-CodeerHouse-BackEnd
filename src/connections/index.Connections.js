import { MySQLClient } from "./MySQL.Client.js";
import { MySQLConfig } from "../configs/MySQL.config.js";

export class Connections {

    static SQLClient = new MySQLClient(MySQLConfig);
    static SQLConnection;

    static async execute() {
        return await new Promise(async (resolve, rejected) => {
            try {
                const Connection = await this.SQLClient.connect();
                if (!Connection) {
                    rejected({
                        DataBases_Status: {
                            MySQL: `Error ❌`
                        }
                    })
                }
                this.SQLConnection = await this.SQLClient.getConnection();
                resolve({
                    DataBases_Status: {
                        MySQL: `Connected 🚀`
                    }
                });
            } catch (err) {
                rejected(err);
            }
        })
    }
}