angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('PlanSubsidy', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/subsidy/' + $routeParams.subsid);
			}
		}
	}]);