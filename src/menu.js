import {Menu} from './core/menu'
import { Module } from './core/module'
import { MessageModule } from './modules/message.module'
import { LogModule } from './modules/log.module'
import { triggerLog } from './utils'

export class ContextMenu extends Menu {
    #menu
    #workingArea
    #menuOpenedClass
    #systemMessage
    #logMessage
    #modules

    constructor(selector) {
        super(selector) 

        this.#menu = this.el
        this.#workingArea = document.querySelector('.app-container')
        this.#menuOpenedClass = 'menu-opened'
        this.#systemMessage = new MessageModule('message-module', 'message')
        this.#logMessage = new LogModule('log-module', 'logs')
        this.#modules = []

        this.#menu.addEventListener('click', (event) => {
            try {
                const { target } = event
                const selectedModule = target.dataset.type

                const module = this.#modules.find((module) => module.type === selectedModule)
                module.trigger()
                this.#systemMessage.trigger(this.createMessage(module.text))
                this.#logMessage.addRecordToResult(this.createMessage(module.text))
            } catch (error) {
                this.#systemMessage.trigger('Please try again. Something went wrong')
            } finally {
                this.close()
            }   
        })
    }

    add(module) {
        if(module instanceof Module) {
            this.#modules.push(module)
            this.#menu.innerHTML += module.toHTML()
        }
    }

    createMessage(moduleName) {
        return `Module ${moduleName} worked successfully`
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
        triggerLog(this.#logMessage)        
    }
}