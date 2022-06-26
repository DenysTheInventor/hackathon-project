import {Module} from '../core/module'
import { returnDateNow } from '../utils'

export class LogModule extends Module {
    #results

    constructor(type, text) {
        super(type, text)

        this.#results = []
    }

    addToLocal() {
        localStorage.setItem('logs', JSON.stringify(this.#results))
        console.log('here')
    }

    checkLocal() {
        if (localStorage.getItem("logs") != null) {
            this.#results = JSON.parse(localStorage.getItem('logs')) 
        }
    }

    createListItem(record) {
        const item = document.createElement('li')
              item.classList.add('log-results__item')
              item.dataset.id = record.id
              item.insertAdjacentHTML('afterbegin', `
                <span class="log-results__item-text">${record.timeStamp}</span>
                <span class="log-results__item-time">${record.action}</span>
                <span class="log-results__item-close">&times;</span>
              `)  
        
        return item
    }

    createModal() {
        const resultsModal = document.createElement('div')
              resultsModal.classList.add('log-modal')
              resultsModal.insertAdjacentHTML('afterbegin', `
                <div class="log-results">
                    <div class="log-results__header">
                        <h2>Logs:</h2>
                        <span class="log-result__close">&times;</span>    
                    </div>
                    <ul class="log-results__list">
                        
                    </ul>
                </div>
              `)
        
        document.body.append(resultsModal)
    }

    addItemsToModal() {
        const list = document.querySelector('.log-results__list')
        this.#results.forEach((record) => {
            const newRecord = this.createListItem(record)
            list.append(newRecord)
        })
    }

    handleModalClick() {
        document.body.addEventListener('click', (event) => {
            const { target } = event

            if(target.classList.contains('log-result__close')) {
                document.querySelector('.log-modal').remove()
            }

            if(target.classList.contains('log-results__item-close')) {
                const parentItem = target.closest('.log-results__item')
                const parentItemID = parentItem.dataset.id

                parentItem.remove()
                results = this.#results.filter(el => el.id != parentItemID)
                this.addToLocal()

                console.log(this.#results)
            }
        })
    }

    toggleResultsWindow() {
        if (!document.querySelector('.log-modal')) {
            this.createModal()
            this.addItemsToModal()
            this.handleModalClick()
        }
        else {
            document.querySelector('.log-modal').remove()
        }
    }

    createRecord(record) {
        const newRecord = {
            action: record, 
            id: Date.now(),
            timeStamp: returnDateNow()
        }
    
        return newRecord
    }

    addRecordToResult(record) {
        this.#results.push(this.createRecord(record))
        this.addToLocal()
    }

    trigger() {
        this.checkLocal()
        this.toggleResultsWindow()
    }
}