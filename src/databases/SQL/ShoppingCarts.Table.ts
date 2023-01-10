import { Product, ProductSelected,ShoppingCart } from "@types";
import { MySQLDB } from "../../connections/MySQL.Client";

export class ShoppingCartsTable {
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

    static async SELECT_ID(cartId:string):Promise<null|ShoppingCart>{
       const [cart] = await this.db.query(`SELECT shoppingcarts.cartId,shoppingcarts.quantitySelected,shoppingcarts.created_At AS 'cartCreation' ,products.productId,products.title,products.price,products.stock,products.thumbnail,products.created_At AS productCreation
       FROM shoppingcarts
       INNER JOIN products
       ON shoppingcarts.productId = products.productId
       WHERE shoppingcarts.cartId = ?`, [cartId]);

       const object = (JSON.parse(JSON.stringify(cart)));

       if(!object.length){
          return null
       }

      return {
        cartId,
        cartCreation:object[0].cartCreation,
        products: object.map((product:ProductSelected)=> {
          const {title,price,productId,stock,thumbnail,quantitySelected,productCreation} = product;
          return {productId,title,price,stock,quantitySelected,thumbnail,productCreation}
        })
      }
    }
    static async UPDATE(productId:string,title:string,price:number,thumbnail:string,stock:number){
         const [res] = await this.db.query("UPDATE products SET title = IFNULL(?, title) , price = IFNULL(?, price) , stock = IFNULL(?, stock) , thumbnail = IFNULL(?, thumbnail) WHERE productId = ?", [title,price,stock,thumbnail,productId]);

        return res;
    }

    static async CLEAR(cartId:string){
      const cart = await this.SELECT_ID(cartId);
      console.log(cart);
      
      if(!cart) return cart;
      if(cart.products.length > 1){
        cart.products.forEach(async(product:Product,i:number)=>{
          if((cart.products.length - 1) == i){
            console.log(i,(cart.products.length - 1));
        
            await this.db.query("UPDATE shoppingcarts SET productId = null,quantitySelected = null WHERE cartId = ? AND productId = ?", [cartId,product.productId]);
          }else{
            console.log(i,(cart.products.length - 1));
            await this.DELETE(cartId,product.productId)
            
          }
        })
      }else{
        await this.db.query("UPDATE shoppingcarts SET productId = null,quantitySelected = null WHERE cartId = ?", [cartId]);
      }
      return true
    }

    static async DELETE(cartId:string,productId:string){
       return await this.db.query("DELETE FROM shoppingcarts WHERE cartId = ? AND productId = ?", [cartId,productId]);
    }
  }