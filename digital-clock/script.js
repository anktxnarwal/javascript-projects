function clock() {
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  let day = now.getDay();
  let month = now.getMonth();
  let date = now.getDate();
  let year = now.getFullYear();

  // days
  let dayy = `${weekday[day]}`;

  // months
  month = `${months[month]}`;
  date = `${dayy}, ${month} ${date}, ${year}`;
  document.getElementById("datess").innerHTML = date;

  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  // period
  const period = hour >= 12 ? "PM" : "AM";
  // for Hours
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }

  // for Min
  if (min < 10) {
    min = "0" + min;
  }

  // for sec
  if (sec < 10) {
    sec = "0" + sec;
  }

  let time = `${hour}:${min}:${sec}`;
  document.getElementById("hours").innerHTML = time;
  document.querySelector("#period").innerHTML = period;
}

setInterval(clock, 1000);
clock();
