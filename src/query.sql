-- CREATE TABLE products(
--     id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     productId VARCHAR (60) NOT NULL,
--     title VARCHAR (255) NOT NULL,
--     price INTEGER NOT NULL,
--     stock INTEGER NOT NULL,
--     thumbnail VARCHAR(255) NOT NULL,
--     created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- )
-- CREATE TABLE messages (
--     id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     userName VARCHAR(60) NOT NULL,
--     message TEXT NOT NULL,
--     created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- )



    INSERT INTO products
        (productId,title,price,stock,thumbnail)
    VALUES
        (
            'MCO967705850',
            'Laptop Asus M515da Gris 15.6 , Amd Ryzen 5 3500u  16gb De Ram 1tb Hdd 256gb Ssd, Amd Radeon Rx Vega 8 (ryzen 2000/3000) 1920x1080px Windows 10',
            1999900,
            7,
            'http://http2.mlstatic.com/D_894333-MLA51165023913_082022-F.jpg'
    ),
        (
            'MCO657791576',
            'Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 16gb Pc',
            3049900,
            1,
            'http://http2.mlstatic.com/D_661268-MCO47189663977_082021-F.jpg'
    ),
        (
            'MCO879442053',
            'Kit De Teclado Y Mouse Inalámbrico Logitech Mk235 Español De Color Negro',
            95000,
            11,
            'http://http2.mlstatic.com/D_961801-MLA48377493379_112021-F.jpg'
    ),
        (
            'MCO964679805',
            'Disco SólproductIdo Ssd Interno Kingston Sa400s37/240g 240gb Negro',
            103322,
            23,
            'http://http2.mlstatic.com/D_804287-MLA49587128302_042022-F.jpg'
    ),
        (
            'MCO936445457',
            'Laptop Hp 240 G7 Gris 14 , Intel Celeron N4020  8gb De Ram 1tb Hdd, Intel Uhd Graphics 600 1366x768px Windows 10 Home',
            905900,
            6,
            'http://http2.mlstatic.com/D_679578-MLA49695293979_042022-F.jpg'
    ),
        (
            'MCO939489276',
            'Disco SólproductIdo Ssd Interno Kingston Sa400s37/480g 480gb Negro',
            160000,
            3,
            'http://http2.mlstatic.com/D_751939-MLA46221843872_052021-F.jpg'
    ),
        (
            'MCO818960598',
            'Pc Computador Gamer Amd Ryzen 7 5700g Ssd 240 Hdd 1tb Ram 16',
            3859900,
            1,
            'http://http2.mlstatic.com/D_862652-MCO47807316125_102021-F.jpg'
    ),
        (
            'MCO943311946',
            'Monitor Gamer Samsung F22t35 Led 22   Dark Blue Gray 100v/240v',
            524739,
            3,
            'http://http2.mlstatic.com/D_796587-MLA46165231779_052021-F.jpg'
    ),
        (
            '9cdffcf8-8d9f-40a9-a6d0-2d63e037944d',
            'Laptop Dell Inspiron 3505 Gris 15.6 , Amd Ryzen 5 3450u 16gb De Ram 1tb Hdd 256gb Ssd',
            2059900,
            18,
            'https://http2.mlstatic.com/D_921052-MLA47215256520_082021-O.jpg')