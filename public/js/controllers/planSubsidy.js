angular.module('MaxwellHealth')
    .controller('PlanSubsidyCtrl', ['$scope', '$routeParams', '$http', 'PlanSubsidy', function($scope, $routeParams, $http, PlanSubsidy) {
    // GET =====================================================================
    // when landing on the page, get subsidy value and show it
    // use the service to get subsidy value
    $scope.householdIncome = '';
    $scope.householdIncome2 = '';
    $scope.subsidyValue = '';

    PlanSubsidy.get()
    .success(function(subsidyValue) {
        $scope.householdIncome = $routeParams.subsid;
        $scope.householdIncome2 = $routeParams.subsid;
        $scope.subsidyValue = subsidyValue.split('"')[1];

        if ($scope.householdIncome === '0') {
            $scope.householdIncome = '';
            $scope.subsidyValue = '';
        }
    });
  }]);
