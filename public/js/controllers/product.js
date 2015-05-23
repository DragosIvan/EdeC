angular.module('EDeC')
    .controller('ProductCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Product', function($scope, $routeParams, $filter, $http, Product) {

$scope.Product;

 Product.get()
    .success(function(data) {
        console.log("Am pus in vector1");
        console.log(product);
       var product = data[0];
            var temp = {};
            temp.id_product=product.id_product;
            temp.name = product.name;
            temp.weight=product.weight;
            temp.stock=product.stock;
            temp.price=product.price;
            temp.description = product.description;
            temp.rating = product.rating;
            temp.image = product.image;

            $scope.Product = temp;
            console.log($scope.Product);
             console.log("Am pus in vector");
        
        })
    }]);
 