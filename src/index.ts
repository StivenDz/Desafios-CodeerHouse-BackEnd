import { User } from "./models/User";

console.clear();
const user = new User("Stiven", "Diaz", 20, "calle 8 15-14 Gaira");
console.log("Products: ", user.getCart);
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

console.table(user.getCart);
user.removeFromCart(5);
console.table(user.getCart);
console.log("\n"+user.showAllProductsName());
console.log("\n"+user.showTotalPrice()+"\n");
console.table(user.readProducts());

