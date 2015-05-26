// node-soap functionality ***********************
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var fs = require('fs');
var NodeCache = require( "node-cache" );
var mysql     = require('mysql');
var bcrypt    = require('bcrypt-nodejs');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   database : 'edec',
//   user     : 'root'
// });

var connection = mysql.createConnection({
  host     : '85.122.23.145',
  database : 'EDeC',
  user     : 'EDeC',
  password : 'HYsMJeN3LH'
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

function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd < 10) {
      dd='0'+dd
  } 

  if(mm < 10) {
      mm='0'+mm
  } 

  today = dd+'-'+mm+'-'+yyyy;
  return today;
}

//************************************************


var commentText = "This is a test comment generated automatically, in order to populate the comments table with 500.000 records.";

// connection.query ('SELECT * FROM users', function(err, rows, fields) {
//   if (err) throw err;
//   else {
  
//     console.log(rows);

//     var i;

//     for (i = 0; i < 1; i++) {
//       var randomUser = (Math.floor((Math.random() * rows.length) + 1)) - 1;
//       // if (randomUser >= rows.length) randomUser = rows.length - 1;
//       // console.log(randomUser);
//       var userToComment = rows[randomUser].username;
//       var idUserToComment = rows[randomUser].id_users;
      
//       var today = getTodayDate();
//       // console.log(today);

//       var numberOfCommentLines = Math.floor((Math.random() * 2) + 1);
//       // console.log(numberOfCommentLines);
//       var j, tempComment = commentText + " ";
//       for (j = 0; j < numberOfCommentLines; j++) {
//         tempComment += commentText + " ";
//       }

//       var tempRating = Math.floor((Math.random() * 5) + 1);

//       var productToComment = Math.floor((Math.random() * 50) + 1);

//       var comment = {
//         id_user    : idUserToComment,
//         id_product : productToComment,
//         postDate   : today,
//         comm       : tempComment,
//         rating     : tempRating
//       }

//       // connection.query('INSERT INTO comments SET ?', comment, function(err, results) {
//       //   if (err) throw err;
//       // });
//     }
//   }
// });


