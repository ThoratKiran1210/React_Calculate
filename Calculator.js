import React, { useState, useEffect, useCallback } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const clearInput = useCallback(() => {
    setInput("");
  }, []);

  const handleEquals = useCallback(() => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  }, [input]);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if (/\d/.test(key) || ["+", "-", "*", "/", "."].includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        handleEquals();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clearInput();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleEquals, clearInput]);

  return (
    <div className={`calculator ${darkMode ? "dark" : "light"}`}>
      <div className="display">{input || "0"}</div>

      <div className="buttons">
        <button className="clear" onClick={clearInput}>
          C
        </button>
        <button onClick={() => handleClick("/")}>÷</button>
        <button onClick={() => handleClick("*")}>×</button>
        <button onClick={() => handleClick("-")}>−</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button className="equals" onClick={handleEquals}>
          =
        </button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>

        <button className="zero" onClick={() => handleClick("0")}>
          0
        </button>
        <button onClick={() => handleClick(".")}>.</button>
        <button className="toggle-btn-grid" onClick={toggleTheme}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
};

export default Calculator;
