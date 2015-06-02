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
var commentLimit = []; commentLimit[0] = 0, globalIdProduct = 0;

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
  // var dd = today.getDate();
  // var mm = today.getMonth()+1;
  // var yyyy = today.getFullYear();

  // if(dd < 10) {
  //     dd='0'+dd
  // } 

  // if(mm < 10) {
  //     mm='0'+mm
  // } 

  // today = yyyy+'-'+mm+'-'+dd;
  return today;
}

//************************************************

// var commentText = "This is a test comment generated automatically, in order to populate the comments table with 500.000 records.";

// connection.query ('SELECT * FROM users', function(err, rows, fields) {
//   if (err) throw err;
//   else {
  
//     // console.log(rows);

//     var i;

//     for (i = 0; i < 500; i++) {
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

//       connection.query('UPDATE product SET rating = (totalRating+1)/(totalVoters+1), totalRating = totalRating+?, totalVoters = totalVoters+1, total_' + comment.rating + ' = ' + comment.rating + ' WHERE id_product = ?', [comment.rating, comment.id_product], function(err, rows, fields) {
//         if (err) throw err;
//       });

//       connection.query('INSERT INTO comments SET ?', comment, function(err, results) {
//         if (err) throw err;
//       });
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
    connection.query(getRandomProductsQuery, function(err, rows, fields) {
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
    var queryStringProducts = 'SELECT id_product, name, description, rating, image FROM product WHERE id_product BETWEEN 12*?+1 AND 12*?';
    connection.query (queryStringProducts, [limitLowerProduct, limitUpperProduct], function(err, rows, fields) {
         if (err) throw err;
         res.json(rows);
    });        
  });

  app.get('/api/product/:idProduct/comments/:pager', function(req, res) {
    var response = {
      productData: '',
      productComments: ''
    };

    if (req.params.idProduct != globalIdProduct) {
      commentLimit = []; commentLimit[0] = 0;
      globalIdProduct = req.params.idProduct;
    }

    var queryStringProduct = 'SELECT * FROM product WHERE id_product=?';
    var queryStringComments = 'SELECT u.username, DATE_FORMAT(c.postDate,"%d-%m-%Y") AS postDate, c.rating, c.comm, c.id_comm FROM comments c JOIN users u ON c.id_user=u.id_users WHERE c.id_comm > ? AND c.id_product=' + req.params.idProduct +  ' ORDER BY c.id_comm DESC LIMIT 12';

    connection.query(queryStringProduct, [req.params.idProduct], function(err, rows, fields) {
        if (err) throw err;
        response.productData = rows;
        connection.query(queryStringComments, [commentLimit[req.params.pager-1]], function(err, rows, fields) {
          if (err) throw err;
          if (rows.length <= 0) {
            console.log('here');
            res.redirect('/product/' + req.params.idProduct + '/comments/' + req.params.pager-1);
          } else {
            response.productComments = rows;
            if (req.params.pager >= commentLimit.length) commentLimit.push(rows[rows.length-1].id_comm);
            res.json(response);
          }
        });   
    });        
  });

  app.get('/api/product/:idProduct', function(req, res) {
   
    var queryStringProduct = 'SELECT * FROM product WHERE id_product=?';
    var queryStringComments = 'SELECT u.username, DATE_FORMAT(c.postDate,"%d-%m-%Y") AS postDate, c.comm, c.rating  FROM comments c JOIN users u ON c.id_user=u.id_users WHERE c.id_product=' + req.params.idProduct + ' ORDER BY  c.id_comm DESC LIMIT 4 ';

     var response = {
      productData: '',
      productComments: ''
    };
    connection.query (queryStringProduct, [req.params.idProduct], function(err, rows, fields) {
        if (err) throw err;
        
        response.productData = rows;
        connection.query (queryStringComments, function(err, rows, fields) {
        if (err) throw err;
         response.productComments = rows;
         res.json(response);

        });   
    });        
  }); 

  app.post('/api/product/:idProduct', function(req, res) {
    // console.log(body.req.ratingForm);
    console.log(req.session.username);
    var id;
    var queryStringFindIdUser = 'SELECT id_users as idFound FROM users WHERE username = ?';
    var queryStringInsertComment = 'INSERT INTO comments SET ?';
    var queryStringGetRating = 'SELECT totalRating AS tr,totalVoters AS tv FROM product WHERE id_product = ?';
    var queryStringUpdateRating = 'UPDATE product SET totalRating = ?, totalVoters = ? WHERE id_product = ?';
   
    connection.query (queryStringFindIdUser, [req.session.username], function(err, rows, fields) {
      if (err) throw err;
      if(rows.length<=0)
         res.redirect('/login');
      else
      {
          console.log(rows);

          var date = getTodayDate();

          var temp = {
            id_user : rows[0].idFound,
            id_product : req.body.productId,
            postDate : date,
            comm : req.body.commentForm,
            rating : req.body.ratingForm
          };
          connection.query (queryStringInsertComment, temp, function(err, rows, fields) {
              if (err) throw err;

              connection.query (queryStringGetRating,[req.params.idProduct] , function(err, rows, fields) {
                if (err) throw err;
                var rating = parseInt(rows[0].tr ) + parseInt(temp.rating);
                var increment = rows[0].tv + 1;

                  connection.query (queryStringUpdateRating,[rating,increment ,req.params.idProduct] , function(err, rows, fields) {
                  if (err) throw err;
                 }); 
             }); 
              res.redirect('/product/' + req.body.productId);
          }); 
      }
    });
  });


