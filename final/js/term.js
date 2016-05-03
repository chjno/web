var maxCherryHexes = [];
function cherryStart(term){
  var cherrySpaces = Array(Math.floor(term.cols() / 2) - 11).join(' ');
  for (var i = 0; i < cherry.length; i++){
    for (var j = 0; j < cherry[i].length; j++){
      if (cherry[i][j] != ' '){
        maxCherryHexes.push(Math.floor(Math.random() * cherryHexes.length));
      }
    }
    cherry[i] = cherrySpaces + cherry[i];
  }

  var addedLines = Math.floor(term.rows() / 2 - 8);
  for (var l = 0; l < addedLines; l++){
    cherry.unshift(' ');
  }

  for (var k = 0; k < maxCherryHexes.length; k++){
    cherryHexIndices.push(0);
  }

  burnCherry(term);
}

var globalCherryHex = 0;
var cherryHexIndices = [];

function changeCherryColors(){
  for (var i = 0; i < cherryHexIndices.length; i++){
    if (globalCherryHex <= maxCherryHexes[i]){
      cherryHexIndices[i] = globalCherryHex;
    } else {
      cherryHexIndices[i] = maxCherryHexes[i];
    }
  }
}

var inhale = true;
var exhale = false;
var burnToggle = false;
var burnCounter = 0;

var stopCherry = false;
var cherryRegexIndex = -1;
var cherryRegex = new RegExp('7|I|\\+|\\.|\\,|\\:|\\=|\\?|\\~', 'g');
function insertCherryHex(match){
  cherryRegexIndex++;
  return '[[;' + cherryHexes[cherryHexIndices[cherryRegexIndex]] + ';black]' + match + ']';
}

function burnCherry(term) {
  var next_delay = 300;
  setTimeout(function(){
    exhale = true;
  }, 5000);

  function display() {
    term.clear();
    var colorfulCherryArray = [];

    if (exhale){
      globalCherryHex--;
      changeCherryColors();
    } else {
      if (!inhale){
        switch (burnToggle){
          case true:
            for (var j = 0; j < cherryHexIndices.length; j++){
              if (maxCherryHexes[j] > 3 && maxCherryHexes[j] < cherryHexes.length){
                cherryHexIndices[j]++;
              }
            }
            globalCherryHex++;
            burnCounter++;
            if (burnCounter == 2){
              burnToggle = false;
              burnCounter = 0;
            }
            break;
          case false:
            for (var j = 0; j < cherryHexIndices.length; j++){
              if (maxCherryHexes[j] > 3){
                cherryHexIndices[j]--;
              }
            }
            globalCherryHex--;
            burnCounter++;
            if (burnCounter == 2){
              burnToggle = true;
              burnCounter = 0;
            }
            break;
        }
      } else {
        if (globalCherryHex < cherryHexes.length - 1){
          globalCherryHex++;
          changeCherryColors();
        } else {
          globalCherryHex++;
          changeCherryColors();
          inhale = false;
        }
      }
    }

    if (globalCherryHex == 0){
      stopCherry = true;
    } 

    // changeCherryColors();
    // console.log(cherryHexIndices);

    cherryRegexIndex = -1;
    for (var i = 0; i < cherry.length; i++){
      colorfulCherryArray[i] = cherry[i].replace(cherryRegex, insertCherryHex);
      term.echo(colorfulCherryArray[i]);
    }
    // console.log(colorfulCherryArray);

    if (!stopCherry) {
      setTimeout(display, next_delay);
    } else {
      term.clear();
      setTimeout(function(){
        // next act/scene
        // term.echo("To be continued...")
        // term.echo(' ');
        nextAct(term);
      }, 3000);
      setTimeout(function(){
        term.echo(' ');
        term.echo(' ');
        term.echo(' ');
        term.echo("[[;yellow;black]Music adapted from ][[!;;;;https://www.youtube.com/watch?v=U714BQfVYLs]\"...And The Forest Began To Sing\"][[;yellow;black] by Royksopp.]");
      }, 5000);
    }
  }
  display();
}


// turn off autostart for samples

// replace switch moves with function move()
// check whatNext()

