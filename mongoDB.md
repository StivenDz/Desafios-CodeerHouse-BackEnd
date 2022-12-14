use ecommerce;

db.products.insertOne({
    productId: "MCO967705850",
    title: "Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10",
    price: 1999900,
    stock: 7,
    thumbnail: "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg"
});

response:
{
        "acknowledged" : true,
        "insertedId" : ObjectId("639a3f1c77126764a5b03556")
}

db.messages.insertOne({
    userId: 1,
    userName: 'Stiven',
    message: 'Hola, Como están?'
 });

response:
{
        "acknowledged" : true,
        "insertedId" : ObjectId("639a407b77126764a5b03557")
}


db.products.insertMany([{
    productId: "MCO657791576",
    title: "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
    price: 3049900,
    stock: 1,
    thumbnail: "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg"
  },
  {
    productId: "MCO879442053",
    title: "Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro",
    price: 95000,
    stock: 11,
    thumbnail: "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg"
  },
  {
    productId: "MCO964679805",
    title: "Disco SólproductIdo Ssd Interno Kingston Sa400s37/240g 240gb Negro",
    price: 103322,
    stock: 23,
    thumbnail: "http://http2.mlstatic.com/D_804287-MLA49587128302_042022-F.jpg"
  },
  {
    productId: "MCO936445457",
    title: "Laptop Hp 240 G7 Gris 14 , Intel Celeron N4020 8gb De Ram 1tb Hdd, Intel Uhd Graphics 600 1366x768px Windows 10 Home",
    price: 905900,
    stock: 6,
    thumbnail: "http://http2.mlstatic.com/D_679578-MLA49695293979_042022-F.jpg"
  },
  {
    productId: "MCO939489276",
    title: "Disco SólproductIdo Ssd Interno Kingston Sa400s37/480g 480gb Negro",
    price: 160000,
    stock: 3,
    thumbnail: "http://http2.mlstatic.com/D_751939-MLA46221843872_052021-F.jpg"
  },
  {
    productId: "MCO818960598",
    title: "Pc Computador Gamer Amd Ryzen 7 5700g Ssd 240 Hdd 1tb Ram 16",
    price: 3859900,
    stock: 1,
    thumbnail: "http://http2.mlstatic.com/D_862652-MCO47807316125_102021-F.jpg"
  },
  {
    productId: "MCO943311946",
    title: "Monitor Gamer Samsung F22t35 Led 22 Dark Blue Gray 100v/240v",
    price: 524739,
    stock: 3,
    thumbnail: "http://http2.mlstatic.com/D_796587-MLA46165231779_052021-F.jpg"
  },
  {
    productId: "9cdffcf8-8d9f-40a9-a6d0-2d63e037944d",      
    title: "Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd",
    price: 2059900,
    stock: 25,
    thumbnail: "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg"
 }]);

response:
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("639a449e77126764a5b03558"),
                ObjectId("639a449e77126764a5b03559"),
                ObjectId("639a449e77126764a5b0355a"),
                ObjectId("639a449e77126764a5b0355b"),
                ObjectId("639a449e77126764a5b0355c"),
                ObjectId("639a449e77126764a5b0355d"),
                ObjectId("639a449e77126764a5b0355e"),
                ObjectId("639a449e77126764a5b0355f")
        ]
}


db.messages.insertMany([{
    userId:1,
    userName: "Stiven",
    message: "Como va todo?"
  },
  {
    userId:2,
    userName: "Michell",
    message: "Hola Bebé, muy bien. ¿y tú?"
  },
  {
    userId:1,
    userName: "Stiven",
    message: "Me alegra, yo muy bien gracias a Dios!"
  },
  {
    userId:2,
    userName: "Michell",
    message: "gracias!!"
  },
  {
    userId:3,
    userName: "Laura",
    message: "Que tal gente???"
  },
  {
    userId:1,
    userName: "Stiven",
    message: "Hola Lau!"
  },
  {
    userId:3,
    userName: "Laura",
    message: "Como vas?"
  },
  {
    userId:2,
    userName: "Michell",
    message: "Muy bien nojoda!"
 }]);

response:
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("639a472177126764a5b03560"),
                ObjectId("639a472177126764a5b03561"),
                ObjectId("639a472177126764a5b03562"),
                ObjectId("639a472177126764a5b03563"),
                ObjectId("639a472177126764a5b03564"),
                ObjectId("639a472177126764a5b03565"),
                ObjectId("639a472177126764a5b03566"),
                ObjectId("639a472177126764a5b03567")
        ]
}


