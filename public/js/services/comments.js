angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('Comments', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/product/' + $routeParams.idProduct + '/comments/' + $routeParams.pager);
			}
		}
	}]);