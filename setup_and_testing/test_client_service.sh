# Simple cURL command to return the static HTML from the service.
# If the service isn't up and running then a note saying 'Connection refused' will be returned.
# If the service is up and running then the HTML of the index.html will be returned.

myStatus=`curl http://localhost:3000 2>&1 | grep refused`


if [ "$myStatus" == "" ]; then

	echo ""
	echo " 1 - Service is currently running"
	echo ""

	myStatus=`curl http://localhost:3000/client_account 2>&1 | grep ERROR | gawk -F'"' '{ print $4 }'`

	if [ "$myStatus" != "" ]; then
		echo ""
		echo " ######################"
		echo " WARNING - $myStatus"
		echo " ######################"
		echo ""
	fi

else 

	echo ""
	echo " 0 - Service is currently not running"
	echo ""

fi