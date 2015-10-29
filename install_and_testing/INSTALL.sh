# Required technologies:
# Node, Express, Angular, postgres database
# ======================
# This entire package should be placed withint a directory called node-postgres-account.
# There is a sister package called cilent_account_prism_module which should also be downloaded and placed into a directory 
# called node_modules which should sit alongside node-postgres-account.
#
# The express module is not included in the below setup as it has been pre-configured and packaged up into the sister
# directory, node_modules
#
# You'll also need to ensure that you have a user 'ouruser' on the postgres database with password 'letmein'.
# This user needs to have all the create/select table privileges inside of the database.


# First thing, the script needs to be in the directory in which node-postgres-account lives
echo "=== Moving up directories ==="
cd ../

# Next item on the agenda, install the npm service
echo ""
echo "=== npm install ==="
npm install

# Install the supervisor module
echo ""
echo "=== npm install supervisor -g ==="
npm install supervisor -g

# Install the postgres connection module
echo ""
echo "=== npm install pg --save ==="
npm install pg --save

# Install the cross-server module
echo ""
echo "=== npm install cors ==="
echo "This is to help handle cross-server connections"
npm install cors

# Install the mocha testing framework
echo ""
echo "=== npm install mocha -g ==="
npm install mocha -g

# Install the supertest HTML testing module
echo ""
echo "=== npm install supertest ==="
npm install supertest


echo "##############"
echo "All node modules installed"
echo "##############"
echo ""

# Build the database user
# Prompt the user to see if they want to install our user and tables
echo ""
echo "Please confirm whether you would like to create the desired user and tables required to turn on the system"
echo "NOTE: if you choose no because you already have a user/table setup, then you will need to amend the following"
echo "      scripts to look at the correct user/table/column with the correct password:"
echo "             - routes/index.js (connectionString to use the username, password, database, as well as"
echo "                                 client.query which is what queries the database fields/tables)"
echo "             - views/index.html (account_name references the column being queried in the table)"

echo ""
read -p "Do you want this script to create the user? [Y/N]" -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then

	# Go ahead and create the user, database, generate permissions and build the table and entries
	echo "=== Create the new database user ouruser and permission them ==="
	psql -U postgres -c "CREATE USER ouruser WITH PASSWORD 'letmein' CREATEDB;"
	psql -U postgres -c "CREATE DATABASE ouruser;"
	psql -U postgres -c "GRANT CONNECT ON DATABASE ouruser TO ouruser;"
	psql -U postgres -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO ouruser;"

	# Create the desired table and create some entries
	echo ""
	echo "=== Build the desired client_account table ==="
	node models/create_test_account_table.js

else

	echo ""
	echo "User is not created. Please amend the above listed scripts to ensure that the service will work"
	echo ""

fi

# Prompt the user to see whether they want the service to be started or not
echo ""
read -p "Do you want this script to start up the service for you? (This is not advised if the database user does not exist) [Y/N] " -n 1 -r

if [[ $REPLY =~ ^[Yy]$ ]]; then

	# Start up the node 
	echo ""
	echo "=== Start the service ==="
	npm start
else

	# Give the user the command to run as and when they want to
	echo ""
	echo "=== Service was not started ==="
	echo ""
	echo "If you wish to start the server manually, just run the below command"
	echo "   npm start "
	echo ""
fi
