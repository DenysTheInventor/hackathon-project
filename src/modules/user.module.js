import {Module} from '../core/module'
import { MessageModule } from './message.module'
import { ModalModule } from './modal.module'

export class UserModule extends Module {
    #user_url
    #userIcon
    #message
    #modal
    #gender

    constructor(type, text) {
        super(type, text)

        this.#user_url = 'https://randomuser.me/api/?gender'
        this.#userIcon = document.querySelector('.header-control__icon')
        this.#message = new MessageModule('message-module', 'message')
        this.#modal = new ModalModule('modal-module', 'modal')
        this.#gender = ''
    }

    async getUser() {
        try {
            const response = await fetch(`${this.#user_url}=${this.#gender}`)
            const userInfo = await response.json()
            const { dob, name, picture } = userInfo.results[0]
            const dateOfBirth = dob.date.slice(0, 10)
            const message = `You are ${name.title} ${name.first} ${name.last}. Date of birth: ${dateOfBirth}`
            this.#message.trigger(message, 3000)
            this.setUserIcon(picture.thumbnail)
        } catch (error) {
            this.#message.trigger("Can't fetch user data")
        }
    }

    setUserIcon(ICON_URL) {
        const userIcon = new Image()
              userIcon.src = ICON_URL
        
        this.#userIcon.innerHTML = ''
        this.#userIcon.append(userIcon)
    }

    setForm() {
        const formWrapper = document.querySelector('.gender-results__list')
              formWrapper.insertAdjacentHTML('afterbegin', `
              <div class="form-wrapper">
                <form class="gender-results__form" action="">
                <details class="custom-select">
                    <summary class="radios">
                        <input class="gender-type" type="radio" name="item" id="default" title="Choose your gender" checked>
                        <input class="gender-type" type="radio" name="item" id="item1" title="Male">
                        <input class="gender-type" type="radio" name="item" id="item2" title="Female">
                    </summary>
                    <ul class="list">
                    <li>
                        <label for="item1">
                            Male
                            <span></span>
                        </label>
                    </li>
                    <li>
                        <label for="item2">
                            Female
                        </label>
                    </li>
                    </ul>
                    </details>
                    <input type="submit" class="gender-results__form-submit" value="Submit">
                </form>
                </div>
              `)

        const genderForm = formWrapper.querySelector('form')

        genderForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const inputs = [...document.querySelectorAll('.gender-type')]
            const selectedInput = inputs.find(item => item.checked)

            if(selectedInput.id != 'default') {
                this.#gender = selectedInput.title.toLowerCase()
                document.querySelector('.gender-modal').remove()
                this.getUser()
            }
            else {
                this.#message.trigger("Choose gender before")
            }
        })
    }

    specifyGender() {
        this.#modal.createModal('gender', 'Specify your gender:')
        this.setForm()
    }

    trigger() {
        this.specifyGender()
    }
}