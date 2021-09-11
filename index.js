var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var d = new Date();
var hr = d.getHours();
var min = d.getMinutes();
var day = days[d.getDay()];
if (min < 10) {
  min = "0" + min;
}
function ampmCal(hour) {
  var ampm = "AM";
  if (hour > 12) {
    hour -= 12;
    ampm = "PM";
  }
  return [ampm, hour];
}

var time = document.querySelector("#time");
var mainTemp = document.querySelector("#mainTemp");
var main = document.querySelector("#main");
var icon = document.querySelector("#icon");
var mainDesc = document.querySelector("#mainDesc");
var cityName = document.querySelector("#cityName");
var city = document.querySelector("#city");
var cityBtn = document.querySelector("#cityBtn");
var country = document.querySelector("#country");
var humidity = document.querySelector("#humidity");
var cloudy = document.querySelector("#cloudy");
var wind = document.querySelector("#wind");
var sunrise = document.querySelector("#sunrise");
var sunset = document.querySelector("#sunset");
var pressure = document.querySelector("#pressure");
var message = document.querySelector("#message");
var statusHumidity = document.querySelector("#statusHumidity");
var statusCloud = document.querySelector("#statusCloud");
var statusWind = document.querySelector("#statusWind");
var statusSunrise = document.querySelector("#statusSunrise");
var statusSunset = document.querySelector("#statusSunset");
var statusPressure = document.querySelector("#statusPressure");

time.innerHTML = `${day} ${ampmCal(hr)[1]}:${min} ${ampmCal(hr)[0]}`;

cityBtn.addEventListener("click", () => {
  if (city.value === "") {
    showMessage("Please enter anything");
  } else {
    //getData(city.value);
  }
});

function showMessage(msg) {
  message.innerHTML = msg;
  message.style.color = "red";
  setTimeout(function () {
    message.innerHTML = "Today's Highlight";
    message.style.color = "black";
  }, 3000);
}
function formatTime(unix, timezone) {
  let unix_timestamp = unix + timezone;

  var date = new Date(unix_timestamp * 1000).toISOString();

  var hours = date.split("T")[1].substring(0, 2);

  var minutes = "0" + date.split("T")[1].substring(3, 5);

  var formattedTime =
    ampmCal(hours)[1] + ":" + minutes.substr(-2) + ampmCal(hours)[0];

  return formattedTime;
}

//getData("New york");
function getData(givenCity) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${givenCity}&units=metric&appid=baf5e712721f189bb6314cd260a0cd69`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mainTemp.innerHTML = data.main.temp;
      main.innerHTML = `${data.weather[0].main}, `;
      mainDesc.innerHTML = data.weather[0].description;
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );
      cityName.innerHTML = data.name;
      country.innerHTML = data.sys.country;
      humidity.innerHTML = data.main.humidity;
      cloudy.innerHTML = data.clouds.all;
      wind.innerHTML = data.wind.speed;
      sunrise.innerHTML = formatTime(data.sys.sunrise, data.timezone);
      sunset.innerHTML = formatTime(data.sys.sunset, data.timezone);
      pressure.innerHTML = data.main.pressure;

      statusHumidity.innerHTML = giveStatus(
        40,
        70,
        "Normal",
        "Low",
        "High",
        Number(data.main.humidity)
      );
      statusCloud.innerHTML = giveStatus(
        40,
        70,
        "Enjoyable",
        "Sunny",
        "Cloudy",
        Number(data.clouds.all)
      );
      statusWind.innerHTML = giveStatus(
        5,
        20,
        "Breeze",
        "Calm",
        "Strom",
        Number(data.wind.speed)
      );
      statusSunrise.innerHTML = giveStatus(
        390,
        450,
        "Normal",
        "Early",
        "Late",
        convertTime(formatTime(data.sys.sunrise, data.timezone))
      );
      statusSunset.innerHTML = giveStatus(
        390,
        450,
        "Normal",
        "Early",
        "Late",
        convertTime(formatTime(data.sys.sunset, data.timezone))
      );
      statusPressure.innerHTML = giveStatus(
        980,
        1020,
        "Moderate",
        "Low",
        "High",
        Number(data.main.pressure)
      );
    })
    .catch(errorHandler);
}

function errorHandler(error) {
  console.log("error occured", error);
  showMessage("City not found");
}

function giveStatus(range1, range2, msg1, msg2, msg3, actual) {
  if (actual < range1) {
    return msg2;
  } else if (actual >= range1 && actual <= range2) {
    return msg1;
  } else {
    return msg3;
  }
}
//humidity(40-70,normal,Low,High)
//cloud(40-70,patialy,sunny,cloudy)
//wind(5-20,breeze,calm,strom)
//sun(390-450,normal,Early,Late)
//pressure(980-1020,Moderate,Low,High)

function convertTime(date) {
  var hour = Number(date.split(":")[0]) * 60;
  var min = Number(date.split(":")[1].substr(0, 2));
  return hour + min;
}

statusPressure.innerHTML = giveStatus(
  390,
  450,
  "Normal",
  "Low",
  "High",
  convertTime("6:30Pm")
);
