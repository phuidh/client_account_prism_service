var express = require('express');

var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

var pg = require('pg');

var path = require('path');
//var connectionString = require(path.join(__dirname, '../', '../', 'config'));



router.get('/client_account', function(req, res) {

    res.render('account_name', { title: 'Client Accounts' });
    var results = [];

    // Get a Postgres client from the connection pool
	var connectionString = 'postgres://todo:letmein@localhost:5432/todo';

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }


	console.log("");
	console.log("*******");
	console.log("Connection successful");
	console.log("Creating query");
	console.log("*******");
 	console.log("");

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM client_account ORDER BY id ASC;");

 	console.log("");
	console.log("*******");
	console.log("Pushing Query");
	console.log("*******");
 	console.log("");

       // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

 	console.log("");
	console.log("*******");
	console.log("Pushing Completed");
	console.log("*******");
 	console.log("");

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

 	console.log("");
	console.log("*******");
	console.log("Returning Data");
	console.log("*******");
 	console.log("");


    });

});