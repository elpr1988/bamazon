# bamazon

Running `bamazonCustomer.js` application will first display all of the items available for sale. 

The products table has each of the following columns:
   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

The app prompts users with two messages.
   * The first asks the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.
   * If not, the app logs a phrase like `Not enough in stock, cannot place order.`, and then prevents the order from going through.

However, if the store _does_ have enough of the product, it fulfills the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

Running `bamazonManager.js` will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product
    
    * Exit

  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than 10.

  * If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, the app allows the manager to add a completely new product to the store. Filling out the appropriate prompts.

- - -

Images:
https://drive.google.com/drive/folders/0B98-NExwmlx6bjd6Z3Zab3JOZnc?usp=sharing
