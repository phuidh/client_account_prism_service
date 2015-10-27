var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://ouruser:letmein@localhost:5432/ouruser';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items2(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