var coords = [0, 0];
var dirs = ['north','east','south','west'];
var acts = ['sleep','forest','hole','underground', 'tbd'];
var actIndex = 0;
var act = acts[actIndex];
var scene = 0;
var stagnant = 0;
var description = transcript[act][scene]
var helpCounter = 0;
var helpLimit = 2;

function helpme(term){
  term.echo('[[;green;black]' + help[act][scene] + ']');
  term.echo(' ');
}

function nextAct(term){
  helpCounter = 0;
  actIndex++;
  act = acts[actIndex];
  scene = 0;
  description = transcript[act][scene]
  whereami();
  look(act,scene,term);
};

function nextScene(term){
  helpCounter = 0;
  scene++;
  description = transcript[act][scene]
  whereami();
  look(act,scene,term);
}

function whereami(){
  console.log('act: ' + actIndex + ' (' + act + '), ' + 'scene: ' + scene);
}
whereami();

// function setAS(a,s){
//   actIndex = a;
//   scene = s;
//   act = acts[actIndex];
//   whereami();
// }

// function termEcho(textCol, bgCol, text, term){
//   term.echo('[[;' + textCol + ';' + bgCol + ']' + text + ']');
// }

function look(act, scene, term){
  term.echo('[[;white;blue]' + transcript[act][scene] + ']');
  term.echo(' ');
}

function describe(string, term){
  term.echo('[[;white;blue]' + string + ']');
  term.echo(' ');
}

function walk(dir,term){
  if (dirs.indexOf(dir) > -1){
    switch (dir){
      case 'north':
        coords[1]++;
        break;
      case 'east':
        coords[0]++;
        break;
      case 'south':
        coords[1]--;
        break;
      case 'west':
        coords[0]--;
        break;
    }
    console.log('coords:', coords);
    analyzeCoords(term);
  } else {
    term.echo("You need to specify which compass direction to go in.")
    term.echo(' ');
  }
}

var tempDir;
var undergroundCount = 0;
var forestRadius = 2;
var undergroundRadius = 2;
function analyzeCoords(term){
  var coordSum = Math.abs(coords[0]) + Math.abs(coords[1]);
  switch (act){
    case 'forest':
      switch (scene){
        case 0:
          term.echo("Maybe you should look around first.");
          term.echo(' ');
          coords = [0, 0];
          break;
        case 1:
          beat.start('@3');
          nextScene(term);
          break;
        case 2:
          if (coordSum == forestRadius){
            if (coords[0] >= 0){
              tempDir = 'east.';
              coords = [-1,0];
            } else {
              tempDir = 'west.';
              coords = [1,0];
            }
            transcript[act][3] += tempDir;
            nextScene(term);
          } else {
            // scene = 2;
            look(act,scene,term);
          }
          break;
        case 3:
          if (coordSum == 0){
            nextAct(term);
          } else {
            if (tempDir[0] == 'e'){
              coords = [-1,0];
              look(act,scene,term);
            } else {
              coords = [1,0];
              look(act,scene,term);
            }
          }
          break;
      }
      break;
    case 'hole':
      term.echo('You may get lost again.');
      term.echo(' ');
      break;
    case 'underground':
      switch (scene){
        case 0:
          switch (undergroundCount){
            case 0:
              describe("It's really dark down here.", term);
              undergroundCount++;
              break;
            case 1:
              pauseTerm(10000, term);
              Tone.Transport.scheduleRepeat(function(time) {
                motif.start(time);
                motif.genLengths;
              }, 1.5, '@3');
              setTimeout(function(){
                describe("You're stumbling all over the place.", term);
              }, 8000);
              undergroundCount++;
              break;
            case 2:
              describe("This direction is as good as any.", term);
              undergroundCount++;
              coords = [0,0];
              break;
            case 3:
              if (coordSum == undergroundRadius){
                if (coords[1] >= 0){
                  tempDir = 'north.';
                  coords = [0,-1];
                } else {
                  tempDir = 'south.';
                  coords = [0,1];
                }
                transcript[act][1] += tempDir;
                nextScene(term);
              // }
              } else {
                describe("Keep going.", term);
              }
              break;
          }
          break;
        case 1:
          if (coordSum == 0){
            rain.start();
            rain.volume.rampTo(-15, 10);
            nextScene(term);
          } else {
            if (tempDir[0] == 'n'){
              coords = [0,-1];
              look(act,scene,term);
            } else {
              coords = [0,1];
              look(act,scene,term);
            }
          }
          break;
        case 2:
          term.echo("You may never find your way back.");
          term.echo(' ');
          break;
        case 3: 
          term.echo("Your legs aren't listening.");
          term.echo(' ');
          break;
      }
      break;
  }
}

