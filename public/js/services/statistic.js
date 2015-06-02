angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('Statistic', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/statistic/' + $routeParams.idProduct);
			}
		}
	}]);