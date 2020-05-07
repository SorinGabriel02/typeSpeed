import React, { useState, useEffect, useRef } from "react";

function App() {
  const GAME_TIME = 6;

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const textareaRef = useRef(null);

  const buttonText = isGameStarted ? "reset" : "start";
  let timeoutId;

  function countWords(stateText) {
    return stateText.split(" ").filter((word) => word !== "").length;
  }

  function startEndGame() {
    if (!isGameStarted) return setIsGameStarted(true);
    clearTimeout(timeoutId);
    setIsGameStarted(false);
    setTimeLeft(GAME_TIME);
    setText("");
  }

  useEffect(() => {
    if (timeLeft > 0 && isGameStarted) {
      textareaRef.current.focus();
      timeoutId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setWordCount(countWords(text));
      textareaRef.current.disabled = true;
    }
  }, [timeLeft, isGameStarted]);

  function handleChange(e) {
    const { value } = e.target;
    setText(value);
  }
  return (
    <div>
      <header>
        <h1>TypeSpeed</h1>
      </header>
      <h2>
        {">>"}Test your typing speed{"<<"}
      </h2>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        disabled={!isGameStarted}
        placeholder="How many words can you get in?"
      />
      <h3>
        Time left: <span>{timeLeft}</span> seconds
      </h3>
      <button onClick={startEndGame}>{buttonText}</button>
      <h3>
        Word count: <span>{wordCount}</span>
      </h3>
    </div>
  );
}

export default App;
