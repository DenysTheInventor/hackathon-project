import {Menu} from './core/menu'
import { Module } from './core/module'
import { MessageModule } from './modules/message.module'

export class ContextMenu extends Menu {
    #menu
    #workingArea
    #menuOpenedClass
    #systemMessage
    #modules

    constructor(selector) {
        super(selector) 

        this.#menu = this.el
        this.#workingArea = document.querySelector('.app-container')
        this.#menuOpenedClass = 'menu-opened'
        this.#systemMessage = new MessageModule('message-module', 'message')
        this.#modules = []

        this.#menu.addEventListener('click', (event) => {
            const { target } = event
            const selectedModule = target.dataset.type

            const module = this.#modules.find((module) => module.type === selectedModule)
            module.trigger()
            this.#systemMessage.trigger(`Module ${module.text} worked successfully`)
            this.close()
        })
    }

    add(module) {
        if(module instanceof Module) {
            this.#modules.push(module)
            this.#menu.innerHTML += module.toHTML()
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
            this.setMenuCoordinates(event.clientY, event.clientX)
            this.open()
        })
    }
}