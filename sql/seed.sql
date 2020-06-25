DROP TABLE orders;

CREATE TABLE orders(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(100) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    order_status CHAR(1) NOT NULL,
    created_date DATETIME NOT NULL,
    creator VARCHAR(100) NOT NULL,
    updated_date DATETIME,
    updater VARCHAR(100)
) AUTO_INCREMENT = 11512

INSERT INTO orders (sku, product_name, order_status, created_date, creator) VALUES ('p123', 'klor', 'P', '2020-06-26 11:22:00', 'bela');
