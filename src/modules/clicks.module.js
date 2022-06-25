import { Module } from "../core/module";
import { generateColor } from "../utils";

const refs = {
  board: document.querySelector(".js-clicks-board"),
  btnStart: document.querySelector(".btn-start"),
  count: document.querySelector(".clicks-count"),
  time: document.querySelector(".js-time"),
};

export class ClicksModule extends Module {
  
  constructor(type, text) {
    super(type, text);
    this.intervalId = null;
    this.isActive = false;
    this.time = 3;
    this.score = 0;
  }

  start() {
    if (this.isActive) {
      return;
    } else {
      this.isActive = true;
      this.intervalId = setInterval(() => {
        if (this.time === 0) {
          this.stop();
        } else {
          this.time -= 1;
          this.setTime(this.time);
        }
      }, 1000);
      this.setTime(this.time);
      this.score += 1;
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  setTime(value) {
    refs.time.innerHTML = `00:0${value}`;
  }

  increaseCount(event) {
    this.setCount(this.score);
    this.score += 1;
  }

  createPoint(event) {
    const color = generateColor();

    const pointRef = document.createElement("div");
    pointRef.className = "clicks-point";
    pointRef.style.backgroundColor = color;
    pointRef.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    pointRef.style.top = `${event.layerY}px`;
    pointRef.style.left = `${event.layerX}px`;

    refs.board.append(pointRef);
  }

  setCount(value) {
    refs.count.innerHTML = `${value}`;
  }
}

const clickTimer = new ClicksModule(1, 1);

refs.btnStart.addEventListener("click", () => {
  clickTimer.start();
  refs.btnStart.classList.add("hide");
  refs.count.classList.remove("hide");

  refs.board.addEventListener("click", (e) => {
    if (!clickTimer.isActive) {
      return;
    } else {
      if (e.target === e.currentTarget) {
        clickTimer.increaseCount(e);
        clickTimer.createPoint(e);
      }
    }
  });
});
