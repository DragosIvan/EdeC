angular.module('EDeC')

  .controller('PlanDetailsCtrl', ['$scope', '$routeParams', '$http', 'PlanDetails', '$sce', function($scope, $routeParams, $http, PlanDetails, $sce) {
    // GET =====================================================================
    // when landing on the page, get plan details and show them
    // use the service to get all the plan details
    PlanDetails.get()
    .success(function(plan) {
        var newPlan = {
            Price: 'N/A',
            Type: 'N/A',    
            Name: 'N/A',
                MedicalDeductibleIn: 'N/A',
                MedicalDeductibleOut: 'N/A',
            AnnualOutOfPocket: 'N/A',
                AnnualOutOfPocketDetailsIn: 'N/A',
                AnnualOutOfPocketDetailsOut: 'N/A',
            EmergencyHealth: 'N/A',
                UrgentCareIn: 'N/A',
                UrgentCareOut: 'N/A',
                EmergencyRoomIn: 'N/A',
                EmergencyRoomOut: 'N/A',
                EmergencyTransportIn: 'N/A',
                EmergencyTransportOut: 'N/A',
            HomeHealthCare: 'N/A',
                HomeHealthServicesIn: 'N/A',
                HomeHealthServicesOut: 'N/A',
            HospitalServices: 'N/A',
                InpatientPhysicianIn: 'N/A',
                InpatientPhysicianOut: 'N/A',
                HospitalizationIn: 'N/A',
                HospitalizationOut: 'N/A',
                InpatientHospitalIn: 'N/A',
                InpatientHospitalOut: 'N/A',
                SkilledNursingIn: 'N/A',
                SkilledNursingOut: 'N/A',
                SubstanceAbuseOutpatientIn: 'N/A',
                SubstanceAbuseOutpatientOut: 'N/A',
                SubstanceAbuseInpatientIn: 'N/A',
                SubstanceAbuseInpatientOut: 'N/A',
            MaternityCare: 'N/A',
                DeliveryIn: 'N/A',
                DeliveryOut: 'N/A',
                PrenatalPostnatalIn: 'N/A',
                PrenatalPostnatalOut: 'N/A',
            OtherServices: 'N/A',
                MentalBehavioralInpatientIn: 'N/A',
                MentalBehavioralInpatientOut: 'N/A',
                DurableEquipmentIn: 'N/A',
                DurableEquipmentOut: 'N/A',
                HospiceIn: 'N/A',
                HospiceOut: 'N/A',
                BariatricIn: 'N/A',
                BariatricOut: 'N/A',
                MentalBehavioralOutpatientIn: 'N/A',
                MentalBehavioralOutpatientOut: 'N/A',
                AcupunctureIn: 'N/A',
                AcupunctureOut: 'N/A',
                RehabilitativeSpeechIn: 'N/A',
                RehabilitativeSpeechOut: 'N/A',
                RehabilitativeOccupationalIn: 'N/A',
                RehabilitativeOccupationalOut: 'N/A',
                AbortionIn: 'N/A',
                AbortionOut: 'N/A',
                AllergyTestingIn: 'N/A',
                AllergyTestingOut: 'N/A',
                ChemoIn: 'N/A',
                ChemoOut: 'N/A',
                DiabetesIn: 'N/A',
                DiabetesOut: 'N/A',
                DialysisIn: 'N/A',
                DialysisOut: 'N/A',
                InfusionIn: 'N/A',
                InfusionOut: 'N/A',
                NutritionalIn: 'N/A',
                NutritionalOut: 'N/A',
                ProstheticIn: 'N/A',
                ProstheticOut: 'N/A',
                RadiationIn: 'N/A',
                RadiationOut: 'N/A',
                ReconstructiveIn: 'N/A',
                ReconstructiveOut: 'N/A',
                TransplantIn: 'N/A',
                TransplantOut: 'N/A',
                JointDisordersIn: 'N/A',
                JointDisordersOut: 'N/A',
            OutpatientServices: 'N/A',
                OutpatientSurgeryIn: 'N/A',
                OutpatientSurgeryOut: 'N/A',
                OutpatientRehabIn: 'N/A',
                OutpatientRehabOut: 'N/A',
            PrescriptionDrugCoverage: 'N/A',
                GenericDrugsIn: 'N/A',
                GenericDrugsOut: 'N/A',
                PrefDrugsIn: 'N/A',
                PrefDrugsOut: 'N/A',
                NonPrefDrugsIn: 'N/A',
                NonPrefDrugsOut: 'N/A',
                SpecDrugsIn: 'N/A',
                SpecDrugsOut: 'N/A',
            PreventiveCare: 'N/A',
                WellBabyVisitsIn: 'N/A',
                WellBabyVisitsOut: 'N/A',
                PreventiveCSIIn: 'N/A',
                PreventiveCSIOut: 'N/A',
            ProfessionalServices: 'N/A',
                OtherPractitionerIn: 'N/A',
                OtherPractitionerOut: 'N/A',
                ImagingIn: 'N/A',
                ImagingOut: 'N/A',
                XraysIn: 'N/A',
                XraysOut: 'N/A',
                SpecialistVisitIn: 'N/A',
                SpecialistVisitOut: 'N/A',
                ChiropracticIn: 'N/A',
                ChiropracticOut: 'N/A',
                LaboratoryOutpatientIn: 'N/A',
                LaboratoryOutpatientOut: 'N/A',
                PrimaryCareIn: 'N/A',
                PrimaryCareOut: 'N/A',
            Vision: 'N/A',
                RoutineEyeIn: 'N/A',
                RoutineEyeOut: 'N/A',
                EyeGlassesChildrenIn: 'N/A',
                EyeGlassesChildrenOut: 'N/A'
        };

        newPlan.CarrierLogo = plan.carrierLogo;
        newPlan.Price = '$' + plan.Rate;
        newPlan.Type = plan.PlanDetails.BenefitLevel;
        newPlan.Name = plan.PlanDetails.Name;
        newPlan.subsidy = plan.subsidy;

        /***** Plan Details select form *****/
        newPlan.SRate = '$' + parseFloat(plan.SRate).toFixed(2);
        newPlan.SSRate = newPlan.SDRate = newPlan.KidsRate = 'N/A';

        if (plan.SSRate != undefined)
            newPlan.SSRate = '$' + parseFloat(plan.SSRate).toFixed(2);

        if (plan.SD1Rate != undefined) {
            newPlan.SDRate = '$' + parseFloat(plan.SD1Rate).toFixed(2);
            newPlan.KidsRate = '$' + parseFloat(plan.SD1Rate - plan.SRate).toFixed(2);
        }
        if (plan.SD2Rate != undefined) {
            newPlan.SDRate = '$' + parseFloat(plan.SD2Rate).toFixed(2);
            newPlan.KidsRate = '$' + parseFloat(plan.SD2Rate - plan.SRate).toFixed(2);
        }
        if (plan.SD3Rate != undefined) {
            newPlan.SDRate = '$' + parseFloat(plan.SD3Rate).toFixed(2);
            newPlan.KidsRate = '$' + parseFloat(plan.SD3Rate - plan.SRate).toFixed(2);
        }

        if ( ('$' + parseFloat(plan.Rate).toFixed(2)) === newPlan.SRate ||
            ('$' + parseFloat(plan.Rate).toFixed(2)) === newPlan.SSRate ||
            ('$' + parseFloat(plan.Rate).toFixed(2)) === newPlan.SDRate ||
            ('$' + parseFloat(plan.Rate).toFixed(2)) === newPlan.KidsRate )
            newPlan.Rate = 'N/A';
        else
            newPlan.Rate = '$' + parseFloat(plan.Rate).toFixed(2);

        if ( newPlan.Rate !== 'N/A') {
            $scope.members = [
                {value: newPlan.SRate, label: 'Self'},
                {value: newPlan.SSRate, label: 'Self + Spouse'},
                {value: newPlan.Rate, label: 'Self + Family'},
                {value: newPlan.SDRate, label: 'Self + Children'},
                {value: newPlan.KidsRate, label: 'Children only'}
            ];

            $scope.defaultMember = $scope.members[2];
        } else {
            if ( newPlan.SSRate !== 'N/A' || newPlan.SDRate !== 'N/A' ) {
                if ( newPlan.SSRate !== 'N/A')
                    $scope.members = [
                        {value: newPlan.SRate, label: 'Self'},
                        {value: newPlan.SSRate, label: 'Self + Spouse'}
                    ];
                else
                    $scope.members = [
                        {value: newPlan.SRate, label: 'Self'},
                        {value: newPlan.SDRate, label: 'Self + Children'},
                        {value: newPlan.KidsRate, label: 'Children only'}
                    ];

                $scope.defaultMember = $scope.members[1];
            } else {
                $scope.members = [
                    {value: newPlan.SRate, label: 'Self'}
                ];

                $scope.defaultMember = $scope.members[0];
            }
        }
        /***** end Plan Details select form *****/

        planBenefits = plan.PlanDetails.Benefits['GetIfpQuote.Response.PlanDetail.Benefit'];

        planBenefits.forEach(function(benefit) {
            var benefitIn = benefit.Coverages['GetIfpQuote.Response.PlanDetail.Benefit.Coverage'][0].ViewPoints['GetIfpQuote.Response.PlanDetail.Benefit.Coverage.ViewPoint'][0].LongValue;
            if (benefit.Coverages['GetIfpQuote.Response.PlanDetail.Benefit.Coverage'].length > 1)
                var benefitOut = benefit.Coverages['GetIfpQuote.Response.PlanDetail.Benefit.Coverage'][1].ViewPoints['GetIfpQuote.Response.PlanDetail.Benefit.Coverage.ViewPoint'][0].LongValue;
            else var benefitOut = 'N/A';

            switch(benefit.Enum) {
                case 'ACA1MedicalDrugDeductible':
                    newPlan.MedicalDeductibleIn = benefitIn;
                    newPlan.MedicalDeductibleOut = benefitOut;
                    break;

                case 'ACA1EHBDrugOOPMax':
                    newPlan.AnnualOutOfPocketDetailsIn = benefitIn;
                    newPlan.AnnualOutOfPocketDetailsOut = benefitOut;
                    break; 

                case 'ACA1NurseorPhysician':
                    newPlan.OtherPractitionerIn = benefitIn;
                    newPlan.OtherPractitionerOut = benefitOut;
                    break; 

                case 'ACA1Imaging':
                    newPlan.ImagingIn = benefitIn;
                    newPlan.ImagingOut = benefitOut;
                    break;

                case 'ACA1XraysAndDiagnosticImaging':
                    newPlan.XraysIn = benefitIn;
                    newPlan.XraysOut = benefitOut;
                    break;

                case 'ACA1SpecialistVisit':
                    newPlan.SpecialistVisitIn = benefitIn;
                    newPlan.SpecialistVisitOut = benefitOut;
                    break;
                
                case 'ACA1ChiropracticCare': // ????????????????????
                    newPlan.ChiropracticIn = benefitIn;
                    newPlan.ChiropracticOut = benefitOut;
                    break;

                case 'ACA1LaboratoryServices':
                    newPlan.LaboratoryOutpatientIn = benefitIn;
                    newPlan.LaboratoryOutpatientOut = benefitOut;
                    break;

                case 'ACA1PrimaryCareVisit':
                    newPlan.PrimaryCareIn = benefitIn;
                    newPlan.PrimaryCareOut = benefitOut;
                    break;

                case 'ACA1GenericDrugs':
                    newPlan.GenericDrugsIn = benefitIn;
                    newPlan.GenericDrugsOut = benefitOut;
                    break;

                case 'ACA1PreferredBrandDrugs':
                    newPlan.PrefDrugsIn = benefitIn;
                    newPlan.PrefDrugsOut = benefitOut;
                    break;

                case 'ACA1NonPreferredBrandDrugs':
                    newPlan.NonPrefDrugsIn = benefitIn;
                    newPlan.NonPrefDrugsOut = benefitOut;
                    break;

                case 'ACA1SpecialtyDrugs':
                    newPlan.SpecDrugsIn = benefitIn;
                    newPlan.SpecDrugsOut = benefitOut;
                    break;

                case 'ACA1WellBaby':
                    newPlan.WellBabyVisitsIn = benefitIn;
                    newPlan.WellBabyVisitsOut = benefitOut;
                    break;

                case 'ACA1PreventiveCare':
                    newPlan.PreventiveCSIIn = benefitIn;
                    newPlan.PreventiveCSIOut = benefitOut;
                    break;

                case 'ACA1UrgentCareFacilities':
                    newPlan.UrgentCareIn = benefitIn;
                    newPlan.UrgentCareOut = benefitOut;
                    break;

                case 'ACA1EmergencyRoomServices':
                    newPlan.EmergencyRoomIn = benefitIn;
                    newPlan.EmergencyRoomOut = benefitOut;
                    break;

                case 'ACA1EmergencyTransportation':
                    newPlan.EmergencyTransportIn = benefitIn;
                    newPlan.EmergencyTransportOut = benefitOut;
                    break;

                case 'ACA1OutpatientSurgeryServices':
                    newPlan.OutpatientSurgeryIn = benefitIn;
                    newPlan.OurpatientSurgeryOut = benefitOut;
                    break;

                case 'ACA1OutpatientRehab':
                    newPlan.OutpatientRehabIn = benefitIn;
                    newPlan.OutpatientRehabOut = benefitOut;
                    break;

                case 'ACA1InpatientServices':
                    newPlan.InpatientPhysicianIn = benefitIn;
                    newPlan.InpatientPhysicianOut = benefitOut;
                    break;

                case 'ACA1HabilitationServices':
                    newPlan.HospitalizationIn = benefitIn;
                    newPlan.HospitalizationOut = benefitOut;
                    break;

                case 'ACA1InpatientHospitalServices':
                    newPlan.InpatientHospitalIn = benefitIn;
                    newPlan.InpatientHospitalOut = benefitOut;
                    break;

                case 'ACA1SkilledNursingFacility':
                    newPlan.SkilledNursingIn = benefitIn;
                    newPlan.SkilledNursingOut = benefitOut;
                    break;

                case 'ACA1OutpatientSubstanceAbuseServices':
                    newPlan.SubstanceAbuseOutpatientIn = benefitIn;
                    newPlan.SubstanceAbuseOutpatientOut = benefitOut;
                    break;

                case 'ACA1InpatientSubstanceAbuseServices':
                    newPlan.SubstanceAbuseInpatientIn = benefitIn;
                    newPlan.SubstanceAbuseInpatientOut = benefitOut;
                    break;

                case 'ACA1MaternalCare':
                    newPlan.DeliveryIn = benefitIn;
                    newPlan.DeliveryOut = benefitOut;
                    break;

                case 'ACA1PrenatalAndPostnatalCare':
                    newPlan.PrenatalPostnatalIn = benefitIn;
                    newPlan.PrenatalPostnatalOut = benefitOut;
                    break;

                case 'ACA1ChildRoutineEyeExam':
                    newPlan.RoutineEyeIn = benefitIn;
                    newPlan.RoutineEyeOut = benefitOut;
                    break;

                case 'ACA1EyeGlassesForChildren':
                    newPlan.EyeGlassesChildrenIn = benefitIn;
                    newPlan.EyeGlassesChildrenOut = benefitOut;
                    break;

                case 'ACA1HomeHealthCare':
                    newPlan.HomeHealthServicesIn = benefitIn;
                    newPlan.HomeHealthServicesOut = benefitOut;
                    break;

                case 'ACA1InpatientBehavioralServices':
                    newPlan.MentalBehavioralInpatientIn = benefitIn;
                    newPlan.MentalBehavioralInpatientOut = benefitOut;
                    break;

                case 'ACA1DurableMedicalEquipment':
                    newPlan.DurableEquipmentIn = benefitIn;
                    newPlan.DurableEquipmentOut = benefitOut;
                    break;

                case 'ACA1HospiceServices':
                    newPlan.HospiceIn = benefitIn;
                    newPlan.HospiceOut = benefitOut;
                    break;

                case 'ACA1BariatricSurgery': // ?????????????????
                    newPlan.BariatricIn = benefitIn;
                    newPlan.BariatricOut = benefitOut;
                    break;

                case 'ACA1OutpatientBehavioralServices':
                    newPlan.MentalBehavioralOutpatientIn = benefitIn;
                    newPlan.MentalBehavioralOutpatientOut = benefitOut;
                    break;

                case 'ACA1Acupuncture': // ???????????????????
                    newPlan.AcupunctureIn = benefitIn;
                    newPlan.AcupunctureOut = benefitOut;
                    break;

                case 'ACA1RehabSpeechTherapy':
                    newPlan.RehabilitativeSpeechIn = benefitIn;
                    newPlan.RehabilitativeSpeechOut = benefitOut;
                    break;

                case 'ACA1RehabOccupationalTherapy':
                    newPlan.RehabilitativeOccupationalIn = benefitIn;
                    newPlan.RehabilitativeOccupationalOut = benefitOut;
                    break;

                case 'ACA1Abortion':
                    newPlan.AbortionIn = benefitIn;
                    newPlan.AbortionOut = benefitOut;
                    break;

                case 'ACA1AllergyTesting':
                    newPlan.AllergyTestingIn = benefitIn;
                    newPlan.AllergyTestingOut = benefitOut;
                    break;

                case 'ACA1Chemotherapy':
                    newPlan.ChemoIn = benefitIn;
                    newPlan.ChemoOut = benefitOut;
                    break;

                case 'ACA1DiabetesEducation':
                    newPlan.DiabetesIn = benefitIn;
                    newPlan.DiabetesOut = benefitOut;
                    break;

                case 'ACA1Dialysis':
                    newPlan.DialysisIn = benefitIn;
                    newPlan.DialysisOut = benefitOut;
                    break;

                case 'ACA1InfusionTherapy':
                    newPlan.InfusionIn = benefitIn;
                    newPlan.InfusionOut = benefitOut;
                    break;

                case 'ACA1ProstheticDevices':
                    newPlan.ProstheticIn = benefitIn;
                    newPlan.ProstheticOut = benefitOut;
                    break;

                case 'ACA1Radiation':
                    newPlan.RadiationIn = benefitIn;
                    newPlan.RadiationOut = benefitOut;
                    break;

                case 'ACA1ReconstructiveSurgery':
                    newPlan.ReconstructiveIn = benefitIn;
                    newPlan.ReconstructiveOut = benefitOut;
                    break;

                case 'ACA1Transplant':
                    newPlan.TransplantIn = benefitIn;
                    newPlan.TransplantOut = benefitOut;
                    break;

                case 'ACA1JointDisorders':
                    newPlan.JointDisordersIn = benefitIn;
                    newPlan.JointDisordersOut = benefitOut;
                    break;
            }
        });

        $scope.Plan = newPlan;
    });

    $scope.Plan = [];
    
    $scope.button = {
        radio: 0
    };

    $scope.subsidyValue = ($routeParams.id).split('-')[1];
    $scope.maxMonthly = ($routeParams.id).split('-')[2];
  }]);