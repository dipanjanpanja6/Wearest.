var input = document.getElementById("search");
var button = document.getElementById("button");
var temp = document.getElementById("deg-1");
var desc = document.getElementById("desc");
var date = document.getElementById("date");
var addr = document.getElementById("addr");

var x = document.querySelectorAll("H6");

var day = document.getElementsByClassName("day-bar");
var temp_all = document.getElementsByClassName("deg");


button.addEventListener("click", function() {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      input.value +
      "&appid=82eb8bc7304fb87bdbfbae435106fe06&cnt=7&units=metric"
  )
    .then(response => response.json())
    .then(data => {
    
      temp_all[0].innerText = Math.floor(data["list"][1]["main"]["temp"]);
      temp_all[1].innerText = Math.floor(data["list"][2]["main"]["temp"]);
      temp_all[2].innerText = Math.floor(data["list"][3]["main"]["temp"]);
      temp_all[3].innerText = Math.floor(data["list"][4]["main"]["temp"]);
      temp_all[4].innerText = Math.floor(data["list"][5]["main"]["temp"]);
      temp_all[5].innerText = Math.floor(data["list"][6]["main"]["temp"]);
      temp.innerText = Math.floor(data["list"][0]["main"]["temp"]);

var addr_value = data['city']['name'];
var country_value = data['city']['country'];


var des0 = data['list'][0]['weather'][0]['main'];
var des1 = data['list'][1]['weather'][0]['main'];
var des2 = data['list'][2]['weather'][0]['main'];
var des3 = data['list'][3]['weather'][0]['main'];
var des4 = data['list'][4]['weather'][0]['main'];
var des5 = data['list'][5]['weather'][0]['main'];
var des6 = data['list'][6]['weather'][0]['main'];



var timestamp0 = data['list'][0]['dt'];
var timestamp1 = data['list'][1]['dt'];
var timestamp2 = data['list'][2]['dt'];
var timestamp3 = data['list'][3]['dt'];
var timestamp4 = data['list'][4]['dt'];
var timestamp5 = data['list'][5]['dt'];
var timestamp6 = data['list'][6]['dt'];

    
date.innerText = timeConverter(timestamp0);    
day[0].innerText = dayConverter(timestamp1);
day[1].innerText = dayConverter(timestamp2);
day[2].innerText = dayConverter(timestamp3);
day[3].innerText = dayConverter(timestamp4);
day[4].innerText = dayConverter(timestamp5);
day[5].innerText = dayConverter(timestamp6);




    description(des0,des1,des2,des3,des4,des5,des6);
    address(addr_value,country_value);
    })
    .catch(err => alert("Enter Wrong City Name"));
});

// http://openweathermap.org/img/w/10n.png

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = days[a.getDay()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    //   day :day,
    //   date:date,
    //   month:month,
    //   year:year

    day +
    ", " +
    date +
    " " +
    month +
    " " +
    year +
    " " +
    hour +
    ":" +
    min
  ;
  return time;
}

function dayConverter(UNIX) {
    var a = new Date(UNIX * 1000);
    var x = a.toString().split(' ')[0];
    return x;
  }


function address(a,b){
    addr.innerText = a+", "+b;
}
function description(a,b,c,d,e,f,g){
    x[0].innerHTML = b;
    x[1].innerHTML = c;
    x[2].innerHTML = d;
    x[3].innerHTML = e;
    x[4].innerHTML = f;
    x[5].innerHTML = g;
    desc.innerText = a;
}




