import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Timer.css'; // ✅ Import external stylesheet

const ENCOURAGEMENT_MESSAGES = [
  "Keep going, you’re doing great!",
  "Don’t give up now — you’re closer than you think.",
  "God’s got your back, stay focused!",
  "You’re improving with every minute.",
  "Faith in God took me through.",
  "Small steps every day — keep pushing!",
];
const MINUTE_IN_SECONDS = 60;
const TRIGGER_INTERVAL_SECONDS = 30 * MINUTE_IN_SECONDS;

// --- Helper Functions ---
const formatTime = (totalSeconds) => {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = Math.floor(safeSeconds % 60);
  const parts = [];
  if (hours > 0 || safeSeconds >= 3600) {
    parts.push(String(hours).padStart(2, '0'));
  }
  parts.push(String(minutes).padStart(2, '0'));
  parts.push(String(seconds).padStart(2, '0'));
  return parts.join(':');
};

const playChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.warn("Chime failed:", e);
  }
};

// --- Main Component ---
const Timer = () => {
  const DEFAULT_HOURS = 5;
  const DEFAULT_MINUTES = 0;
  const initialTotalDuration = (DEFAULT_HOURS * 3600) + (DEFAULT_MINUTES * 60);

  const [hoursInput, setHoursInput] = useState(DEFAULT_HOURS);
  const [minutesInput, setMinutesInput] = useState(DEFAULT_MINUTES);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(initialTotalDuration);
  const [secondsLeft, setSecondsLeft] = useState(initialTotalDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [encouragementMessage, setEncouragementMessage] = useState(`Session duration set to ${DEFAULT_HOURS} hours and ${DEFAULT_MINUTES} minutes. Press Start!`);
  const [messageHistory, setMessageHistory] = useState([]);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [isChimeEnabled, setIsChimeEnabled] = useState(true);

  const intervalRef = useRef(null);
  const lastTickTimeRef = useRef(0);

  const updateTimerDuration = useCallback((h, m) => {
    const safeHours = Math.max(0, parseInt(h) || 0);
    const safeMinutes = Math.max(0, parseInt(m) || 0);
    const newTotalDuration = (safeHours * 3600) + (safeMinutes * 60);

    if (newTotalDuration < MINUTE_IN_SECONDS) {
      const minSeconds = 1 * MINUTE_IN_SECONDS;
      setHoursInput(0);
      setMinutesInput(1);
      setTotalDurationSeconds(minSeconds);
      setSecondsLeft(minSeconds);
      setIsRunning(false);
      setEncouragementMessage("Minimum duration is 1 minute. Set to 01:00. Press Start!");
      return;
    }

    setTotalDurationSeconds(newTotalDuration);
    setSecondsLeft(newTotalDuration);
    setIsRunning(false);
    setEncouragementMessage(`Duration set to ${safeHours} hours and ${safeMinutes} minutes. Press Start!`);
  }, []);

  const triggerEncouragement = useCallback((totalElapsed) => {
    const now = new Date();
    const nextMessageIndex = (messageIndex + 1) % ENCOURAGEMENT_MESSAGES.length;
    const message = ENCOURAGEMENT_MESSAGES[nextMessageIndex];
    setEncouragementMessage(message);
    setMessageIndex(nextMessageIndex);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 2000);
    if (isChimeEnabled) playChime();
    if (isSpeechEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
    }
    setMessageHistory(prev => [{
      id: now.getTime(),
      message,
      time: now.toLocaleTimeString(),
      sessionTime: formatTime(totalElapsed) + ' elapsed',
      totalElapsedSeconds: totalElapsed,
    }, ...prev]);
  }, [messageIndex, isChimeEnabled, isSpeechEnabled]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }
    lastTickTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const timeElapsedSinceLastTick = now - lastTickTimeRef.current;
      lastTickTimeRef.current = now;
      setSecondsLeft(prev => {
        let newSecondsLeft = prev - (timeElapsedSinceLastTick / 1000);
        let totalElapsedSeconds = totalDurationSeconds - newSecondsLeft;
        const elapsedFloor = Math.floor(totalElapsedSeconds);
        const prevElapsedFloor = Math.floor(totalDurationSeconds - prev);
        const isTriggerTime = elapsedFloor > 0 &&
          (elapsedFloor % TRIGGER_INTERVAL_SECONDS === 0) &&
          (prevElapsedFloor % TRIGGER_INTERVAL_SECONDS !== 0);
        if (isTriggerTime) {
          const lastTrigger = messageHistory[0]?.totalElapsedSeconds || 0;
          if (elapsedFloor >= lastTrigger + TRIGGER_INTERVAL_SECONDS - 1) {
            triggerEncouragement(elapsedFloor);
          }
        }
        if (newSecondsLeft <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setEncouragementMessage("Session complete! You finished the total duration. Great work!");
          return 0;
        }
        return newSecondsLeft;
      });
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, totalDurationSeconds, triggerEncouragement, messageHistory]);

  const handlePresetChange = (e) => {
    const totalSeconds = parseInt(e.target.value) || 0;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    setHoursInput(h);
    setMinutesInput(m);
    updateTimerDuration(h, m);
  };

  const handleHoursChange = (e) => {
    const newHours = parseInt(e.target.value) || 0;
    setHoursInput(newHours);
    updateTimerDuration(newHours, minutesInput);
  };

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value) || 0;
    setMinutesInput(newMinutes);
    updateTimerDuration(hoursInput, newMinutes);
  };

  const handleStart = () => {
    if (secondsLeft > 0) {
      setIsRunning(true);
      setEncouragementMessage("Session started. Focus time!");
    } else {
      setEncouragementMessage("Please set a duration greater than zero minutes first.");
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    setEncouragementMessage("Session paused. Take a quick break.");
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  };

  const handleReset = () => {
    setIsRunning(false);
    const currentTotal = (hoursInput * 3600) + (minutesInput * 60);
    setSecondsLeft(currentTotal);
    setTotalDurationSeconds(currentTotal);
    setEncouragementMessage("Timer reset to start.");
    setMessageHistory([]);
    setMessageIndex(0);
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  };

  const displayTime = formatTime(Math.round(secondsLeft));
  const percentageComplete = totalDurationSeconds > 0
    ? Math.round(((totalDurationSeconds - secondsLeft) / totalDurationSeconds) * 100)
    : 0;

  return (
    <div className="timer-app-container">
      <div className={`timer-card ${isPulsing ? 'pulse-active' : ''}`}>
        <h1 className="timer-header">Encouragement Timer</h1>
        <div className="duration-controls-group">
          <label htmlFor="duration-select" className="duration-label">Quick Presets:</label>
          <select id="duration-select" onChange={handlePresetChange} value={totalDurationSeconds}>
            <option value={60 * MINUTE_IN_SECONDS}>1 Hour</option>
            <option value={180 * MINUTE_IN_SECONDS}>3 Hours</option>
            <option value={300 * MINUTE_IN_SECONDS}>5 Hours (Default)</option>
            <option value={600 * MINUTE_IN_SECONDS}>10 Hours</option>
            <option value={2400 * MINUTE_IN_SECONDS}>40 Hours</option>
          </select>
        </div>
        <div className="duration-controls-input">
          <label className="duration-label-custom">Custom Duration:</label>
          <input type="number" min="0" placeholder="Hours" value={hoursInput} onChange={handleHoursChange} />
          <span className="separator">H</span>
          <input type="number" min="0" placeholder="Minutes" value={minutesInput} onChange={handleMinutesChange} />
          <span className="separator">M</span>
        </div>
        <div className="countdown-display">{displayTime}</div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentageComplete}%` }}></div>
          <span className="progress-text">{percentageComplete}% Complete</span>
        </div>
        <div className="message-area">
          <p className="current-message">"{encouragementMessage}"</p>
        </div>
        <div className="control-buttons">
          <button onClick={isRunning ? handlePause : handleStart}
            className={`btn ${isRunning ? 'btn-pause' : 'btn-start'}`}
            disabled={secondsLeft <= 0 || totalDurationSeconds < MINUTE_IN_SECONDS}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleReset} className="btn btn-reset">Reset</button>
        </div>
        <div className="toggles">
          <label>
            <input type="checkbox" checked={isSpeechEnabled} onChange={() => setIsSpeechEnabled(!isSpeechEnabled)} />
            Enable Voice
          </label>
          <label>
            <input type="checkbox" checked={isChimeEnabled} onChange={() => setIsChimeEnabled(!isChimeEnabled)} />
            Enable Chime
          </label>
        </div>
      </div>
      <div className="history-log">
        <h2>Encouragement History</h2>
        {messageHistory.length === 0 ? (
          <p className="no-history">No messages recorded yet.</p>
        ) : (
          <ul className="history-list">
            {messageHistory.map(item => (
              <li key={item.id} className="history-item">
                <span className="history-time">@{item.sessionTime}</span>
                <span className="history-message">"{item.message}"</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Timer;
