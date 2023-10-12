let url_forcast;
let url_weather;
let weather;
let forcast;
let spotify_state = "sign in";
let songs = [];
let weather_loaded = false;

// background Weather icons
let frame1;
let frame2;
let mand;
let clear;
let few_clouds;
let scattered_clouds;
let rain;
let snow;
let regn;
let mist;
let mist2;

//weather icons
let clear_icon;
let few_clouds_icon;
let scattered_clouds_icon;
let rain_icon;
let snow_icon;


let loginSpotify = () => {
  let SPOTIPY_CLIENT_ID = "da3f7dfb4bfa445698546301ae1e8346"
  let SPOTIPY_REDIRECT_URI = "http://127.0.0.1:3000/loginpopup"
  if (window.location.hostname != "127.0.0.1" && window.location.hostname != "localhost") {
    SPOTIPY_REDIRECT_URI = "http://imkowalski.pythonanywhere.com/loginpopup"
  }
  let spotifyScope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ugc-image-upload"
  let spotifyAuthEndpoint = "https://accounts.spotify.com/authorize?" + "client_id=" + SPOTIPY_CLIENT_ID + "&redirect_uri=" + SPOTIPY_REDIRECT_URI + "&scope=" + spotifyScope + "&response_type=token&state=123";
  let popup = window.open(spotifyAuthEndpoint, 'callBackWindow', 'height=700,width=500');
  const interval = setInterval(() => {
    if (popup.closed) {
      clearInterval(interval);
      spotifyLoadPreview();
    }
  }, 500);

}

function spotifyLoadPreview() {
  fetch("/getSongs")
    .then((res) => res.json())
    .then((data) => {
      songs = data["songs"]["tracks"]
    })

}

