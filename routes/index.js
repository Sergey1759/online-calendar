let express = require('express');
let mysql = require('../routes/mysql');
let router = express.Router();
let month = new Date().getMonth();
let year = new Date().getFullYear();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let before = getBefore(month,year);
  let days = getDaysInMonth(month,year);
  let after = getAfter(month,year,(before.length + days.length));
  let this_month_ru = month_ru[month];
  mysql.getAllEvent(year,month).then(arr => {
   for(let i = 0; i < arr.length; i++){
     for(let j = 0; j < days.length; j++){
       if(new Date(arr[i].date).getDate() == days[j]){
         days[j] = {
           key : true,
           obj : arr[i],
           day : days[j],
           year : year,
           month : month + 1
         }
       } 
     }
   }
   return days;
   }).then( days => {
     for (const key in days) {
       if(typeof(days[key]) !== typeof({})){
         days[key] = {
           key : false,
           day : days[key],
           year : year,
           month : month + 1
         }
       }
     }
     res.render('index', { title: 'Express' ,days,month,year,this_month_ru,before,after});
   }); 
});
   
router.post('/addEvent', async function(req, res, next) {
  await mysql.addEvent(req.body.date , req.body.event , req.body.description);
});

router.get('/next', function(req, res, next) {
  year++;
  res.redirect('/');
});

router.get('/prev', function(req, res, next) {
  year--;
  res.redirect('/');
});

router.get('/nextmonth', function(req, res, next) {
  if(month >= 11){
    month = 0;
    res.redirect('/next');
  }else {
    month++;
  }
  res.redirect('/');
});

router.get('/prevmonth', function(req, res, next) {
  if(month <= 0){
    month = 11;
    res.redirect('/prev');
  } else{
    month--;
  }
  res.redirect('/');
});

function getDaysInMonth(month, year) {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date).getDate());
    date.setDate(date.getDate() + 1);
  }
  return days;
}
function getBefore(month, year) {
  let day = new Date(year,month,0).getDay(); // кількість елементів до початку основного масиву
  let local_month = month;
  let local_year = year;
  if(month == 0) {
    local_month = 12;
      local_year--;
  }
  let arr = getDaysInMonth(local_month-1, local_year).reverse();
  arr.length = day;
  arr.reverse();
  return arr;
}

function getAfter(month, year,all_length) {
  let local_month = month;
  let local_year = year;
  if(month == 11) {
    local_month = -1;
      local_year++;
  }
  let arr = getDaysInMonth(local_month+1, local_year);
  let length;
  if(all_length <= 28){
    length = 28;
  } else if(all_length <= 35){
    length = 35 - all_length;
  } else if(all_length > 35){
    length = 42 - all_length;
  }
  arr.length = length;
  return arr;
}
let month_ru = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
module.exports = router;
