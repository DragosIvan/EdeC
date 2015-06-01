angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('FriendProfile', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/friendProfile/' + $routeParams.idUser);
			}
		}
	}]);