//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");

//setup express
var app = express();
var PORT = process.env.PORT || 3000;

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./app/public"))
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


//listener
app.listen(PORT, function() {
    console.log("Server listening on port: " + PORT + "\nAnd heres to hoping nothing goes wrong, eh?")
})