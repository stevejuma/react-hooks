import { Component, React, useEffect, useRef, useState } from "../React";
import { Jokes } from "./Jokes";
import Timer from "./Timer";
import typescriptLogo from "/typescript.svg";
import viteLogo from "/vite.svg";

export const Counter: Component = () => {
  const [counter, setCounter] = useState(1);
  const [message, setMessage] = useState("React + TypeScript");
  const renderStartRef = useRef(0);

  useEffect(() => {
    renderStartRef.current = performance.now();
  });

  useEffect(() => {
    setMessage(
      counter % 3 !== 0
        ? "🤪 React + Typescript"
        : "😡 Typescript + React + Hooks",
    );
    // Returning a function from the useEffect ensures that it will be executed
    // after the dependencies have changed but before the effect is re-run
    return () => {
      if (counter > 6) {
        setCounter(0);
      }
    };
  }, [counter % 3]);

  useEffect(() => {
    const renderEnd = performance.now();
    const renderDuration = renderEnd - renderStartRef.current;
    console.log("Render duration:", renderDuration.toFixed(4), "ms");
  }, [counter]);

  return {
    render(element: HTMLElement) {
      element!.innerHTML = `
                <div>
                    <a href="https://vite.dev" target="_blank">
                        <img src="${viteLogo}" class="logo" alt="Vite logo" />
                    </a>
                    <a href="https://www.typescriptlang.org/" target="_blank">
                        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
                    </a>
                    <h1>${message}</h1>
                    <div class="card">
                        <button id="counter" type="button">${counter}</button>
                    </div>
                    <p class="read-the-docs">
                        Click on the Vite and TypeScript logos to learn more
                    </p>
                </div>
                `;
      element
        .querySelector<HTMLButtonElement>("#counter")!
        .addEventListener("click", () => setCounter(counter + 1));

      const timer = document.createElement("div");
      element.appendChild(timer);
      React.mount(Timer, timer);

      const jokes = document.createElement("div");
      element.appendChild(jokes);
      React.mount(Jokes, jokes);

      return element;
    },
  };
};
