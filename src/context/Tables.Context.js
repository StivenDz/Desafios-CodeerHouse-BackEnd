import { OrderRepository } from "../database/Order.Repository.js";
import { ProductRepository } from "../database/Product.Repository.js";
import { ShoppingCartRepository } from "../database/ShoppingCart.Repository.js";
import { UsersRepository } from "../database/Users.Repository.js";
import { Logger } from "../utils/Logger.util.js";

export class Tables {
    static tables = [
        UsersRepository,
        ProductRepository,
        ShoppingCartRepository,
        OrderRepository
    ];

    static addTable(table) {
        this.tables.push(table)
    }
    static getTables() {
        return this.tables;
    }

    static async CheckTablesExistence() {
        console.clear();
        const tables = this.getTables();
        await Promise.all(tables.map(async (table) => {
            try {
                const exist = (await table.CHECK_TABLE_EXISTENCE()).length > 0;
                if (!exist) {
                    await table.CREATE_TABLE();
                    Logger.TableCreated(table.name);
                    return
                };
                Logger.TableVerified(table.name);
            } catch (ex) {
                Logger.ServerError(ex.sqlMessage);
            }
        }))
    }
}