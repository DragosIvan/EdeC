angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('CampaignForm', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/campaign/create/' + $routeParams.idProduct);
			},
			post : function() {
				return $http.get('/api/campaign/create/' + $routeParams.idProduct);
			}
		}
	}]);