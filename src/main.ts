import "./style.css";
import { Counter } from "./Counter.ts";
import { React } from "./react.ts";

React.mount(Counter, document.querySelector<HTMLElement>("#app")!, {});
