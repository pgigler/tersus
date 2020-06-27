DELETE FROM products;
DELETE FROM partners;
DELETE FROM orders;
DELETE FROM order_items;
DELETE FROM order_log;

INSERT INTO partners (code, name) VALUES ('TER', 'Tersus');

INSERT INTO products (sku, title, price, currency, category, brand, stock, weight) VALUES ('st_klor_1', 'Stabil Klór', 5600, 'HUF', 'KLOR', 'Dinax', NULL, 12.4);
INSERT INTO products (sku, title, price, currency, category, brand, stock, weight) VALUES ('al_sokk_p', 'Alga Sokk P', 2300, 'HUF', 'KLOR', 'Dinax', NULL, 5.4);

