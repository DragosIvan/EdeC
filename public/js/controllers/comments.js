angular.module('EDeC')
    .controller('CommentsCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Comments', function($scope, $routeParams, $filter, $http, Comments) {

$scope.Product;
$scope.Comments = [];
$scope.Pager = parseInt($routeParams.pager) - 1;
$scope.PagerNext = parseInt($routeParams.pager) + 1;

 Comments.get()
    .success(function(data) {
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
            var temp = {};
            temp.positiveRating = Math.round(comment.rating);
            temp.negativeRating = 5 - temp.positiveRating;
            temp.comm = comment.comm;
            temp.username = comment.username;
            temp.postDate = comment.postDate;
            temp.id_usercomm = comment.id_comm;
            $scope.Comments.push(temp);
        });
    });
}]);
  