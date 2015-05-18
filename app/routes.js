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


  app.get('/api/products/:pager', function(req, res) {
    console.log(req.params.pager);
    var limitUpperProduct = req.params.pager;
    var limitLowerProduct = req.params.pager - 1;
    var queryStringUsername = 'SELECT name, description, rating, image FROM product WHERE id_product BETWEEN 21*?+1 AND 21*?';
    connection.query (queryStringUsername, [limitLowerProduct, limitUpperProduct], function(err, rows, fields) {
         if (err) throw err;
         res.json(rows);
    });         
  });

  app.post('/api/register', function(req, res) {

    console.log(req.body);
    var ok=1;
    var queryStringUsername = 'SELECT Count(username) AS userNumber FROM users WHERE username= ? ';
    var queryStringMail = 'SELECT Count(mail) AS mailNumber FROM users WHERE mail=? ';
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
        address  : req.body.address
    };

    var registerErrorCode = 0;

    if (temp.username) {
       connection.query (queryStringUsername, [temp.username],function(err, rows, fields) {
        if (err) throw err;
          if(rows[0].userNumber > 0) {
                console.log("Username already exists" ); 
                registerErrorCode = 1;
          } else {
            connection.query (queryStringMail, [temp.mail], function(err, rows,fields) {
              if (err) throw err;

              if(rows[0].mailNumber > 0) {
                  console.log("Mail already exists");
                  registerErrorCode = 2;
              } else {
                connection.query ('INSERT INTO users SET ?', temp, function(err, result) {
                  if (err) throw err; 
                });

                connection.query('SELECT * FROM users', function(err, rows, fields) {
                  if (err) throw err;
                });
              }
            });
          }
          res.redirect('/register?error=' + registerErrorCode);
      });
    }
  });

  app.post('/api/login', function(req, res) {

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

        
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};