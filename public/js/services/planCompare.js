angular.module('MaxwellHealth')

	// super simple service
	// each function returns a promise object 
	.factory('PlanCompare', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/comparison/' + $routeParams.plansIds);
			}
		}
	}]);