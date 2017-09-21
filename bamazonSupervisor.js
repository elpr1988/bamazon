var mysql= require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon"
});
// States "connection successful!" and prints customer table and prompts "what would you like to do?" choices:
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connection successful!");
  allProducts();
});

function allProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
  	if (err) throw err;
	  	console.log("Take a look at our products!");
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
	  promptSupervisor();
  }) 
}

function promptSupervisor() {
	inquirer.prompt([
		{
			type: "list",
			name: "option",
			message: "What would you like to do?",
			choices: ["View Product Sales by Department", "Create New Department", "Exit"]
		}
	]).then(function(ans) {
		switch (ans.option) {
			case "View Product Sales by Department":
				viewByDept();
				break;
			case "Create New Department":
				newDept();
				break;
			case "Exit":
				console.log("Goodbye");
				connection.end();
		}
	})
}
// View Product Sales by Department-- prints Department table and joins 
// the product_sales and total_profit = (product_sales - over_head_costs)
// 	reprompts the start question and choices
function viewByDept() {
	connection.query("SELECT * FROM departments", function(err, res) {
  	if (err) throw err;
	  	console.log("These are our product sales.");
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
	  promptUser();
  }) 
}

// Create New Department-- "What is the name of the department?" 
// 	---> "What is the overhead cost of the department?"
// 	---> "ADDED DEPARTMENT!" and reprints customer table