import {Module} from '../core/module'

export class MessageModule extends Module {
    #messageBlock

    constructor(type, text) {
        super(type, text)

        this.#messageBlock = document.querySelector('.system-message')
    }

    #setText(text) {
        this.#messageBlock.textContent = text
    }

    trigger(message) {
        this.#setText(message)
        this.#messageBlock.classList.add('system-message__show')

        setTimeout(() => {
            this.#messageBlock.classList.remove('system-message__show')
        }, 1000);
    }
}