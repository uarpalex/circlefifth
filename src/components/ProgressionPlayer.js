import React, { useState, useEffect, useRef } from 'react';

// More comprehensive list of chord progressions
const progressions = [
  { name: "I IV V", image: "", numChords: "3", quality: "Major" },
  { name: "I V vi IV", image: "", numChords: "4", quality: "Major" },
  { name: "ii V I", image: "", numChords: "3", quality: "Jazz" },
  { name: "I vi IV V", image: "", numChords: "4", quality: "Pop" },
  { name: "I IV vi V", image: "", numChords: "4", quality: "Rock" },
  { name: "vi IV I V", image: "", numChords: "4", quality: "Minor" },
  { name: "I V vi iii IV I IV V", image: "", numChords: "8", quality: "Extended" },
  { name: "i VI III VII", image: "", numChords: "4", quality: "Minor" },
  { name: "I VII IV", image: "", numChords: "3", quality: "Rock" },
  { name: "i iv VII III", image: "", numChords: "4", quality: "Minor" },
  { name: "ii7 V7 Imaj7", image: "", numChords: "3", quality: "Jazz" },
  { name: "I ii IV V", image: "", numChords: "4", quality: "Pop" },
  { name: "I III IV iv", image: "", numChords: "4", quality: "Sad" },
  { name: "I V IV V", image: "", numChords: "4", quality: "Classic" },
  { name: "vi IV V I", image: "", numChords: "4", quality: "Emotional" },
  { name: "I IV I V", image: "", numChords: "4", quality: "Folk" },
  { name: "I iii IV V", image: "", numChords: "4", quality: "Uplifting" },
  { name: "i VII VI VII", image: "", numChords: "4", quality: "Epic Minor" },
  { name: "I IV iv V", image: "", numChords: "4", quality: "Dramatic" },
  { name: "I II IV I", image: "", numChords: "4", quality: "Alternative" },
  { name: "IV V iii vi", image: "", numChords: "4", quality: "Introspective" },
  { name: "V IV I IV", image: "", numChords: "4", quality: "Bluesy" },
  { name: "I V IV vi", image: "", numChords: "4", quality: "Nostalgic" },
  { name: "I bVII bVI bVII", image: "", numChords: "4", quality: "Hard Rock" },
  { name: "I III IV V", image: "", numChords: "4", quality: "Bright" },
  { name: "vi V IV V", image: "", numChords: "4", quality: "Melancholic" },
  { name: "I II I V", image: "", numChords: "4", quality: "Energetic" },
  { name: "vi IV ii V", image: "", numChords: "4", quality: "Moody" }
];

const ChordProgressionPlayer = () => {
  const [selectedProgression, setSelectedProgression] = useState(progressions[0]);
  const [tempo, setTempo] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const intervalRef = useRef(null);

  // Parse chord numerals from the progression name
  const getChords = (progressionName) => {
    return progressionName.split(' ').filter(chord => chord.trim() !== '');
  };

  const chords = getChords(selectedProgression.name);

  // Start playing the chord progression
  const startProgression = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setIsPlaying(true);
    setCurrentChordIndex(0);
    
    // Calculate interval based on tempo (beats per minute)
    // 60000 ms / tempo = ms per beat
    const interval = 60000 / tempo;
    
    intervalRef.current = setInterval(() => {
      setCurrentChordIndex(prevIndex => (prevIndex + 1) % chords.length);
    }, interval);
  };

  // Stop playing the chord progression
  const stopProgression = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      stopProgression();
    } else {
      startProgression();
    }
  };

  // Handle progression change
  const handleProgressionChange = (e) => {
    const selected = progressions.find(prog => prog.name === e.target.value);
    setSelectedProgression(selected);
    if (isPlaying) {
      stopProgression();
      setCurrentChordIndex(0);
    }
  };

  // Handle tempo change
  const handleTempoChange = (e) => {
    const newTempo = parseInt(e.target.value);
    setTempo(newTempo);
    if (isPlaying) {
      stopProgression();
      startProgression();
    }
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
 
  // Container styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 0 0 16vw',
    backgroundColor: 'transparent',
  };

  // Top controls styles
  const controlsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '16px'
  };

  const selectStyle = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    width: '65%',
    fontSize: '14px'
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    width: '30%',
    marginLeft: '8px',
    fontSize: '14px'
  };

  // Chord display area styles
  const chordDisplayAreaStyle = {
    width: '100%',
    flexGrow: 1,
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: '16px',
    maxHeight: '300px'
  };

  const chordContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const getChordStyle = (index) => {
    return {
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '24px',
      color: index === currentChordIndex && isPlaying ? '#2563eb' : '#374151',
      backgroundColor: index === currentChordIndex && isPlaying ? '#dbeafe' : 'transparent',
      transform: index === currentChordIndex && isPlaying ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.2s ease'
    };
  };

  const qualityLabelStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    fontSize: '12px',
    color: '#6b7280'
  };

  // Bottom controls styles
  const bottomControlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  };

  const chordCountStyle = {
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: '9999px',
    fontWeight: '500',
    color: 'white',
    backgroundColor: isPlaying ? '#ef4444' : 'rgb(87 166 140)',
    border: 'none',
    cursor: 'pointer'
  };

  const iconStyle = {
    width: '16px',
    height: '16px',
    marginRight: '4px'
  };

  return (
    <div style={containerStyle}>
      <div style={controlsContainerStyle}>
        <select 
          id="progression"
          style={selectStyle}
          value={selectedProgression.name}
          onChange={handleProgressionChange}
        >
          {progressions.map((prog) => (
            <option key={prog.name} value={prog.name}>
              {prog.name} ({prog.quality})
            </option>
          ))}
        </select>
        
        <input
          id="tempo"
          type="number"
          min="40"
          max="220"
          style={inputStyle}
          value={tempo}
          onChange={handleTempoChange}
        />
      </div>
      
      <div style={chordDisplayAreaStyle}>
        <div style={chordContainerStyle}>
          {chords.map((chord, index) => (
            <div 
              key={index}
              style={getChordStyle(index)}
            >
              {chord}
            </div>
          ))}
        </div>
        
        <div style={qualityLabelStyle}>
          {selectedProgression.quality}
        </div>
      </div>
      
      <div style={bottomControlsStyle}>
        <div style={chordCountStyle}>
          <svg 
            style={iconStyle} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <span>Chords: {selectedProgression.numChords}</span>
        </div>
        
        <button
          onClick={togglePlay}
          style={buttonStyle}
        >
          {isPlaying ? (
            <>
              <svg 
                style={iconStyle} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
              Stop
            </>
          ) : (
            <>
              <svg 
                style={iconStyle} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Start
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChordProgressionPlayer;