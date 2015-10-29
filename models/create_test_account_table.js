var pg = require('pg');
var connectionString = 'postgres://ouruser:letmein@localhost:5432/ouruser';

var results = [];

var client = new pg.Client(connectionString);
client.connect();
// Initial table create
client.query("CREATE TABLE client_account (id SERIAL PRIMARY KEY, client_id INTEGER, account_name VARCHAR(40) not null, complete BOOLEAN)");

// Insert values into the table for testing
client.query("INSERT INTO client_account (id, client_id, account_name, complete) values ($1, $2, $3, $4)",[1, 1,'client_1.1',true]);
client.query("INSERT INTO client_account (id, client_id, account_name, complete) values ($1, $2, $3, $4)",[2, 1,'client_1.2',true]);
client.query("INSERT INTO client_account (id, client_id, account_name, complete) values ($1, $2, $3, $4)",[3, 2,'client_2.1',true]);
client.query("INSERT INTO client_account (id, client_id, account_name, complete) values ($1, $2, $3, $4)",[4, 3,'client_3.1',false]);
var query = client.query("SELECT * from client_account ORDER BY id ASC");

// Return a list of everything in the client_account table back to the console for confirmation
query.on('row', function(row) { console.log(row);});
query.on('end', function() { console.log("\n Congratulations, you have created a client_account table");client.end(); });