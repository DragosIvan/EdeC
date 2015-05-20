angular.module('EDeC')
    
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd-mm-yyyy',
            startWeek: 1
        });
    })

    .controller('LoginCtrl', ['$scope', '$routeParams', '$http', 'Login', function($scope, $routeParams, $http, Login) {
        // GET, POST =====================================================================
        // when landing on the page, get/post family details and show them
        // use the service to get/post all the family details

        Login.post()
        .success(function(data) { 
            // console.log(data);
        });
    }]);