angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('Campaign', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/campaign/' + $routeParams.idProduct);
			},
			post : function() {
				return $http.get('/api/campaign/' + $routeParams.idProduct);
			}
		}
	}]);