// expose the routes to our app with module.exports
module.exports = function(app) {

  app.get('/api/homepage', function(req, res) {
    var response = {
      randomProducts: '',
      username: 0
    }
    var getRandomProductsQuery = 'SELECT id_product, name, description, image FROM product ORDER BY RAND() LIMIT 4';
    connection.query (getRandomProductsQuery, function(err, rows, fields) {
      if (err) throw err;
      response.randomProducts = rows;

      if (req.session.username) {
        response.username = req.session.username;
      }

      res.json(response);

    });
  });

  app.get('/api/products/:pager', function(req, res) {
    var limitUpperProduct = req.params.pager;
    var limitLowerProduct = req.params.pager - 1;
    var queryStringUsername = 'SELECT id_product, name, description, rating, image FROM product WHERE id_product BETWEEN 12*?+1 AND 12*?';
    connection.query (queryStringUsername, [limitLowerProduct, limitUpperProduct], function(err, rows, fields) {
         if (err) throw err;
         res.json(rows);
    });         
  });

   app.get('/api/product/:idProduct', function(req, res) {
    console.log(req.params.idProduct);
    var response = {
      productData: '',
      productComments: ''
    };
    var queryStringProduct = 'SELECT * FROM product WHERE id_product=?';
    var queryStringComments = 'SELECT u.username, DATE_FORMAT(c.postDate,"%d/%m/%Y") AS postDate, c.comm, c.rating FROM comments c JOIN users u ON c.id_user=u.id_users WHERE c.id_product=' + req.params.idProduct + ' ORDER BY c.postDate DESC LIMIT 4 ';
    connection.query (queryStringProduct, [req.params.idProduct], function(err, rows, fields) {
        if (err) throw err;
        response.productData=rows;
        connection.query (queryStringComments, function(err, rows, fields) {
        if (err) throw err;
        //console.log(rows);
         response.productComments=rows;
         res.json(response);
        });   
    });         
  });

  app.post('/api/register', function(req, res) {

    console.log(req.body);
    var ok=1;
    var queryStringUsername = 'SELECT Count(username) AS userNumber FROM users WHERE username= ? ';
    var queryStringMail = 'SELECT Count(mail) AS mailNumber FROM users WHERE mail=? ';
    var temp = {
        username : req.body.username ,
        password : bcrypt.hashSync(req.body.password),
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
       connection.query (queryStringUsername, [temp.username], function(err, rows, fields) {
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

app.get('/api/profile', function(req, res) {
  var queryStringUser = 'SELECT id_users,username,mail,name,lastname,gender,DATE_FORMAT(birthday,"%d/%m/%Y") AS birthday ,address FROM users WHERE username = ?';
    connection.query (queryStringUser, [req.session.username], function(err, rows, fields) {
         if (err) throw err;
         res.json(rows);
    }); 
});
app.post('/api/profile', function(req, res) {
  var queryStringMail = 'SELECT Count(mail) AS mailNumber FROM users WHERE mail= ?  and username != ? ';
  //var queryStringUsername = 'SELECT Count(username) AS userNumber FROM users WHERE username= ?  and id_users != ?';
    console.log(req.body);
    if(req.body.password)
    {
    var temp ={
      first_name:  req.body.first_name,
      last_name :  req.body.last_name,
      address   :  req.body.address,
      //username  :  req.body.username,
      password  :  bcrypt.hashSync(req.body.password),
      mail      :  req.body.mail
      };

      // connection.query('UPDATE users SET name = ? ,lastname= ?, address = ?,password=?, mail= ? where username=?' ,[temp.first_name, temp.last_name, temp.address, temp.password,temp.mail, req.session.username], function(err, rows,fields) {
      //     if(err) throw err;
      // });
    }
    else
    {

      var temp ={
      first_name:  req.body.first_name,
      last_name :  req.body.last_name,
      address   :  req.body.address,
      //username  :  req.body.username,
      mail      :  req.body.mail
      };
      // connection.query('UPDATE users SET name = ? ,lastname= ?, address = ?, mail= ? where username=?' ,[temp.first_name, temp.last_name, temp.address, temp.mail, req.session.username], function(err, rows,fields) {
      //     if(err) throw err;
      // });
    }



    // if(temp.username)
    // {
    //       connection.query(queryStringUsername,[temp.username], function(err,rows,fields)
    //       {
    //       if(err) throw err;
    //            if(rows[0].userNumber>0) 
    //            {
    //                 console.log("Username already exists" ); 
    //                // registerErrorCode = 1;
    //                 okUser=1;
    //            } 
    //       });
    //  }

    if(temp.mail!= null)
    {
          connection.query (queryStringMail, [temp.mail,req.session.username], function(err, rows,fields) 
          {
              if (err) throw err;

              if(rows[0].mailNumber > 0) 
              {
                  console.log("Mail already exists");
                  //registerErrorCode = 2;
                 
              }
              else
              {
                connection.query('UPDATE users SET mail = ? WHERE username = ?' , [temp.mail, req.session.username], function(err,rows,fields)
                {
                    if(err) throw err;
                });

              }
          });
    }
                    

  if(temp.first_name)
  {
    connection.query('UPDATE users SET name = ? WHERE username = ?' , [temp.first_name, req.session.username], function(err,rows,fields)
    {
        if(err) throw err;
    });
  }

  if(temp.username)
    {
      connection.query(queryStringUpdate , [username,temp.username, req.session.username], function(err,rows,fields)
      {
          if(err) throw err;
      });
    }

  

  if(temp.last_name)
    {
      connection.query('UPDATE users SET lastname = ? WHERE username = ?' , [temp.last_name, req.session.username], function(err,rows,fields)
      {
          if(err) throw err;
      });
    }

  if(temp.address)
    {
      connection.query('UPDATE users SET address = ? WHERE username = ?', [temp.address, req.session.username], function(err,rows,fields)
      {
          if(err) throw err;
      });
    }

  if(temp.password!= null)
    {
      connection.query('UPDATE users SET password = ? WHERE username = ?', [temp.password, req.session.username], function(err,rows,fields)
      {
          if(err) throw err;
      });
    }


    res.redirect('/homepage');
        
  });

  app.post('/api/login', function(req, res) {
    var queryStringLogin = 'SELECT password FROM users WHERE username = ?';
    var loginErrorCode = 0;
    console.log(req.body.username, req.body.password);
    connection.query(queryStringLogin, [req.body.username], function(err, rows, fields) {
      if (err) throw err;
   
      if (rows[0] == null) {
        loginErrorCode = 1;
        console.log("Username is invalid" ); 
        res.redirect('/login?error=' + loginErrorCode);
      } else if (!bcrypt.compareSync(req.body.password, rows[0].password)) {
        loginErrorCode = 1;
        console.log("Password is invalid");
        res.redirect('/login?error=' + loginErrorCode);
      } else {
        console.log("Good credentials");
        req.session.username = req.body.username;
        res.redirect('/homepage');
      }
    })
  });

  app.get('/api/logout', function(req, res) {
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
    res.redirect('/');
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