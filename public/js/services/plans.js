angular.module('MaxwellHealth')

	// super simple service
	// each function returns a promise object 
	.factory('Plans', ['$http', function($http) {
		return {
			get : function() {
				return $http.get('/api/plans');
			}
		}
	}]);