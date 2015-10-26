angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};

    var attrValue="";

    // Get all todos
    $http.get('/client_account')
        .success(function(data) {
            $scope.fromData = {};
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(error) {
	    $scope.todoData = '[{"account_name":"ERROR"}]';
            console.log('Error: ' + error);
       });
});