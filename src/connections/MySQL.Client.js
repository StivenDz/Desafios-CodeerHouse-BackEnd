import { createPool } from "mysql2/promise";

export class MySQLClient {
    config;
    constructor(config) {
        this.config = config
    }
    async connect() {
        try {
            return await createPool(this.config).getConnection();
        } catch (err) {
            return null;
        }
    }

    getConnection() {
        return createPool(this.config);
    }
}