let url_forcast;
let url_weather;
let weather;
let forcast;
let icon;

function getIcon(icon) {
  icon_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  return icon_url;
}


let loginSpotify = () =>{
  let SPOTIPY_CLIENT_ID = "da3f7dfb4bfa445698546301ae1e8346"
  let SPOTIPY_REDIRECT_URI = "http://127.0.0.1:3000/loginpopup"
  if (window.location.hostname != "127.0.0.1" && window.location.hostname != "localhost"){
      SPOTIPY_REDIRECT_URI = "https://vejret-projekt.vercel.app/loginpopup"
  }
  let spotifyScope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ugc-image-upload"
  let spotifyAuthEndpoint = "https://accounts.spotify.com/authorize?"+"client_id="+SPOTIPY_CLIENT_ID+"&redirect_uri="+SPOTIPY_REDIRECT_URI+"&scope="+spotifyScope+"&response_type=token&state=123";
  window.open(spotifyAuthEndpoint,'callBackWindow','height=700,width=500');
}

function preload() {
  navigator.geolocation.getCurrentPosition((position) => {
    url_forcast = `http://localhost:3000/weather/forcast?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    url_weather = `http://localhost:3000/weather/now?lat=${position.coords.latitude}&lon=${position.coords.longitude}`

    fetch(url_weather)
      .then((res) => res.json())
      .then((data) => weather = data)
      .then((data) => icon = loadImage(getIcon(weather.weather[0].icon)))
      .catch((err) => console.log(err))

    fetch(url_forcast)
      .then((res) => res.json())
      .then((data) => forcast = data)
      .catch((err) => console.log(err))
  })
  loginSpotify()
}



function setup() {
  createCanvas(window.innerWidth, window.innerHeight * 3);
  angleMode(DEGREES);
  noStroke();
  fill(255);
  fetch("http://127.0.0.1:3000/getPlaylist")
  .then((res)=>res.json())
  .then((data)=> songs = data)



}

function pW(prc) {
  return width * prc / 100;
}

function pH(prc) {
  return height * prc / 100;
}

function draw() {

  if (weather && forcast) {
    background(0);
    site_main();
  } else {
    push()
<<<<<<< HEAD
    background(0, 100);
=======
    background(0,100);
>>>>>>> a71fc405306569996c2dd00cd343e4a053ad5ee9
    stroke(50)
    translate(width / 2, window.innerHeight / 2)
    rotate(frameCount * 8 % 360)
    strokeWeight(10)
    noFill()
<<<<<<< HEAD
    circle(0, 0, 40)
=======
>>>>>>> a71fc405306569996c2dd00cd343e4a053ad5ee9
    stroke(255)
    strokeWeight(15)
    point(0, -20)
    pop()
    push()
    translate(width / 2, window.innerHeight / 2)
    textSize(20)
    textAlign(CENTER)
<<<<<<< HEAD
    text("Hacking The Mainframe...", 0, 50)
=======
    text("Hacking The Mainframe...", 0, 75)
>>>>>>> a71fc405306569996c2dd00cd343e4a053ad5ee9
    pop()
  }
}

function sundeg() {
  date = Date.now()
  return map(date, weather.sys.sunrise * 1000, weather.sys.sunset * 1000, -45, 45)
}

function site_main() {
  //sol op/ned
  background(0);
  rect(pW(5), 74, pW(40), 500, pW(1));
  push()
  fill(255, 0, 0)
  translate(pW(25), 574)
  rotate(sundeg())
  circle(pW(0), -300, pW(5))
  circle(pW(0), 0, pW(5))
  pop()

  push()
  fill(0)
  stroke(0)
  //strokeWeight(2)
  textAlign(CENTER)
  textSize(20)
  text(new Date().toLocaleTimeString('en-GB', {
    hour: "numeric",
    minute: "numeric"
  }), pW(25), 148)
  pop()

  //"jorden"
  push()
  noFill()
  stroke(0)
  strokeWeight(2)
  arc(pW(25), 574 - pW(1), pW(39.9), 400, 180, 0)

  text("jorden er her", pW(23), pH(35))

  pop()

  //trekanter
  fill(0, 255, 0)
  triangle(pW(5), 560, pW(5), 200, pW(20), 574)
  triangle(pW(5) + pW(1), 574, pW(5), 200, pW(20), 574)
  circle(pW(5) + pW(1), 574 - pW(1), pW(2))
  triangle(pW(45), 574 - pW(1), pW(45), 200, pW(30), 574)
  triangle(pW(45) - pW(1), 574, pW(45), 200, pW(30), 574)
  circle(pW(45) - pW(1), 574 - pW(1), pW(2))




  //gå tur
  fill(255)
  rect(pW(55), 74, pW(40), 500, pW(1));
  push()
  noFill()
  stroke(255, 0, 0)
  strokeWeight(2)
  arc(pW(75), 500, pW(39.9), 200, 180, 0)
  pop()
  push()
  fill(0)
  stroke(0)
  textAlign(CENTER)
  textSize(28)
  text(Math.round(weather.main.temp) + "℃", pW(75), 475)
  text("Bedste tid til at gå en tur: " + "(time)", pW(75), pH(10))
  pop()
  image(icon, pW(80), pH(10), icon.width, icon.height)


  //uge vejr
  rect(pW(5), 648, pW(40), height - 900, pW(1));
  push()
  fill(0)
  stroke(0)
  textSize(28)
  textAlign(CENTER)
  text("Vejret gennem ugen", pW(25), 700)
  text("I morgen", pW(10), 810)
  text(Math.round(forcast[0].main.temp_min) + "-" + Math.round(forcast[0].main.temp_max) + "℃", pW(37), 810)
  pop()
  image(icon, pW(20), 750, icon.width, icon.height)
//print(forcast)

  //spotify
  rect(pW(55), 648, pW(40), height - 900, pW(1));


  //mere info
  rect(pW(5), 2039, pW(40), 50, pW(1));


  //kontakt prof hjælp
  rect(pW(55), 2039, pW(40), 50, pW(1));


  //indstillinger
  push()
  rectMode(CENTER)
  rect(pW(50), 2163, pW(40), 50, pW(1));
  pop()
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight * 3);
}