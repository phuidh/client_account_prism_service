# Simple cURL command to return the static HTML from the service.
# If the service isn't up and running then a note saying 'Connection refused' will be returned.
# If the service is up and running then the HTML of the index.html will be returned.

# Search for a refused tag
myStatus=`curl http://localhost:3000 2>&1 | grep refused`

# If nothing is refused then the connection is up
if [ "$myStatus" == "" ]; then

	echo ""
	echo " 1 - Service is currently running"
	echo ""

	# Check for an ERROR flag instead. 
	# The ERROR comes from the 'warning' JSON item that I create in the event of a failure.
	# This error is returned if it is found
	myStatus=`curl http://localhost:3000/client_account 2>&1 | grep ERROR | gawk -F'"' '{ print $4 }'`

	if [ "$myStatus" != "" ]; then
		echo ""
		echo " ######################"
		echo " WARNING - $myStatus"
		echo " ######################"
		echo ""
	fi

else 

	# If 'refused' is found then service is not running
	echo ""
	echo " 0 - Service is currently not running"
	echo ""

fi