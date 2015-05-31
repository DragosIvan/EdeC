angular.module('EDeC')
    .controller('HomepageCtrl', ['$scope', '$routeParams', '$rootScope', '$location', '$timeout', '$filter', '$http', 'Homepage', function($scope, $routeParams, $rootScope, $location, $timeout, $filter, $http, Homepage) {

    $scope.HomepageProducts = [];

    Homepage.get()
    .success(function(data){
    	if (data.username == 0 && typeof $rootScope.username === 'undefined') {
    		$rootScope.username == '';
    	} else {
    		$rootScope.username = data.username;
    	}

        data.randomProducts.forEach(function(item) {
            var temp = {};
            temp.description = item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description;
            temp.image = item.image;
            temp.name = item.name;
            temp.id_product = item.id_product;
            $scope.HomepageProducts.push(temp);
        })
    });

}]);