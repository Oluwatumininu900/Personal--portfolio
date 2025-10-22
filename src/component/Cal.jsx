import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divide, X, Minus, Plus, Delete, Percent, CornerUpLeft } from 'lucide-react';
import './Cal.css';


// Custom SVG component for SquareRoot to bypass the compilation error
const SquareRootSvg = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20l5.5-12h4.5" />
    <path d="M4 14l4 4" />
    <path d="M8 18l5-12" />
  </svg>
);

const Cal = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const buttons = [
    { label: 'C', type: 'clear' },
    { label: <Delete size={20} />, type: 'delete' },
    { label: '±', type: 'sign' },
    { label: <Divide size={20} />, type: 'operator', value: '/' },

    { label: '7', type: 'number', value: '7' },
    { label: '8', type: 'number', value: '8' },
    { label: '9', type: 'number', value: '9' },
    { label: <X size={20} />, type: 'operator', value: '*' },

    { label: '4', type: 'number', value: '4' },
    { label: '5', type: 'number', value: '5' },
    { label: '6', type: 'number', value: '6' },
    { label: <Minus size={20} />, type: 'operator', value: '-' },

    { label: '1', type: 'number', value: '1' },
    { label: '2', type: 'number', value: '2' },
    { label: '3', type: 'number', value: '3' },
    { label: <Plus size={20} />, type: 'operator', value: '+' },

    { label: <Percent size={20} />, type: 'function', value: '%' },
    { label: '0', type: 'number', value: '0' },
    { label: '.', type: 'decimal', value: '.' },
    { label: '=', type: 'equal', value: '=' },
  ];

  const calculate = (a, op, b) => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    switch (op) {
      case '+': return x + y;
      case '-': return x - y;
      case '*': return x * y;
      case '/': return y === 0 ? 'Error' : x / y;
      default: return b;
    }
  };

  const handleInput = (btn) => {
    const input = btn.value;

    switch (btn.type) {
      case 'number':
        if (display === '0' || waitingForNewValue) {
          setDisplay(input);
          setWaitingForNewValue(false);
        } else setDisplay(display + input);
        break;

      case 'decimal':
        if (waitingForNewValue) {
          setDisplay('0.');
          setWaitingForNewValue(false);
        } else if (!display.includes('.')) {
          setDisplay(display + input);
        }
        break;

      case 'operator':
        if (currentValue === null) setCurrentValue(display);
        else if (!waitingForNewValue) {
          const result = calculate(currentValue, operator, display);
          setCurrentValue(result);
          setDisplay(result.toString());
        }
        setOperator(input);
        setWaitingForNewValue(true);
        break;

      case 'equal':
        if (currentValue !== null && operator !== null) {
          const result = calculate(currentValue, operator, display);
          setDisplay(result.toString());
          setCurrentValue(null);
          setOperator(null);
          setWaitingForNewValue(true);
        }
        break;

      case 'clear':
        setDisplay('0');
        setCurrentValue(null);
        setOperator(null);
        setWaitingForNewValue(false);
        break;

      case 'delete':
        if (display.length > 1) setDisplay(display.slice(0, -1));
        else setDisplay('0');
        break;

      case 'sign':
        if (display !== '0' && display !== 'Error') {
          setDisplay(display.startsWith('-') ? display.substring(1) : '-' + display);
        }
        break;

      case 'function':
        if (input === '%') {
          const num = parseFloat(display);
          if (!isNaN(num)) setDisplay((num / 100).toString());
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="calc-body">
      <div className="calc-container">
        <h1 className="calc-title">React Calculator</h1>

        {/* Display */}
        <div className="calc-display">
          <div className="calc-prev">
            {currentValue && operator ? `${currentValue} ${operator}` : 'Ans'}
          </div>
          <div className="calc-current">{display}</div>
        </div>

        {/* Buttons */}
        <div className="calc-grid">
          {buttons.map((btn, i) => (
            <button
              key={i}
              className={`btn ${btn.type}`}
              onClick={() => handleInput(btn)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <p className="calc-footer">
          <CornerUpLeft size={14} /> Coded By Oginni Oluwatumininu
        </p>
      </div>
      <Link to="/formula" className="link-reset">
  <button
  className="glass-btn"
  onClick={() => window.open('/formula', '_blank')}
>
  View Formulas
</button>
</Link>
    </div>
  );
};

export default Cal;
