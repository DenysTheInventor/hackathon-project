import {Module} from '../core/module'

export class GeoLocation extends Module {
    #geocode_api
    #geocode_key

    constructor(type, text) {
        super(type, text)

        this.#geocode_api = 'https://api.opencagedata.com/geocode/v1/json?q='
        this.#geocode_key = '4b7dfa8467a24ba49769abc1319178e4'
    }

    setLocationBlock = (text) => {
        const locationBlock = document.createElement('div')
              locationBlock.className = 'location-block'
              locationBlock.insertAdjacentHTML('afterbegin', `
                <div class="location-block__header">
                    Your location is:
                </div>
                <div class="location-block__main">
                    ${text}
                </div>
              `)  
        
        document.body.append(locationBlock)

        setTimeout(() => {
            locationBlock.remove()
        }, 3000)
    } 

    showCityInfo = (coordinates) => {
        const { latitude, longitude } = coordinates.coords
        fetch(`${this.#geocode_api}${latitude}+${longitude}&key=${this.#geocode_key}`)
            .then((resolve) => {
                return resolve.json()
            })
            .then((location) => {
                const currentLocation = location.results[0].formatted
                this.setLocationBlock(currentLocation)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    setErrorArea = () => {
        this.setLocationBlock('Well-well-well. You hide from me your location. So read message above!')
    }

    checkPosition = () => {
        navigator.geolocation.getCurrentPosition(this.showCityInfo, this.setErrorArea)
    }

    trigger() {
        this.checkPosition()
    }
}