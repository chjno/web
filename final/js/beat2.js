var Beat = function(){

  this.kickURL = './sounds/kick.ogg';
  this.snareURL = './sounds/snare.ogg';
  this.hihatURL = './sounds/hihat.ogg';

  this.kick = new Tone.Player({
    "url": this.kickURL,
    "retrigger": true,
    "volume": -64
  }).toMaster();

  this.snare = new Tone.Player({
    "url": this.snareURL,
    "retrigger": true,
    "volume": -65
  }).toMaster();

  this.hihat = new Tone.Player({
    "url": this.hihatURL,
    "retrigger": true,
    "volume": -85
  }).toMaster();
}

Beat.prototype.start = function(when){
  when = when || this.kick.now();

  Tone.Transport.scheduleOnce(function(time){
    this.fadeIn(6);
  }.bind(this), when);
  
  var bassPattern = 0;
  var loop = new Tone.Loop(function(time){

    var bassMath = Math.floor(Math.random() * 4);

    while (bassPattern == bassMath){
      bassMath = Math.floor(Math.random() * 4);
    }
    bassPattern = bassMath;

    switch (bassPattern){
      case 0:
        this.kick.start(time);
        this.kick.start(time + 2.25);
        this.kick.start(time + 2.75);
        break;
      case 1:
        this.kick.start(time);
        break;
      case 2:
        this.kick.start(time);
        this.kick.start(time + 1);
        break;
      case 3:
        this.kick.start(time);
        this.kick.start(time + 0.75);
        break;
    }

    this.snare.start(time + 1.5);
    for (var i = 0; i < 6; i++){
      this.hihat.start(time + i * 0.5);  
    }
    
  }.bind(this), 3).start(when);
}

Beat.prototype.fadeIn = function(time){
  this.kick.volume.rampTo(-14, time);
  this.snare.volume.rampTo(-15, time);
  this.hihat.volume.rampTo(-35, time);
}

Beat.prototype.fadeOut = function(time){
  this.kick.volume.rampTo(-64, time);
  this.snare.volume.rampTo(-65, time);
  this.hihat.volume.rampTo(-85, time);
}