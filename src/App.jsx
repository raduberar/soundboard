import React, { useEffect, useState } from 'react';
const firstSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];
const secondSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  },
];

const category = {
  drumKit: firstSoundsGroup,
  pianoKit: secondSoundsGroup,
};

const Key = ({ play, sound: { key, url, keyCode, id } }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === keyCode) {
      return play(key, id);
    }
  };
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []); //adds the event listener after the render

  return (
    <button id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
      <audio className="clip" id={key} src={url} />
      {key}
    </button>
  );
};

const Controale = ({ changeSounds, name, volume, changeVolume }) => {
  return (
    <div className="controale">
      <h3>Volume: {Math.round(volume * 100)} %</h3>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        id="vol-bar" /* if range was 0-100 we can't divide by 0, as audio element ranges are 0-1 */
        value={volume}
        onChange={changeVolume}
      />
      <p id="display">{name}</p>
      <button onClick={changeSounds}>Change Sounds</button>
    </div>
  );
};

const KeyGroups = ({ play, sounds }) => {
  {
    return (
      <div id="key-groups">
        {sounds.map((sound) => (
          <Key play={play} sound={sound} />
        ))}
      </div>
    );
  }
};

const App = () => {
  const [volume, setVolume] = React.useState(0.5);
  const [soundCategory, setSoundCategory] = React.useState('drumKit');
  const [sounds, setSounds] = React.useState(category[soundCategory]);

  const changeVolume = (e) => {
    setVolume(e.target.value); //for the bar to change
    setAudioVolume(); // to actually set audio elements volume
  };
  const setAudioVolume = () => {
    const audios = sounds.map((sound) => document.getElementById(sound.key));
    audios.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  const play = (key, id) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0; //for ending current audio (for fast pressing)
    audio.play();
    document.getElementById('display').textContent = id; //changes display element text to playing song
  };
  const changeSounds = () => {
    if (soundCategory === 'drumKit') {
      setSoundCategory('pianoKit');
      setSounds(category.pianoKit);
      document.getElementById('display').textContent = 'Piano Sounds';
    } else {
      document.getElementById('display').textContent = 'Heater Sounds';
      setSoundCategory('drumKit');
      setSounds(category.drumKit);
    }
  };

  return (
    <div id="drum-machine">
      <KeyGroups play={play} sounds={sounds} />
      <Controale
        changeSounds={changeSounds}
        sound={sounds}
        volume={volume}
        changeVolume={changeVolume}
      />
    </div>
  );
};

export default App;
