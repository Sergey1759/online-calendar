let days = document.getElementsByClassName('days');
let exit = document.getElementById('exit');
let submit = document.getElementById('submit');
let feedback_background = document.getElementsByClassName('feedback_background')[0];
let date;
for (let i = 0; i < days.length; i++) {
    days[i].addEventListener('click',() => {
        date = `${days[i].dataset.year}-${days[i].dataset.month}-${days[i].dataset.day}`;
        console.log(date)
        feedback_background.style.animationName = "fadeIn";
        feedback_background.style.display = 'flex';
    },false);
}


submit.addEventListener('click',() => {
    feedback_background.style.animationName = "fadeOut";
    let data = {};
    let input = document.getElementsByTagName('input');
    let validation = document.getElementById('validation');
    let submit_bool = false;
    let count = 0;
    for(let i = 0; i < input.length; i++){
        input[i].style.border = '1px solid black';
        if(input[i].value == ''){
             input[i].style.border = '1px solid red';
             count++;
            }
    }
    if(count == 0) {submit_bool = true;} else {validation.style.display = 'block'}
    if(submit_bool){
        for(let i = 0; i < input.length; i++){
            data[input[i].name] = input[i].value;
            input[i].value = '';
        }
    }
    data.date = date;
    if(!submit_bool)feedback_background.style.animationName = 'none';
    setTimeout(() => {
    if(submit_bool){
    validation.style.display = 'none'
    feedback_background.style.display = 'none';
    postUrl('/addEvent',data);
    location.reload();
    } 
},1500)
},false);

exit.addEventListener('click',() => {
    feedback_background.style.animationName = "fadeOut";
    setTimeout(() => {feedback_background.style.display = 'none';},1500)
},false);

async function postUrl(url,obj){
    fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(obj), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
}