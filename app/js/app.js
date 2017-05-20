var app = angular.module('myApp', []);

app.factory("factory", function ($http) { 
	this.get = function () { 
		return $http.get('http://localhost:8000/reviews');
	} 
	return this; 
});

app.directive("getData", function(factory) {
    return {
        link: function (scope) {
          factory.get().then(function (response) {
          	scope.comment = response.data;
          });
        }
    };
});

app.controller('CustomersReviews', function($scope, factory) {
	factory.get().then(function (response) {
        $scope.data = response.data;
    }); 
})



var app_route = angular.module('myAppRoute',["ngRoute"]);
app_route.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/modify", {
        templateUrl : "modify.html"
    });
}]);






