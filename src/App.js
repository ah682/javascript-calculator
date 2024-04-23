import { useState, useEffect } from "react";
import "./App.css";
import reactImage from "./react.png";
import { AuroraHero } from "./components/AnimatedBackground.jsx";

function App() {
  const [display, setDisplay] = useState("0");
  const [fontSize, setFontSize] = useState("36"); // Initial font size
  const [lastOperationWasEqual, setLastOperationWasEqual] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [key, setKey] = useState(0); // Added this state for handling display key updates
  const [animate, setAnimate] = useState(false); // Define the animate state here

  useEffect(() => {
    // Update the font size and the key for the animation when the display changes
    setFontSize(Math.min(36, 530 / display.length));
    setKey((prevKey) => prevKey + 1); // Update key to trigger re-render of the display animation
    // Trigger the animation only once when the component mounts
    setAnimate(true);
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

  const renderDisplay = () => {
    return (
      <div
        id="display"
        className={`row ${shakeError ? "shake" : ""}`}
        style={{
          fontSize: `${fontSize}px`,
          background: "#B447C3",
          color: "#ffffff",
        }}
        key={key} // Use key to trigger re-render
      >
        {display.split("").map((char, index) => (
          <span key={index} className="pop-animation">
            {char}
          </span>
        ))}
      </div>
    );
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
        {" "}
        <AuroraHero />
      </div>
      <div className="title-container">
        <img
          src={reactImage}
          alt="React Logo"
          className={`title-logo ${animate ? "animated" : ""}`}
        />
      </div>
      <div className="App">
        <div className="calculator">
          {renderDisplay()}
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
            className="symbols"
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
            className="symbols"
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
            className="symbols"
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
            className="equals-summary"
            onClick={(e) => {
              handleEqual(e);
              handleAnimation(e);
            }}
          >
            =
          </div>
          <div
            id="subtract"
            className="symbols"
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
