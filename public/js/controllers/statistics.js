angular.module('EDeC')
    .controller('StatisticsCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Statistics', function($scope, $routeParams, $filter, $http, Statistics) {

$scope.Product;
$scope.Comments = [];
$scope.Pager = parseInt($routeParams.pager) - 1;
$scope.PagerNext = parseInt($routeParams.pager) + 1;

 Comments.get()
    .success(function(data) {
    });
}]);
  