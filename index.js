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

(async () => {
  const location = await (await fetch('https://api.ipdata.co/?api-key=9b8a49e10bc989a900a2d1052999045d9450c3cee479de571ac81d9e')).json()
  var geo = location["city"];
  console.log(geo);
  getGeoData(geo);
})();


const getGeoData = (location) => {
  // console.log(coords.latitude + "," + coords.longitude);
  fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=s20F9JLAlVQK9MYn0d0NHOkw7lFlsvOf&q=` + location).then(d => d.json().then(data => {
    console.log(data);
    setDate(data[0].Key, location);

  }))
};


// (async () => {
//   console.log(";;");
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(getGeoData);

//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// })();



input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
})

button.addEventListener("click", function () {
  console.log(input.value);
  getGeoData(input.value);
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
  var time = day + ", " + date + " " + month + " " + year + " " + hour + ":" + min;
  return time;
}

function dayConverter(UNIX) {
  var a = new Date(UNIX);
  var x = a.toString().split(" ")[0];
  return x;
}


const setDate = (key, search) => {
  fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=s20F9JLAlVQK9MYn0d0NHOkw7lFlsvOf&metric=true`).then(response => response.json()).then(data => {
    for (var i = 0; i < 6; i++) {
      icon[i].src = "icon2/" + data.DailyForecasts[i].Day.Icon + ".svg";
      x[i].innerHTML = data.DailyForecasts[i].Day.IconPhrase;

      switch (i) {
        case 0:
          temp_all[1].innerText = Math.floor(data.DailyForecasts[i].Temperature.Minimum.Value);
          temp_all[0].innerText = Math.floor(data.DailyForecasts[i].Temperature.Maximum.Value);
          break;
        case 1:
          temp_all[3].innerText = Math.floor(data.DailyForecasts[i].Temperature.Minimum.Value);
          temp_all[2].innerText = Math.floor(data.DailyForecasts[i].Temperature.Maximum.Value);
          break;
        case 2:
          temp_all[5].innerText = Math.floor(data.DailyForecasts[i].Temperature.Minimum.Value);
          temp_all[4].innerText = Math.floor(data.DailyForecasts[i].Temperature.Maximum.Value);
          break;
        case 3:
          temp_all[7].innerText = Math.floor(data.DailyForecasts[i].Temperature.Minimum.Value);
          temp_all[6].innerText = Math.floor(data.DailyForecasts[i].Temperature.Maximum.Value);
          break;
        case 4:
          temp_all[9].innerText = Math.floor(data.DailyForecasts[i].Temperature.Minimum.Value);
          temp_all[8].innerText = Math.floor(data.DailyForecasts[i].Temperature.Maximum.Value);
          break;

        default:
          break;
      }
      day[i].innerText = dayConverter(data.DailyForecasts[i].Date);
    }


  }).catch(r => console.error(r));
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + search +
    "&appid=82eb8bc7304fb87bdbfbae435106fe06&cnt=7&units=metric"
  ).then(response => response.json()).then(data => {
    temp.innerText = Math.floor(data["list"][0]["main"]["temp"]);
    desc.innerText = data["list"][0]["weather"][0]["main"];
    main_img.src = "icon/big/" + data["list"][0]["weather"][0]["icon"] + ".png";
    main_icon.src = "icon/" + data["list"][0]["weather"][0]["icon"] + ".png";
    addr.innerText = data["city"]["name"] + ", " + data["city"]["country"];
    date.innerText = timeConverter(data["list"][0]["dt"])
  }).catch(r => console.error(r));
}