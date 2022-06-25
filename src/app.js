import './styles.css'
import { ContextMenu } from './menu'
// attach modules here
import { BackgroundModule } from './modules/background.module'
import { SoundModule } from './modules/sound.module'
import { GeoLocation } from './modules/location.module'
import { geometricFigurs } from './modules/index1'



const contextMenu = new ContextMenu('.menu')

// add modules to menu here
contextMenu.add(new BackgroundModule('backgrounde-module', 'Background'))
contextMenu.add(new SoundModule('sound-module', 'Play sound'))
contextMenu.add(new GeoLocation('location-module', 'Geolocation'))
contextMenu.add(new geometricFigurs('random-figures-module', 'random figure'))


// init app
contextMenu.init()

