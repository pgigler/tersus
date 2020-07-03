DELETE FROM prod_products;
DELETE FROM prod_partners;
DELETE FROM prod_orders;
DELETE FROM prod_order_items;
DELETE FROM prod_order_log;

INSERT INTO prod_partners (code, name) VALUES ('TER', 'Tersus');

INSERT INTO prod_products (sku, title, price, currency, category, brand, stock, weight) VALUES ('st_klor_1', 'Stabil Klór', 1000, 'HUF', 'KLOR', 'Dinax', NULL, 12.4);
INSERT INTO prod_products (sku, title, price, currency, category, brand, stock, weight) VALUES ('al_sokk_p', 'Alga Sokk P', 1000, 'HUF', 'KLOR', 'Dinax', NULL, 5.4);

