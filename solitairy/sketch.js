var h = 0;
var s = 100;
var b = 100;
var cardW = 100;
var cardH = 140;
var cardR = 5;
var cardX;
var cardY = 20;
var gravity = 1;
var speedX = 0;
var speedY = 0;
var origins = [];
var index = 0;
var cardCount = 0;
var animate = true;

var canvasWidth = 850;
var canvasHeight = 600;
var promptX = canvasWidth/2 - 100;

function preload() {
  face = loadImage('face.png');
  sound = loadSound('alert.wav');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  for (var i = 0; i < 4; i++){
    origins[3 - i] = canvasWidth - 125 - i * 120;
  }

  cardX = origins[0];
  speedX = 5;
  speedY = -1;

  colorMode(HSB);

  newGame();
}

function newGame() {
  cardCount = 0;

  background('green');

  // chino card
  fill(32, 23, 94);
  rect(20, 20, cardW, cardH, cardR);
  image(face, 31, 70);

  // starting cards
  for (var i = 0; i < 4; i++) {
    fill(0 + i * 90, s, b);
    var x = origins[i];
    rect(x, 20, cardW, cardH, cardR);
  }
}

// cardX = origins[0];
// speedX = 5;
// speedY = -1;

function draw() {
  if (animate) {
    h++;
    if (h > 360) {
      h = 0;
    }

    fill(h, s, b);
    rect(cardX, cardY, 100, 140, 5);
    cardX += speedX;
    cardY += speedY;
    speedY += gravity;
    if (cardY + 140 > height) {
      cardY = height - 140;
      speedY *= -0.8;
    }
    if (cardX > width || cardX + cardW < 0) {
      index++;
      cardCount++;
      if (cardCount == 52) {
        background('green');
        sound.play();
        lonely();
        animate = false;
      }
      if (index > 3) {
        index = 0;
      }
      speedX = random(-12, 6);
      while (speedX > -2 && speedX < 2) {
        speedX = random(-12, 6);
      }
      cardX = origins[index];
      cardY = 20;

    }
  }
}

function mousePressed() {
  if (!animate) {
    if (mouseX > promptX + 15 && mouseX < promptX + 95 && mouseY > 325 && mouseY < 345) {
      newGame();
      animate = true;
    } else if (touchX > promptX + 15 && touchX < promptX + 95 && touchY > 325 && touchY < 345) {
      newGame();
      animate = true;
    } else {
      sound.play();
    }
  }
}
