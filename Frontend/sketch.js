let url_forcast;
let url_weather;
let weather;
let forcast;
let icon;

function getIcon(icon) {
  icon_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  return icon_url;
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

}



function setup() {
  createCanvas(window.innerWidth, window.innerHeight * 2);
  angleMode(DEGREES);
  noStroke();
  fill(255);


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
    site1();
  } else {
    push()
<<<<<<< HEAD
    background(0,25);
=======
    background(0,100);
    stroke(50)
>>>>>>> 067fdb4a8892da145d8c99e5b6566bea1b09030f
    translate(width / 2, window.innerHeight / 2)
    rotate(frameCount*8%360)
    strokeWeight(10)
    noFill()
<<<<<<< HEAD
=======
    circle(0, 0, 40)
>>>>>>> 067fdb4a8892da145d8c99e5b6566bea1b09030f
    stroke(255)
    strokeWeight(15)
    point(0, -20)
    pop()
    push()
    translate(width / 2, window.innerHeight / 2)
    textSize(20)
    textAlign(CENTER)
<<<<<<< HEAD
    text("Hacking The Mainframe...", 0, 75)
=======
    text("Hacking The Mainframe...", 0, 50)
>>>>>>> 067fdb4a8892da145d8c99e5b6566bea1b09030f
    pop()
  }
}

function sundeg() {
  date = Date.now()
  return map(date, weather.sys.sunrise * 1000, weather.sys.sunset * 1000, -45, 45)
}

function site1() {
  //sol op/ned
  background(255);
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
  arc(pW(25), 574-pW(1), pW(39.9), 400, 180, 0)

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
  rect(pW(55), pH(5), pW(40), pH(40), 20);
  push()
  noFill()
  stroke(255, 0, 0)
  strokeWeight(2)
  arc(pW(75), pH(40), pW(39.9), pH(10), 180, 0)
  pop()
  push()
  fill(0)
  stroke(0)
  //strokeWeight(2)
  textAlign(CENTER)
  textSize(28)
  text(Math.round(weather.main.temp) + "℃", pW(75), pH(42))
  text("Bedste tid til at gå en tur: " + "(time)", pW(75), pH(10))
  pop()
  image(icon, pW(80), pH(10), pW(10), pH(10))


  //uge vejr
rect(pW(5), pH(55), pW(40), pH(80), pW(1));
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight * 4);
}