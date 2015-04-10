angular.module('EDeC')
    .controller('PlanListCtrl', ['$scope', '$routeParams', '$filter', '$http', 'Plans', function($scope, $routeParams, $filter, $http, Plans) {

    $scope.priceCheckboxes = [];
    $scope.dedCheckboxes = [];
    $scope.insuranceCheckboxes = [];
    $scope.metalCheckboxes = [];
    $scope.Offers = [];
    $scope.Totals = 0;
    $scope.reversed = false;
    $scope.priceReversed = false;
    $scope.dedReversed = false;
    $scope.silverSecond = 0;
    $scope.newSilverSecond = [];

    // GET =====================================================================
    // when landing on the page, get all plans and show them
    // use the service to get all the plans
    $scope.loading = true;
    $scope.subsidyValue = 0;
    $scope.maxMonthly = $routeParams.subsidy;
    $scope.areTherePlans = 2;
    
    var k = 0;
    var itemNumber = 0;

    Plans.get()
    .success(function(data) {
        // The js object containing all the Carries and their Plans
        console.log(data);
        if (data.Carriers) {
          data.Carriers['GetIfpQuote.Response.Quote.CarrierRate'].forEach(function(element) {
            element.PlanRates['GetIfpQuote.Response.Quote.CarrierRate.PlanRate'].forEach(function(element) {

                var newPlan = {};
                var elementBenefits = element.PlanDetails.Benefits['GetIfpQuote.Response.PlanDetail.Benefit'];

                itemNumber++;

                newPlan.ID = element.PlanId;
                newPlan.CustomID = itemNumber;
                newPlan.IntPrice = element.Rate;

                newPlan.CostType = 'Monthly Premium';
                newPlan.Title = element.PlanDetails.Name;
                newPlan.TitleTag = newPlan.Title;

                if (newPlan.Title.length > 50)
                    newPlan.Title = newPlan.Title.slice(0, 47) + '...';

                newPlan.Type = element.PlanDetails.BenefitLevel;

                if (newPlan.Type == 'Platinum')
                    $scope.Metals[0]['Total'] = parseInt($scope.Metals[0]['Total']) + 1;
                if (newPlan.Type == 'Gold')
                    $scope.Metals[1]['Total'] = parseInt($scope.Metals[1]['Total']) + 1;
                if (newPlan.Type == 'Silver') {
                    $scope.Metals[2]['Total'] = parseInt($scope.Metals[2]['Total']) + 1;
                    $scope.newSilverSecond.push(newPlan.IntPrice);
                }
                if (newPlan.Type == 'Bronze')
                    $scope.Metals[3]['Total'] = parseInt($scope.Metals[3]['Total']) + 1;
                if (newPlan.Type == 'Catastrophic')
                    $scope.Metals[4]['Total'] = parseInt($scope.Metals[4]['Total']) + 1;

                newPlan.PpoType = element.PlanDetails.PlanType;
                newPlan.Ded = elementBenefits[0].TinyValue;

                if (newPlan.Ded.split('$')[1] !== undefined)
                    newPlan.FloatDed = newPlan.Ded.split('$')[1];
                else
                    newPlan.FloatDed = '0';

                if (newPlan.Ded == 'None')
                    newPlan.IntDed = 0;
                else {
                    newPlan.IntDed = newPlan.Ded.slice(1,newPlan.Ded.length).split(',')[0];

                    if (newPlan.Ded.slice(1,newPlan.Ded.length).split(',')[1]) 
                        newPlan.IntDed += newPlan.Ded.slice(1,newPlan.Ded.length).split(',')[1];
                }

                if (parseInt(newPlan.IntDed) >= 0 && parseInt(newPlan.IntDed) <= 1000)
                    $scope.Deductibles[0]['Total'] = parseInt($scope.Deductibles[0]['Total']) + 1;
                if (parseInt(newPlan.IntDed) >= 1001 && parseInt(newPlan.IntDed) <= 2500)
                    $scope.Deductibles[1]['Total'] = parseInt($scope.Deductibles[1]['Total']) + 1;
                if (parseInt(newPlan.IntDed) >= 2501 && parseInt(newPlan.IntDed) <= 5000)
                    $scope.Deductibles[2]['Total'] = parseInt($scope.Deductibles[2]['Total']) + 1;
                if (parseInt(newPlan.IntDed) >= 5001)
                    $scope.Deductibles[3]['Total'] = parseInt($scope.Deductibles[3]['Total']) + 1;

                newPlan.Oop = elementBenefits[1].TinyValue;
                newPlan.Office = 'N/A';
                newPlan.Hospital = 'N/A';
                newPlan.Percent = '0%'
                elementBenefits.forEach(function(item) {
                    if (item.Enum.indexOf('PrimaryCareVisit') != -1)
                        newPlan.Office = item.Coverages['GetIfpQuote.Response.PlanDetail.Benefit.Coverage'][0].ViewPoints['GetIfpQuote.Response.PlanDetail.Benefit.Coverage.ViewPoint'][0].LongValue;
                    if (item.Enum.indexOf('InpatientHospitalServices') != -1)
                        newPlan.Hospital = item.Coverages['GetIfpQuote.Response.PlanDetail.Benefit.Coverage'][0].ViewPoints['GetIfpQuote.Response.PlanDetail.Benefit.Coverage.ViewPoint'][0].LongValue;
                });

                $scope.Offers.push(newPlan);

                $scope.Totals++;
                $scope.CoInsurances[0]['Total'] = $scope.Totals;
            });
          });
        } else {
            $scope.areTherePlans = 0;
        }

        // $scope.loadMore = function() {
        //     for (var i = 0; i < 5 && k < $scope.Offers.length; i++, k++) {
        //         $scope.ShowOffers.push($scope.Offers[k]);
        //     }

            if ($scope.newSilverSecond.length && $scope.maxMonthly > 0 && $scope.subsidyValue == 0) {
                $scope.newSilverSecond.sort(function(a, b){return a-b});
                $scope.silverSecond = $scope.newSilverSecond[1];
                $scope.subsidyValue = parseFloat($scope.silverSecond - $scope.maxMonthly).toFixed(2);
            }
            
            $scope.Offers.forEach( function(offer) {
                offer.IntPrice = parseFloat(offer.IntPrice - $scope.subsidyValue).toFixed(2);

                if (offer.IntPrice > 0)
                    offer.Price = '$' + offer.IntPrice;
                else {
                    offer.Price = '$0.00';
                    offer.IntPrice = 0;
                }

                if (offer.IntPrice >= 100 && offer.IntPrice <= 250) 
                    $scope.Prices[0]['Total'] = parseInt($scope.Prices[0]['Total']) + 1;
                if (offer.IntPrice >= 251 && offer.IntPrice <= 500) 
                    $scope.Prices[1]['Total'] = parseInt($scope.Prices[1]['Total']) + 1;
                if (offer.IntPrice >= 501 && offer.IntPrice <= 1000) 
                    $scope.Prices[2]['Total'] = parseInt($scope.Prices[2]['Total']) + 1;
                if (offer.IntPrice >= 1001) 
                    $scope.Prices[3]['Total'] = parseInt($scope.Prices[3]['Total']) + 1;
            });
            
            // console.log($scope.silverSecond + ' - ' + $scope.maxMonthly + ' = ' + $scope.subsidyValue);
            
            $scope.loading = false;
        // };

        // $scope.loadMore();

        $scope.predicate = 'CustomID';
        
    });

    

    var j = 0;

    $scope.orderByFunction = function(item) {
        if(isNaN(item[$scope.predicate]))
            return item[$scope.predicate];
        return parseFloat(item[$scope.predicate]);
    }

    $scope.orderByDeductible = function() {
        if ($scope.predicate != 'IntDed')
            $scope.predicate = 'IntDed';

        $scope.reversed = $scope.dedReversed;

        $( '.order-glyphicon-price' ).removeClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up').addClass('glyphicon-minus');

        if ($( '.order-glyphicon-ded' ).hasClass('glyphicon-minus'))
            $( '.order-glyphicon-ded' ).removeClass('glyphicon-minus').addClass('glyphicon-chevron-down');

        if ($( '.order-glyphicon-ded' ).hasClass('glyphicon-chevron-down'))
            $( '.order-glyphicon-ded' ).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        else
            $( '.order-glyphicon-ded' ).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');

        $scope.priceReversed = false;
    }

    $scope.orderByPremium = function() {
        if ($scope.predicate != 'IntPrice')
            $scope.predicate = 'IntPrice';

        $scope.reversed = $scope.priceReversed;

        $( '.order-glyphicon-ded' ).removeClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up').addClass('glyphicon-minus');

        if ($( '.order-glyphicon-price' ).hasClass('glyphicon-minus'))
            $( '.order-glyphicon-price' ).removeClass('glyphicon-minus').addClass('glyphicon-chevron-down');

        if ($( '.order-glyphicon-price' ).hasClass('glyphicon-chevron-down'))
            $( '.order-glyphicon-price' ).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        else
            $( '.order-glyphicon-price' ).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        
        $scope.dedReversed = false; 
    }

    $scope.orderById = function() {
        if ($scope.predicate != 'CustomID')
            $scope.predicate = 'CustomID';

        $scope.reversed = false;

        $( '.order-glyphicon-price' ).removeClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up').addClass('glyphicon-minus');
        $( '.order-glyphicon-ded' ).removeClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up').addClass('glyphicon-minus');
        
        $scope.priceReversed = false;
        $scope.dedReversed = false;      
    }

    $scope.Prices = [
        {
            'Range': '$100 - $250',
            'Total': '0',
            'IntRange': '100-250'
        },
        {
            'Range': '$251 - $500',
            'Total': '0',
            'IntRange': '251-500'
        },
        {
            'Range': '$500 - $1,000',
            'Total': '0',
            'IntRange': '501-1000'
        },
        {   
            'Range': '$1,001 or more',
            'Total': '0',
            'IntRange': '1001-9999999999'
        }
    ];

    $scope.Deductibles = [
        {
            'Range': '$0 - $1,000',
            'Total': '0',
            'IntRange': '0-1000'
        },
        {
            'Range': '$1,001 - $2,500',
            'Total': '0',
            'IntRange': '1001-2500'
        },
        {
            'Range': '$2,501 - $5,000',
            'Total': '0',
            'IntRange': '2501-5000'
        },
        {
            'Range': '$5,001 or more',
            'Total': '0',
            'IntRange': '5001-99999999'
        }   
    ];

    $scope.Metals = [
        {
            'Type': 'Platinum',
            'Total': '0'
        },
        {
            'Type': 'Gold',
            'Total': '0'
        },
        {
            'Type': 'Silver',
            'Total': '0'
        },
        {
            'Type': 'Bronze',
            'Total': '0'
        },
        {
            'Type': 'Catastrophic',
            'Total': '0'
        }   
    ];

    $scope.CoInsurances = [
        {
            'Percent': '0%',
            'Total': '0',
            'IntPercent': '0'
        },
        {
            'Percent': '25%',
            'Total': '0',
            'IntPercent': '25'
        },
        {
            'Percent': '50%',
            'Total': '0',
            'IntPercent': '50'
        },
        {
            'Percent': '100%',
            'Total': '0',
            'IntPercent': '100'
        }
    ];

    // selected plans
    $scope.selection = [];

    // toggle selection for a given plan by id
    $scope.toggleSelection = function toggleSelection( planId ) {
      var idx = $scope.selection.indexOf(planId);
      
      // is currently selected
      if (idx > -1) 
        $scope.selection.splice(idx, 1);
      // is newly selected
      else
        $scope.selection.push(planId);
    };

    $scope.filters = {};
  }]);