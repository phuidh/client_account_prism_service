# Required technologies:
# Node, Express, Angular, postgres database
# ======================
# You'll also need to ensure that you have a user 'ouruser' on the postgres database with password 'letmein'.
# This user needs to have all the create/select table privileges inside of the database.

# First thing, the script needs to be in the directory in which node-postgres-account lives
# and make sure that express is installed.
echo "=== Moving up directories ==="
cd ../../
pwd
echo ""
echo "=== Install the express node ==="
npm install -g express-generator@4
express node-postgres-account
echo ""
echo "=== Go into the node-postgres-account directory ==="
# Go into the node-postgres-account directory and install the required packages
cd node-postgres-account 

echo ""
echo "=== npm install ==="
npm install

echo ""
echo "=== npm install supervisor -g ==="
npm install supervisor -g

echo ""
echo "=== npm install pg --save ==="
npm install pg --save

# Build the database user
echo ""
echo "=== Create the new database user ouruser and permission them ==="
psql -U postgres -c "CREATE USER ouruser WITH PASSWORD 'letmein' CREATEDB;"
psql -U postgres -c "CREATE DATABASE ouruser;"
psql -U postgres -c "GRANT CONNECT ON DATABASE ouruser TO ouruser;"
psql -U postgres -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO ouruser;"

# Create the desired table
echo ""
echo "=== Build the desired client_account table ==="
node models/create_account.js

# Start up the node 
#echo ""
#echo "=== Start the service ==="
npm start