function move(words, term){
  if (words[0] == 'move'){
    if (words.length > 1){
      if (act == 'hole'){
        if (words.indexOf('sticks') > -1){
          if (scene == 0){
            nextScene(term);
          } else {
            term.echo('You already moved the sticks.');
            term.echo(' ');
          }
        } else {
          term.echo("There's no such thing to move.");
          term.echo(' ');
        }
      } else {
        term.echo("There's nothing to move.");
        term.echo(' ');
      }
    } else {
      term.echo('What do you want to move?');
      term.echo(' ');
    }
  } else if (words.indexOf('up') > -1){
    if (act == 'hole'){
      if (words.length > 2){
        if (words.indexOf('sticks') > -1){
          if (scene == 0){
            nextScene(term);
          } else {
            term.echo('You already moved the sticks.');
            term.echo(' ');
          }
        } else {
          term.echo("There's no such thing to pick up.");
          term.echo(' ');
        }
      } else {
        term.echo("Pick up what?");
        term.echo(' ');
      }
    } else {
      term.echo("There's nothing to pick up.");
      term.echo(' ');
    }
  } else {
    term.echo("Pick?");
    term.echo(' ');
  }
}

function climb(words, term){
  if (words[0] == 'climb'){
    if (words.length > 1){
      if (act == 'hole'){
        if (words.indexOf('hole') > -1 || words.indexOf('ladder') > -1 || words.indexOf('down') > -1){
          if (scene == 1){
            // pauseTerm(9000, term);
            term.pause();
            term.freeze(true);

            startBass('@3');
            Tone.Transport.scheduleOnce(function(time){
              drawDarkness(term);
              // setTimeout(function(){
              //   // term.echo('[[;white;blue]Where are you going?]');
              //   // term.echo(' ');
              //   nextAct(term)
              // }, 10000);
            }, '@3');
          } else {
            term.echo("There's nothing to climb.");
            term.echo(' ');
          }
        } else {
          term.echo("There is no such thing to climb.");
          term.echo(' ');
        }
      } else if (act == 'underground'){
        if (scene == 0){
          term.echo("You reach for the ladder but you've lost it in the darkness.");
          term.echo(' ');
        } else {
          term.echo("There's nothing to climb.");
          term.echo(' ');
        }
      } else {
        term.echo("There's nothing to climb.");
        term.echo(' ');
      }
    } else {
      term.echo("Climb what?");
      term.echo(' ');
    }
  } else {
    if (scene == 1){
      // pauseTerm(9000, term);
      term.pause();
      term.freeze(true);

      startBass('@3');
      Tone.Transport.scheduleOnce(function(time){
        drawDarkness(term);
        // setTimeout(function(){
        //   // term.echo('[[;white;blue]Where are you going?]');
        //   // term.echo(' ');
        //   nextAct(term)
        // }, 10000);
      }, '@3');
    } else {
      term.echo("There's nothing to descend.");
      term.echo(' ');
    }
  }
}

function lay(words, term){
  if (words.length > 1){
    if (act == 'underground'){
      if (scene == 2){
        if (((words[0] == 'lie' || words[0] == 'lay') && (words.indexOf('down') > -1 || words.indexOf('bed') > -1))) {
          genStarArr(term);
          // nextScene(term);
        // } else if ((words[0] == 'sleep' || words[0] == 'rest') && words.indexOf('bed') > -1) {
        } else {
          term.echo(words[0] + " where?");  
          term.echo(' ');
        }
      } else if (scene == 3){
        look(act,scene,term);
      } else {
        term.echo("This might not be the best place for that.");  
        term.echo(' ');
      }
    } else {
      term.echo("Maybe you should find some shelter first.");
      term.echo(' ');
    }
  } else {
    if (words[0] == 'lie' || words[0] == 'lay'){
      term.echo(words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' what?');
      term.echo(' ');
    } else {
      term.echo(words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' where?');
      term.echo(' ');
    }
    
  }
}

