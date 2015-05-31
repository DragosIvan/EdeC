angular.module('EDeC')
    .controller('ProductsCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Products', function($scope, $routeParams, $filter, $http, Products) {

    $scope.Products = [];
    $scope.Pager = parseInt($routeParams.pager) - 1;
    $scope.PagerNext = parseInt($routeParams.pager) + 1;

    Products.get()
    .success(function(data) {
        data.forEach(function(product) {
            var temp = {};
            temp.id_product = product.id_product;
            temp.name = product.name;
            temp.description = product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description;
            temp.positiveRating = Math.round(product.rating);
            temp.negativeRating = 5 - temp.positiveRating;
            temp.image = product.image;

            $scope.Products.push(temp);
        })
    });

  }]);