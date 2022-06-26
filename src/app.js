import './styles.css'
import { ContextMenu } from './menu'
// attach modules here
import { BackgroundModule } from './modules/background.module'
import { SoundModule } from './modules/sound.module'
import { GeoLocation } from './modules/location.module'
import { RandomFigures } from './modules/figures.module'

const contextMenu = new ContextMenu('.menu')

// add modules to menu here
contextMenu.add(new BackgroundModule('backgrounde-module', 'Background'))
contextMenu.add(new SoundModule('sound-module', 'Play sound'))
contextMenu.add(new GeoLocation('location-module', 'Geolocation'))
contextMenu.add(new RandomFigures('figure-module', 'Random figure'))

// init app
contextMenu.init()

