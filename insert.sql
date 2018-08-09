use bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('product 1', 'dept 1', 10, 5), ('product 2', 'dept 1', 6, 2), ('product 3', 'dept 2', 12.2, 3),
('product 4', 'dept 2', 4.2, 2), ('product 5', 'dept 2', 7.2, 1), ('product 6', 'dept 3', 1.2, 0), 
('product 7', 'dept 3', 17.1, 2), ('product 8', 'dept 4', 14.2, 2), ('product 9', 'dept 4', 2.2, 3),
('product 10', 'dept 4', 12.2, 3);

select * from products;