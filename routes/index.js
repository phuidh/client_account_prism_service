// Ensure we reference the desired packages
var express = require('express');

var router = express.Router();
var pg = require('pg');
var path = require('path');
var cors = require('cors');
module.exports = router;


var prevResults = [];


//The home directory call references index.html
router.get('/', function(req, res, next) {
 res.sendFile(path.join(__dirname, '../views', 'index.html')); 
});




// Build the /client_account package which returns a JSON list of client_accounts or an error message
// The cors() argument here should allow connections to be made to another server. 
// If you want cors to only work for a specific server you can do cors("http://server-b/") instead
router.get('/client_account', cors(), function(req, res) {


	//Initialise the variables
	var dbSuccess = "TRUE";
	var results = [];

	//Ensure that we can connect to the database with the desired username/password
	var connectionString = process.env.DATABASE_URL || 'postgres://ouruser:letmein@localhost:5432/ouruser';

	// Attempt to connect to the referenced database
	pg.connect(connectionString, function(err, client, done) {

        	// Check whether a connection is made
        	if(err) {

			// If something goes wrong with the connection then it'll print the last list it compiled
			prevResults.push({"warning":"*** ERROR - cannot connect to the database with the provided connection string. ***"});				
			return res.json(prevResults);

          		console.log(err);
          	 	done();       	
		}


        	// Build query to select desired data
        	var query = client.query("SELECT account_name FROM client_account ORDER BY id ASC", function(err, queryOut) {
		
			// If table doesn't exist, then exit with a warning
			if (err) {

				// If something goes wrong with the table then return the last available list
				// Testing shows that this doesn't work if the HTML webpage is refreshed (due to all the scripts being rerun and the global variables being reset)
				// Send out a warning to print at the bottom of the page
				prevResults.push({"warning":"*** ERROR - cannot query the client_account table. ***"});				
				return res.json(prevResults);

            			dbSuccess="FALSE";

			} else {

            			dbSuccess="TRUE";
			}

			done();	

		});
		
		
		// If everything works then return a client account list
		if (dbSuccess == "TRUE") {

			// Empty out the results JSON before filling it in again
 			results = [];
   	 	

			// For each item returned push the data into the results array list
       			query.on('row', function( row) {
		
            			results.push(row);
 
        		});

			// Pushing the current results to a global variable 
			// This is an attempt to be able to recall the last available list if a list cannot be retrieved (connection error)
			// Sadly I haven't been able to get this working yet because a page refresh clears out the prevResults
  			prevResults = results;


       			// Once the client list has been completed push the results array back to the original server request
        		query.on('end', function() {

            			done();				
           			return res.json(results);
		
       			 });

		}

	});

});