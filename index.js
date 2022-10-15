class Product {
    id;
    title;
    price;
    stock;
    /**
     * @param {number} id 
     * @param {string} title 
     * @param {number} price 
     * @param {number} stock 
     */
    constructor(id,title, price, stock) {
        this.id = id;
        this.title = title;
        this.price = price,
        this.stock = stock
    }
}
class User {
    #name;
    #lastname;
    #age;
    #direction;
    #cart;
    /**
     * 
     * @param {string} name 
     * @param {string} lastname 
     * @param {number} age 
     * @param {string} direction 
     */
    constructor(name, lastname, age, direction = null) {
        this.#name = name;
        this.#lastname = lastname;
        this.#age = age;
        this.#direction = direction;
        this.#cart = []
    }
    //methods
    /**
     * 
     * @param {string} title 
     * @param {number} price 
     * @param {number} stock 
     */
    addToCart(title,price,stock) {
        this.#cart.push(
            new Product(
                this.#cart.length,
                title,
                price,
                stock
            )
        )
    }
    /**
     * 
     * @param {number} id 
     * @returns {Array<Product | null> | null}
     */
    removeFromCart(id) {
        return (this.#cart.filter(item => item.id === id)).length === 1 
                ?
                    this.#setCart = this.#cart.filter(item => item.id !== id)
                    :
                    null
    }
    /**
     * 
     * @returns {string}
     */
    showAllProductsName() {
        return this.#cart.map(item => `- ${item.title}`).join("\n")
    }
    /**
     * 
     * @returns {string}
     */
    showTotalPrice() {
        let total = this.#cart.map(item => item.price).reduce((prev, curr) => (prev + curr), 0)
        return `$ ${this.#priceFormat(total)}`;
        
    }

    getFullName() {
        return `${this.getName} ${this.getLastname}`;
    }

    clearCart() {
        this.#cart = []
    }

    /**
     * 
     * @param {any} num 
     * @returns {string}
     */
    #priceFormat(num){
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
    /**
     * 
     * @returns {string}
     */
    get getName() {
        return this.#name
    }

    /**
     * @param {string} name
     */
    set setName(name) {
        this.#name = name
    }

    /**
     * 
     * @returns {string}
     */
    get getLastname() {
        return this.#lastname
    }

    /**
     * @param {string} lastname
     */
    set setLastname(lastname) {
        this.#lastname = lastname
    }

    /**
     * 
     * @returns {number}
     */
    get getAge() {
        return this.#age
    }
    /**
     * @param {number} age
     */
    set setAge(age) {
        this.#age = age
    }

    /**
     * 
     * @returns {string | null}
     */
    get getDirection() {
        return this.#direction
    }

    /**
     * @param {string} direction
     */
    set setDirection(direction) {
        this.#direction = direction
    }

    /**
     * 
     * @returns {Array<Product>}
     */
    get getCart() {
        return this.#cart
    }
     
    /**
     * @param {Array<Product | null>} cart
     */
    set #setCart(cart) {
        this.cart = cart;
    }

    get getAllData() {
        return {
            name: this.#name,
            lastname: this.#lastname,
            age: this.#age,
            direction: this.#direction,
            cart: this.#cart
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