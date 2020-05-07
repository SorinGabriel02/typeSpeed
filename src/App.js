import React, { setState } from "react";

function App() {
  const [text, setText] = setState("");

  return (
    <div>
      <header>
        <h1>TypeSpeed</h1>
      </header>
      <h2>
        {">>"}Test your typing speed{"<<"}
      </h2>
      <textarea placeholder="How many words can you get in?" />
      <h3>
        Time left: <span>5</span> seconds
      </h3>
      <button>Start</button>
      <h3>
        Word count: <span>0</span>
      </h3>
    </div>
  );
}

export default App;