function smoke(words, term){
  if (words.length > 1){
    if (act == 'underground'){
      if (scene == 3){
        if (words.indexOf('cigarette') > -1 || words.indexOf('cig') > -1){
          term.pause();
          term.freeze(true);
          term.clear();
          
          setTimeout(function(){
            cherryStart(term);
          }, 1000);
          beat.fadeOut(4);
          bass.volume.rampTo(bass.volume.value - 50, 7);
          motif.synth.volume.rampTo(motif.synth.volume.value - 50, 7);
          puff.start();
          puff.volume.rampTo(-4, 6);
          // setTimeout(function(){
          //   // next act/scene
          //   // term.echo("To be continued...")
          //   // term.echo(' ');
          //   nextAct(term);
          // }, 10000);
          // setTimeout(function(){
          //   term.echo(' ');
          //   term.echo(' ');
          //   term.echo(' ');
          //   term.echo("[[;yellow;black]Music adapted from ][[!;;;;https://www.youtube.com/watch?v=U714BQfVYLs]\"...And The Forest Began To Sing\"][[;yellow;black] by Royksopp.]");
          // }, 12000);
        } else {
          term.echo("Smoke what?");
          term.echo(' ');
        }
      } else {
        term.echo('There is nothing to smoke.');
        term.echo(' ');
      }
    } else {
      term.echo('There is nothing to smoke.');
      term.echo(' ');
    }
  } else {
    term.echo("Smoke what?");
    term.echo(' ');
  }
}










var stopStars = false;
var starArray = [];
var starHexIndices = [];
var starHexes = ["#000000", "#554B00", "#AA9600", "#FFE100", "#AA9600", "#554B00"];
var starLine = [];

var reIndex = -1;
var re = new RegExp('7|\\.|\\,|\\*|\\?', 'g');
function insertHex(match){
  reIndex++;
  // console.log('[[;' + starHexes[starHexIndices[reIndex]] + ';black]' + match + ']')
  return '[[;' + starHexes[starHexIndices[reIndex]] + ';black]' + match + ']';
}

var termCols;
var termRows;

function twinkle(term) {
  var next_delay = 500;

  function display() {
    term.clear();
    var colorfulStarArray = [];

    // var index = 0;
    // for (var j = 0; j < starArray.length; j++){
    //   // if (starArray[j][0] != ' '){
    //   if (j%2){
    //     starLine.push('[[;' + starHexes[starHexIndices[index]] + ';black]' + starArray[j] + ']');
    //     index++;
    //   } else {
    //     starLine.push(starArray[j]);
    //   }
    // };

    for (var i = 0; i < starHexIndices.length; i++){
      if (starHexIndices[i] == starHexes.length - 1){
        starHexIndices[i] = 0;
      } else {
        starHexIndices[i]++;
      }
    };

    reIndex = -1;
    for (var j = 0; j < starArray.length; j++){
      colorfulStarArray[j] = starArray[j].replace(re, insertHex);
      term.echo(colorfulStarArray[j]);
    }

    // starLine = starArray.join('');
    // console.log(starLine.join(''));
    // term.echo(starLine.join(''));

    // starLine = [];
    

    if (!stopStars) {
      setTimeout(display, next_delay);
      // for (var i = 0; i < starHexIndices.length; i++){
      //   if (starHexIndices[i] == 5){
      //     starHexIndices[i] = 0;
      //   } else {
      //     starHexIndices[i]++;
      //   }
      // };
    } else {
      setTimeout(function(){
        term.resume();
        term.freeze(false);
      }, 1500);
      nextScene(term);
      // term.clear();
      // term.echo('stopped');
    }
  }
  display();
}

