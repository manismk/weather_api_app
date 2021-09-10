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
var cityName = document.querySelector("#cityName");
var country = document.querySelector("#country");
var humidity = document.querySelector("#humidity");
var cloudy = document.querySelector("#cloudy");
var wind = document.querySelector("#wind");
var sunrise = document.querySelector("#sunrise");
var sunset = document.querySelector("#sunset");
var pressure = document.querySelector("#pressure");

time.innerHTML = `${day} ${ampmCal(hr)[1]}:${min} ${ampmCal(hr)[0]}`;

// let unix_timestamp = 1560343627 - 25200;
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp * 1000).toISOString();
// // Hours part from the timestamp
// console.log(date);
// var hours = date.getISOHours();

// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime =
//   ampmCal(hours)[1] +
//   ":" +
//   minutes.substr(-2) +
//   ":" +
//   seconds.substr(-2) +
//   ampmCal(hours)[0];

// console.log(formattedTime);
