angular.module('EDeC')
    .controller('StatisticsCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Statistics', function($scope, $routeParams, $filter, $http, Statistics) {

$scope.Statistics = [];
$scope.Pager = parseInt($routeParams.pager) - 1;
$scope.PagerNext = parseInt($routeParams.pager) + 1;

    Statistics.get()
        .success(function(data) {
            console.log(data);
            $scope.Statistics = data;
    });
}]);
  