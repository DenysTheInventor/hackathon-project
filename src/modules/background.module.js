import {Module} from '../core/module'
import { randomColor } from '../utils'

export class BackgroundModule extends Module {
    #workingArea

    constructor() {
        super('background-module' ,'background')

        this.#workingArea = document.querySelector('.app-container')
    }

    trigger() {
        this.#workingArea.style.background = randomColor()
    }
}