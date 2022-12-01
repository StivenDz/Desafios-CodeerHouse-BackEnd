# DOCUMENTATION
#### URL : https://ecommerceapi-lz2u.onrender.com

```
GET /api/products
GET https://ecommerceapi-lz2u.onrender.com/api/products
```

## Example Response

### `status(200)`
```json
[
    {
        "id": 1,
        "productId": "MCO967705850",
        "title": "Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10",
        "price": 1999900,
        "stock": 7,
        "thumbnail": "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg"
    },
    {
        "id": 2,
        "productId": "MCO657791576",
        "title": "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
        "price": 3049900,
        "stock": 1,
        "thumbnail": "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg"
    },
    {
        "id": 3,
        "productId": "MCO879442053",
        "title": "Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro",
        "price": 95000,
        "stock": 11,
        "thumbnail": "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg"
    }
]
```

<br>
<br>
<br>

```
GET /api/products/:id
GET https://ecommerceapi-lz2u.onrender.com/api/products/
```

## Example Response

### `status(200)`
```json
{
    "id": 9,
    "productId": "9cdffcf8-8d9f-40a9-a6d0-2d63e037944d",
    "title": "Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd",
    "price": 2059900,
    "stock": 18,
    "thumbnail": "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg"
}
```
### `status(404)`
```json
{
    "error": "this id 9cdffcf8-8d9f-40a9-a6d0-2d63e037944d doesn't exist"
}
```