// function genStarArr(term){
//   var termCols = term.cols();
//   var termRows = term.rows();
//   var line = Array(termCols).join(' ') + '\n';
//   var character = '';
//   var index = 0;
//   for (var i = 1; i < termRows; i++){
//     for (var j = 0; j < termCols; j++) {
//       var rand = Math.random();
//       for (var k = 0; k < starProbabilities.length; k++) {
//         if (rand > starProbabilities[k][1] && rand <= starProbabilities[k][2]) {
//           starArray.push(line);
//           line = '';
//           starHexIndices.push(Math.floor(Math.random() * starHexes.length));
//           starArray.push(starProbabilities[k][0]);
//         }
//       }
//       if (!character) {
//         line += ' ';
//       }
//     }
//     line += '\n';
//   };
//   // console.log(starArray);
//   // console.log(starHexIndices);
//   // twinkle(term);

//   scrollStars(termCols, term);
// }

function genStarArr(term) {
  term.pause();
  term.freeze(true);
  var index = 0;
  var termCols = term.cols();
  var termRows = term.rows();
  var colorfulStarArray = [];
  for (var i = 0; i < termRows; i++) {
    var delay = 0 + i * 50;
    var line = '';
    var character = '';
    for (var j = 0; j < termCols; j++){
      var rand = Math.random();
      for (var k = 0; k < starProbabilities.length; k++){
        if (rand > starProbabilities[k][1] && rand <= starProbabilities[k][2]){
          character = starProbabilities[k][0];
          starHexIndices.push(Math.floor(Math.random() * starHexes.length));
        }
      }
      if (!character){
        character = ' ';
      }
      line += character;
      character = '';
    }
    starArray.push(line);
    colorfulStarArray.push(line.replace(re, insertHex));
    line = '';

    setTimeout(function() {
      term.echo(colorfulStarArray[index]);
      index++;
    }, delay);
  }
  setTimeout(function(){
    twinkle(term);
  }, termRows * 50 + 500);
  setTimeout(function(){
    stopStars = true;
  }, termRows * 50 + 10000);
}

// function scrollStars(termCols, term){
//   var index = 0;
//   // var scrollString = starArray.join('');

//   // var pattern = '(.{1,' + termCols + '})';
//   // var re = new RegExp(pattern, 'g');
//   // var scrollArray = scrollString.match(re);

//   for (var k = 0; k < scrollArray.length; k++){
//     scrollArray[k] = scrollArray[k].replace(re, insertHex);
//     // console.log(scrollArray[k]);
//   }
//   // console.log(scrollArray);
//   var delayIndex = 0;
//   for (var i = 0; i < scrollArray.length; i++){
//     var delay = 0 + i * 50;
//     setTimeout(function() {
//       term.echo(scrollArray[delayIndex]);
//       delayIndex++;
//     }, delay);
//   }
// }

var state = 0;
var testing = false;

function draw(img, term) {
  var index = 0;
  for (var i = 0; i < img.length; i++) {
    var delay = 0 + i * 50;
    setTimeout(function() {
      term.echo(img[index]);
      index++;
    }, delay);
  }
}

function drawCherry(term){

}

function drawTrees(term) {
  var index = 0;
  for (var i = 0; i < trees.length; i++) {
    var delay = 0 + i * 50;
    var decimalLength = term.cols() / trees[i].length - 0.02;
    var line = [Math.ceil(decimalLength), Math.floor((decimalLength % 1) * 100)];
    setTimeout(function() {
      if (treeColors[index]){
        term.echo('[' + treeColors[index] + Array(line[0]).join(trees[index]) + trees[index].slice(0, line[1]) + ']');
      } else {
        term.echo(treeColors[index] + Array(line[0]).join(trees[index]) + trees[index].slice(0, line[1]));
      }
      index++;
    }, delay);
  }
}

// starProbabilities = {
//   ',' : 0.009810213624277987,
//   '7' : 0.002108737508022371,
//   '.' : 0.017144952782616667,
//   '*' : 0.0002750527184377006,
//   '?' : 0.00009168423947923352
// }

starProbabilities = [
  [',', 0, 0.002210213624277987],
  ['7', 0.009810213624277987, 0.011918951132300359],
  ['.', 0.011918951132300359, 0.012253690290639038],
  ['*', 0.019253690290639038, 0.019528743009076737],
  ['?', 0.019528743009076737, 0.01962042724855597]
]

