angular.module('EDeC')
    .controller('CampaignCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Campaign', function($scope, $routeParams, $filter, $http, Campaign) {

$scope.Campaign;

Campaign.post()
    .success(function(data){
    });  

 Campaign.get()
    .success(function(data) {
        console.log(data);
        var campaign = data[0];
        var temp = {};
        temp.name = campaign.name; //numele produsului 
        temp.description = campaign.description;
        temp.positiveRating = Math.round(campaign.rating);
        temp.negativeRating = 5 - temp.positiveRating;
        temp.price = campaign.price;
        temp.image = campaign.image;
        temp.id_campaign = campaign.id_campaign;
        temp.campaignName = campaign.campaignName;
        temp.type = campaign.type;
        temp.nr_people = campaign.nr_people;
        temp.background = campaign.background;
        temp.id_product = campaign.id_product;
        $scope.Campaign = temp;
        console.log("dupa inserare ");
       console.log(temp);

    });
}]);
  