let url_forcast;
let url_weather;
let weather;
let forcast;
let icon;
let spotify_state = "sign in";
let state = "front";
let frame1;
let frame2;

function getIcon(icon) {
  icon_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  return icon_url;
}


let loginSpotify = () => {
  let SPOTIPY_CLIENT_ID = "da3f7dfb4bfa445698546301ae1e8346"
  let SPOTIPY_REDIRECT_URI = "http://127.0.0.1:3000/loginpopup"
  if (window.location.hostname != "127.0.0.1" && window.location.hostname != "localhost") {
    SPOTIPY_REDIRECT_URI = "https://vejret-projekt.vercel.app/loginpopup"
  }
  let spotifyScope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ugc-image-upload"
  let spotifyAuthEndpoint = "https://accounts.spotify.com/authorize?" + "client_id=" + SPOTIPY_CLIENT_ID + "&redirect_uri=" + SPOTIPY_REDIRECT_URI + "&scope=" + spotifyScope + "&response_type=token&state=123";
  window.open(spotifyAuthEndpoint, 'callBackWindow', 'height=700,width=500');

}

function preload() {
  navigator.geolocation.getCurrentPosition((position) => {
    url_forcast = `http://localhost:3000/weather/forcast?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    url_weather = `http://localhost:3000/weather/now?lat=${position.coords.latitude}&lon=${position.coords.longitude}`

    fetch(url_weather)
      .then((res) => res.json())
      .then((data) => weather = data)
      .catch((err) => console.log(err))

    fetch(url_forcast)
      .then((res) => res.json())
      .then((data) => forcast = data)
      .catch((err) => console.log(err))
  })
  loginSpotify()
  frame1 = loadImage('https://ibb.co/jrCGJ58');
  frame2 = loadImage('https://ibb.co/rfTGJ2G');
}



function setup() {
  createCanvas(window.innerWidth, 1600);
  angleMode(DEGREES);
  noStroke();

}

function pW(prc) {
  return width * prc / 100;
}

function pH(prc) {
  return height * prc / 100;
}

function draw() {
  
  if (weather && forcast) {
    if (state == "front") {
      
     //console.log(forcast)
      
      
      background(0);
      site1();
    } else if (state == "mereInfo") {
      mereInfo();
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
  background(0);
  fill(255);
  noStroke();
  //rect(pW(5), 74, pW(40), 500, 20);
  image(frame1, pW(5), 74, pW(40), 500, 20);
  push()
  fill('yellow')
  translate(pW(25), 574)
  rotate(sundeg())
  circle(pW(0), -300, pW(5))
  circle(pW(0), 0, pW(5))
  pop()
  image(frame2, pW(5), 74, pW(40), 500, 20);
  push()
  fill(0)
  stroke(0)
  //strokeWeight(2)
  textAlign(CENTER)
  textSize(20)
  text(tempMin(0) + "℃ - " + tempMax(0) + "℃", pW(25), 148)
  pop()

  


  /*/trekanter
  fill(0, 255, 0)
  triangle(pW(5), 560, pW(5), 200, pW(20), 574)
  triangle(pW(5) + 20, 574, pW(5), 200, pW(20), 574)
  circle(pW(5) + 20, 574 - 20, 40)
  triangle(pW(45), 574 - 20, pW(45), 200, pW(30), 574)
  triangle(pW(45) - 20, 574, pW(45), 200, pW(30), 574)
  circle(pW(45) - 20, 574 - 20, 40)
*/

  //gå tur
  fill(255)
  rect(pW(55), 74, pW(40), 500, 20);
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
  //image(icon, pW(80), pH(10), icon.width, icon.height)


  //uge vejr
  rect(pW(5), 648, pW(40), 652, 20);
  push()
  fill(0)
  stroke(0)
  textSize(28)
  textAlign(CENTER)
  text("Vejret gennem ugen", pW(25), 700)
  text("I morgen", pW(10), 810)
  text(tempMin(1) + "℃ -" + tempMax(1) + "℃", pW(37), 810)
  text(getDay(1), pW(10), 910)
  text(tempMin(2) + "℃ -" + tempMax(2) + "℃", pW(37), 910)
  text(getDay(2), pW(10), 1010)
  text(tempMin(3) + "℃ -" + tempMax(3) + "℃", pW(37), 1010)
  text(getDay(3), pW(10), 1110)
  text(tempMin(4) + "℃ -" + tempMin(4) + "℃", pW(37), 1110)
  text(getDay(4), pW(10), 1210)
  text(tempMin(5) + "℃ -" + tempMax(5) + "℃", pW(37), 1210)
  pop()
  //image(icon, pW(20), 750, icon.width, icon.height)

  //spotify
  rect(pW(55), 648, pW(40), 652, 20);


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


function mereInfo() {
  window.scrollTo(0, 0);
  background(0);
  fill(255);
  rect(pW(5), 74, pW(90), 50, 20);
  push()
  fill(0)
  stroke(0)
  textSize(28)
  textAlign(CENTER, CENTER)
  text("Så google det dog forhælvede din idiot", pW(50), 100)
  rectMode(CENTER)
  rect(pW(10), 100, 40, 10);
  triangle(pW(10) - 40, 100, pW(10)-20, 90, pW(10)-20, 110)
  pop()}



function mousePressed() {
  if (mouseX > pW(5) && mouseX < pW(5) + pW(40) && mouseY > 1387 && mouseY < 1387 + 50 && state=="front") {
    state = "mereInfo"
    mereInfo()
  }if (mouseX > pW(55) && mouseX < pW(55) + pW(40) && mouseY > 1387 && mouseY < 1387 + 50 && state=="front") {
    window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank")
  }if (mouseX > pW(5) && mouseX < pW(5) + pW(90) && mouseY > 74 && mouseY < 74+50 && state=="mereInfo") {
    state = "front"
    site1()
  }
}
function windowResized() {
  resizeCanvas(window.innerWidth, 1600);
}