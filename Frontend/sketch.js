function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function pW(prc){
  return width * prc / 100;
}

function pH(prc){
  return height * prc / 100;
}

function draw() {
  background(0);
  site1()
}

function site1(){

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}