angular.module('MaxwellHealth')

	// super simple service
	// each function returns a promise object 
	.factory('PlanDetails', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/plans/' + $routeParams.id);
			}
		}
	}]);