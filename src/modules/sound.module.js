import { Module } from '../core/module'
import { random } from '../utils'
import { randomSounds } from '../core/constants/setting'

export class SoundModule extends Module {
  #sound
  #audioBox

  constructor(type, text) {
    super(type, text)

    this.#audioBox = document.createElement('div')
    this.#sound = document.createElement('audio')
  }

  trigger() {
    this.#sound.src = randomSounds[random(0, randomSounds.length - 1)]
    this.#sound.autoplay = 'autoplay'
    this.#audioBox.append(this.#sound)
    
    document.body.append(this.#audioBox)
  }
}