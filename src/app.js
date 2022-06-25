import './styles.css'
import { ContextMenu } from './menu'
// attach modules here
import { BackgroundModule } from './modules/background.module'
import { SoundModule } from './modules/sound.module'
import { GeoLocation } from './modules/location.module'
import { ClicksModule } from './modules/clicks.module'

const contextMenu = new ContextMenu('.menu')

// add modules to menu here
contextMenu.add(new BackgroundModule('backgrounde-module', 'Background'))
contextMenu.add(new SoundModule('sound-module', 'Play sound'))
contextMenu.add(new GeoLocation('location-module', 'Geolocation'))
contextMenu.add(new ClicksModule('count-module', 'Count clicks'))

// init app
contextMenu.init()


