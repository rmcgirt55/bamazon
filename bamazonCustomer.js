var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTableNPM = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root", //insert user password
    database: "customer_db"
});

connection.connect(function(error){
    if (error) throw error;

    console.log("\n**************************"
        + "\nWork Harder. Have more Fun. Make things historic! Welcome to Bamazon!\n"
        +
        "**************************\n");
welcome();
});

function welcome() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            choices: ["Browse items", "Exit the app"],
            message: "choice one of the choices"
        }
    ]).then(function(action) {
        if (action.action === "Browse items") {
            BrowseItems();
        } else if (action.action === "Exit the app") {
            Exit();
        }
    });
}

function BrowseItems() {
    var query = "SELECT * FROM products";
    connection.query(query, function(error, results){
        if (error) throw error;
consoleTable(results);
inquirer.prompt([
    {
        name: "id",
        message: "Please tell us the Id of the item you would like to buy.",
        validate: function(value) {
            if(isNaN(value) == false && parseInt(value) <= results.length && parseInt(value) > 0){
                return true;
            } else {
                return false;
            }
        }
    },
    {
        name: "quantity",
        message: "HOw many do you want?",
        validate: function(value) {
            if (value > 0 && isNaN(value) === false) {
                return true;
            }
            return false;
        }
        }
]).then(function(transaction) {
    var itemquantity;
    var itemPrice;
    var itemName;
    var productSales;

    for (var j = 0; j < results.length; j++) {
        if (parseInt(transaction.id) === results[j].item_id) {
            itemquantity = results[j].stock_quantity;
            itemPrice = results[j].price;
            itemName = results[j].product_name;
            productSales = results[j].product_sales;
        }
    }
if (parseInt(transaction.qty) > itemquantity) {
    console.log("\nWE do not have that many. We only have " + itemquantity + " in stock.\n");
    welcome();
}

else if (parseInt(transaction.quantity) <= itemquantity) {
    console.log("\nOrder complete " + transaction.quantity + " of " + itemName + ".");
    lowerQuanity(transaction.id, transaction.quantity, itemquantity, itemPrice);
    salesRevenue(transaction.id, transaction.quantity,productSales, itemPrice);
}
});
    });
}

function consoleTable(results) {
    var values = [];
    for(var i = 0; i < results.length; i++)
 {
     var resultObject = {
         ID: results[i].item_id,
         Item: results[i].product_name,
         Price: "$" + results[i].price
     };
     values.push(resultObject);
 }
 console.table("\nItems for sale", values);
}

function lowerQuanity(item, purchasequantity, stockQTY, price) {
    connection.query(
        ".",
        [
            {
                stock_quantity: stock_quantity - parseInt(purchasequantity)
            },
            {
                iten_id: parseInt(item)
            }
        ],
        function(error, response) {
            if (error) throw error;
        });
    }

    function salesRevenue(item, purchasequantity, productSales, price) { var customerCost = parseInt(purchasequantity) * price;
    connection.query(
        ".",
        [ 
            {
                produc_sales: productSales + customerCost
            },
            {
                item_id: parseInt(item)
            }
        ],
    function(error, response) { 
        if (error) throw error;
        console.log("Price is $" + customerCost.toFixed(2));
        welcome();
    });
}
function exit() {
    console.log("\nnow exiting Bamazon");
    connection.end();
}
