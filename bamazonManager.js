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

function format(strtoformat, qtychar) {
    var id = " " + strtoformat;
    id = " ".repeat(qtychar - id.trimLeft.length);
    id = strtoformat + id;
    id = id.substring(0, qtychar);
    //console.log(id);
    return id;
}
function viewproducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        var productstring = "||ID   ||Product             ||Department||Price     ||Qtty ||";
        productstring += "\r\n" + "=".repeat(62);
        for (var i = 0; i < res.length; i++) {
            productstring += "\r\n" + "||" + format(res[i].item_id, 5) + "||" + format(res[i].product_name, 20) +
                "||" + format(res[i].department_name, 10) +
                "||" + format(res[i].price, 10) +
                "||" + format(res[i].stock_quantity, 5) + "||";
        }
        console.log("=".repeat(62));
        console.log(productstring);
        console.log("=".repeat(62));
        start();
    });
}

function viewlowinventory() {
    var query = "SELECT * FROM products where stock_quantity <5";
    connection.query(query, function (err, res) {
        var productstring = "||ID   ||Product             ||Department||Price     ||Qtty ||";
        productstring += "\r\n" + "=".repeat(62);
        for (var i = 0; i < res.length; i++) {
            productstring += "\r\n" + "||" + format(res[i].item_id, 5) + "||" + format(res[i].product_name, 20) +
                "||" + format(res[i].department_name, 10) +
                "||" + format(res[i].price, 10) +
                "||" + format(res[i].stock_quantity, 5) + "||";
        }
        console.log("=".repeat(62));
        console.log(productstring);
        console.log("=".repeat(62));
        start();
    });
}

function addinventory() {
    console.log("3");


    // query for all items
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //Display available items
        // prompt user to choose what to add     
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
                    message: "Select one product to add more stock?"
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
                    // console.log("for: "+ i);
                    //console.log("prod" + results[i].product_name );
                    if (results[i].product_name === answer.selected) {
                        itemSelected = results[i];
                    }
                }
                //itemSelected = results[answer.selected];
                //console.log("prod selected: " + itemSelected.product_name );
                //console.log(itemSelected);

                // Increase stock_quantity by amount desired, show message to user and start again
                var updatedQuantity = itemSelected.stock_quantity + parseInt(answer.quantity);
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
                        console.log("Add to inventory completed!");
                        start();
                    }
                );

            });

    });

}

function addproduct() {
    console.log("4");

    inquirer.prompt([

        {
            type: "input",
            name: "productName",
            message: "What is the product name?"
        },

        {
            type: "input",
            name: "departamentName",
            message: "What is the department name?"
        },

        {
            type: "input",
            name: "price",
            message: "What is the product price?"
        },

        {
            type: "input",
            name: "stockQuantity",
            message: "What is the product quantity?"
        },
        {
            type: "confirm",
            name: "canInsert",
            message: "Confirm new product?"
        }

    ]).then(function (prod) {


        // console.log(prod);
        //console.log(prod.canInsert);
        //console.log(prod.productName);
        
        
        if (prod.canInsert) {
            connection.query(
                "insert into products  SET ? ",
                {
                    product_name: prod.productName,
                    department_name: prod.departamentName,
                    price: prod.price,
                    stock_quantity: prod.stockQuantity
                }
                ,
                function (error) {
                    //console.log(error);
                    if (error) throw err;
                    console.log("Add product completed!");
                    start();
                }

            );
        }
        else {
            console.log("Add product canceled!");
            start();
        }

    });


}
function start() {

    inquirer
        .prompt(
            {
                name: "selected",
                type: "rawlist",
                choices: ["View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"],
                message: "Select one option"
            }
        )
        .then(function (answer) {
            // console.log(answer.selected);

            // When we visit different urls, read and respond with different files
            switch (answer.selected) {

                case "View Products for Sale":
                    viewproducts();
                    break;
                case "View Low Inventory":
                    viewlowinventory();
                    break;
                case "Add to Inventory":
                    addinventory();
                    break;
                case "Add New Product":
                    addproduct();
                    break;
            }


        });
}