import {Menu} from './core/menu'
import { BackgroundModule } from './modules/background.module'

export class ContextMenu extends Menu {
    #menu
    #modules
    #workingArea
    #menuOpenedClass

    constructor(selector) {
        super() 

        this.#menu = document.querySelector(selector)
        this.#workingArea = document.querySelector('.app-container')
        this.#menuOpenedClass = 'menu-opened'

        this.#modules = [BackgroundModule]
    }

    add(ModuleName) {
        const newModule = new ModuleName 
        const newItem = newModule.toHTML()

        this.#menu.innerHTML += newItem

        this.#menu.querySelectorAll('li').forEach(item => {
            if(item.dataset.type = newModule.type) {
                item.addEventListener('click', () => {
                    newModule.trigger()
                })
            }
        })
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

    work() {
        this.#modules.forEach(module => {
            this.add(module)
        }) 

        this.#workingArea.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            this.setMenuCoordinates(event.clientY, event.clientX)
            this.open()
        })
    }
}