// function drawStars(term) {
//   var index = 0;
//   var termCols = term.cols();
//   for (var i = 0; i < 108; i++) {
//     var delay = 0 + i * 50;
//     var starColors = '[;yellow;black]';
//     setTimeout(function() {
//       var line = '';
//       var character = '';
//       for (var j = 0; j < termCols; j++){
//         var rand = Math.random();
//         for (var k = 0; k < starProbabilities.length; k++){
//           if (rand > starProbabilities[k][1] && rand <= starProbabilities[k][2]){
//             character = starProbabilities[k][0];
//           }
//         }
//         if (!character){
//           character = ' ';
//         }
//         line += character;
//         character = '';
//       }
//       term.echo('[' + starColors + line + ']');
//     }, delay);
//   }
// }

function drawDarkness(term){
  var index = 0;
  for (var i = 0; i < darkness.length; i++) {
    var delay = i * 45;
    setTimeout(function() {
      term.echo('[[;;' + darkness[index] + ']' + Array(term.cols() - 1).join(' ') + ']');
      // term.echo('[[;;' + darkness[index] + ']                                                                                                    ]');
      // var array = ['/','\\'];
      // var s = '';
      // for (var i = 0; i < 100; i++){
      //   // s += array[Math.floor(Math.random() * 2)];
      //   s += '@';
      // }
      // // s += ' ';
      // term.echo('[[;' + gradient[index] + ';]' + s + ']');
      index++;
    }, delay);
  }
  setTimeout(function(){
    nextAct(term);
  }, darkness.length * 45);
  setTimeout(function(){
    term.resume();
    term.freeze(false);
  }, darkness.length * 45 + 1000);
}


function pauseTerm(delay, term){
  term.pause();
  term.freeze(true);
  setTimeout(function(){
    term.resume();
    term.freeze(false);
  }, delay);
};

function startTerm(){
  jQuery(function($, undefined) {
    $('#term').terminal(function(command, term) {
      var commandArr = command.toLowerCase().split(' ');
      // console.log(commandArr);

      if (act == 'sleep'){
        // term.echo("sleeping...");

        if (commandArr.indexOf('wake') > -1){
          vinyl.start();
          vinyl.volume.rampTo(-6,10);
          // setTimeout(function(){
          //   term.echo('[[;white;blue]You wake up in a cold sweat]');
          //   term.echo(' ');
          // }, 2000);
          // setTimeout(function(){
          //   term.echo('[[;white;black]               ][[;white;blue]surrounded by darkness.]');
          //   term.echo(' ');
          // }, 5000);
          // pauseTerm(9000, term);
          nextAct(term);
          // scene++;
        } else {
          look(act, scene, term);
          if (scene < transcript[act].length - 1){
            scene++;
          };
        }

      } else {
        if (commandArr[0]){
          // first word in command is...
          switch (commandArr[0]){

            // case 'wisp':
            //   draw(wisp,term);
            //   break;
            case 'cherry':
              cherryStart(term);
              break;

            case 'help':
              helpme(term);
              break;

            case 'look':
              if (act == 'forest' && scene == 0){
                pauseTerm(4000, term);
                drawTrees(term);
                setTimeout(function(){
                  nextScene(term);
                }, 3000);
              } else {
                look(act, scene, term);
              }
              break;

            case 'walk':
              walk(commandArr[1], term);
              break;

            case 'pick':
            case 'move':
              move(commandArr, term);
              break;

            case 'descend':
            case 'climb':
              climb(commandArr, term);
              break;

            case 'lie':
            case 'lay':
            case 'sleep':
            case 'rest':
              lay(commandArr, term);
              // genStarArr(term);
              break;

            case 'smoke':
              smoke(commandArr, term);
              break;

            case 'hi':
            case 'hello':
            case 'hey':
              term.echo(greetings[Math.floor(Math.random() * greetings.length)]);
              term.echo(' ');
              break;

            default:
              if (helpCounter < helpLimit){
                term.echo("That's not a verb I recognize.");
                term.echo(' ');
                helpCounter++;                
              } else {
                helpme(term);
              }
              break;
          }
        } else {
          term.echo(blankResponses[Math.floor(Math.random() * greetings.length)]);
          term.echo(' ');
        }
      }
    }, {
      greetings: '',
      name: 'js_demo',
      height: '100%',
      width: '100%',
      prompt: '> ',
      convertLinks: false
    });
  });
}