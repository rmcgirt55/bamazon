    DROP DATABASE IF EXISTS bamazon_db;
    CREATE DATABASE customer_db;

    Use customer_db;

    CREATE TABLE products (
        item_id INT AUTO_INCREMENT NOT NULL,
        Product_name VARCHAR(100) NULL,
        department_name VARCHAR(100) NULL,
        price DECIMAL(10,2) NULL,
        stock_quality INT NULL,
        product_sales DECEMAL(10,2) DEFAULT 0,
        PRIMARY KEY (item_id)

    );

    Insert INTO products (product_name, department_name, price, stock_quality, product_sales)
    Values ("Prince's Purple Rain - Vinyl", "Music", 25.99, 100, 4000), ("The Breakfeast Club", "Movies", 19.99, 5, 10),
    ("Boosted Board", "Toys", 15000, 56, 500), ("fidget spinner", "Toys", 9.99, 20, 100),
    ("Quip", "Toiletries", 25, 45, 2000), ("20g CO2 Tank", "Hobby", 35.99, 5, 15), ("Hammer", "Tools", 5.99, 34, 345),
    ("Xbox One", "Electronics", 299.99, 34, 456), ("Slavin Jersey", "Sports Appearel", 199.99, 5, 100),
    ("PS4", "Electronics", 299.99, 34, 456);

    CREATE TABLE departments (
        department_id INT AUTO_INCREMENT NOT NULL,
        department_name VARCHAR(100) NULL,
        OVER_head_costs DECIMAL(10,2) NULL,
        PRIMARY KEY (department_id)
    );

INSERT INTO departments (department_name, over_head_costs)
Values ("Music", 1000), ("Movies", 200), ("Toys", 1000), ("Toiletries", 5000), ("Tools", 1000), ("Sports Appearel", 5000), ("Electronics", 3000);

SELECT * FROM products;
SELECT * FROM departments;

SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales,
SUM(product_sales) - over_head_costs AS total_profit
FROM departments
INNER JOIN products
ON departments.department_name = products.department_name
GROUP BY department_id;

