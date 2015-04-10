angular.module('MaxwellHealth')

	// super simple service
	// each function returns a promise object 
	.factory('FamilyDetails', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/familyDetails');
			},
			post : function() {
				return $http.post('/api/familyDetails');
			}
		}
	}]);