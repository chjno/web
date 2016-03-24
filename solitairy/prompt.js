function lonely() {
  colorMode(RGB);
  fill(207, 209, 199);
  // rect(width/2 - 100, 240, 200, 120);
  rect(promptX, 240, 200, 120);

  push();
  colorMode(HSB);
  for (var i = promptX + 3; i < promptX + 197; i++) {
    var blu = map(i, promptX + 3, promptX + 197, 100, 10);
    stroke(226, blu, 99);
    line(i, 243, i, 263);
  }
  pop();

  // prompt text
  fill(255);
  textFont('Tahoma');
  text('Solitary', promptX + 5, 257);

  fill(0);
  strokeWeight(0.1);
  text('Are you lonesome?', promptX + 60, 300);


  // x
  strokeWeight(1);
  fill(207, 209, 199);
  rect(promptX + 178, 246, 15, 15);
  
  fill(172, 173, 166);
  push();
  textSize(16);
  text('x',promptX + 182,258);
  pop();
  
  // triangle
  fill(243,224,6);
  triangle(promptX + 15, 310, promptX + 45, 310, promptX + 30, 280);
  fill(0);
  push();
  textSize(24);
  text('!',promptX + 26,306);
  pop();

  // buttons
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(promptX + 15, 325, 80, 20);

  strokeWeight(1);
  rect(promptX + 105, 325, 80, 20);

  // button text
  fill(0);
  strokeWeight(0.1);
  text('Yes', promptX + 45, 340);

  fill(172, 173, 166);
  text('No', promptX + 135, 340);
}
