# Required technologies:
# Node, Express, Angular, postgres database, cURL
======================
# Commands for building and running this service exist in setup_and_testing/build_service.sh

# build_service.sh will install the npm as well as all the relevant packages. 
# It will also create the required database user ouruser with password letmein and create an example table (client_account)
# The service will reference this user and this table

# Before install, please insure that cURL and psql packages are declared in your path so that they can be
# run without having to specify their location on the server. You must also ensure that the postgres database user
# password has been declared beforehand using SET PGPASSWORD=yourPassword

# There is also a script which can be run without directly accessing the service called test_client_service.sh.
# test_client_service.sh lives in the setup_and_testing directory and upon being run it will return a flag
# to show whether the service is up and running (1) or whether it is down (0).

# If the service is running (1) then it will also check whether the service is running accurately or not and return 
# a warning if something is failing.

