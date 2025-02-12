import { Component, useEffect, useState } from "../React";
import { useFetcher } from "../hooks/useFetcher.ts";

export const Jokes: Component = () => {
  const endpoint = "https://official-joke-api.appspot.com/jokes/";
  const DEFAULT_URL = endpoint + 1;
  const DEFAULT_SEED = 1;

  const [seed, setSeed] = useState(DEFAULT_SEED);
  const response = useFetcher(DEFAULT_URL);

  useEffect(() => {
    response.url = `${endpoint + seed}`;
  }, [seed]);

  return {
    render(element: HTMLElement) {
      element.innerHTML = `
            <div class="container">
                <span class="fetch-url">${response.url} </span>
                <div class="joke-header">
                    <span class="title">Joke Seed</span>
                    <div class="seed-options">
                        <button type="button" id="minus">-</button>
                    <span class="seed">${seed}</span>
                        <button type="button" id="plus">+</button>
                    </div>
                </div>
                <div class="joke">
                    ${response.loading ? '<span class="loader"></span> Loading...' : ""}
                    ${response.error ? `<span class="error">${response.error}</span>` : ""} 
                    ${
                      !response.loading && !response.error
                        ? `
                        <span class="joke-setup">${response.data.setup}</span>
                        <span class="joke-punchline">${response.data.punchline}</span>
                    `
                        : ""
                    }
                </div>
            </div>
            `;

      element
        .querySelector<HTMLButtonElement>("#minus")!
        .addEventListener("click", () => setSeed((seed) => seed - 1));
      element
        .querySelector<HTMLButtonElement>("#plus")!
        .addEventListener("click", () => setSeed((seed) => seed + 1));
    },
  };
};
