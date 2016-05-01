var bass = new Tone.SimpleSynth({
  "oscillator": {
    "type": "triangle"
  },
  "envelope": {
    "attack": 0.01,
    "decay": 0,
    "sustain": 1,
    "release": 0.015
  },
  "volume": -12
}).toMaster();

var bassLoop = new Tone.Pattern(function(time, note){
  bass.triggerAttackRelease(note, 1.49, time);
}, ['G1', 'D1', 'F#1', 'A1', 'G1', 'D1', 'F#1', 'G1'], "up");
bassLoop.interval = 1.5;


function startBass(when){
  bassLoop.start(when);
}