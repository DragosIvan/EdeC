angular.module('MaxwellHealth')
    
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'MM-dd-yyyy',
            startWeek: 1
        });
    })

    .controller('FamilyDetailsCtrl', ['$scope', '$routeParams', '$http', 'FamilyDetails', function($scope, $routeParams, $http, FamilyDetails) {
        // GET, POST =====================================================================
        // when landing on the page, get/post family details and show them
        // use the service to get/post all the family details

        $scope.subscriberObj = [];
        $scope.spouseObj = [];
        $scope.dependentsObj = [];
        $scope.loadingFamilyDetails = true;

        var dependentNumber = 0;
        var subscriberCounties = '';
        var spouseCounties = '';
        var dependentCounties = '';

        $scope.relationships = [
            {value: 'Spouse', label: 'Spouse'},
            {value: 'DomesticPartner', label: 'Domestic Partner'},
            {value: 'LifePartner', label: 'Life Partner'},
            {value: 'SameSexPartner', label: 'Same Sex Partner'}
        ];
        $scope.defaultRelationship = $scope.relationships[0]['value'];

        $scope.childRelationships = [
            {value: 'Child', label: 'Child'},
            {value: 'AdoptedChild', label: 'Adopted Child'},
            {value: 'Annultant', label: 'Annultant'},
            {value: 'Sibling', label: 'Sibling'},
            {value: 'SiblingInLaw', label: 'Sibling in Law'},
            {value: 'CollateralDependent', label: 'Collateral Dependent'},
            {value: 'CourtAppointedGuardian', label: 'Court Appointed Guardian'},
            {value: 'Cousin', label: 'Cousin'},
            {value: 'DependentOfMinorDependent', label: 'Dependent of Minor Dependent'},
            {value: 'ExSpouse', label: 'Ex-Spouse'},
            {value: 'Parent', label: 'Parent'},
            {value: 'ParentInLaw', label: 'Parent In Law'},
            {value: 'FosterChild', label: 'Foster Child'},
            {value: 'GrandParent', label: 'Grand Parent'},
            {value: 'Guardian', label: 'Guardian'},
            {value: 'SiblingChild', label: 'Sibling Child'},
            {value: 'OtherRelationship', label: 'Other Relationship'},
            {value: 'OtherRelative', label: 'Other Relative'},
            {value: 'ChildInLaw', label: 'Child in Law'},
            {value: 'SponsoredDependent', label: 'Sponsored Dependent'},
            {value: 'StepParent', label: 'Step Parent'},
            {value: 'StepChild', label: 'Step Child'},
            {value: 'Trustee', label: 'Trustee'},
            {value: 'ParentSibling', label: 'Parent Sibling'},
            {value: 'Ward', label: 'Ward'}
        ];
        $scope.defaultChidRelationship = $scope.childRelationships[0]['value'];

        $scope.genders = [
            {value: 'Male', label: 'Male'},
            {value: 'Female', label: 'Female'}
        ];
        $scope.defaultGender = $scope.genders[0]['value'];

        FamilyDetails.get()
        .success(function(fDetails) {
            (fDetails.Members).forEach(function(fDetail) {
                if (fDetail.MemberType === 'Subscriber') {
                    $scope.MainCountyNames = fDetail.CountyName;
                    subscriberCounties = fDetail.CountyName.split('&&');

                    $scope.subscriberCountiesResults = [];
                    subscriberCounties.forEach(function(subscriberCounty) {
                        if (subscriberCounty !== "") {
                            $scope.subscriberCountiesResults.push({value: subscriberCounty, label: subscriberCounty});
                        }
                    });
                    $scope.subscriberCountiesResult = $scope.subscriberCountiesResults[0]['value'];
                    $scope.subscriberObj = fDetail;
                } else if (fDetail.MemberType === 'Spouse') {
                    spouseCounties = fDetail.CountyName.split('&&');

                    $scope.spouseCountiesResults = [];
                    spouseCounties.forEach(function(spouseCounty) {
                        if (spouseCounty !== "") {
                            $scope.spouseCountiesResults.push({value: spouseCounty, label: spouseCounty});
                        }
                    });
                    $scope.spouseCountiesResult = $scope.spouseCountiesResults[0]['value'];
                    $scope.spouseObj = fDetail;
                    if ($scope.spouseObj.ZipCode != $scope.subscriberObj.ZipCode && $scope.fDetail.CountyName != $scope.MainCountyNames) $scope.spouseHousehold = false;
                    else $scope.spouseHousehold = true;
                } else if (fDetail.MemberType === 'Dependent') {
                    dependentNumber++;
                    dependentCounties = fDetail.CountyName.split('&&');

                    $scope.dependentCountiesResults = [];
                    dependentCounties.forEach(function(dependentCounty) {
                        if (dependentCounty !== "") {
                            $scope.dependentCountiesResults.push({value: dependentCounty, label: dependentCounty});
                        }
                        $scope.dependentCountiesResult = $scope.dependentCountiesResults[0]['value'];
                    });
                    fDetail.dependentNr = dependentNumber;
                    fDetail.dependentCountiesResults = $scope.dependentCountiesResults;
                    fDetail.dependentCountiesResult = fDetail.dependentCountiesResults[0]['value'];

                    if (fDetail.ZipCode != $scope.subscriberObj.ZipCode && fDetail.CountyName != $scope.MainCountyNames) fDetail.Household = false;
                    else fDetail.Household = true;
                    $scope.dependentsObj.push(fDetail);
                }
            });
            $scope.loadingFamilyDetails = false;
        });

        FamilyDetails.post()
        .success(function() {});
    }]);