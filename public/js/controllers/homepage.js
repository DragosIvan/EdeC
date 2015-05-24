angular.module('EDeC')
    .controller('HomepageCtrl', ['$scope', '$routeParams', '$rootScope', '$location', '$timeout', '$filter', '$http', 'Homepage', function($scope, $routeParams, $rootScope, $location, $timeout, $filter, $http, Homepage) {

    Homepage.get()
    .success(function(data){
    	// console.log(data);
    	if (data.username == 0 && typeof $rootScope.username === 'undefined') {
    		$rootScope.username == '';
    	} else {
    		$rootScope.username = data.username;
    	}

        data.randomProducts.forEach(function(item) {
            item.description = item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description;
        })

        $scope.HomepageProducts = data.randomProducts;
    });

}]);