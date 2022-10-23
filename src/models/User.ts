import { Product } from "./Product";
import  {FyleSystemManager} from "./FyleSystemManager";

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
        this.cart = []
    }

    //methods
    addToCart(title: string, price: number, stock: number) {
        this.cart.push(
            new Product(
                this.cart.length > 0 ? this.cart[this.cart.length - 1].id + 1 : 1,
                title,
                price,
                stock
            )
        )
        this.writeProducts(this.cart);
        return this.cart[this.cart.length - 1].id;
    }
    removeFromCart(id: number): void | null {
        if (!((this.cart.filter(item => item.id === id)).length === 1)) return null;

        this.setCart = this.cart.filter(item => item.id !== id);
        this.writeProducts(this.cart);
    }

    showAllProductsName(): string {
        return this.cart.map(item => `- ${item.title}`).join("\n")
    }
    showTotalPrice() {
        let total = this.cart.map(item => item.price).reduce((prev, curr) => (prev + curr), 0)
        return `$ ${this.priceFormat(total)}`;
    }

    getFullName(): string {
        return `${this.getName} ${this.getLastname}`
    }

    clearCart(): void {
        this.cart = []
    }

    readProducts(){
        const fs = new FyleSystemManager();
        return fs.readData("../../products.json");
    }

    writeProducts(products: Array<Product>): void {
        const fs = new FyleSystemManager();
        fs.writeData("products.json", JSON.stringify(products, null, 2))
    }

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

    private set setCart(cart: Array<Product | null>) {
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