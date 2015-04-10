angular.module('EDeC', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/homepage', {
				templateUrl: 'views/homepage.html',
				controller: 'HomepageCtrl'
			})
			.when('/tasks', {
				templateUrl: 'views/tasks.html',
				controller: 'TaskPageCtrl'
			})
			.when('/plans/subsidy/:subsid', {
		  		templateUrl: 'views/planSubsidy.html',
		    	controller: 'PlanSubsidyCtrl'
		  	})
		  	.when('/plans/listing/:subsidy', {
		    	templateUrl: 'views/planList.html',
		    	controller: 'PlanListCtrl'
		  	})
		  	.when('/plans/details/:id', {
		    	templateUrl: 'views/planDetails.html',
		    	controller: 'PlanDetailsCtrl'
		  	})
		  	.when('/plans/compare/:plansIds', {
		    	templateUrl: 'views/planComparison.html',
		    	controller: 'PlanComparisonCtrl'
		  	})
		  	.otherwise({
		    	redirectTo: '/homepage'
		  	});
	}]);
