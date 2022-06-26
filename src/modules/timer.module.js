import {Module} from '../core/module'
import { addZero } from '../utils'
import { MessageModule } from './message.module'

export class TimerModule extends Module {
    #workingArea
    #timerWrapper
    #timerIntervalID
    #message
    #counters
    #inputs

    constructor(type, text) {
        super(type, text)

        this.#timerWrapper = document.createElement('div')
        this.#timerWrapper.className = 'timer-wrapper'
        this.#workingArea = document.querySelector('.app-container')

        this.#timerIntervalID = 0
        this.#message = new MessageModule('message-module', 'message')

        this.#counters = `
            <div class="timer-form__main">
                <div class="timer-hours"></div>
                <p class="timer-divider">:</p>
                <div class="timer-minutes"></div>
                <p class="timer-divider">:</p>
                <div class="timer-seconds"></div>  
            </div>
            <div class="timer-form__footer">
                <button class="timer-form__submit-button" type="submit" disabled>Запустить таймер</button>
                <button class="timer-form__finish-button">Завершить</button>
            </div> 
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
        if (!document.querySelector('.timer')) {
            this.renderTimer()
            this.addInnerContent(this.#inputs)        
            this.finishWorking()
            this.handleForm() 
        }
    }

    addInnerContent(content) {
        document.querySelector('.timer').innerHTML = content
    }

    timer(hours, minutes, seconds) {
        this.addInnerContent(this.#counters)
        this.finishWorking()

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
                this.removeTimer()
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
            const { target } = event

            let amountOfHours = Number((target.hours.value))
            let amountOfMinutes = Number((target.minutes.value))
            let amountOfSeconds = Number((target.seconds.value))

            document.querySelector('.timer').innerHTML = ''

            this.timer(amountOfHours, amountOfMinutes, amountOfSeconds)
        })
    }

    removeTimer() {
        clearInterval(this.#timerIntervalID)
        this.#message.trigger('Module Timer stopped')
        setTimeout(() => {
            this.#timerWrapper.innerHTML = ''
            this.#timerWrapper.remove()
        },500)
    }

    finishWorking() {
        const finishFormButton = document.querySelector('.timer-form__finish-button')
        finishFormButton.addEventListener('click', () => {
            this.removeTimer()
        })
    }

    renderTimer() {
        this.#timerWrapper.insertAdjacentHTML('afterbegin', `
            <div class="timer">
                
            </div>
        `)
        this.#workingArea.append(this.#timerWrapper)
    }
}
