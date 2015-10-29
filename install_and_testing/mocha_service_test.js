// We want to user the supertest and mocha npm modules to test we're retrieving
// the correct information from our query.
// Also using cors so that we can access an external server.
//
// The command to execute this is (run in this directory):
//       mocha mocha_service_test.js
//
var request = require('supertest');
var cors = require('cors');

describe("Try to see whether calls to the database are working", function(){

	it('Try to retrieve a json object for client_account', function(done){
    
		// Talking to the local host on port 3000 to retrieve the /client_account feedback
		// Expecting to receive a json object as a response
    		request("http://localhost:3000")
      		.get('/client_account', cors())
      		.set('Accept', 'application/json')
      		.expect('Content-Type', /json/)
      		.expect(200, done); // note that we're passing the done as parameter to the expect
  	});
});