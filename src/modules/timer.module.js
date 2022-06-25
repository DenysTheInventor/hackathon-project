//Пользователь задает время, создается маленький таймер (например в виде небольшого блока в углу сайта).
//По истечении времени таймер выводит сообщение о завершении и удаляется.

import {Module} from '../core/module'
import { addZero } from '../utils'
import { MessageModule } from './message.module'

export class TimerModule extends Module {
    #timerContainer
    #workingArea
    #timerWrapper
    #timerIntervalID
    #message
    #counters
    #inputs

    constructor(type, text) {
        super(type, text)

        this.#timerContainer = document.createElement('div')
        this.#timerContainer.className = 'timer-container'
        this.#timerWrapper = document.createElement('div')
        this.#timerWrapper.className = 'timer-wrapper'
        this.#workingArea = document.querySelector('.app-container')

        this.#timerIntervalID = 0
        this.#message = new MessageModule('message-module', 'message')

        this.#counters = `
            <div class="timer-hours"></div>
            <p class="timer-divider">:</p>
            <div class="timer-minutes"></div>
            <p class="timer-divider">:</p>
            <div class="timer-seconds"></div>
        `
        this.#inputs = `
            <form class="timer-form">
                <div class="timer-form__header">
                    <label class="timer-form__input-label">
                    Введите время для таймера
                    </label>
                </div>
                <div class="timer-form__main">
                    <input class="timer-form__hours-input" name="hours" type="number" max="24" min="0" required="">
                    <p class="timer-divider">:</p>
                    <input class="timer-form__hours-input" name="minutes" type="number" max="60" min="0" required="">
                    <p class="timer-divider">:</p>
                    <input class="timer-form__hours-input" name="seconds" type="number" max="60" min="0" required="">
                </div>
                <div class="timer-form__footer">
                    <button class="timer-form__submit-button" type="submit">Запустить таймер</button>
                    <button class="timer-form__finish-button">Завершить</button>
                </div> 
            </form>
            
        `
    }

    trigger() {
        const timerToHTML = this.run()
        this.#workingArea.append(timerToHTML)
    }

    timer(hours, minutes, seconds) {
        document.querySelector('.timer').innerHTML = this.#counters

        const hoursBlock = document.querySelector('.timer-hours')
        const minutesBlock = document.querySelector('.timer-minutes')
        const secondsBlock = document.querySelector('.timer-seconds')

        this.#timerIntervalID = setInterval(() => {
            if (seconds < 0 && minutes > 0) {
                minutes = minutes - 1
                seconds = 59
            }
            if (minutes < 0 && hours > 0) {
                hours = hours - 1
                minutes = 59
            }
            if (seconds <= 0 && minutes <= 0 && hours <= 0) {
                this.#message.trigger('Таймер завершил свою работу')
                setTimeout(() => {
                    this.#workingArea.innerHTML = ''
                },2000)
            } else {
                hoursBlock.textContent = addZero(hours)
                minutesBlock.textContent = addZero(minutes)
                secondsBlock.textContent = addZero(seconds)
            }
            --seconds;
        }, 1000)
    }

    handleForm() {
        const form = document.querySelector('.timer-form')
        
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            let amountOfHours = Number((event.target.hours.value))
            let amountOfMinutes = Number((event.target.minutes.value))
            let amountOfSeconds = Number((event.target.seconds.value))

            document.querySelector('.timer').innerHTML = ''

            this.timer(amountOfHours, amountOfMinutes, amountOfSeconds, this.#timerContainer)
        })
    }

    finishWorking() {
        const finishFormButton = document.querySelector('.timer-form__finish-button')
        finishFormButton.addEventListener('click', () => {
            clearInterval(this.#timerIntervalID)
            this.#message.trigger('Таймер завершил свою работу')
            setTimeout(() => {
                this.#workingArea.innerHTML = ''
            },1000)
        })
    }

    renderTimer() {
        this.#timerWrapper.insertAdjacentHTML('afterbegin', `
            <div class="timer">
                
            </div>
        `)

        this.#workingArea.append(this.#timerWrapper)
    }

    run() {
        this.renderTimer()
        document.querySelector('.timer').innerHTML = this.#inputs
        
        this.handleForm()
        this.finishWorking()

        return this.#timerContainer
    }
}
