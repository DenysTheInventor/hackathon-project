//Пользователь задает время, создается маленький таймер (например в виде небольшого блока в углу сайта).
//По истечении времени таймер выводит сообщение о завершении и удаляется.

import {Module} from '../core/module'

export class TimerModule extends Module {

    constructor(type, text) {
        super(type, text)
        this.form = document.createElement('form')
        this.form.className = 'timer-form'
    }

    trigger() {
        const timerToHTML = this.toHTML()
        document.querySelector('.wrapper').append(timerToHTML)
    }

    toHTML(){
        // const form = document.createElement('form')
        // form.className = 'timer-form'

        const timerLabel = document.createElement('label')
        timerLabel.className = 'timer-form__input-label'
        timerLabel.textContent = 'Введите время для таймера'

        const hoursImputLabel = document.createElement('input')
        hoursImputLabel.className = 'timer-form__hours-input'
        hoursImputLabel.name = 'hours'
        hoursImputLabel.type = 'number'
        hoursImputLabel.max = '24'
        hoursImputLabel.min = '0'
        hoursImputLabel.required = ''

        const minutesImputLabel = document.createElement('input')
        minutesImputLabel.className = 'timer-form__hours-input'
        minutesImputLabel.name = 'minutes'
        minutesImputLabel.type = 'number'
        minutesImputLabel.max = '60'
        minutesImputLabel.min = '0'
        minutesImputLabel.required = ''

        const secondsImputLabel = document.createElement('input')
        secondsImputLabel.className = 'timer-form__hours-input'
        secondsImputLabel.name = 'seconds'
        secondsImputLabel.type = 'number'
        secondsImputLabel.max = '60'
        secondsImputLabel.min = '0'
        secondsImputLabel.required = 'number'

        const timerFormButton = document.createElement('button')
        timerFormButton.className = 'timer-form__submit-button'
        timerFormButton.type = 'submit'
        timerFormButton.textContent = 'Запустить таймер'

        timerLabel.append(hoursImputLabel, minutesImputLabel, secondsImputLabel, timerFormButton)

        this.form.append(timerLabel)

        this.form.addEventListener('submit', (event) => {
            event.preventDefault()

            let amountOfHours = Number((event.target.hours.value))
            let amountOfMinutes = Number((event.target.minutes.value))
            let amountOfSeconds = Number((event.target.seconds.value))

            timerLabel.textContent = `Таймер сработает через ${amountOfHours} ч. ${amountOfMinutes} мин. ${amountOfSeconds} сек.`
            
            const timer = setInterval(() => {
                if (amountOfSeconds <= 0 && amountOfMinutes > 0) {
                    amountOfMinutes = amountOfMinutes - 1
                    amountOfSeconds = 2
                }
                if (amountOfMinutes <= 0 && amountOfHours > 0) {
                    amountOfHours = amountOfHours - 1
                    amountOfMinutes = 5
                }
                if (amountOfSeconds <= 0 && amountOfMinutes <= 0 && amountOfHours <= 0) {
                    clearInterval(timer);
                    timerLabel.textContent = 'Таймер завершил свою работу'
                    setTimeout(() => {
                        this.form.remove()
                    },2000)
                } else {
                    timerLabel.textContent = `Таймер сработает через ${amountOfHours} ч. ${amountOfMinutes} мин. ${amountOfSeconds} сек.`;
                }
                --amountOfSeconds;
            }, 1000)
        })
        return this.form
    }
}
