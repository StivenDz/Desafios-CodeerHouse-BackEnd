import { Table } from "@types";
import { Logger } from "../utils/Logger.util";

export class Tables {
    private static tables: Array<Table> = [];

    public static addTable(table: Table) {
        this.tables.push(table)
    }
    public static getTables() {
        return this.tables;
    }

    public static async CheckTablesExistence() {
        const tables = this.getTables();
        await Promise.all(tables.map(async (table: Table) => {
            try {
                const exist = (await table.checkTable()).length > 0;
                if(!exist) {
                    await table.createTable();
                    Logger.TableCreated(table.name);
                    return
                };
                Logger.TableVerified(table.name);
            } catch (ex: any) {
                Logger.ServerError(ex.sqlMessage);
            }
        }))
    }
}