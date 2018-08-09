# bamazon
bamazon database
# Node.js & MySQL

## Overview

In this activity, i've created an Amazon-like storefront with the MySQL. The app take orders from customers and deplete stock from the store's inventory. The app has a customer and a manager module. 

💻 Technologies Used
- Node.js
- MySQL
- JavaScript
- Node Modules
- Inquirer

📀 Installation and Usage
use the script in the createdb.sql to create the database in MySQL Workbench and after that use insert.sql to create some example products in your database.

💥 Features

## Customer View 

- bamazonCustomer.js display the products available in the database and allow the user to choose on product to  purchase and the quantity desired.

- The app prompt users with two messages.

   * The first ask them the ID of the product they would like to buy.
   * The second message ask how many units of the product they would like to buy.

- Once the customer has placed the order, the application check if the store has enough of the product to meet the customer's request.

   * If not, the app log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

- if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
   * returns to the main menu for a new purchase

## Manager View 

* bamazonManager.js Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.

Screenshots:

- Create database and table

![Image of database](https://github.com/lamoliveira/bamazon/images/createdb.jpg)

- Insert sample rows 
![Image of database](https://github.com/lamoliveira/bamazon/images/insert.jpg)

- Don't forget to install node modules using git bash "npm install"

bamanager.js


    * View Products for Sale
    ![Image of products](https://github.com/lamoliveira/bamazon/images/cap1.jpg)

    * View Low Inventory
    ![Image of lowinventory](https://github.com/lamoliveira/bamazon/images/cap2.jpg)

    * Add to Inventory
    ![Image of addinventory](https://github.com/lamoliveira/bamazon/images/cap3.jpg)
    
    * Add New Product
    ![Image of newproduct](https://github.com/lamoliveira/bamazon/images/cap4.jpg)

bamanager.js

    * 3 sample Completed purchases
    ![Image of completedpurchase](https://github.com/lamoliveira/bamazon/images/cap6.jpg)

    * Sample Purchase cancelled due to lack of product stock
    ![Image of cancelled](https://github.com/lamoliveira/bamazon/images/cap7.jpg)

- - -



