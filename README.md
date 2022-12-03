# DOCUMENTATION
#### URL : `https://ecommerceapi-coder.up.railway.app`


| Methods | Route                                           | Description                                                       | Require API_KEY |
| :---    |     :---                                        | :---                                                              |  :---: |
| GET     | /api/products                                   | returns all products                                              |   NO   |
| GET     | /api/products/:productId                        | returns a product referenced by productId                         |   NO   |
| GET     | /api/shoppingCart/:cartId/products              | returns all the products of a cart referenced by the cart id      |   NO   |
| POST    | /api/products                                   | adds new product & returns the new product                        |   YES  |
| POST    | /api/shoppingCart                               | adds new cart                                                     |   NO   |
| POST    | /api/shoppingCart/:cartId/products/:productId   | adds a new product to a cart                                      |   NO   |
| PUT     | /api/products/:productId                        | updates a product referenced by product id                        |   YES  |
| DELETE  | /api/products/:productId                        | removes a product referenced by product id                        |   YES  |
| DELETE  | /api/shoppingCart/:cartId                       | cleans a cart referenced by cart id                               |   NO   |
| DELETE  | /api/shoppingCart/:cartId/products/:productId   | removes a product of a cart referenced by product id & cart id    |   NO   |

## Methods like (POST,PUT,DELETE) in route = /api/products require API_KEY

# GET

```
GET /api/products
GET https://ecommerceapi-coder.up.railway.app/api/products
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
        "thumbnail": "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg",
        "created_At": "01/12/2022 22:36:56"
    },
    {
        "id": 2,
        "productId": "MCO657791576",
        "title": "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
        "price": 3049900,
        "stock": 1,
        "thumbnail": "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg",
        "created_At": "01/12/2022 22:36:56"
    },
    {
        "id": 3,
        "productId": "MCO879442053",
        "title": "Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro",
        "price": 95000,
        "stock": 11,
        "thumbnail": "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg",
        "created_At": "01/12/2022 22:36:56"
    }
]
```

<br>
<br>

# GET

```
GET /api/products/:id
GET https://ecommerceapi-coder.up.railway.app/api/products/9cdffcf8-8d9f-40a9-a6d0-2d63e037944d
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
    "thumbnail": "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg",
    "created_At": "01/12/2022 22:36:56"
}
```
### `status(404)`
```json
{
    "error": "this id 9cdffcf8-8d9f-40a9-a6d0-2d63e037944d doesn't exist"
}
```
# GET

```
GET /api/shoppingCart/:cartId/products
GET https://ecommerceapi-coder.up.railway.app/api/shoppingCart/12345678910/products
```

## Example Response

### `status(200)`
```json
{
    "id": 2,
    "cartId": "12345678910",
    "created_At": "01/12/2022 22:36:56",
    "products": [
        {
            "id": 1,
            "productId": "MCO967705850",
            "title": "Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10",
            "price": 1999900,
            "stock": 7,
            "thumbnail": "http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg",
            "created_At": "01/12/2022 22:36:56"
        },
        {
            "id": 2,
            "productId": "MCO657791576",
            "title": "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc",
            "price": 3049900,
            "stock": 1,
            "thumbnail": "http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg",
            "created_At": "01/12/2022 22:36:56"
        },
        {
            "id": 3,
            "productId": "MCO879442053",
            "title": "Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro",
            "price": 95000,
            "stock": 11,
            "thumbnail": "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg",
            "created_At": "01/12/2022 22:36:56"
        }
    ]
}
```
### `status(404)`
```json
{
    "error": "This cartId = 12345678910 doesn't exist"
}
```

<br>

# POST

```
POST /api/products
POST https://ecommerceapi-coder.up.railway.app/api/products
```

```js
headers:{
    "api_key": "*********************"
},
body:{
    "title": "test",
    "price": 95000,
    "stock": 18,
    "thumbnail": "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg"
}
```

## Example Response

### `status(201)`
```json
{
    "status": "successfully",
    "productAdded": {
        "title": "test",
        "price": 95000,
        "stock": 18,
        "thumbnail": "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg",
        "id": 10,
        "productId": "7746887c-80c9-48bf-ab5a-7f785612ee3b",
        "created_At": "01/12/2022 22:36:56"
    }
}
```
### `status(406)`
```json
{
    "error": "missing properties"
}
```
<br>
<br>

# PUT

```
PUT /api/products:id
PUT https://ecommerceapi-coder.up.railway.app/api/products/9cdffcf8-8d9f-40a9-a6d0-2d63e037944d
```

```js
headers:{
    "api_key": "*********************"
},
body:{
    "title": "Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd",
    "price": 2059900,
    "stock": 50,
    "thumbnail": "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg"
}
```

## Example Response

### `status(201)`
```json
{
    "status": "successfully",
    "oldProduct": {
        "id": 9,
        "productId": "9cdffcf8-8d9f-40a9-a6d0-2d63e037944d",
        "title": "Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd",
        "price": 2059900,
        "stock": 18,
        "thumbnail": "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg",
        "created_At": "01/12/2022 22:36:56"
    },
    "productUpdated": {
        "title": "Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd",
        "price": 2059900,
        "stock": 50,
        "thumbnail": "https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg",
        "id": 9,
        "productId": "9cdffcf8-8d9f-40a9-a6d0-2d63e037944d",
        "created_At": "01/12/2022 22:36:56"
    }
}
```
### `status(404)`
```json
{
    "error": "this id 9cdffcf8-8d9f-40a9-a6d0-2d63e037944d doesn't exist"
}
```

### `status(406)`
```json
{
    "error": "missing properties"
}
```

<br>
<br>

# DELETE

```
DELETE /api/products:id
DELETE https://ecommerceapi-coder.up.railway.app/api/products/7746887c-80c9-48bf-ab5a-7f785612ee3b
```

```js
headers:{
    "api_key": "*********************"
}
```

## Example Response

### `status(201)`
```json
{
    "status": "successfully",
    "message": "product whit id = 7746887c-80c9-48bf-ab5a-7f785612ee3b deleted",
    "productDeleted": {
        "title": "test",
        "price": 95000,
        "stock": 18,
        "thumbnail": "http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg",
        "id": 10,
        "productId": "7746887c-80c9-48bf-ab5a-7f785612ee3b",
        "created_At": "01/12/2022 22:36:56"
    }
}
```
### `status(404)`
```json
{
    "error": "this id 7746887c-80c9-48bf-ab5a-7f785612ee3b doesn't exist"
}
```







