import React, { useState, useEffect, useRef } from "react";

function App() {
  const [gameTimeInput, setGameTimeInput] = useState("");
  const [gameTime, setGameTime] = useState(10);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameTime);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const textareaRef = useRef(null);

  const buttonText = isGameStarted ? "reset" : "start";
  const timeSpanStyle =
    timeLeft > 3 ? "green" : timeLeft >= 1 && timeLeft <= 3 ? "yellow" : "red";
  let timeoutId;

  function countWords(stateText) {
    return stateText.split(" ").filter((word) => word !== "").length;
  }

  function startEndGame() {
    if (!isGameStarted) return setIsGameStarted(true);
    clearTimeout(timeoutId);
    setIsGameStarted(false);
    setTimeLeft(gameTime);
    setText("");
    setWordCount(0);
  }

  function handleGameTime() {
    setGameTime(gameTimeInput);
    setGameTimeInput("");
  }

  useEffect(() => {
    if (gameTime > 1) setTimeLeft(gameTime);
  }, [gameTime]);

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
    const { name, value } = e.target;
    name === "text" ? setText(value) : setGameTimeInput(value);
  }
  return (
    <div>
      <header>
        <h1>TypeSpeed</h1>
      </header>
      <h2>
        {">>"}Test your typing speed{"<<"}
      </h2>
      <section>
        <label>How long should the game last?</label>
        <input
          disabled={isGameStarted}
          value={gameTimeInput}
          onChange={handleChange}
          type="number"
          name="gameTimeInput"
        />
        <button disabled={isGameStarted} onClick={handleGameTime}>
          Set Timer
        </button>
      </section>

      <textarea
        ref={textareaRef}
        name="text"
        value={text}
        onChange={handleChange}
        disabled={!isGameStarted}
        placeholder="How many words can you get in?"
      />
      <h3>
        Time left: <span style={{ color: timeSpanStyle }}>{timeLeft}</span>{" "}
        seconds
      </h3>
      <button onClick={startEndGame}>{buttonText}</button>
      <h3>
        Word count: <span>{wordCount}</span>
      </h3>
    </div>
  );
}

export default App;