db.products.find().pretty();

response:
{
        "_id" : ObjectId("639a3f1c77126764a5b03556"),
        "productId" : "MCO967705850",
        "title" : "Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10",
        "price" : 1999900,
        "stock" : 7,
        "thumbnail" : "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b03558"),
        "productId" : "MCO657791576",
        "title" : "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
        "price" : 3049900,
        "stock" : 1,
        "thumbnail" : "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b03559"),
        "productId" : "MCO879442053",
        "title" : "Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro",
        "price" : 95000,
        "stock" : 11,
        "thumbnail" : "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355a"),
        "productId" : "MCO964679805",
        "title" : "Disco SólproductIdo Ssd Interno Kingston Sa400s37/240g 240gb Negro",
        "price" : 103322,
        "stock" : 23,
        "thumbnail" : "http://http2.mlstatic.com/D_804287-MLA49587128302_042022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355b"),
        "productId" : "MCO936445457",
        "title" : "Laptop Hp 240 G7 Gris 14 , Intel Celeron N4020 8gb De Ram 1tb Hdd, Intel Uhd Graphics 600 1366x768px Windows 10 Home",
        "price" : 905900,
        "stock" : 6,
        "thumbnail" : "http://http2.mlstatic.com/D_679578-MLA49695293979_042022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355c"),
        "productId" : "MCO939489276",
        "title" : "Disco SólproductIdo Ssd Interno Kingston Sa400s37/480g 480gb Negro",
        "price" : 160000,
        "stock" : 3,
        "thumbnail" : "http://http2.mlstatic.com/D_751939-MLA46221843872_052021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355d"),
        "productId" : "MCO818960598",
        "title" : "Pc Computador Gamer Amd Ryzen 7 5700g Ssd 240 Hdd 1tb Ram 16",
        "price" : 3859900,
        "stock" : 1,
        "thumbnail" : "http://http2.mlstatic.com/D_862652-MCO47807316125_102021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355e"),
        "productId" : "MCO943311946",
        "title" : "Monitor Gamer Samsung F22t35 Led 22 Dark Blue Gray 100v/240v",
        "price" : 524739,
        "stock" : 3,
        "thumbnail" : "http://http2.mlstatic.com/D_796587-MLA46165231779_052021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355f"),
        "productId" : "9cdffcf8-8d9f-40a9-a6d0-2d63e037944d",
        "title" : "Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd",
        "price" : 2059900,
        "stock" : 25,
        "thumbnail" : "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg"
}


db.messages.find().pretty();

response:
{
        "_id" : ObjectId("639a407b77126764a5b03557"),
        "userId" : 1,
        "userName" : "Stiven",
        "message" : "Hola, Como están?"
}
{
        "_id" : ObjectId("639a472177126764a5b03560"),
        "userId" : 1,
        "userName" : "Stiven",
        "message" : "Como va todo?"
}
{
        "_id" : ObjectId("639a472177126764a5b03561"),
        "userId" : 2,
        "userName" : "Michell",
        "message" : "Hola Bebé, muy bien. ¿y tú?"
}
{
        "_id" : ObjectId("639a472177126764a5b03562"),
        "userId" : 1,
        "userName" : "Stiven",
        "message" : "Me alegra, yo muy bien gracias a Dios!"
}
{
        "_id" : ObjectId("639a472177126764a5b03563"),
        "userId" : 2,
        "userName" : "Michell",
        "message" : "gracias!!"
}
{
        "_id" : ObjectId("639a472177126764a5b03564"),
        "userId" : 3,
        "userName" : "Laura",
        "message" : "Que tal gente???"
}
{
        "_id" : ObjectId("639a472177126764a5b03565"),
        "userId" : 1,
        "userName" : "Stiven",
        "message" : "Hola Lau!"
}
{
        "_id" : ObjectId("639a472177126764a5b03566"),
        "userId" : 3,
        "userName" : "Laura",
        "message" : "Como vas?"
}
{
        "_id" : ObjectId("639a472177126764a5b03567"),
        "userId" : 2,
        "userName" : "Michell",
        "message" : "Muy bien nojoda!"
}


db.products.countDocuments();
9

db.messages.countDocuments();
9


