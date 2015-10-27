angular.module('nodeAccount', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.toData = {};

    var attrValue="";

    // Get all accounts
    $http.get('/client_account')
        .success(function(data) {
            $scope.fromData = {};
            $scope.toData = data;
            console.log(data);
        })
        .error(function(error) {
	    $scope.toData = '[{"account_name":"ERROR - unable to reach /client_account"}]';
            console.log('Error: ' + error);
       });
});