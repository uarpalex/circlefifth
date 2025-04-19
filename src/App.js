import React from 'react';
import ChordWheel from './components/ChordWheel';
import ChordProgressionPlayer from './components/ProgressionPlayer'
import './App.css';

function App() {
  return (
    <div className="App">
      <ChordProgressionPlayer/>
      <h1 className="-visually-hidden">Circle of fifths interactive SVG chord wheel (React version)</h1>
      <p className="-visually-hidden">Interactive wheel showing chord relationships in the circle of fifths.</p>
      <ChordWheel />
    </div>
  );
}

export default App;
