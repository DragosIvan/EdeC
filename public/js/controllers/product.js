angular.module('EDeC')
    .controller('ProductCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Product', function($scope, $routeParams, $filter, $http, Product) {

$scope.Product;
$scope.Comments;

 Product.get()
    .success(function(data) {
        // console.log(data);
        var product = data.productData[0];
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
            data.productComments.forEach(function(comment) {
                comment.positiveRating = Math.round(comment.rating);
                comment.negativeRating = 5 - comment.positiveRating;
            });
            $scope.Comments = data.productComments;
        })
    }]);
  