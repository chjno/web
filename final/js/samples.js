// var vinylWav = './sounds/static.wav';
// var vinylOgg = './sounds/static.ogg';
// var vinylURL;

// var puffWav = './sounds/puff.wav';
// var puffOgg = './sounds/puff.ogg';
// var puffURL;

// var rainWav = './sounds/rain.wav';
// var rainOgg = './sounds/rain.ogg';
// var rainURL;

var vinyl = new Tone.Player({
  "url": vinylURL,
  "loop": true,
  "loopStart": 4,
  // "retrigger": true,
  "volume": -56
}).toMaster();


// var laserEffect= new Tone.FeedbackDelay(0.8, 0.6).toMaster();
// var laserEffect= new Tone.Feedback(0.125).toMaster();

// var laserURL = './sounds/laser.ogg';

// var laser = new Tone.Player({
//   "url": laserURL,
//   "retrigger": true
// });

// laser.connect(laserEffect);
// laser.toMaster();

// function laserShot(){
//   var counter = 0;
//   for (var i = 0; i < 16; i++) {
//     var delay = 0 + 0.01 * Math.pow(i, 2);
//     Tone.Transport.schedule(function(time){
//       if (counter < 8){
//         laser.volume.value = -30 + counter * 3;
//       } else {
//         laser.volume.value = -6 - (counter - 7) * 3;
//       }
//       counter++;
//       laser.start(time);
//     }, laser.now() + delay);
//   }
// }

var puff = new Tone.Player({
  "url": puffURL,
  "volume": -50
}).toMaster();

var rain = new Tone.Player({
  "url": rainURL,
  "loop": true,
  "loopStart": 4,
  "loopEnd": 54,
  // "autostart": true,
  "volume": -55
}).toMaster();