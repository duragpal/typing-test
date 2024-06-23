import React, { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import Keyboard from "./components/Keyboard";
import TypingInput from "./components/TypingInput";
import Result from "./components/Result";
import Timer from "./components/Timer";
import TextSelector from "./components/TextSelector";
import "./App.css";

const textsArray = [
  {
    id: 1,
    title: "One Summer Night",
    text: "One day Murlock was found in his cabin, dead. It was not a time and place for coroners and newspapers, and I suppose it was agreed that he had died from natural causes or I should have been told, and should remember. I know only that with what was probably a sense of the fitness of things the body was buried near the cabin, alongside the grave of his wife, who had preceded him by so many years that local tradition had retained hardly a hint of her existence. That closes the final chapter of this true story--excepting, indeed, the circumstance that many years afterward, in company with an equally intrepid spirit, I penetrated to the place and ventured near enough to the ruined cabin to throw a stone against it, and ran away to avoid the ghost which every well-informed boy thereabout knew haunted the spot. But there is an earlier chapter--that supplied by my grandfather.",
  },
  {
    id: 2,
    title: "A Boarded Window",
    text: "The fact that Henry Armstrong was buried did not seem to him to prove that he was dead: he had always been a hard man to convince. That he really was buried, the testimony of his senses compelled him to admit. His posture -- flat upon his back, with his hands crossed upon his stomach and tied with something that he easily broke without profitably altering the situation -- the strict confinement of his entire person, the black darkness and profound silence, made a body of evidence impossible to controvert and he accepted it without cavil.",
  },
  // Add more texts here
];

const App = () => {
  const [inputText, setInputText] = useState("");
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [highlightedKey, setHighlightedKey] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [selectedText, setSelectedText] = useState(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleStart = () => {
    if (selectedText) {
      setIsTestStarted(true);
      setStartTime(Date.now());
    } else {
      alert("Please select a text to start the test.");
    }
  };

  const handleInputChange = (key) => {
    if (!isTestStarted) {
      return;
    }

    if (key === "Backspace") {
      handleBackspace();
      return;
    }

    const updatedInputText = inputText + key;
    setInputText(updatedInputText);

    if (updatedInputText === selectedText.lines[currentLineIndex]) {
      if (currentLineIndex === selectedText.lines.length - 1) {
        handleTestCompletion();
      } else {
        setCurrentLineIndex(currentLineIndex + 1);
        setInputText("");
        setHighlightedKey("");
      }
    } else {
      setHighlightedKey(updatedInputText[updatedInputText.length - 1]);
    }
  };

  const handleBackspace = () => {
    if (inputText.length > 0) {
      const updatedInputText = inputText.slice(0, -1);
      setInputText(updatedInputText);
      setHighlightedKey(updatedInputText[updatedInputText.length - 1] || "");
    }
  };

  const handleTestCompletion = () => {
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;
    setElapsedTime(timeElapsed);
    const timeElapsedInMinutes = timeElapsed / 60;
    const wordsTyped = countWords(inputText);
    const calculatedWpm = Math.round(wordsTyped / timeElapsedInMinutes);
    setWpm(calculatedWpm);
    setIsTestFinished(true);
  };

  const handleStop = () => {
    if (isTestStarted) {
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      setElapsedTime(timeElapsed);

      const timeElapsedInMinutes = timeElapsed / 60;
      const wordsTyped = countWords(inputText);
      const calculatedWpm = Math.round(wordsTyped / timeElapsedInMinutes);
      setWpm(calculatedWpm);

      setIsTestStarted(false);
      setIsTestFinished(true);
    }
  };

  const handleRestart = () => {
    setIsTestStarted(false);
    setIsTestFinished(false);
    setInputText("");
    setHighlightedKey("");
    setElapsedTime(0);
    setWpm(0);
    setSelectedText(null);
    setCurrentLineIndex(0);
  };

  const handleSelectText = (textId) => {
    const text = textsArray.find((t) => t.id === parseInt(textId));
    const lines = text.text.split("\n");
    setSelectedText({ ...text, lines });
    setCurrentLineIndex(0);
  };

  return (
    <div className="App">
      <h1>Typing Speed Test</h1>
      {!isTestStarted && !isTestFinished && (
        <>
          <TextSelector texts={textsArray} onSelectText={handleSelectText} />
          <button class="btn" onClick={handleStart}>
            Start Test
          </button>
        </>
      )}
      {isTestStarted && !isTestFinished && <Timer startTime={startTime} />}
      <div className="TypingSection">
        <div className="TextDisplayContainer">
          {selectedText && (
            <TextDisplay
              text={selectedText.lines[currentLineIndex]}
              inputText={inputText}
            />
          )}
        </div>
        <TypingInput onInputChange={handleInputChange} />
      </div>
      <Keyboard highlightedKey={highlightedKey} />
      {isTestFinished && (
        <Result
          elapsedTime={elapsedTime}
          wpm={wpm}
          restartTest={handleRestart}
        />
      )}
      {isTestStarted && !isTestFinished && (
        <button class="btn" onClick={handleStop}>
          Stop Test
        </button>
      )}
    </div>
  );
};

export default App;
