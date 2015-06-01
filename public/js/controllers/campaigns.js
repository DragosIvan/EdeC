angular.module('EDeC')
    .controller('CampaignsCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Campaigns', function($scope, $routeParams, $filter, $http, Campaigns) {

    $scope.Campaigns = [];

    Campaigns.get()
    .success(function(data) {
        console.log(data);
        
        data.forEach(function(campaign) {
            var temp = {};
            temp.id_campaign = campaign.id_campaign;
            temp.name = campaign.name;
            temp.id_product = campaign.id_product;
            temp.nr_people = campaign.nr_people;
            temp.image = campaign.image;

            $scope.Campaigns.push(temp);
        })
    });

  }]);