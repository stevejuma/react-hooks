import { Component, useEffect, useState } from "./react";
import pauseIcon from "./pause.svg?raw";
import playIcon from "./play.svg?raw";

const Timer: Component = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(true);

  // useEffect to update the timer every second
  useEffect(() => {
    if (paused) {
        return;
    }
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [paused]); // Empty dependency array means this effect runs only once (on mount)
  return {
    render(element: HTMLElement) {
      element.innerHTML = `
        <div class="timer">
            <button id="paused" data-paused="${paused}" type="button" class="action">
                <span>Timer: ${seconds} seconds</span>
                ${paused ? playIcon : pauseIcon}
            </button>
        </div>
        `;
        element
        .querySelector<HTMLButtonElement>("#paused")!
        .addEventListener("click", () => {
            console.log('Paused', paused, !paused)
            setPaused(!paused);
        });
    },
  };
};

export default Timer;