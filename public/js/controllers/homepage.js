angular.module('EDeC')
    .controller('HomepageCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Homepage', function($scope, $routeParams, $filter, $http, Homepage) {

    $scope.Products = []; // am facut vectorul global cu produse
    // Homepage.get()
    // .success(function(data) {      
    //      console.log("Am inserat obectul");
    //      console.log(data);

        

    //     data.forEach(function(product) {
    //     	var temp = {};
    //     	temp.id_product = product.id_product;
    //     	temp.name = product.name;
    //     	temp.weight = product.weight;
    //     	temp.stock = product.stock;
    //     	temp.price = product.price;
    //     	temp.description = product.description;
    //     	temp.rating = product.rating;
    //     	temp.image = product.image;

    //     	$scope.Products.push(temp);
    //     })
     //});

}]);