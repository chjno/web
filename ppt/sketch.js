var inputName;
var inputWord;
var urlImage;
var currentSlide = 0;
var yourName;
var yourWord;
var def1;
var defPrint = true;
var defDiv;
var mood;
var rand;
var moods = [];
var apiKey;
var wordnikKey;
var previousSlide
var nextSlide

function setup() {
  inputName = createInput('Your name');
  inputWord = createInput('Your favorite thing');
  var button = createButton('Begin');
  button.mousePressed(begin);
  previousSlide = createButton('Previous');
  previousSlide.mousePressed(goBack);
  previousSlide.hide();
  nextSlide = createButton('Next');
  nextSlide.mousePressed(advance);
  nextSlide.hide();

  createCanvas(1021, 655);

  defDiv = createDiv('');
  image1 = createImg();
  image1.hide();
}

function preload() {
  template = loadImage('media/template.png');
  // typewriter = loadSound('media/typewriter.wav');
  loadJSON('moods.json', gotMoods);
  loadJSON('creds.json', gotKeys);
}

function begin() {
  currentSlide = 0;
  defPrint = true;
  defDiv.hide();
  image1.hide();
  previousSlide.show();
  nextSlide.show();
  yourName = inputName.value();
  yourWord = inputWord.value();
  var urlDef = 'http://api.wordnik.com:80/v4/word.json/' + yourWord + 
    '/definitions?limit=10&includeRelated=false&useCanonical=true' +
    '&includeTags=false&api_key=' + wordnikKey;

  var urlImage = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&searchType=image" +
    // The number below comes from https://cse.google.com/cse/manage/all
    "&cx=017113430126644414771:wwhvz3sxr2q" +
    "&q=" + yourWord + "&num=1&start=1&imgSize=large";

  loadJSON(urlDef, gotDef);
  loadJSON(urlImage, gotImage);
  mood = moods[round(random(0, moods.length))];
  // println(urlImage);
}

function gotDef(data) {
  println(data);
  // println(urlDef + yourWord + type);

  if (data[0] == undefined) {
    currentSlide = -1;
  } else {
    currentSlide = 1;
    def1 = data[0].text;
  }

  defDiv = createDiv(yourWord + ' is ' + def1);
  defDiv.style('width', '25em');
  defDiv.style('word-wrap', 'normal');
  defDiv.style('font-size','x-large');
  defDiv.position(200,300);
  defDiv.hide();
}

function gotImage(data) {
  // println(data);
  // println(data.items[0].link);

  image1 = createImg(data.items[0].link);
  image1.size(300,300);
  image1.hide();
}

function gotMoods(data) {
  // println(data.moods[0]);
  // rand = data.moods.length.round;
  // println(round(random(0, data.moods.length)));
  moods = data.moods;
  // println(mood);
}

function gotKeys(data){
  apiKey = data.googKey;
  wordnikKey = data.wordnikKey;
}

function goBack() {
  if (currentSlide > 1) {
    currentSlide--;
  }
}

function advance() {
  if (currentSlide > 0) {
    currentSlide++;
  }
}

function draw() {
  textSize(48);
  textAlign(CENTER);

  if (currentSlide == -1) {
    fill('red');
    text('Please enter a valid thing', 500, 300);
  }

  if (currentSlide > 0) {
    image(template);
  }

  fill(0);

  if (currentSlide == 1) {
    textSize(80);
    text(yourWord, 500, 300);
    textSize(24);
    text('by ' + yourName, 500, 450);
    textAlign(LEFT);
    textSize(16);
    text('First Grade', 20, 600);
    text("Mr. Shiffman's Class", 20, 620);
    text('ITP Elementary School', 20, 640);
  }

  if (currentSlide == 2) {
    defPrint = true;
    defDiv.hide();
    text('I love ' + yourWord, 500,300);
  }

  if (currentSlide == 3) {
    image1.hide();
    text('What is ' + yourWord + '?', 500,100);
    if (defPrint) {
      defDiv.show();
      defPrint = false;
    }
  }

  if (currentSlide == 4) {
    defPrint = true;
    defDiv.hide();
    text("Here's what I think of", 500, 100);
    text("when I think of " + yourWord, 500, 150);
    image1.position(350, 250);
    image1.show();

  }

  if (currentSlide == 5) {
    image1.hide();
    text(yourWord + ' makes me feel ', 500, 100);
    textSize(100);
    text(mood, 500, 300);
  }

  if (currentSlide == 6) {
    text('The End', 500, 300);
  }

  if (currentSlide > 6) {
    currentSlide = 1;
  }

}
