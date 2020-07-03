DELETE FROM uat_products;
DELETE FROM uat_partners;
DELETE FROM uat_orders;
DELETE FROM uat_order_items;
DELETE FROM uat_order_log;

INSERT INTO uat_partners (code, name) VALUES ('TER', 'Tersus');

INSERT INTO uat_products (sku, title, price, currency, category, brand, stock, weight) VALUES ('st_klor_1', 'Stabil Klór', 5600, 'HUF', 'KLOR', 'Dinax', NULL, 12.4);
INSERT INTO uat_products (sku, title, price, currency, category, brand, stock, weight) VALUES ('al_sokk_p', 'Alga Sokk P', 2300, 'HUF', 'KLOR', 'Dinax', NULL, 5.4);

