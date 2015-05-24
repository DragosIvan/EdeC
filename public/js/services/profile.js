angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('Profile', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/profile');
			},
			post : function() {
				return $http.post('/api/profile');
			}
		}
	}]);

