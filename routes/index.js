// Ensure we reference the desired packages
var express = require('express');

var router = express.Router();
var pg = require('pg');
var path = require('path');
module.exports = router;


var prevResults = [];
	var results = [];


//The home directory call references index.html
router.get('/', function(req, res, next) {
 res.sendFile(path.join(__dirname, '../views', 'index.html')); 
});



//Ensure that we can connect to the database with the desired username/password
var connectionString = process.env.DATABASE_URL || 'postgres://todo:letmein@localhost:5432/todo';



//Build the /client_account package which returns a JSON list of client_accounts or an error message
router.get('/client_account', function(req, res) {


	//Initialise the variables
	var dbSuccess = "TRUE";

	// Attempt to connect to the referenced database
	pg.connect(connectionString, function(err, client, done) {

        	// Check whether a connection is made
        	if(err) {

			// If something goes wrong with the connection then it'll print the last list it compiled
			prevResults.push({"account_name":"ERROR - database connection failure"});				
			return res.json(prevResults);

          		console.log(err);
          	 	done();       	
		}


        	// Build query to select desired data
        	var query = client.query("SELECT account_name FROM client_account ORDER BY id ASC", function(err, queryOut) {
		
			// If table doesn't exist, then exit with a warning
			if (err) {

				// If something goes wrong with the table then return the last available list
				prevResults.push({"account_name":"ERROR - table failure"});				
				return res.json(prevResults);

            			dbSuccess="FALSE";

			} else {

            			dbSuccess="TRUE";
			}

			done();	

		});
		
		
		// If everything works then return a client account list
		if (dbSuccess == "TRUE") {

 			results = [];
   	 	
			// For each item returned push the data into the results array list
       			query.on('row', function( row) {
		
            			results.push(row);
 
        		});


  			prevResults = results;

 
       			// Once the client list has been completed push the results array back to the original server request
        		query.on('end', function() {

            			done();				
           			return res.json(results);
		
       			 });

		}

	});

});