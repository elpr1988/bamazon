require("console.table");
var mysql= require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon"
});

function promptManager() {
	inquirer.prompt([
		{
			type: "list",
			name: "option",
			message: "What would you like to do?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
		}
	]).then(function(ans) {
		switch (ans.option) {
			case "View Products for Sale":
				allProducts();
				break;
			case "View Low Inventory":
				lowProducts();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addProduct();
				break;
			case "Exit":
				console.log("Goodbye");
				connection.end();
		}
	})
}

function allProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
  	if (err) throw err;
	  	console.log("These are the products in stock");
	  	console.log("..............................\n");
	  	var theGoods = " ";
	  for(var i = 0; i < res.length; i++) {
	  	theGoods = " ";
	  	theGoods += "Item ID: " + res[i].item_id + " || ";
	  	theGoods += "Product Name: " + res[i].product_name + " || ";
	  	theGoods += "Quantity: " + res[i].stock_quantity + " || ";
	  	theGoods += "Department: " + res[i].department_name + " || ";
	  	theGoods += "Price: " + res[i].price + "\n";

	  	console.log(theGoods);
	  }
	  promptManager();
  }) 
}

function lowProducts() {
	  connection.query("SELECT * FROM products WHERE stock_quantity < 10", function(err, res) {
  	if (err) throw err;
  	if (res.length === 0) {
  		console.log("All products are fully stocked");
  	} else {
	  	console.log("These are the products low in stock");
	  	console.log("..............................\n");
	  	var theGoods = " ";
		  for(var i = 0; i < res.length; i++) {
		  	theGoods = " ";
		  	theGoods += "Item ID: " + res[i].item_id + " || ";
		  	theGoods += "Product Name: " + res[i].product_name + " || ";
		  	theGoods += "Quantity: " + res[i].stock_quantity + " || ";
		  	theGoods += "Department: " + res[i].department_name + " || ";
		  	theGoods += "Price: " + res[i].price + "\n";
	  		console.log(theGoods);
	  	}
  	}
	  promptManager();
  }) 
}

function validate(input) {
	var integer = Number.isInteger(parseFloat(input));
	var sign = Math.sign(input);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

function validateUnit(price) {
	var number = (typeof parseFloat(price)) === 'number';
	var positive = parseFloat(price) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive number for the unit price.'
	}
}

function addInventory() {
	inquirer.prompt([
		{
			name: "item",
			type: "input",
			message: "Which item ID would you like to re-stock?", 
			validate: validate,
			filter: Number
		},
		{
			name: "quantity",
			type: "input",
			message: "How many would you like to add?",
			validate: validate,
			filter: Number
		}
	]).then(function(ans) {
		var item = ans.item;
		var quantity = ans.quantity;
		connection.query("SELECT * FROM products WHERE ?", {item_id: item},	function(err, data) {
			if (err) throw err;
			if (data.length === 0) {
				console.log("ERROR: Invalid item ID. Enter a valid item ID.");
				addInventory();
			} else {
				var itemData = data[0];
				console.log("Updating Inventory...");
				connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [quantity, item], function(err, data) {
					if (err) throw err;
					console.log("Stock quantity for item ID:" + item + "has been updated!");
					allProducts();
					connection.end();
				})
			}
		})
	})
}

function addProduct() {
	inquirer.prompt([
		{
			name: "product",
			type: "input",
			message: "What new product would you like to add?", 
		},
		{
			name: "department",
			type: "input",
			message: "Which department does the product belong to?", 
		},
		{
			name: "price",
			type: "input",
			message: "What is the price per unit?",
			validate: validateUnit,
		},
		{
			name: "quantity",
			type: "input",
			message: "How many would you like to stock?",
			validate: validate
		}
	]).then(function(ans) {
		console.log("Adding New Product...\n");
		connection.query("INSERT INTO products SET ?", 
		{
      product_name: ans.product,
      department_name: ans.department,
      price: ans.price,
      stock_quantity: ans.quantity
  	}, function(err, res) {
			if (err) throw err;
			console.log(res.product_name + " has been added to the invetory.\n");
			allProducts();
		})
	})
}

promptManager();