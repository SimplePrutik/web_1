var app = angular.module('myApp', []);
app.controller('CustomersReviews', function($scope, $http) {
  $http.get("http://localhost:8000/reviews").then(function (response) {
      $scope.review1 = (response.data[0]).review;
      $scope.author1 = (response.data[0]).author;
      $scope.job1 = (response.data[0]).job;
      $scope.review2 = (response.data[1]).review;
      $scope.author2 = (response.data[1]).author;
      $scope.job2 = (response.data[1]).job;
      $scope.review3 = (response.data[2]).review;
      $scope.author3 = (response.data[2]).author;
      $scope.job3 = (response.data[2]).job;
  });
});


app.controller('PostReview', function($scope, $http){
   $scope.PostData = function() {
        $http({
		    method: 'POST',
		    url: 'http://localhost:8000/reviews',
		    data: "review=" + $scope.review + "&author=" + $scope.author + "&job=" + $scope.job ,
		    headers: {'Content-Type': "application/x-www-form-urlencoded"}
		});
        
    }  
});

var app_route = angular.module('myAppRoute',["ngRoute"]);
app_route.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/modify", {
        templateUrl : "modify.html"
    });
}]);






