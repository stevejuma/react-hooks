import "./style.css";
import { Counter } from "./Counter.ts";
import { React } from "./React.ts";

React.mount(Counter, document.querySelector<HTMLElement>("#app")!, {});
