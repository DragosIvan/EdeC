angular.module('EDeC')
    .controller('CampaignFormCtrl', ['$scope', '$routeParams', '$filter', '$http', 'CampaignForm', function($scope, $routeParams, $filter, $http, CampaignForm) {

$scope.CampaignForm;

CampaignForm.post()
    .success(function(data){
    });  

 CampaignForm.get()
    .success(function(data) {
        console.log(data);// primeste date
        var product = data[0];
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

        $scope.CampaignForm=temp;
        //console.log(temp);

    });
}]);
  
  //controller-primeste date de la route