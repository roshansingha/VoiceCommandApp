import React, { useState, useEffect} from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.start();

function App() {

  const[count, setCount] = useState(0);

  const voiceCommands = () => {
    recognition.onstart = () => {
      console.log('Voice is Activated');
    }

    recognition.onresult =(e) => {
      let current = e.resultIndex;
      let transcript = e.results[current][0].transcript;
      let mobileRepeatBug = (current === 1 && transcript === e.results[0][0].transcript);

      if(!mobileRepeatBug) {
        if(transcript === 'next' || transcript === ' next') {
          setCount(count + 1);
        }

        if(transcript === 'back' || transcript === ' back') {
          setCount(count - 1);
        }
      }
      setTimeout(() => {
        recognition.start();
      }, 50);
    }

    recognition.onspeedend = () => {
      recognition.stop();
      console.log('Voice Stopped');
    }
  }

  useEffect(() => {
    voiceCommands();
  } );

  return (
    <div className="App">
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default App;
