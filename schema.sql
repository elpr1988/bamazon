DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("PACMAN", "Video Games", 59.95, 200),
("Mario Kart", "Video Games", 49.99, 200),
("Frozen Corn", "Food and Drink", 5.50, 50),
("Head Scarf", "Apparel", 15.00, 5),
("Skinny Jeans", "Apparel", 54.25, 35),
("Toilet Paper", "Necessities", 22.40, 42),
("Guardians of the Galaxy", "Films", 15.00, 25),
("Avatar", "Films", 25.50, 57),
("Cranium", "Board Games", 19.95, 35),
("Taboo", "Board Games", 21.95, 23);

CREATE TABLE departments (
department_id INT(10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(45) NOT NULL,
over_head_costs DECIMAL(10,2) NOT NULL,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES("Video Games", 200),
	("Food and Drink", 100),
	("Apparel", 50),
	("Necessities", 300),
	("Films", 35),
	("Board Games", 0);