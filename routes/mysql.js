var mysql = require('mysql');

    // Add the credentials to access your database
  var connection = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'vkdJsyTVsD',
    password : 'HMUebz7tEN',
    database : 'vkdJsyTVsD'
  });
  
  // connect to mysql
  connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
  });

  let data = {};
  data.getDate = (year,month,day) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM calendar WHERE date = '${year}-${month}-${day}'`, 
            function(err, rows, fields) {
            if(err){
                return reject(err);
            }
                return resolve(rows);
          });
    })
  }

  data.addEvent = (date,event,description) => {
    return new Promise((resolve,reject) => {
        connection.query(`INSERT INTO calendar  VALUES (NULL, '${date}', '${event}', '${description}');`, 
            function(err, rows, fields) {
            if(err){
                return reject(err);
            }
               return resolve(rows);
          });
    })
  }

  data.getAllEvent = (year,month) => {
    month++;
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM calendar 
        WHERE MONTH(calendar.date) = ${month} AND YEAR(calendar.date) = ${year}`, 
            function(err, rows, fields) {
            if(err){
                return reject(err);
            }
                return resolve(rows);
          });
    })
  }
 
//   connection.end(function(){
//     // The connection has been closed
//   });


  module.exports = data;