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

function format (strtoformat, qtychar){
    var id= " "+strtoformat;
    id = " ".repeat(qtychar - id.trimLeft.length); 
    id = strtoformat + id;
    id = id.substring(0,qtychar);
    //console.log(id);
return id;
}
function viewproducts() {
    var query = "SELECT * FROM products";  
    connection.query(query, function (err, res) {
        var productstring =  "||ID   ||Product             ||Department||Price     ||Qtty ||";
        productstring += "\r\n" + "=".repeat(62); 
        for (var i = 0; i < res.length; i++) {
            productstring +=  "\r\n" +"||"+format(res[i].item_id,5) + "||" + format(res[i].product_name,20) +
                "||" + format(res[i].department_name,10) +
                "||" + format(res[i].price,10) +
                "||" + format(res[i].stock_quantity,5) +"||";
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
        var productstring =  "||ID   ||Product             ||Department||Price     ||Qtty ||";
        productstring += "\r\n" + "=".repeat(62); 
        for (var i = 0; i < res.length; i++) {
            productstring +=  "\r\n" +"||"+format(res[i].item_id,5) + "||" + format(res[i].product_name,20) +
                "||" + format(res[i].department_name,10) +
                "||" + format(res[i].price,10) +
                "||" + format(res[i].stock_quantity,5) +"||";
        }
        console.log("=".repeat(62));
        console.log(productstring);
        console.log("=".repeat(62));
        start();
    });
}

function addinventory() {
    console.log("3");
    start();
}

function addproduct() {
    console.log("4");
    start();
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