// Immediately gets prompted "what would you like to do?" choices are:
// View Products for Sale-- prints the customer table 
// View Low Inventory-- prints table with items below a certain amount
// Add to Inventory-- prints entire table and asks "what us the ID of the item you would like to add to"
// 	---> "How many would you like to add?" ---> "Successfully addedd stock_quantity of product_name"
// 	reprints table and reprompts
// Add New Product
// Quit-- exits the file "Goodbye!"

//gets reprompted with the same question and choices
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
			message: "Please select an option: ",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
			filter: function (val) {
				if (val === "View Products for Sale") {
					return "sale";
				} else if (val === "View Low Inventory") {
					return "lowInventory";
				} else if (val === "Add to Inventory") {
					return "addInventory";
				} else if (val === "Add New Product") {
					return "newProduct";
				} else {
					// This case should be unreachable
					console.log("ERROR: Unsupported operation!");
					exit(1);
				}
			}
		}
	]).then
}