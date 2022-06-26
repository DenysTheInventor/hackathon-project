import {Module} from '../core/module'

export class ModalModule extends Module {
    constructor(type, text) {
        super(type, text)
    }

    createModal(className, title) {
        const resultsModal = document.createElement('div')
              resultsModal.classList.add(`${className}-modal`)
              resultsModal.insertAdjacentHTML('afterbegin', `
                <div class="${className}-results">
                    <div class="${className}-results__header">
                        <h2>${title}:</h2>
                        <span class="${className}-result__close">&times;</span>    
                    </div>
                    <ul class="${className}-results__list">
                        
                    </ul>
                </div>
              `)
        
        document.body.append(resultsModal)
    }

    trigger(className, title) {
        this.createModal(className, title)
    }
}