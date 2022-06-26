import {Module} from '../core/module'

export class RandomPhoto extends Module {
    #appContainer
    #cliendID
    #endPoint

    constructor(type, text) {
        super(type, text)

        this.#appContainer = document.querySelector('.app-container')
        this.#cliendID = 'c1Dq-CtAca_tG24zcRgpU5vrldMf4rMIlm9RkXu8amM'
        this.#endPoint = `https://api.unsplash.com/photos/random/?client_id=${this.#cliendID}`
    }

    render() {
        this.#appContainer.insertAdjacentHTML('afterbegin',
        `<a class="imageLink" href="#" target="_blank">
            <img alt="" class="unsplashImage"/>
        </a>`
        )
    }

    trigger() {
        this.render()

        const imageElement = document.querySelector('.unsplashImage')
        const imageLink = document.querySelector('.imageLink')

        fetch(this.#endPoint)
            .then((response) => response.json())
            .then((jsonData) => {
                imageElement.src = jsonData.urls.regular
                imageLink.setAttribute('href', jsonData.links.html)
                setTimeout(() => {
                    this.#appContainer.innerHTML = ''
                }, 1500)
            })
            .catch((error) => {
                console.log('Error', error)
            })
    }
}