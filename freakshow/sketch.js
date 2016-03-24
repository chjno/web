var capture;
var curtainX = 0;
var showtime = false;
var showsOver = false;
var vidX = 110;
var caneX = 900;
var caneSpeed = -10;
var porkyOn = false;
var audioPlaying = true;
var vidPlaying = true;
var count = 0;
var booing = true;
var count2 = 0;

function preload() {
  stage = loadImage('images/stage.png');
  curtainL = loadImage('images/curtain_left.png');
  curtainR = loadImage('images/curtain_right.png');
  cane = loadImage('images/cane.png');
}

function setup() {
  createCanvas(1000, 625);
  capture = createCapture(VIDEO);
  capture.size(780, 585);
  capture.hide();
  ready = createButton('Ready!');
  ready.mousePressed(startShow);
  ready.position(470, 300);
  boo = createButton('Boo!');
  boo.mousePressed(endShow);
  boo.hide();
  boo.position(470, 580);
  porky = createVideo('images/porky.mp4');
  porky.hide();
  drumroll = createAudio('images/drumroll.wav');
  crowdBooing = createAudio('images/boo.wav');
}

function playAudio() {
  if (audioPlaying) {
    drumroll.play();
  }
  audioPlaying = false;
}

function playVideo() {
  if (vidPlaying) {
    porky.play();
  }
  vidPlaying = false;
}

function playBoo() {
  if (booing) {
    crowdBooing.play();
  }
  booing = false;
}

function startShow() {
  showtime = true;
}

function endShow() {
  showsOver = true;
}

function draw() {
  background(255);
  image(porky, 100, 0, 800, 525);
  image(capture, vidX, 0, 780, 585);
  image(curtainL, -curtainX, 0);
  image(curtainR, curtainX, 0);
  image(cane, caneX, 150);
  image(stage);
  if (showtime === true) {
    ready.hide();
    boo.show();
    playAudio();
    count++;
    if (curtainX < 400 && count > 90) {
      curtainX += 1;
    }
    if (showsOver) {
      boo.hide();
      caneX += caneSpeed;
      playBoo();
      count2++;
    }
    if (caneX < 300) {
      caneSpeed = 10;
    }
    if (caneSpeed > 0) {
      vidX += caneSpeed;
      // playVideo();
    }
    if (vidX > 900 && caneSpeed > 0) {
      caneX = vidX = 900;
    }
    if (count2 > 120) {
      playVideo();
    }
  }
}