var input = document.getElementById("search");
var button = document.getElementById("button");
var temp = document.getElementById("deg-1");
var desc = document.getElementById("desc");
var date = document.getElementById("date");
var addr = document.getElementById("addr");
var main_img = document.getElementById("main_img");
var main_icon = document.getElementById("main_icon");

var x = document.querySelectorAll("H6");

var day = document.getElementsByClassName("day-bar");
var temp_all = document.getElementsByClassName("deg");
var icon = document.getElementsByClassName("icon_s");



fetch(
  "http://api.ipstack.com/check?access_key=1093d4911c69fc7a8497b7d78fcc1621&format=1"
  )
  .then(response => response.json())
  .then(data => {
    var geo = data["city"];
    console.log(geo);
    weathercall(geo);
  });

function weathercall(geo) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      geo +
      "&appid=82eb8bc7304fb87bdbfbae435106fe06&cnt=7&units=metric"
  )
    .then(response => response.json())
    .then(data => {


var cur_icon=[];
for (var i = 0; i < 7; i++) {
  cur_icon[i] = data["list"][i]["weather"][0]["icon"];
}
main_icon.src="icon/"+cur_icon[0]+".png";
for( var i=0; i<6; i++){
  icon[i].src="icon/"+cur_icon[i+1]+".png";

}



var cur_img=

   data["list"][0]["weather"][0]["icon"];

main_img.src="icon/big/"+cur_img+".png";










      var cur_temp = [];
      for (var i = 0; i < 7; i++) {
        cur_temp[i] = Math.floor(data["list"][i]["main"]["temp"]);
      }
      console.log(cur_temp);
      getinfo(cur_temp);



      
       var timestamp = [];
        for (var i = 0; i < 7; i++) {
          timestamp[i] = data["list"][i]["dt"];
        }
        console.log(timestamp);
        for (var i = 0; i < 6; i++) {
          day[i].innerText = dayConverter(timestamp[i+1]);
        }
        date.innerText = timeConverter(timestamp[0]);



        var addr_value = data["city"]["name"];
        var country_value = data["city"]["country"];
        address(addr_value, country_value);




        var des = [];
        for (var i = 0; i < 7; i++) {
          des[i] = data["list"][i]["weather"][0]["main"];
        }
        description(des);

    });
  }
  
  function getinfo(info) {
    temp.innerText = info[0];
    for (var i = 0; i < 6; i++) {
      temp_all[i].innerText = info[i + 1];
    }
  }



  
  

  button.addEventListener("click", function() {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        input.value +
        "&appid=82eb8bc7304fb87bdbfbae435106fe06&cnt=7&units=metric"
    )
      .then(response => response.json())
      .then(data => {
        var temp_all = [];
        for (var i = 0; i < 7; i++) {
          temp_all[i] = Math.floor(data["list"][i]["main"]["temp"]);
        }
        console.log(temp_all);
        getinfo(temp_all);

        
        var des = [];
        for (var i = 0; i < 7; i++) {
          des[i] = data["list"][i]["weather"][0]["main"];
        }
        description(des);



        
        var timestamp = [];
        for (var i = 0; i < 7; i++) {
          timestamp[i] = data["list"][i]["dt"];
        }
        for (var i = 0; i < 6; i++) {
          day[i].innerText = dayConverter(timestamp[i + 1]);
        }
        date.innerText = timeConverter(timestamp[0]);
        
        
        var addr_value = data["city"]["name"];
        var country_value = data["city"]["country"];
        address(addr_value, country_value);


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

      day + ", " + date + " " + month + " " + year + " " + hour + ":" + min;
    return time;
  }

  function dayConverter(UNIX) {
    var a = new Date(UNIX * 1000);
    var x = a.toString().split(" ")[0];
    return x;
  }

  function address(a, b) {
    addr.innerText = a + ", " + b;
  }
  function description(des) {
    for (var i = 0; i < 6; i++) {
      x[i].innerHTML = des[i + 1];
    }
    desc.innerText = des[0];
    // x[1].innerHTML = c;
    // x[2].innerHTML = d;
    // x[3].innerHTML = e;
    // x[4].innerHTML = f;
    // x[5].innerHTML = g;
  }