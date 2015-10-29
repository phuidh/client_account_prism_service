// Angular module is referenced in index.html
angular.module('nodeAccount', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.toData = {};

    var attrValue="";

    // Pull all the information pulled from the /client_account service and send it through to index.html for processing (listing)
    $http.get('/client_account')
        .success(function(data) {
            $scope.fromData = {};
            $scope.toData = data;
            console.log(data);
        })
        .error(function(error) {
	    $scope.toData = '[{"warning":"ERROR - unable to reach /client_account"}]';
            console.log('Error: ' + error);
       });
});