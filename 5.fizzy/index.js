import { App } from "./App.js";
import { Mirror } from "./Mirror.js";

const width = innerWidth;
const height = innerHeight;

const app = new App({ canvas: document.querySelector("#c1"), width, height });
const mirror = new Mirror({ canvas: document.querySelector("#c2"), app });

window.addEventListener("resize", () => {
  app.resize();
  mirror.resize();
});
