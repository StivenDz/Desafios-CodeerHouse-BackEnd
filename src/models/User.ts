import { Product } from "./Product";
import { FyleSystemManager } from "./FyleSystemManager";
import {randomUUID} from "crypto";
import path from "path";
const fs = new FyleSystemManager();

export class User {
    private name: string;
    private lastname: string;
    private age: number;
    private direction: string | null;
    private cart: Array<Product>;
    
    constructor(name: string, lastname: string, age: number, direction: string | null) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.direction = direction;
        this.cart = fs.readData(path.join(__dirname,"../../products.json")).length ? fs.readData(path.join(__dirname,"../../products.json")).map(product => this.toProduct(product)) : []
    }

    //methods
    getProducts():Array<Product>{
        return fs.readData(path.join(__dirname,"../../products.json"));
    }

    getProductById(id:string):Product | null{
        const products = this.getProducts();
        const product = products.filter(product => product.id.toString() === id );
        if(product.length === 1) return product[0]
        else return null
    }
    addNewproduct(title: string, price: number, stock: number, thumbnail:string) {
        this.cart.push(
            new Product(
                randomUUID(),
                title,
                price,
                stock,
                thumbnail
            )
        )
        this.writeProducts(this.cart);
        return this.cart[this.cart.length - 1];
    }

    updateProductById(id:string,productUpdated:Product){
        this.setCart = this.cart.map(product => product.id === id ? productUpdated : product);
        this.writeProducts(this.cart);
    }

    deleteProductById(id: string): void {
        this.setCart = this.cart.filter(item => item.id !== id);
        this.writeProducts(this.cart);
    }

    toProduct(object:any):Product{
        const {id,price,stock,title,thumbnail} = object;
        const product = new Product(id,title,price,stock,thumbnail);
        return product;
    }

    showAllProductsName(): string {
        return this.cart.map(item => `- ${item.title}`).join("\n");
    }
    /**
     * It takes the price of each item in the cart, adds them together, and returns the total price in a
     * formatted string.
     * @returns The total price of all items in the cart.
     */
    showTotalPrice() {
        let total = this.cart.map((item:Product) => item.price).reduce((prev, curr) => (prev + curr), 0)
        return `$ ${this.priceFormat(total)}`;
    }

    getFullName(): string {
        return `${this.getName} ${this.getLastname}`
    }
    /**
     * It takes an array of products, converts it to a JSON string, and writes it to a file called
     * products.json
     * @param products - Array<Product>
     */
    writeProducts(products: Array<Product>): void {
        fs.writeData("products.json", JSON.stringify(products, null, 2))
    }
    
    //num.toLocaleString('es-co', { minimumFractionDigits: 2 })
    private priceFormat(num: any): string {
        num = Number(num.toFixed());
        num = (num.toString()).split('');
        num.reverse();
        if (num.length > 3) {
            let count = 0;
            for (let i = 0; i < num.length; i++) {
                if (count == 3) {
                    num.splice(i, 0, '.')
                    count = 0;
                } else {
                    count++;
                }
            }
        }

        num.reverse();
        return num.join('');
    }

    //getters & setters
    public get getName() {
        return this.name
    }

    public set setName(name: string) {
        this.name = name
    }
    public get getLastname() {
        return this.lastname
    }

    public set setLastname(lastname: string) {
        this.lastname = lastname
    }
    public get getAge() {
        return this.age
    }

    public set setAge(age: number) {
        this.age = age
    }
    public get getDirection() {
        return this.direction
    }

    public set setDirection(direction: string | null) {
        this.direction = direction
    }

    public get getCart() {
        return this.cart
    }

    private set setCart(cart: Array<Product>) {
        this.cart = cart;
    }

    public get getAllData() {
        return {
            name: this.name,
            lastname: this.lastname,
            age: this.age,
            direction: this.direction,
            cart: this.cart
        }
    }
}