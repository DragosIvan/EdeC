// node-soap functionality ***********************
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var fs = require('fs');
var NodeCache = require( "node-cache" );
var mysql     = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'edec',
  user     : 'root'
});

connection.connect();

// Variables declaration

var products = new NodeCache();

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp*1000);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var day = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate() < 10 ? day[a.getDate()] : a.getDate();
  var time = year + '-' + month + '-' + date;
  return time;
}

function dateParser(date) {
  var arr = date.split('-');
  var newDate = arr[2] + '-' + arr[0] + '-' + arr[1];
  return newDate;
}

//************************************************

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.get('/api/homepage', function(req, res) {
    connection.query('SELECT COUNT(*) AS usernumber FROM users', function(err, rows, fields) {
      if (err) throw err;
      
      console.log(rows[0].usernumber);     
    });
   
  //  connection.query('SELECT * FROM product', function(err, rows, fields) {
  //    if (err) throw err;

  // console.log('The solution is: ', rows[0]);

  //    //res.json(rows);
  //   });

  // res.send("Hello ! Is it me you're.. looking for ?");
  // var temp = {
  //    username: "Yolanda",password :"cacat", question:
  //    "first pet name" , answer :" Rica", mail: "banana.ioana@yahoo.com"
  //    ,name: "iftenie", lastname : "Ioana", gender: "f",
  //    birthday : "16-01-1994", adress: "iasi"

  // };
  //res.json(temp);
  // connection.query('insert into '+EDeC.users +( 'username', 'password', 'question', 'answer', 
  //   'mail', 'name', 'lastname', 'gender', 'birthday', 'adress')VALUES (temp.username ,
  //    temp.password , temp.question , temp.answer, temp.mail,
  //    temp.name, temp.lastname ,temp.gender,temp.birthday ),
  // function selectCb(err, results, fields) {
  //     if (err) throw err;
  //     else res.send('success');
  // });
  //  connection.query ('INSERT INTO users SET ?', temp, function(err, result) {
  //   if (err) throw err;
  //   else
  //    result = "doneaaaaa";
  //    res.json(result);
  // });
  //  connection.query('SELECT * FROM users', function(err, rows, fields) {
  //    if (err) throw err;
  //    res.json(rows);
  //   });
  });
     
  app.get('/api/tasks', function(req, res) {
    res.send("EDeC Task Page");
  });

  app.post('/api/register', function(req, res) {

    console.log(req.body);
    var temp = {
        username : req.body.username ,
        password : req.body.password,
        question : req.body.security_question , 
        answer   : req.body.security_answer ,
        mail     : req.body.mail ,
        name     : req.body.first_name ,
        lastname : req.body.last_name ,
        gender   : req.body.gender ,
        birthday : req.body.birthday ,
        adress   : req.body.address
    };
      
      if (temp.username) {
        connection.query ('INSERT INTO users SET ?', temp, function(err, result) {
             if (err) throw err;
              });
        connection.query('SELECT * FROM users', function(err, rows, fields) {
             if (err) throw err;
                res.json(rows);
           });
      }
    });
  // app.post('/api/familyDetails', function(req, res) {
  //     if (parsedFamilyObject == null) {
  //       parsedFamilyObject = req.body;

  //       soap.createClient( url, endpoint, function( err, client ) {
  //       if (err)
  //         console.log(err);
  //       else {
  //         var getCountiesXml = new XML("<ns:GetCounties xmlns:ns='http://www.quotit.com/Services/ActWS/ACA/2'>" +
  //           "<ns:GetCountiesRequest>" +
  //             "<AccessKeys>" +
  //               "<RemoteAccessKey>392B9F8F-4E75-4B19-B509-D6A6602B6E5B</RemoteAccessKey>" +
  //             "</AccessKeys>" +
  //             "<Inputs>" +
  //               "<ZipCode>" + parsedFamilyObject.Members[0].ZipCode + "</ZipCode>" +
  //             "</Inputs>" +
  //           "</ns:GetCountiesRequest>" +
  //          "</ns:GetCounties>" );

  //         globalClient = client;
  //         globalClient.ACA.BasicHttpBinding_IACA.GetCounties(getCountiesXml.toXMLString(), function(err, result) {
  //           if (err)
  //             console.log(err);
  //           else {
  //             if (parsedFamilyObject.Members[0].CountyName == null || parsedFamilyObject.Members[0].CountyName == '') {
  //               parsedFamilyObject.Members[0].CountyName = '';
                
  //               result.GetCountiesResult.Counties['GetCounties.Response.County'].forEach( function(county) {
  //                 parsedFamilyObject.Members[0].CountyName += county.CountyName + '&&';
  //               });

  //               parsedFamilyObject.CountyName = parsedFamilyObject.Members[0].CountyName;
  //               parsedFamilyObject.State = result.GetCountiesResult.Counties['GetCounties.Response.County'][0].State;
  //             }

  //             parsedFamilyObject.Members.forEach(function(member) {
  //               if (member.ZipCode == parsedFamilyObject.Members[0].ZipCode && (member.CountyName == null || member.CountyName == ''))
  //                 member.CountyName = parsedFamilyObject.Members[0].CountyName;
  //               else if (member.Zipcode != parsedFamilyObject.Members[0].ZipCode && (member.CountyName == null || member.CountyName == '')) {
  //                 getCountiesXml = new XML("<ns:GetCounties xmlns:ns='http://www.quotit.com/Services/ActWS/ACA/2'>" +
  //                   "<ns:GetCountiesRequest>" +
  //                     "<AccessKeys>" +
  //                       "<RemoteAccessKey>392B9F8F-4E75-4B19-B509-D6A6602B6E5B</RemoteAccessKey>" +
  //                     "</AccessKeys>" +
  //                     "<Inputs>" +
  //                       "<ZipCode>" + member.ZipCode + "</ZipCode>" +
  //                     "</Inputs>" +
  //                   "</ns:GetCountiesRequest>" +
  //                  "</ns:GetCounties>" );
  //                 globalClient.ACA.BasicHttpBinding_IACA.GetCounties(getCountiesXml.toXMLString(), function(err, result) {
  //                   if (err)
  //                     console.log(err);
  //                   else {
  //                     member.CountyName = '';
              
  //                     result.GetCountiesResult.Counties['GetCounties.Response.County'].forEach( function(county) {
  //                       member.CountyName += county.CountyName + '&&';
  //                     });
  //                   }
  //                 });
  //               }
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }

  //   if (req.body.applicantCounty != undefined) {
  //     HouseholdSize = 1;
  //     parsedFamilyObject.HouseholdSize = 1;

  //     parsedFamilyObject.CountyName = req.body.applicantCounty;

  //     parsedFamilyObject.Members[0].LiveinHousehold = '1';
  //     parsedFamilyObject.Members[0].CountyName = req.body.applicantCounty;
  //     parsedFamilyObject.Members[0].RelationshipType = 'Self';

  //     if (req.body.applicantDateLastSmoked != '')
  //         parsedFamilyObject.Members[0].DateLastSmoked = req.body.applicantDateLastSmoked;
  //       else parsedFamilyObject.Members[0].DateLastSmoked = '0' 

  //     if (req.body.applicantDateLastSmoked != '') {
  //       parsedFamilyObject.Members[0].DateLastSmoked = req.body.applicantDateLastSmoked;
  //       parsedFamilyObject.Members[0].IsSmoker = '1';
  //     }
  //     else {
  //       parsedFamilyObject.Members[0].DateLastSmoked = '0';
  //       parsedFamilyObject.Members[0].IsSmoker = '0';
  //     }

  //     // Spouse Field
  //     if (req.body.spouseRelationship != undefined) {

  //       if (req.body.spouseLiveInHousehold == 'Y') {
  //         HouseholdSize++;
  //         parsedFamilyObject.HouseholdSize++;
  //         parsedFamilyObject.Members[1].LiveinHousehold = '1';
  //       } else {
  //         parsedFamilyObject.Members[1].LiveinHousehold = '0';
  //       }

  //       parsedFamilyObject.Members[1].Gender = req.body.spouseGender;
  //       parsedFamilyObject.Members[1].RelationshipType = req.body.spouseRelationship;
  //       parsedFamilyObject.Members[1].CountyName = req.body.spouseCounty;

  //       if (req.body.spouseDateLastSmoked != '') {
  //         parsedFamilyObject.Members[1].DateLastSmoked = req.body.spouseDateLastSmoked;
  //         parsedFamilyObject.Members[1].IsSmoker = '1';
  //       }
  //       else {
  //         parsedFamilyObject.Members[1].DateLastSmoked = '0';
  //         parsedFamilyObject.Members[1].IsSmoker = '0';
  //       } 
  //     }
  //     // End Spouse Field

  //     //Dependents Fields
  //     var i = 0;
  //     parsedFamilyObject.Members.forEach( function(member) {
  //       if (member.MemberType == 'Dependent') {
  //         i++;

  //         if (req.body['dependentLiveInHousehold'+i] == 'Y') {
  //           HouseholdSize++;
  //           parsedFamilyObject.HouseholdSize++;
  //           member.LiveinHousehold = '1';
  //         } else {
  //           member.LiveinHousehold = '0';
  //         }

  //         member.Gender = req.body['dependentGender'+i];
  //         member.RelationshipType = req.body['dependentRelationship'+i];
  //         member.CountyName = req.body['dependentCounty'+i];

  //         if (req.body['dependentDateLastSmoked'+i] != ''){
  //           member.DateLastSmoked = req.body['dependentDateLastSmoked'+i];
  //           member.IsSmoker = '1';
  //         }
  //         else {
  //           member.DateLastSmoked = '0';
  //           member.IsSmoker = '0';
  //         }
  //       }
  //     });
  //     //End Dependents Fields

  //   }
    
  //   oldOnOff = '';
  //   familyId = null;

  //   res.redirect('/plans/subsidy/0');
  // });


  // // api ---------------------------------------------------------------------
  // // get all plans
  // allPlansCache.set( "allPlans" );

  // app.get('/api/plans', function(req, res) {
  //   var onOff = estimatedMaxMonthlyPremium > 0 ? "HealthOnExchange" : "HealthOffExchange";

  //   if (onOff != oldOnOff) {
  //     allPlansCache.set( "allPlans", null, function( err, success ) {
  //       if (err) console.log(err);
  //     });
  //     oldOnOff = onOff;
  //   }

  //   var membersString = '<Members>\n';

  //   parsedFamilyObject.Members.forEach(function(member) {
  //     membersString += '<Family.Member>\n';
  //     membersString += '<MemberId>' + member.MemberID + "</MemberId>\n";
  //     membersString += '<MemberType>' + member.MemberType + '</MemberType>\n';
  //     membersString += '<RelationshipType>' + member.RelationshipType + '</RelationshipType>\n';
  //     membersString += '<DateOfBirth>' + timeConverter(member.DateOfBirth) + '</DateOfBirth>\n';
  //     membersString += '<Gender>' + member.Gender + '</Gender>\n';
  //     membersString += '<IsSmoker>' + member.IsSmoker + '</IsSmoker>\n';
      
  //     if (member.IsSmoker.toString() == '1' && member.DateLastSmoked != null) 
  //       membersString += '<DateLastSmoked>' + dateParser(member.DateLastSmoked) + '</DateLastSmoked>\n';
      
  //     membersString += '<LivesInHousehold>' + member.LiveinHousehold + '</LivesInHousehold>\n';
  //     membersString += '<ZipCode>' + member.ZipCode + '</ZipCode>\n';
  //     membersString += '<CountyName>' + member.CountyName + '</CountyName>\n';
  //     membersString += '</Family.Member>\n';
  //   });

  //   membersString += '</Members>\n';

  //   if (familyId == null) {
  //     var submitFamilyXml = new XML("<ns:SubmitFamily xmlns:ns='http://www.quotit.com/Services/ActWS/ACA/2'>" + 
  //       "<ns:request>" +
  //         "<RemoteAccessKey>392B9F8F-4E75-4B19-B509-D6A6602B6E5B</RemoteAccessKey>" +
  //         "<WebsiteAccessKey>392B9F8F-4E75-4B19-B509-D6A6602B6E5B</WebsiteAccessKey>" +
  //         "<BrokerId>23521816</BrokerId>" + 
  //           "<Family>" +
  //              "<InsuranceType>" + onOff + "</InsuranceType>" +
  //              "<EffectiveDate>" + timeConverter(parsedFamilyObject.EffectiveDate) + "</EffectiveDate>" +
  //              "<OkToSendEmail>false</OkToSendEmail>" +
  //              "<PhysicalAddress>" +
  //                 "<State>" + parsedFamilyObject.State + "</State>" +
  //                 "<CountyName>" + parsedFamilyObject.CountyName + "</CountyName>" +
  //                 "<ZipCode>" + parsedFamilyObject.ZipCode + "</ZipCode>" +
  //              "</PhysicalAddress>" +
  //              membersString +
  //           "</Family>" +
  //       "</ns:request>" +
  //      "</ns:SubmitFamily>" );

  //     globalClient.ACA.BasicHttpBinding_IACA.SubmitFamily(submitFamilyXml.toXMLString(), function(err, result) {
  //       if (err)
  //         console.log(err);
  //       else {
  //         familyId = result.SubmitFamilyResult.FamilyId;
  //       }
  //     });
  //   }

  //   if ( allPlansCache.get( "allPlans" ).allPlans === null ) {
  //     var getIfpMembers = membersString.replace(/Family.Member/g, 'GetIfpQuote.Request.Member');

  //     var getIfpQuoteXml = new XML("<ns:GetIfpQuote xmlns:ns='http://www.quotit.com/Services/ActWS/ACA/2'>" +
  //         "<ns:QuoteRequest>" +
  //           "<RemoteAccessKey>392B9F8F-4E75-4B19-B509-D6A6602B6E5B</RemoteAccessKey>" +
  //           "<WebsiteAccessKey>392B9F8F-4E75-4B19-B509-D6A6602B6E5B</WebsiteAccessKey>" +
  //           "<BrokerId>23521816</BrokerId>" + 
  //           "<IfpRateFactors>" +
  //             "<EffectiveDate>" + timeConverter(parsedFamilyObject.EffectiveDate) + "</EffectiveDate>" +
  //             "<ZipCode>" + parsedFamilyObject.ZipCode + "</ZipCode>" +
  //             "<HouseholdSize>" + parsedFamilyObject.HouseholdSize + "</HouseholdSize>" +
  //             getIfpMembers +
  //           "</IfpRateFactors>" +
  //           "<Preferences>" +
  //             "<InsuranceTypes>" +
  //               "<InsuranceType>" + onOff + "</InsuranceType>" +
  //             "</InsuranceTypes>" +
  //             "<PlanVisibility>OnAny</PlanVisibility>" +
  //             "<PlanEligibility>FullEligibilityOnly</PlanEligibility>" +
  //             "<QuoteFormat>PlanMembersDetail</QuoteFormat>" +
  //             "<BenchmarkPlan>Designate</BenchmarkPlan>" +
  //             "<AddOns>" +
  //               "<GetIfpQuote.AddOn>CarrierDetails</GetIfpQuote.AddOn>" +
  //               "<GetIfpQuote.AddOn>PlanDetails</GetIfpQuote.AddOn>" +
  //               "<GetIfpQuote.AddOn>BenefitsTiny</GetIfpQuote.AddOn>" +
  //               "<GetIfpQuote.AddOn>BenefitsLong</GetIfpQuote.AddOn>" +
  //             "</AddOns>" +
  //             "<LevelOfBenefitAddOns>ViewPoints</LevelOfBenefitAddOns>" +
  //           "</Preferences>" +
  //        "</ns:QuoteRequest>" +
  //       "</ns:GetIfpQuote>" );
  
  //     globalClient.ACA.BasicHttpBinding_IACA.GetIfpQuote(getIfpQuoteXml.toXMLString(), function(err, result) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         plans = result.GetIfpQuoteResult.IfpQuote;
  //         allPlansCache.set( "allPlans", plans, function( err, success ) {
  //           if( !err && success )
  //             res.json(allPlansCache.get( "allPlans" ).allPlans);
  //         });
  //       }
  //     });
  //   }
  //   else {
  //     res.json(allPlansCache.get( "allPlans" ).allPlans);
  //   }

  // });


  // // api ---------------------------------------------------------------------
  // // get details plan
  // app.get('/api/plans/:id', function(req, res) {
  //   var plansStructure = allPlansCache.get( "allPlans" ).allPlans.Carriers['GetIfpQuote.Response.Quote.CarrierRate'];
  //   var detailsPlan;
  //   plansStructure.forEach(function(plans) {
  //     var carrierLogo = plans.CarrierDetails.LogoFileLarge;
  //     plans.PlanRates['GetIfpQuote.Response.Quote.CarrierRate.PlanRate'].forEach(function(element){
  //       if (element.PlanId == req.params.id.split('-')[0]) {
  //         element.carrierLogo = carrierLogo;
  //         element.subsidy = req.params.id.split('-')[1];
  //         detailsPlan = element;
  //       }
  //     });
  //   });

  //   res.json(detailsPlan);
  // });


  // // api ---------------------------------------------------------------------
  // // get plans to comparison
  // app.get('/api/comparison/:plansIds', function(req, res) {
  //   var arr1 = req.params.plansIds.split('["')[1];
  //   var arr2 = arr1.split('"]')[0];
  //   var arr3 = arr2.split('","');

  //   var plansStructure = allPlansCache.get( "allPlans" ).allPlans.Carriers['GetIfpQuote.Response.Quote.CarrierRate'];
  //   var detailsPlan = new Array();

  //   plansStructure.forEach(function(plans) {
  //     var carrierLogo = plans.CarrierDetails.LogoFileMediumTransparent;
  //     plans.PlanRates['GetIfpQuote.Response.Quote.CarrierRate.PlanRate'].forEach(function(element){
  //       arr3.forEach(function(elem) {
  //         if (element.PlanId == elem) {
  //           element.carrierLogo = carrierLogo;
  //           detailsPlan.push(element);
  //         }
  //       });
  //     });
  //   });

  //   res.json(detailsPlan);
  // });


  // // api ---------------------------------------------------------------------
  // // subsidy
  // app.get('/api/subsidy/:subsid', function(req, res) {
  //   var subsidyObj = xlsx.parse('./subsidy.xlsx');

  //   var selector = 2;
  //   if (parseInt(parsedFamilyObject.Members[0].ZipCode) >= 96701 && parseInt(parsedFamilyObject.Members[0].ZipCode) <= 96898) selector =  3;
  //   else if (parseInt(parsedFamilyObject.Members[0].ZipCode) >= 99501 && parseInt(parsedFamilyObject.Members[0].ZipCode) <= 99950) selector = 4;

  //   var fpl = parseFloat(String(subsidyObj[selector].data[HouseholdSize - 1][1]).replace('.', '').replace(' $ ', '')).toFixed(2);
  //   var householdIncome = req.params.subsid;
  //   var fplPercentage = parseFloat(householdIncome / fpl);
  //   var fplPercentage2 = Math.floor(100 * (householdIncome / fpl)) / 100;    
  //   var maxOfIncome = subsidyObj[1].data;
  //   var maxOfIncome2 = '';
  //   var programElegibility = '';
  //   var costShareReduction = '';
  
  //   maxOfIncome2 = 0;
  //   for (var i = 0; i < maxOfIncome.length-1; i++) {
  //     if (maxOfIncome[i][0] <= fplPercentage && maxOfIncome[i+1][0] > fplPercentage) {
  //       maxOfIncome2 = maxOfIncome[i][1];
  //       if (typeof maxOfIncome2 !== 'string') maxOfIncome2 *= 100;
  //       else if (maxOfIncome2 == 'N/A') maxOfIncome2 = 0;
  //       programElegibility = maxOfIncome[i][2];
  //       costShareReduction = maxOfIncome[i][3];
  //       break;
  //     }
  //   }

  //   var estimatedMaxAnnualPremium = parseFloat((householdIncome * String(maxOfIncome2).replace(',', '.').replace('%', '')) / 100).toFixed(2);
  //   estimatedMaxMonthlyPremium = parseFloat(estimatedMaxAnnualPremium / 12).toFixed(2);
    
  //   res.json(estimatedMaxMonthlyPremium);
  // });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};