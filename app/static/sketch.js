let url_forcast;
let url_weather;
let weather;
let forcast;
let icon;
let spotify_state = "sign in";
let songs = [];
let weather_loaded = false;
let frame1;
let frame2;
let mand;

// background Weather icons
let clear;
let few_clouds;
let scattered_clouds;
let rain;
let snow;
let regn;
let mist;
let mist2;


function getIcon(icon) {
  icon_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  return icon_url;
}


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

}

function setup() {
  createCanvas(window.innerWidth, 1600);
  angleMode(DEGREES);
  noStroke();
}

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
    text("Hacking The Mainframe...", 0, 75)
    pop()
  }
}

function sundeg() {
  date = Date.now()
  return map(date, weather.sys.sunrise * 1000, weather.sys.sunset * 1000, -45, 45)
}

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

function site1() {
  //sol op/ned
  background('#51809b');
  fill(255);
  noStroke();
  image(frame1, pW(5), 74, pW(40), 500);
  push()
  fill('yellow')
  translate(pW(25), 574)
  rotate(sundeg())
  circle(pW(0), -300, pW(5))
  pop()
  image(frame2, pW(5.3), 65, pW(39.4), 500);
  push()
  fill(0)
  stroke(0)
  textAlign(CENTER)
  textSize(20)
  text(tempMin(0) + "℃ - " + tempMax(0) + "℃", pW(25), 148)
  pop()


  //gå tur
  fill(255)

  background_icon();
  image(mand, pW(55), 74, pW(40), 500);
  if (weather.weather[0].main == "Rain" || weather.weather[0].main == "Thunderstorm") {
    image(regn, pW(55), 74, pW(40), 500);
  } else if (weather.weather[0].main == "50d" || weather.weather[0].main == "50n") {
    image(mist2, pW(55), 74, pW(40), 500);
  }
  push()
  fill(0)
  stroke(0)
  textAlign(CENTER)
  textSize(28)

  text("Nu: " + Math.round(weather.main.temp) + "℃", pW(75), 560)
  let bestTime = new Date(timeForMaxTemp().dt)
  text("Bedste tid til at gå en tur er Kl. " + bestTime.getHours() , pW(75), 100)

  pop()

  //uge vejr
  rect(pW(5), 648, pW(40), 652, 20);
  push()
  fill(0)
  stroke(0)
  textSize(28)
  textAlign(CENTER)
  imageMode(CENTER);
  text("Vejret gennem ugen", pW(25), 700)
  text("I morgen", pW(10), 810)
  text(tempMin(1) + "℃ -" + tempMax(1) + "℃", pW(37), 810)
  text(getDay(1), pW(10), 910)
  //weather_icons(810);
  text(tempMin(2) + "℃ -" + tempMax(2) + "℃", pW(37), 910)
  text(getDay(2), pW(10), 1010)
  //weather_icons(910);
  text(tempMin(3) + "℃ -" + tempMax(3) + "℃", pW(37), 1010)
  text(getDay(3), pW(10), 1110)
  //weather_icons(1010);
  text(tempMin(4) + "℃ -" + tempMax(4) + "℃", pW(37), 1110)
  text(getDay(4), pW(10), 1210)
  //weather_icons(1110);
  text(tempMin(5) + "℃ -" + tempMax(5) + "℃", pW(37), 1210)
  //weather_icons(1210);
  pop()

  //spotify
  drawSpotify(pW(55), 648, pW(40), 652, songs);

  //mere info
  rect(pW(5), 1387, pW(40), 50, 20);
  push()
  fill(0)
  stroke(0)
  textSize(28)
  textAlign(CENTER, CENTER)
  text("Mere info om SAD", pW(25), 1415)
  pop()

  //kontakt prof hjælp
  rect(pW(55), 1387, pW(40), 50, 20);
  push()
  fill(0)
  stroke(0)
  textSize(28)
  textAlign(CENTER, CENTER)
  text("Kontakt professionel hjælp", pW(75), 1415)
  pop()


}

function mousePressed() {
  if (mouseX > pW(5) && mouseX < pW(5) + pW(40) && mouseY > 1387 && mouseY < 1387 + 50) {
    window.open("https://www.sundhed.dk/borger/sygdomme-a-aa/psykiske-sygdomme/tilstande-og-sygdomme/sad/", "_blank")
  } if (mouseX > pW(55) && mouseX < pW(55) + pW(40) && mouseY > 1387 && mouseY < 1387 + 50) {
    window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank")
  }
}
function windowResized() {
  resizeCanvas(window.innerWidth, 1600);
}