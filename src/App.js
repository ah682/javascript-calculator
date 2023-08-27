import { useState } from "react";
import './App.css';

function App() {
    const [display, setDisplay] = useState('0');
    const [lastOperationWasEqual, setLastOperationWasEqual] = useState(false);

    const handleNumber = (event) => {
        const number = event.target.textContent;
        if (lastOperationWasEqual || display === '0') {
            setDisplay(number);
        } else {
            setDisplay(prevDisplay => prevDisplay + number);
        }
        setLastOperationWasEqual(false);
    };

    const handleOperator = (event) => {
        const operator = event.target.textContent;

        if (lastOperationWasEqual) {
            setDisplay(display + " " + operator + " ");
            setLastOperationWasEqual(false);
            return;
        }

        if (['+', '-', '*', '/'].includes(display.slice(-2, -1))) {
            if (operator === '-' && display.slice(-2, -1) !== '-') {
                setDisplay(display + operator);
            } else {
                setDisplay(display.slice(0, -2) + " " + operator + " ");
            }
        } else {
            setDisplay(display + " " + operator + " ");
        }
    };

    const sanitizeExpression = (str) => {
        const tokens = str.split(' ');
        const processedTokens = [];

        for (let i = 0; i < tokens.length; i++) {
            if (['+', '-', '*', '/'].includes(tokens[i])) {
                if (tokens[i + 1] === '-' && !['+', '-', '*', '/'].includes(tokens[i + 2])) {
                    processedTokens.push(tokens[i]);
                    processedTokens.push(tokens[i + 1] + tokens[i + 2]);
                    i += 2;
                    continue;
                } else {
                    processedTokens.push(tokens[i]);
                }
            } else {
                processedTokens.push(tokens[i]);
            }
        }

        return processedTokens.join(' ');
    };

    const handleEqual = () => {
        try {
            const sanitizedExpression = sanitizeExpression(display);
            const result = eval(sanitizedExpression.replace(/\s+/g, ''));
            setDisplay(parseFloat(result.toFixed(4)).toString());
            setLastOperationWasEqual(true);
        } catch (error) {
            setDisplay("Error");
        }
    };

    const handleDecimal = () => {
        const array = display.split(' ');
        const lastElement = array[array.length - 1];

        if (!lastElement.includes('.') && !isNaN(parseInt(lastElement))) {
            setDisplay(display + '.');
        }
    };

    const handleClear = () => {
        setDisplay('0');
    };

    return (
        <div className="container">
            <div className="title-text">React Calculator</div>
            <div className="App">
                <div className="calculator">
                    <div id="display" className="row">{display}</div>
                    <div id="clear" className="row" onClick={handleClear}>AC</div>
                    <div id="seven" onClick={handleNumber}>7</div>
                    <div id="eight" onClick={handleNumber}>8</div>
                    <div id="nine" onClick={handleNumber}>9</div>
                    <div id="multiply" onClick={handleOperator}>*</div>
                    <div id="four" onClick={handleNumber}>4</div>
                    <div id="five" onClick={handleNumber}>5</div>
                    <div id="six" onClick={handleNumber}>6</div>
                    <div id="divide" onClick={handleOperator}>/</div>
                    <div id="one" onClick={handleNumber}>1</div>
                    <div id="two" onClick={handleNumber}>2</div>
                    <div id="three" onClick={handleNumber}>3</div>
                    <div id="add" onClick={handleOperator}>+</div>
                    <div id="zero" onClick={handleNumber}>0</div>
                    <div id="decimal" onClick={handleDecimal}>.</div>
                    <div id="equals" onClick={handleEqual}>=</div>
                    <div id="subtract" onClick={handleOperator}>-</div>
                </div>
            </div>
        </div>
    );
}

export default App;
