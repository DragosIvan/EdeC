angular.module('EDeC')
    
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd-mm-yyyy',
            startWeek: 1
        });
    })

    .controller('RegisterCtrl', ['$scope', '$routeParams', '$http', 'Register', function($scope, $routeParams, $http, Register) {
        // GET, POST =====================================================================
        // when landing on the page, get/post family details and show them
        // use the service to get/post all the family details
        
        $scope.errorCode = $routeParams.error;

        // console.log($scope.errorCode);

        Register.get()
        .success(function(data) {
            
        });

        Register.post()
        .success(function(data) { 
            console.log(data);
        });
    }]);