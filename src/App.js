import { useState, useEffect } from "react";
import "./App.css";
import ParticleBackground from "./components/particleBackground.js";

function App() {
  const [display, setDisplay] = useState("0");
  const [fontSize, setFontSize] = useState("36"); // Initial font size
  const [lastOperationWasEqual, setLastOperationWasEqual] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  useEffect(() => {
    // Update the font size when the display changes
    setFontSize(Math.min(36, 530 / display.length));
  }, [display]);

  const handleNumber = (event) => {
    const number = event.target.textContent;
    if (lastOperationWasEqual || display === "0") {
      setDisplay(number);
    } else {
      setDisplay((prevDisplay) => prevDisplay + number);
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

    if (["+", "-", "*", "/"].includes(display.slice(-2, -1))) {
      if (operator === "-" && display.slice(-2, -1) !== "-") {
        setDisplay(display + operator);
      } else {
        setDisplay(display.slice(0, -2) + " " + operator + " ");
      }
    } else {
      setDisplay(display + " " + operator + " ");
    }
  };

  const sanitizeExpression = (str) => {
    const tokens = str.split(" ");
    const processedTokens = [];

    for (let i = 0; i < tokens.length; i++) {
      if (["+", "-", "*", "/"].includes(tokens[i])) {
        if (
          tokens[i + 1] === "-" &&
          !["+", "-", "*", "/"].includes(tokens[i + 2])
        ) {
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

    return processedTokens.join(" ");
  };

  const handleEqual = () => {
    try {
      const sanitizedExpression = sanitizeExpression(display);
      const result = eval(sanitizedExpression.replace(/\s+/g, ""));
      setDisplay(parseFloat(result.toFixed(4)).toString());
      setLastOperationWasEqual(true);
    } catch (error) {
      setShakeError(true); // Trigger a shake when an error occurs
      setDisplay("Error");
      setTimeout(() => setShakeError(false), 500); // Remove the shake class after 500ms
    }
  };

  const handleDecimal = () => {
    const array = display.split(" ");
    const lastElement = array[array.length - 1];

    if (!lastElement.includes(".") && !isNaN(parseInt(lastElement))) {
      setDisplay(display + ".");
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleAnimation = (event) => {
    const button = event.currentTarget;
    button.classList.add("active");

    setTimeout(() => {
      button.classList.remove("active");
    }, 600); // Remove the class after the animation duration
  };

  return (
    <div className="container">
      <div className="particles-container">
        <ParticleBackground />
      </div>
      <div className="title-text">React Calculator</div>
      <div className="App">
        <div className="calculator">
          <div
            id="display"
            className={`row ${shakeError ? "shake" : ""}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {display}
          </div>
          <div
            id="clear"
            className="row"
            onClick={(e) => {
              handleClear();
              handleAnimation(e);
            }}
          >
            AC
          </div>
          <div
            id="seven"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            7
          </div>
          <div
            id="eight"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            8
          </div>
          <div
            id="nine"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            9
          </div>
          <div
            id="multiply"
            onClick={(e) => {
              handleOperator(e);
              handleAnimation(e);
            }}
          >
            *
          </div>
          <div
            id="four"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            4
          </div>
          <div
            id="five"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            5
          </div>
          <div
            id="six"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            6
          </div>
          <div
            id="divide"
            onClick={(e) => {
              handleOperator(e);
              handleAnimation(e);
            }}
          >
            /
          </div>
          <div
            id="one"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            1
          </div>
          <div
            id="two"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            2
          </div>
          <div
            id="three"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            3
          </div>
          <div
            id="add"
            onClick={(e) => {
              handleOperator(e);
              handleAnimation(e);
            }}
          >
            +
          </div>
          <div
            id="zero"
            onClick={(e) => {
              handleNumber(e);
              handleAnimation(e);
            }}
          >
            0
          </div>
          <div
            id="decimal"
            onClick={(e) => {
              handleDecimal(e);
              handleAnimation(e);
            }}
          >
            .
          </div>
          <div
            id="equals"
            onClick={(e) => {
              handleEqual(e);
              handleAnimation(e);
            }}
          >
            =
          </div>
          <div
            id="subtract"
            onClick={(e) => {
              handleOperator(e);
              handleAnimation(e);
            }}
          >
            -
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
