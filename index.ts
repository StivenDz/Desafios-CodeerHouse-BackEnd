class Product {
    public id: number;
    public title: string;
    public price: number;
    public stock: number;
    constructor(id: number, title: string, price: number, stock: number) {
        this.id = id;
        this.title = title;
        this.price = price,
        this.stock = stock
    }
}
class User {
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
                this.cart.length,
                title,
                price,
                stock
            )
        )
    }
    removeFromCart(id: number): Array<Product> | null {
        return (this.cart.filter(item => item.id === id)).length === 1 
                ?
                    this.setCart = this.cart.filter(item => item.id !== id)
                    :
                    null
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

    private priceFormat(num:any):string{
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

const user = new User("Stiven", "Diaz", 20, "calle 8 15-14 Gaira");
user.addToCart(
    "Pc Computador Gamer Amd Ryzen 7 5700g Ssd 240 Hdd 1tb Ram 16",
    3859900,
    15)
user.addToCart(
    "Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro",
    92400,
    10)
user.addToCart(
    "Torre Gamer Rgb Amd Ryzen 5 5600g + 16gb + Ssd 240 @pd",
    2249000,
    5)
user.addToCart(
    "Mouse Vertical Inalámbrico Recargable Weibo Wb-881 Negro",
    33069,
    15)
user.addToCart(
    "Monitor Gamer Samsung F22t35 Led 22  Dark Blue Gray 100v/240v",
    521913,
    2)
console.log(user.getCart);
user.removeFromCart(1);
console.log(user.getCart);
console.log(user.showAllProductsName());
console.log(user.showTotalPrice());

