import { MySQLDB } from "../../connections/MySQL.Client";

export class ProductTable {
  public static db = MySQLDB.db;
    static async CheckTableExistence(){
      const [result] = await this.db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'products' LIMIT 1")
      return result
    }

    static async CREATE_TABLE(){
        return await this.db.query("CREATE TABLE products(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,productId VARCHAR(60) NOT NULL,title VARCHAR(255) NOT NULL,price INTEGER NOT NULL,stock INTEGER NOT NULL,thumbnail VARCHAR(255) NOT NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    }

    static async INSERT(productId:string,title:string,price:number,thumbnail:string,stock:number){
      const [res] = await  this.db.query("INSERT INTO products(productId,title,price,stock,thumbnail) VALUES(?,?,?,?,?)" , [productId,title,price,stock,thumbnail]);
      return res
    }
  
    static async SELECT(){
       const [products] = await this.db.query("SELECT * FROM products");
      return products
    }
    static async SELECT_ID(productId:string){
       const [product] = await this.db.query("SELECT * FROM products WHERE productId = ?", [productId]);
      return JSON.parse(JSON.stringify(product))[0];
    }
    static async UPDATE(productId:string,title:string,price:number,thumbnail:string,stock:number){
         const [res] = await this.db.query("UPDATE products SET title = IFNULL(?, title) , price = IFNULL(?, price) , stock = IFNULL(?, stock) , thumbnail = IFNULL(?, thumbnail) WHERE productId = ?", [title,price,stock,thumbnail,productId]);

        return res;
    }
    static async DELETE(productId:string){
       return await this.db.query("DELETE FROM products WHERE productId = ?", [productId]);

    }
  }
  