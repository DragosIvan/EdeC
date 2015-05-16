angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('Products', ['$http', function($http) {
		return {
			get : function() {
				return $http.get('/api/products');
			}
		}
	}]);