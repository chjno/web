// replace switch moves with function move()
// check whatNext()

var coords = [0, 0];
var dirs = ['north','east','south','west'];
var act = 0;
var scene = 0;

var scenes = [
  [ // 0 wake up
    "You wake up in a cold sweat. You have no memory of who you are or how you got here.",
  ],
  [ // 1 forest
    "You are in the woods surrounded by trees.",
    "You are still surrounded by trees.",
    "You are surrounded by trees but you see a clearing to the ",
  ],
  [ // 2 hole
    "There is a pile of leaves on the ground.",
    "There is a manhole in the ground.",
    "There is a ladder descending into darkness.",
  ],
  [ // 3 underground
    "You are surrounded by darkness.",
    "It's really dark down here. You can't even keep your balance.",
    "You've lost the hole that you came from.",
    "Where are you going?",
    "There appears to be some light to the east.",
    "There is a pool of water and an opening in the ceiling.",
  ]
];

var help = [
  [ // 0 wake up

  ],
  [ // 1 forest

  ],
  [ // 2 hole

  ],
  [ // 3 underground

  ]
];


function help(term){

}

function walk(dir, term){
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
    console.log(coords);
    whatNext(term);
  } else {
    term.echo("You need to specify which compass direction to go in.")
  }
}

var immovables = [
  
];

function move(thing, term){
  if (thing){
    switch (thing){
      case 'leaves':
        if (act == 2){
          if (scene == 0){
            scene++;
            look(act, scene, term);
          } else {
            term.echo('You already moved the leaves.');
          }
          break;
        } else {
          term.echo("You can't see any such thing.");
        };

      case 'manhole':
        if (act == 2){
          switch (scene){
            case 0:
              term.echo("You can't see any such thing.");
              break;
            case 1:
              scene++;
              look(act, scene, term);
              break;
            case 2:
              term.echo('You already moved the manhole.');
              break;
          }
        } else {
          term.echo("You can't see any such thing.");
        }
        
      default:
        term.echo("You can't see any such thing.");
        break;
    }

  // no thing specified
  } else {
    term.echo('What do you want to move?');
  }
}

function whatNext(term){
  switch (act){
    case 0:
      
      break;
    case 1:
      switch (Math.abs(coords[0]) + Math.abs(coords[1])){
        case 1:
          look(1,1,term);
          scene[1]++;
          break;
        case 2:
          look()
          scene[0]++;
          scene[1] = 0;
          break;
      }
    case 2:
      case 1
  }

  look(act, scene, term);
}




function termEcho(textCol, bgCol, text, term)){
  term.echo('[[;' + textCol + ';' + bgCol + ']' + text + ']');
}

function look(act, scene, term){
  term.echo('[[;white;blue]' + scenes[act][scene] + ']');
}

function termLine(){
  term.echo(' ');
}


var commandArr = command.toLowerCase().split(' ');

// first word in command is...
switch (commandArr[0]){

  case 'look':
    look(act, scene, term);
    break;

  case 'walk':
    walk(commandArr[1], term);
    break;

  case 'move':
    move(commandArr[1], term);
    break;

  default:
    term.echo("That's not a verb I recognize.");
    break;
}


