//Пользователь задает время, создается маленький таймер (например в виде небольшого блока в углу сайта).
//По истечении времени таймер выводит сообщение о завершении и удаляется.

import {Module} from '../core/module'

export class TimerModule extends Module {

    constructor(type, text) {
        super(type, text)
    }

    trigger() {
        const timerToHTML = this.toHTML()
        document.querySelector('.wrapper').append(timerToHTML)
    }

    toHTML() {
        document.querySelector('.wrapper').insertAdjacentHTML('beforeend',
        `<div class="timer-container">
            <form class="timer-form">
                <label class="timer-form__input-label">
                    Введите время для таймера
                    <input class="timer-form__hours-input" name="hours" type="number" max="24" min="0" required="">
                    <input class="timer-form__hours-input" name="minutes" type="number" max="60" min="0" required="">
                    <input class="timer-form__hours-input" name="seconds" type="number" max="60" min="0" required="">
                    <button class="timer-form__submit-button" type="submit">Запустить таймер</button>
                </label>
            </form>
            <button class="timer-form__finish-button">Завершить</button>
        </div>`
        )

        const timerContainer = document.querySelector('.timer-container')
        const form = document.querySelector('.timer-form')
        const timerLabel = document.querySelector('.timer-form__input-label')

        form.addEventListener('submit', (event) => {
            event.preventDefault()

            let amountOfHours = Number((event.target.hours.value))
            let amountOfMinutes = Number((event.target.minutes.value))
            let amountOfSeconds = Number((event.target.seconds.value))

            timer(amountOfHours, amountOfMinutes, amountOfSeconds, timerContainer)
        })

        function addZero(number) {
            if (number <= 9) {
                number = '0' + number
            } return number
        }

        let timerIntervalID

        function timer(hours, minutes, seconds, container) {
            timerIntervalID = setInterval(() => {
                if (seconds <= 0 && minutes > 0) {
                    minutes = minutes - 1
                    seconds = 60
                }
                if (minutes <= 0 && hours > 0) {
                    hours = hours - 1
                    minutes = 60
                }
                if (seconds <= 0 && minutes <= 0 && hours <= 0) {
                    timerLabel.textContent = 'Таймер завершил свою работу'
                    setTimeout(() => {
                        container.remove()
                    },2000)
                } else {
                    timerLabel.textContent = `Таймер сработает через ${addZero(hours)} ч. ${addZero(minutes)} мин. ${addZero(seconds)} сек.`;
                }
                --seconds;
            }, 1000)
        }

        const finishFormButton = document.querySelector('.timer-form__finish-button')

        finishFormButton.addEventListener('click', (event) => {
            clearInterval(timerIntervalID)
            timerLabel.textContent = 'Таймер завершил свою работу'
            setTimeout(() => {
                timerContainer.remove()
            },2000)
        })
        return timerContainer
    }
}