function preload() {
  navigator.geolocation.getCurrentPosition((position) => {
    url_forcast = `/weather/forcast?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    url_weather = `/weather/now?lat=${position.coords.latitude}&lon=${position.coords.longitude}`

    fetch(url_weather)
      .then((res) => res.json())
      .then((data) => {
        weather = data
        weather_loaded = true
      })
      .catch((err) => console.log(err))

    fetch(url_forcast)
      .then((res) => res.json())
      .then((data) => forcast = data)
      .catch((err) => console.log(err))
  })
  loginSpotify()

  //image preloading
  frame1 = loadImage('./static/pngs/Frame_1.png');
  frame2 = loadImage('./static/pngs/Frame_2.png');
  mand = loadImage('./static/pngs/Frame_3.png');
  clear = loadImage('./static/pngs/01d.png');
  scattered_clouds = loadImage('./static/pngs/03d.png');
  rain = loadImage('./static/pngs/09d.png');
  snow = loadImage('./static/pngs/13d.png');
  regn = loadImage('./static/pngs/Regn_forgrund.png');
  mist = loadImage('./static/pngs/50d.png');
  mist2 = loadImage('./static/pngs/tåge_forgrund.png');
  few_clouds = loadImage('./static/pngs/02d.png');
  clear_icon = loadImage('./static/pngs/01n.png');
  few_clouds_icon = loadImage('./static/pngs/02n.png');
  scattered_clouds_icon = loadImage('./static/pngs/03n.png');
  rain_icon = loadImage('./static/pngs/09n.png');
  snow_icon = loadImage('./static/pngs/13n.png');
}


function setup() {
  createCanvas(window.innerWidth, 1600);
  angleMode(DEGREES);
  noStroke();
}

//a function to convert a percentage of the width to pixels
function pW(prc) {
  return width * prc / 100;
}

function draw() {
  if (weather && forcast) {
    background('#51809b');
    site1();
    if (spotify_state == "loged_in" && weather["weather"][0]["main"] != undefined) {
      spotifyLoadPreview()
      spotify_state = "preview_loaded"
    }

  } else {
    //loading screen
    push()
    background(0, 100);
    stroke(50)
    translate(width / 2, window.innerHeight / 2)
    rotate(frameCount * 8 % 360)
    strokeWeight(10)
    noFill()
    stroke(255)
    strokeWeight(15)
    point(0, -20)
    pop()
    push()
    translate(width / 2, window.innerHeight / 2)
    textSize(20)
    textAlign(CENTER)
    stroke(255)
    fill(255)
    text("Loading...", 0, 75)
    pop()
  }
}

//a function to find the time now between sunrise and sunset in degrees between -45 and 45
function sundeg() {
  date = Date.now()
  return map(date, weather.sys.sunrise * 1000, weather.sys.sunset * 1000, -45, 45)
}

//make the text design easier
function textDesign() {
  fill(0)
  stroke(0)
  textSize(28)
  textAlign(CENTER)
}

//a function to convert the day of the week to a string
function getDay(i) {
  day = new Date().getDay()

  day = (day + i) % 7
  switch (day) {
    case 0:
      return "Mandag"
    case 1:
      return "Tirsdag"
    case 2:
      return "Onsdag"
    case 3:
      return "Torsdag"
    case 4:
      return "Fredag"
    case 5:
      return "Lørdag"
    case 6:
      return "Søndag"
  }
}

//the site you see when you open the webapp
function site1() {
  //sun up and down frame
  background('#51809b');
  fill(255);
  noStroke();
  image(frame1, pW(5), 74, pW(40), 500);

  //the sun
  push()
  fill('yellow')
  translate(pW(25), 574)
  rotate(sundeg())
  circle(pW(0), -300, pW(5))
  pop()

  image(frame2, pW(5.3), 65, pW(39.4), 500);

  push()

  textDesign()
  textSize(30)
  fill(0, 2, 25, 100)
  noStroke()
  rect(pW(14), 80, pW(22), 60, 20);
  fill(255)
  strokeWeight(0)
  text(tempMin(0) + "℃ - " + tempMax(0) + "℃", pW(25), 120)
  pop()


  //walk frame
  fill(255)

  background_icon(55);
  image(mand, pW(55), 74, pW(40), 500);

  //ekstra weather icon overlay for rain and mist
  if (weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
    image(regn, pW(55), 74, pW(40), 500);
  } else if (weather.weather[0].main == "50d" || weather.weather[0].main == "50n") {
    image(mist2, pW(55), 74, pW(40), 500);
  }

  push()
  textDesign()
  textSize(30)
  stroke(255)
  fill(255)
  strokeWeight(0)
  text("Nu: " + Math.round(weather.main.temp) + "℃", pW(75), 540)

  //finds the best time to go for a walk and display it
  let bestTime = new Date(timeForMaxTemp().dt)
  fill(0, 2, 25, 100)
  noStroke()
  rect(pW(56), 80, pW(38), 60, 20);
  fill(255)
  strokeWeight(1)
  text("Bedste tid til at gå en tur er Kl. " + bestTime.getHours(), pW(75), 120)


  pop()

  //weakly weather frame
  rect(pW(5), 648, pW(40), 652, 20);
  push()
  textDesign()
  imageMode(CENTER);
  text("Vejret gennem ugen", pW(25), 700)

  push()
  strokeWeight(3)
  line(pW(10), 710, pW(40), 710)
  pop()

  //the weather for tomorrow
  text("I morgen", pW(10), 780)
  weather_icons(770, 1);
  text(tempMin(1) + "℃ -" + tempMax(1) + "℃", pW(37), 780)
  push()
  strokeWeight(2)
  line(pW(10), 835, pW(40), 835)
  pop()

  //the weather for 2 days from now
  text(getDay(1), pW(10), 895)
  weather_icons(885, 2);
  text(tempMin(2) + "℃ -" + tempMax(2) + "℃", pW(37), 895)
  push()
  strokeWeight(2)
  line(pW(10), 950, pW(40), 950)
  pop()

  //the weather for 3 days from now
  text(getDay(2), pW(10), 1010)
  weather_icons(1000, 3);
  text(tempMin(3) + "℃ -" + tempMax(3) + "℃", pW(37), 1010)
  push()
  strokeWeight(2)
  line(pW(10), 1065, pW(40), 1065)
  pop()

  //the weather for 4 days from now
  text(getDay(3), pW(10), 1125)
  weather_icons(1115, 4);
  text(tempMin(4) + "℃ -" + tempMax(4) + "℃", pW(37), 1125)
  push()
  strokeWeight(2)
  line(pW(10), 1180, pW(40), 1180)
  pop()

  //the weather for 5 days from now
  text(getDay(4), pW(10), 1240)
  weather_icons(1230, 3);
  text(tempMin(5) + "℃ -" + tempMax(5) + "℃", pW(37), 1240)
  pop()

  //spotify frame
  drawSpotify(pW(55), 648, pW(40), 652, songs);

  //more info frame
  rect(pW(5), 1387, pW(40), 50, 20);
  push()
  textDesign()
  textAlign(CENTER, CENTER)
  text("Mere info om SAD", pW(25), 1415)
  pop()

  //contact frame
  rect(pW(55), 1387, pW(40), 50, 20);
  push()
  textDesign()
  textAlign(CENTER, CENTER)
  text("Kontakt professionel hjælp", pW(75), 1415)
  pop()


}

//check if the mouse is over one of the buttons in the bottom of the screen and open the link
function mousePressed() {
  if (mouseX > pW(5) && mouseX < pW(5) + pW(40) && mouseY > 1387 && mouseY < 1387 + 50) {
    window.open("https://www.sundhed.dk/borger/patienthaandbogen/psyke/sygdomme/depression/vinterdepression/", "_blank")
  } if (mouseX > pW(55) && mouseX < pW(55) + pW(40) && mouseY > 1387 && mouseY < 1387 + 50) {
    window.open("https://psykiatrifonden.dk/", "_blank")
  }
}

//make the window size responsive
function windowResized() {
  resizeCanvas(window.innerWidth, 1600);
}