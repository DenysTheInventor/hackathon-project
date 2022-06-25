import {Menu} from './core/menu'
import { Module } from './core/module'
import { MessageModule } from './modules/message.module'

export class ContextMenu extends Menu {
    #menu
    #workingArea
    #menuOpenedClass
    #systemMessage

    constructor(selector) {
        super() 

        this.#menu = document.querySelector(selector)
        this.#workingArea = document.querySelector('.app-container')
        this.#menuOpenedClass = 'menu-opened'
        this.#systemMessage = new MessageModule('message-module', 'message')
    }

    add(module) {
        if(module instanceof Module) {
            this.#menu.innerHTML += module.toHTML()

            const newItem = this.#menu.querySelector(`[data-type="${module.type}"]`)

            newItem.addEventListener('click', () => {
                module.trigger()
                this.#systemMessage.trigger(`Module ${module.text} worked successfully`)
            })
        }
    }

    setMenuCoordinates(top, left) {
        this.#menu.style.top = `${top}px`
        this.#menu.style.left = `${left}px`
    }

    open() {
        this.#menu.classList.add(this.#menuOpenedClass)
    }

    close() {
        if(this.#menu.classList.contains(this.#menuOpenedClass)) {
            this.#menu.classList.remove(this.#menuOpenedClass)
        }
    }

    init() {
        this.#workingArea.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            console.log(event.clientY, event.clientX)
            this.setMenuCoordinates(event.clientY, event.clientX)
            this.open()
        })
    }
}