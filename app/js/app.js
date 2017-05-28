var app = angular.module('myApp', ['ngRoute']);


app.controller('CustomersReviews', function($scope, $location, $window, factory) {
	factory.get().then(function (response) {
        $scope.data = response.data;
    }); 
    $scope.more = function(sometext) {
        $location.path('more');
        $scope.sometext = sometext;
    };
    $scope.post = function() {
        $location.path('post');
    };
    $scope.change = function(comment) {
        $location.path('change');
        $scope.id = comment._id;
        $scope.review = comment.review;
        $scope.author = comment.author;
        $scope.job = comment.job;
        $scope.sometext = comment.sometext;
    };
    $scope.delete = function(id) {
    	factory.delete(id).then($window.location.reload());
    }
    $scope.postdata = function(review, author, job, text) {
        factory.post(review, author, job, text).then($location.path('/').then($window.location.reload()));
   	}
   	$scope.putdata = function(id, review, author, job, text) {
        factory.put(id, review, author, job, text).then($location.path('/').then($window.location.reload()));
   	}
})


//2. Реализовать Angular сервис для отправки запросов к серверу из прошлого задания.
app.factory("factory", function ($http) { 
	this.get = function () { 
		return $http.get('http://localhost:8000/reviews');
	}
	//5. Создать страницу, на которой можно добавить новые данные. (использовать сервис из второго задания и метод post). 
	this.post = function(review, author, job, text) {
		return $http.post('http://localhost:8000/reviews', {"review" : review, "author" : author, "job" : job, "sometext" : text})
	}
	this.put = function(id, review, author, job, text) {
		return $http.put('http://localhost:8000/reviews/' + id, {"review" : review, "author" : author, "job" : job, "sometext" : text})
	}
	this.delete = function(id) {
		return $http.delete('http://localhost:8000/reviews/' + id)
	}
	return this; 
});

//3. Создать директиву, которая, используя сервис из прошлого задания, будет выводить данные.
app.directive("getData", function(factory) {
    return {
        link: function (scope) {
          factory.get().then(function (response) {
          	scope.comment = response.data;
          });
        }
    };
});


//4. Используя роутинг реализовать переход к странице с более детальной информацией о полученных данных. Например, страница новости. Для каждой новости генерировать свою страницу.

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/more", {
        templateUrl : "../html/more.html"
    })
    .when("/post", {
        templateUrl : "../html/post.html"
    })
    .when("/change", {
        templateUrl : "../html/change.html"
    })
    .when("/", {
        templateUrl : "../html/main.html"
    })
    .otherwise({
	    redirectTo: '/'
	});
}]);