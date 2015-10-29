var pg = require('pg');
var connectionString = 'postgres://ouruser:letmein@localhost:5432/ouruser';

var results = [];

var client = new pg.Client(connectionString);
client.connect();
var query = client.query("INSERT INTO client_account (id, client_id, account_name, complete) values ($1, $2, $3, $4)",[5, 4,'client_3.2',false]);
query.on('row', function(row) { console.log(row);});
query.on('end', function() { console.log("\n Congratulations, you have created a client_account table");client.end(); });