db.products.insertOne({
    productId: "MCO967705850",
    title: "Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10",
    price: 1999900,
    stock: 7,
    thumbnail: "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg"
});


db.products.find( { price: { $lt: 700000 }}).pretty();

response:
{
        "_id" : ObjectId("639a449e77126764a5b03559"),
        "productId" : "MCO879442053",
        "title" : "Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro",
        "price" : 95000,
        "stock" : 11,
        "thumbnail" : "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355a"),
        "productId" : "MCO964679805",
        "title" : "Disco SólproductIdo Ssd Interno Kingston Sa400s37/240g 240gb Negro",
        "price" : 103322,
        "stock" : 23,
        "thumbnail" : "http://http2.mlstatic.com/D_804287-MLA49587128302_042022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355c"),
        "productId" : "MCO939489276",
        "title" : "Disco SólproductIdo Ssd Interno Kingston Sa400s37/480g 480gb Negro",
        "price" : 160000,
        "stock" : 3,
        "thumbnail" : "http://http2.mlstatic.com/D_751939-MLA46221843872_052021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355e"),
        "productId" : "MCO943311946",
        "title" : "Monitor Gamer Samsung F22t35 Led 22 Dark Blue Gray 100v/240v",
        "price" : 524739,
        "stock" : 3,
        "thumbnail" : "http://http2.mlstatic.com/D_796587-MLA46165231779_052021-F.jpg"
}

db.products.find( { price: { $gte: 400000,$lt:2000000 }}).pretty();

response:
{
        "_id" : ObjectId("639a3f1c77126764a5b03556"),
        "productId" : "MCO967705850",
        "title" : "Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10",
        "price" : 1999900,
        "stock" : 7,
        "thumbnail" : "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355b"),
        "productId" : "MCO936445457",
        "title" : "Laptop Hp 240 G7 Gris 14 , Intel Celeron N4020 8gb De Ram 1tb Hdd, Intel Uhd Graphics 600 1366x768px Windows 10 Home",
        "price" : 905900,
        "stock" : 6,
        "thumbnail" : "http://http2.mlstatic.com/D_679578-MLA49695293979_042022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355e"),
        "productId" : "MCO943311946",
        "title" : "Monitor Gamer Samsung F22t35 Led 22 Dark Blue Gray 100v/240v",
        "price" : 524739,
        "stock" : 3,
        "thumbnail" : "http://http2.mlstatic.com/D_796587-MLA46165231779_052021-F.jpg"
}

db.products.find( { price: { $gte: 700000}}).pretty();

response:
{
        "_id" : ObjectId("639a3f1c77126764a5b03556"),
        "productId" : "MCO967705850",
        "title" : "Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10",
        "price" : 1999900,
        "stock" : 7,
        "thumbnail" : "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b03558"),
        "productId" : "MCO657791576",
        "title" : "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
        "price" : 3049900,
        "stock" : 1,
        "thumbnail" : "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355b"),
        "productId" : "MCO936445457",
        "title" : "Laptop Hp 240 G7 Gris 14 , Intel Celeron N4020 8gb De Ram 1tb Hdd, Intel Uhd Graphics 600 1366x768px Windows 10 Home",
        "price" : 905900,
        "stock" : 6,
        "thumbnail" : "http://http2.mlstatic.com/D_679578-MLA49695293979_042022-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355d"),
        "productId" : "MCO818960598",
        "title" : "Pc Computador Gamer Amd Ryzen 7 5700g Ssd 240 Hdd 1tb Ram 16",
        "price" : 3859900,
        "stock" : 1,
        "thumbnail" : "http://http2.mlstatic.com/D_862652-MCO47807316125_102021-F.jpg"
}
{
        "_id" : ObjectId("639a449e77126764a5b0355f"),
        "productId" : "9cdffcf8-8d9f-40a9-a6d0-2d63e037944d",
        "title" : "Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd",
        "price" : 2059900,
        "stock" : 25,
        "thumbnail" : "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg"
}


db.products.updateMany( {},{ $set: { stock:100 }});

response:
{ "acknowledged" : true, "matchedCount" : 9, "modifiedCount" : 9 }


db.products.updateMany({price: {$gte:1400000}},{ $set: { stock:0 }});
response:
{ "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }

db.products.deleteMany({price: {$lt:300000}});
response:
{ "acknowledged" : true, "deletedCount" : 3 }