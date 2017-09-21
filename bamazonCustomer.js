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

function validate(input) {
	var integer = Number.isInteger(parseFloat(input));
	var sign = Math.sign(input);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return "Please enter a whole non-zero number.";
	}
}
// should print out the table of products
// (item_id, product_name, product_sales(items sold*price), department_name,
// price, and stock_quantity)
// still needs to be formatted
function queryProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
  	if (err) throw err;
	  	console.log("Take a look at our products!");
	  	console.log("..............................\n");
	  res.forEach(function(data) {
	  	console.table([data]);
	  });
	  promptUser();
  }); 
}
// // and ask user what would they like to purchase and the user inputs ID. 
function promptUser() {
	inquirer.prompt([
		{
			name: "item",
			type: "input",
			message: "What item ID would you like to purchase?", 
			validate: validate,
			filter: Number
		},
		{
			name: "quantity",
			type: "input",
			message: "How many would you like to purchase?",
			validate: validate,
			filter: Number
		}
	]).then(function(ans) {
		var item = ans.item;
		var quantity = ans.quantity;
		connection.query("SELECT * FROM products WHERE ?", {item_id: item}, 
			function(err, data) {
			if (err) throw err;
			if (data.length === 0) {
				console.log("ERROR: Invalid item ID. Enter a valid item ID.");
				queryProducts();
			} else {
				var itemData = data[0];
				if (quantity <= itemData.stock_quantity) {
					console.log("Product is in stock and your order is on its way!");
					var update = "UPDATE products SET stock_quantity = " + 
					(itemData.stock_quantity - quantity) + "WHERE item_id = " + item;
					connection.query(update, function(err, data) {
						if (err) throw err;
						console.log("Order placed. Total is: $" + itemData.price * quantity);
						connection.end();
					});
				} else {
					console.log("Not enough in stock, cannot place order.");
					queryProducts();
				}
			}
		});
	});
}
// if the client wants to buy more than available prompt insufficient quatity
 // else they can and the table re-prints and updates
queryProducts();
