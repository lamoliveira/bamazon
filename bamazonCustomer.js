var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "bamazon"
});
// connect to mysql server/database
connection.connect(function (err) {
    if (err) throw err;
    // run start after connection made and prompt user
    start();
});
var itemSelected;

function start() {
    // query for all items
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //Display available items
        // prompt user to choose what to buy     
        inquirer
            .prompt([
                {
                    name: "selected",
                    type: "rawlist",
                    choices: function () {
                        var productsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            productsArray.push(results[i].product_name);
                        }
                        return productsArray;
                    },
                    message: "Select one product to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Type quantity desired?"
                }
            ])
            .then(function (answer) {
                // define item selected
                //console.log(results);
                //console.log("selected: "+answer.selected);
                
                for (var i = 0; i < results.length; i++) {
                    console.log("for: "+ i);
                    console.log("prod" + results[i].product_name );
                    if (results[i].product_name === answer.selected) {
                        itemSelected = results[i];
                    }
                }
                //itemSelected = results[answer.selected];
                //console.log("prod selected: " + itemSelected.product_name );
                //console.log(itemSelected);
                
                // check availability 
                if (itemSelected.stock_quantity >= parseInt(answer.quantity)) {
                    // Decrease stock_quantity by amount desired, show message to user and start again
                    var updatedQuantity = itemSelected.stock_quantity - parseInt(answer.quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: updatedQuantity
                            },
                            {
                                item_id: itemSelected.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Purchase completed!");
                            var orderTotal = itemSelected.price * parseInt(answer.quantity);
                            console.log("the total cost of your purchase is: $" + orderTotal.toFixed(2) + ".");
                            start();
                        }
                    );
                }
                else {
                    // Quantity not availble, start over
                    console.log("Insufficient quantity! Try again");
                    console.log(itemSelected.product_name + ", availability is: " + itemSelected.stock_quantity);
                    start();
                }

            });

    });
}