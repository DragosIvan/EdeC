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
        adress   : req.body.address
    };
    if(temp.username)

        {

             connection.query (queryStringUsername, [temp.username],function(err, rows, fields) {
             if (err) throw err;
                 console.log(" nr pentru username este " + rows[0].userNumber);
                 if(rows[0].userNumber>0)
                 {
                      console.log("Username already exists" ); 
                      res.send("The username is already in use !");
                 }

              else
                 {
                      connection.query (queryStringMail,[temp.mail], function(err, rows,fields) {
                      if (err) throw err;
                      console.log(" nr  pentru mail este " + rows[0].mailNumber);
                        if(rows[0].mailNumber>0)
                        {
                            console.log("Mail already exists");
                            res.send("The email address is already in use !");
                        }
                        else
                        {
                            connection.query ('INSERT INTO users SET ?', temp, function(err, result) {
                              if (err) throw err; 
                              res.send("You have successfully registered !");
                            });        
                            connection.query('SELECT * FROM users', function(err, rows, fields) {
                            if (err) throw err;
                               
                            });

                        }
                 
                      });
                }
                });
         }
     
         });
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};