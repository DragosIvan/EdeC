angular.module('EDeC')
    .controller('ProductsCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Products', function($scope, $routeParams, $filter, $http, Products) {

    $scope.Products = [];

    Products.get()
    .success(function(data) {
        console.log(data);
        
        data.forEach(function(product) {
            var temp = {};
            temp.id_product=product.id_product;
            temp.name = product.name;
            temp.description = product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description;
            temp.positiveRating = product.rating;
            temp.negativeRating = 5 - product.rating;
            temp.image = product.image;

            $scope.Products.push(temp);
        })
    });

  }]);