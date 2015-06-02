angular.module('EDeC')
    .controller('JoinCampaignCtrl', ['$scope', '$window', '$routeParams', '$filter', '$http', 'JoinCamapign', function($scope, $window, $routeParams, $filter, $http, JoinCampaign) {

 JoinCampaign.post()
        .success(function(data) { 
            //console.log(data);
        });
    }]);