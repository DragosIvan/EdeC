angular.module('EDeC')  
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd-mm-yyyy',
            startWeek: 1
        });
    })

    .controller('ProfileCtrl', ['$scope', '$routeParams', '$http', 'Profile', function($scope, $routeParams, $http, Profile) {
        // GET, POST =====================================================================
        // when landing on the page, get/post family details and show them
        // use the service to get/post all the family details

       
$scope.Profile;
$scope.errorCode = $routeParams.error;

Profile.get()
    .success(function(data) {
        var profile = data[0];
        var temp = {};
        temp.id_users = profile.id_users;
        temp.username = profile.username;
        temp.mail = profile.mail;
        temp.name = profile.name;
        temp.lastname = profile.lastname;
        temp.gender = profile.gender;
        temp.birthday = profile.birthday;
        temp.address = profile.address;
        $scope.Profile = temp; 
    });

 Profile.post()
    .success(function(data) {})
}]);