app.get('/api/friendProfile/:idUser', function(req, res) {
  var queryStringFindGoodComm = 'SELECT c.id_comm, c.id_user, c.id_product, c.postDate, c.comm,c.rating ,p.name FROM comments c , users u ,product p WHERE c.rating >=3 AND u.id_users = ? AND u.id_users = c.id_user order by c.id_comm DESC limit 5';
  var queryStringFindBadComm = 'SELECT c.id_comm, c.id_user, c.id_product, c.postDate, c.comm,c.rating ,p.name FROM comments c , users u ,product p WHERE c.rating <3 AND u.id_users = ? AND u.id_users = c.id_user order by c.id_comm DESC limit 5';
  var queryStringUser = 'SELECT id_users, username, mail, name, lastname, gender, DATE_FORMAT(birthday,"%d/%m/%Y") AS birthday, address FROM users WHERE id_users = ?';
  var queryStringFindFriends = 'SELECT f.id_friend,f.username FROM friends f, users u WHERE f.id_user= u.id_users and u.id_users = ? ';
   
  var response = {
      GoodCommData : '',
      BadCommData : '' ,
      FriendData : '' ,
      ListFriends : '' 
    };

    connection.query (queryStringUser, [req.params.idUser], function(err, rows, fields) {
      if (err) throw err;
      console.log("cacat3");
      response.FriendData = rows ;
        connection.query(queryStringFindGoodComm , [req.params.idUser] , function(err,rows){
          if(err) throw err;
          console.log(rows);
          response.GoodCommData = rows;   
             connection.query(queryStringFindBadComm , [req.params.idUser] , function(err,rows){
              if(err) throw err; 
                  response.BadCommData = rows  ;
                  connection.query (queryStringFindFriends , [req.params.idUser] , function(err, rows, fields) {
                     if (err) throw err;
                     response.ListFriends = rows;
                     console.log("cacat");
                        res.json(response);
                        console.log("cacat2");
                        console.log(response);
                      });
             });
        });
 
      });
});
 
  app.get('/api/profile', function(req, res) {

      var response = {
      UserData : '',
      FriendData : ''
    };
 
    var id =3;
    var queryStringUser = 'SELECT id_users as idUser, username, mail, name, lastname, gender, DATE_FORMAT(birthday,"%d/%m/%Y") AS birthday, address FROM users WHERE username = ?';
    var queryStringFindFriends = 'SELECT f.id_friend,f.username FROM friends f, users u WHERE f.id_user= u.id_users and u.id_users = ? ';
    connection.query (queryStringUser, [req.session.username], function(err, rows, fields) {
         if (err) throw err;
         response.UserData = rows;
         connection.query (queryStringFindFriends,[rows[0].idUser] , function(err, rows, fields) {
           if (err) throw err;
           response.FriendData = rows;
           res.json(response);
           console.log(response);
       });
  });
 }); 

  app.post('/api/profile', function(req, res) {
    if (req.body.mail !== undefined) {
      var queryStringUpdateWithoutPassword = 'UPDATE users SET mail = ?, name = ?, lastname = ?, address = ? WHERE username = ?';
      var queryStringUpdateWithPassword = 'UPDATE users SET password = ?, MAIL = ?, NAME = ?, LASTNAME = ?, ADDRESS = ? WHERE username = ?';
      //var queryStringUsername = 'SELECT Count(username) AS userNumber FROM users WHERE username= ?  and id_users != ?';
      var hidden = {
        name    : req.body.hidden_first_name != '' ? req.body.hidden_first_name : null,
        lname   : req.body.hidden_last_name != '' ? req.body.hidden_last_name : null,
        address : req.body.hidden_address != '' ? req.body.hidden_address : null,
        mail    : req.body.hidden_mail
      };
      var temp = {
        name       :  req.body.first_name,
        lname      :  req.body.last_name,
        address    :  req.body.address,
        mail       :  req.body.mail
      };
      oracleConnection.execute('SELECT mail, name, lastname, address FROM users WHERE username = ?', [req.session.username], function(err, rows, fields) {
        if (err) throw err;
        else {
          if (rows[0].name != hidden.name || rows[0].lastname != hidden.lname || rows[0].address != hidden.address || rows[0].mail != hidden.mail) {
            res.redirect('/profile?error=1');
          } else {
            if (req.body.password) {
              temp.password = bcrypt.hashSync(req.body.password);
              oracleConnection.execute(queryStringUpdateWithPassword, [temp.password, temp.mail, temp.name, temp.lname, temp.address, req.session.username], function(err, rows, fields) {
                if (err) throw err;
                res.redirect('/profile?error=0');
              });
            } else {
              oracleConnection.execute(queryStringUpdateWithoutPassword, [temp.mail, temp.name, temp.lname, temp.address, req.session.username], function(err, rows, fields) {
                if (err) throw err;
                res.redirect('/profile?error=0');
              });
            }
          }
        }
      }); 
    }       
  });
  
  app.post('/api/register', function(req, res) {
    var ok=1;
    var queryStringUsername = 'SELECT Count(username) AS userNumber FROM users WHERE username = ? ';
    var queryStringMail = 'SELECT Count(mail) AS mailNumber FROM users WHERE mail = ? ';
    var queryStringInsert = 'INSERT INTO users SET ?';
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
                registerErrorCode = 1;
                res.redirect('/register?error=' + registerErrorCode);
          } else {
            connection.query (queryStringMail, [temp.mail], function(err, rows, fields) {
              if (err) throw err;

              if(rows[0].mailNumber > 0) {
                  registerErrorCode = 2;
                  res.redirect('/register?error=' + registerErrorCode);
              } else {
                connection.query ('INSERT INTO users SET ?', temp, function(err, rows, fields) {
                  if (err) throw err;
                  res.redirect('/register?error=' + registerErrorCode);
                });
              }
            });
          }
          
      });
    }
  });

  app.get('/api/campaigns/:pager', function(req, res) {
    var limitUpperProduct = req.params.pager;
    var limitLowerProduct = req.params.pager - 1;
    var queryStringUsername = 'SELECT c.id_campaign, c.name, c.id_product, c.nr_people, p.image FROM product p, campaign c WHERE c.id_product= p.id_product and  c.id_campaign BETWEEN 15*?+1 AND 15*?';
    
    connection.query (queryStringUsername,  [limitLowerProduct, limitUpperProduct] , function(err, rows, fields) {
         if (err) throw err;
         res.json(rows);
    });         
  });

  app.get('/api/campaign/:idProduct', function(req, res) {
    // console.log(body.req.ratingForm);
    console.log(req.session.username);
    var id;
    var queryStringFindIdCampaign = 'SELECT p.name, p.description, p.rating, p.price, p.image ,c.id_campaign, c.name as campaignName,c.type,c.nr_people,c.background,c.id_product FROM campaign c, product p WHERE c.id_campaign = ? and c.id_product=p.id_product';
    connection.query (queryStringFindIdCampaign, [req.params.idProduct], function(err, rows, fields) {
      if (err) throw err;
      res.json(rows); 
      
    });     
  });

  app.get('/api/statistics', function(req, res) {
    var queryStringProductStatistics = 'SELECT totalSales, price, name FROM product';
    var queryStringStarStatistics = 'SELECT ' + 
    '(SELECT count(total_1) FROM product WHERE total_1 != 0) AS total1,' +
    '(SELECT count(total_2) FROM product WHERE total_2 != 0) AS total2,' +
    '(SELECT count(total_3) FROM product WHERE total_3 != 0) AS total3,' +
    '(SELECT count(total_4) FROM product WHERE total_4 != 0) AS total4,' +
    '(SELECT count(total_5) FROM product WHERE total_5 != 0) AS total5';
    var response = {
      products: '',
      stars: ''
    }

    connection.query(queryStringProductStatistics, function(err, rows) {
      if (err) throw err;
      else {
        response.products = rows;
        connection.query(queryStringStarStatistics, function(err, rows) {
          if (err) throw err;
          else {
            console.log(rows);
            response.stars = rows;
            res.json(response);
          }
        });
      }
    })
  });

  app.get('/api/statistics/:pager', function(req, res) {
    var limitUpperProduct = req.params.pager;
    var limitLowerProduct = req.params.pager - 1;
    var queryStringGetStatistics = 'SELECT name, id_product, totalSales FROM product WHERE id_product BETWEEN 12*?+1 AND 12*?';
    connection.query (queryStringGetStatistics, [limitLowerProduct, limitUpperProduct], function(err, rows, fields) {
       if (err) throw err;
       res.json(rows);
    }); 
  });

  app.get('/api/statistic/:idProduct', function(req, res) {
    var response = {
      product: '',
      comments: ''
    }
    var queryStringProduct = 'SELECT * FROM product WHERE id_product = ?';
    var queryStringComments = 'SELECT u.username, c.rating, c.id_comm FROM comments c JOIN users u ON c.id_user=u.id_users WHERE c.id_product=' + req.params.idProduct +  ' ORDER BY c.id_comm ASC';
    connection.query(queryStringProduct, [req.params.idProduct], function(err, rows, fields) {
       if (err) throw err;
       response.product = rows;
       connection.query(queryStringComments, function(err, rows) {
        if (err) throw err;
        response.comments = rows;
        res.json(response);
       })
    }); 
  });

// get - iau date doar ca sa le afisez
app.get('/api/campaign/create/:idProduct', function(req, res) {
    // console.log(req.session.username);
    var queryStringProduct = 'SELECT * FROM product WHERE id_product = ?'; 
    connection.query (queryStringProduct, [req.params.idProduct], function(err, rows, fields) {
        if (err) throw err;
        //console.log(rows);
        res.json(rows);     
    }); 
          
  });

  app.post('/api/login', function(req, res) {
    var queryStringLogin = 'SELECT password FROM users WHERE username = ?';
    var loginErrorCode = 0;
    connection.query(queryStringLogin, [req.body.username], function(err, rows, fields) {
      if (err) throw err;
   
      if (rows[0] == null) {
        loginErrorCode = 1;
        res.redirect('/login?error=' + loginErrorCode);
      } else if (!bcrypt.compareSync(req.body.password, rows[0].password)) {
        loginErrorCode = 1;
        res.redirect('/login?error=' + loginErrorCode);
      } else {
        req.session.username = req.body.username;
        res.redirect('/homepage');
      }
    })
  });

  app.get('/api/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });
          
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};




