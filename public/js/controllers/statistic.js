angular.module('EDeC')
    .controller('StatisticCtrl', ['$scope', '$window', '$routeParams', '$filter', '$http', 'Statistic', function($scope, $window, $routeParams, $filter, $http, Statistic) {

$scope.Product;

    Statistic.get()
        .success(function(data) {
            console.log(data);
            var product = data.product[0];
	        var temp = {};
	        temp.id_product = product.id_product;
	        temp.name = product.name;
	        temp.weight = product.weight;
	        temp.stock = product.stock;
	        temp.price = product.price;
	        temp.description = product.description;
	        temp.positiveRating = Math.round(product.rating);
	        temp.negativeRating = 5 - temp.positiveRating;
	        temp.image = product.image;
	        $scope.Product = temp;

	        $window.comments = data.comments;
    });
}]);