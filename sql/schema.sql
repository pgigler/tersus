DROP TABLE IF EXISTS order_log;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS partners;

CREATE TABLE partners(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20),
    name VARCHAR(100),
    UNIQUE KEY `u_code` (code)
);

CREATE TABLE products(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    partner_code VARCHAR(20),
    sku VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    category VARCHAR(100), -- KLOR
    brand VARCHAR(100),
    stock INT,
    weight DECIMAL(10,3), -- in KG
    INDEX partner_ind (partner_code),
    FOREIGN KEY (partner_code)
        REFERENCES partners(code)
        ON DELETE CASCADE
);

CREATE TABLE customers(
    email VARCHAR(250) NOT NULL,
    partner_code VARCHAR(20) NOT NULL,
    newsletter CHAR(1) NOT NULL, -- T, F
    company_name VARCHAR(250) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_ame VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    address VARCHAR(250) NOT NULL,
    country_code CHAR(3) NOT NULL, -- ISO
    city VARCHAR(250) NOT NULL,
    region VARCHAR(250),
    zip VARCHAR(10),
    INDEX partner_ind (partner_code),
    registration_date DATETIME,
    UNIQUE KEY `u_email_partner` (email, partner_code),
    FOREIGN KEY (partner_code)
        REFERENCES partners(code)
        ON DELETE CASCADE
);

CREATE TABLE orders(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    partner_code VARCHAR(20),
    customer_email VARCHAR(250),
    order_status CHAR(15) NOT NULL, -- OPEN, ARCHIVED, CANCELED
    shipment_status CHAR(15) NOT NULL, -- PENDING, SHIPPED, PART_SHIPPED
    payment_status CHAR(15) NOT NULL, -- PENDING, AUTHORIZED, PAID, VOIDED, REFUNDED, UNPAID, PART_PAID, PART_REFUND
    cod CHAR(1) NOT NULL, -- T, F
    chargeback_status CHAR(15) NOT NULL, -- EMTPY, OPEN, SUBMITTED, WON, LOST
    delivery_method CHAR(15), -- DIRECT, GLS, ...
    delivery_price DECIMAL(15,2) NOT NULL,
    delivery_currency VARCHAR(10) NOT NULL,
    note VARCHAR(1000),
    created_date DATETIME NOT NULL,
    creator VARCHAR(100) NOT NULL,
    updated_date DATETIME,
    updater VARCHAR(100),
    INDEX partner_customer_ind (partner_code, customer_email),
    FOREIGN KEY (partner_code, customer_email)
        REFERENCES customers(partner_code, email)
        ON DELETE CASCADE
) AUTO_INCREMENT = 11512;

CREATE TABLE order_items(
    order_id INT,
    position INT,
    sku VARCHAR(100) NOT NULL,
    price DECIMAL(15,2),
    currency VARCHAR(10),
    quantity INT,
    INDEX order_ind (order_id),
    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

CREATE TABLE order_log(
    timestamp TIMESTAMP NOT NULL,
    author VARCHAR(100) NOT NULL,
    type CHAR(100) NOT NULL, -- CREATED, ...
    body VARCHAR(10000),
    order_id INT,
    INDEX order_ind (order_id),
    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

