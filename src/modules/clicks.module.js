import { Module } from "../core/module" 
import { randomColor } from "../utils" 

export class ClicksModule extends Module {
  #clicksWrapper 
  #boardRef 
  #btnStartRef 
  #countRef 
  #timeRef 
  #workingArea

  constructor(type, text) {
    super(type, text) 
    this.intervalId = null 
    this.isActive = false 
    this.time = 3 
    this.score = 0 

    this.#workingArea = document.querySelector('.app-container')
  }

  trigger() {
    if(!document.querySelector('.clicks-wrapper')) {
      this.createClicksModuleMarkup() 

      this.#clicksWrapper = document.querySelector(".clicks-wrapper") 
      this.#btnStartRef = document.querySelector(".btn-start") 
      this.#countRef = document.querySelector(".clicks-count") 
      this.#boardRef = document.querySelector(".js-clicks-board") 
      this.#timeRef = document.querySelector(".js-time") 

      this.#btnStartRef.addEventListener("click", () => {
        this.start() 
        this.#btnStartRef.classList.add("hide") 
        this.#countRef.classList.remove("hide") 
        this.#boardRef.addEventListener("click", (e) => {
          if (!this.isActive) {
            return 
          } else {
            if (e.target === e.currentTarget) {
              this.increaseCount() 
              this.createPoint(e) 
            }
          }
        }) 
      }) 
    }
  }

  start() {
    if (this.isActive) {
      return 
    } else {
      this.isActive = true 
      this.intervalId = setInterval(() => {
        if (this.time === 0) {
          this.stop() 
        } else {
          this.time -= 1 
          this.setTime(this.time) 
        }
      }, 1000) 
      this.setTime(this.time) 
    }
  }

  stop() {
    clearInterval(this.intervalId) 
    this.isActive = false 
    this.#countRef.textContent = `Ваш счет: ${this.score}` 
    setTimeout(() => {
      this.#clicksWrapper.remove() 
    }, 2000)
    
    this.score = 0
    this.time = 3
  }

  setTime(value) {
    this.#timeRef.textContent = `00:0${value}` 
  }

  increaseCount() {
    this.score += 1 
    this.setCount(this.score) 
  }

  createClicksModuleMarkup() {
    const markup = `<div class="clicks-wrapper">
            <h3 class="time-title">Time: <span class="js-time">00:00</span></h3>
            <div class="clicks-board js-clicks-board">
              <button type="button" class="btn-start">start</button>
              <p class="clicks-count hide">0</p>
            </div>` 
    this.#workingArea.insertAdjacentHTML("beforeend", markup) 
  }

  createPoint(event) {
    const color = randomColor() 

    const pointRef = document.createElement("div") 
    pointRef.className = "clicks-point" 
    pointRef.style.backgroundColor = color 
    pointRef.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}` 
    pointRef.style.top = `${event.layerY}px` 
    pointRef.style.left = `${event.layerX}px` 

    this.#boardRef.append(pointRef) 
  }

  setCount(value) {
    this.#countRef.textContent = `${value}` 
  }
}

