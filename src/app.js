import './styles.css'
import { ContextMenu } from './menu'
// attach modules here
import { BackgroundModule } from './modules/background.module'
import { SoundModule } from './modules/sound.module'
import { GeoLocation } from './modules/location.module'
import { ClicksModule } from './modules/clicks.module'
import { TimerModule } from './modules/timer.module'
import { RandomFigures } from './modules/figures.module'
import { LogModule } from './modules/log.module'
import { UserModule } from './modules/user.module'

const contextMenu = new ContextMenu('.menu')

// add modules to menu here
contextMenu.add(new BackgroundModule('backgrounde-module', 'Background'))
contextMenu.add(new SoundModule('sound-module', 'Play sound'))
contextMenu.add(new GeoLocation('location-module', 'Geolocation'))
contextMenu.add(new ClicksModule('count-module', 'Count clicks'))
contextMenu.add(new TimerModule('timer-module', 'Set timer'))
contextMenu.add(new RandomFigures('figure-module', 'Random figure'))
contextMenu.add(new LogModule('log-module', 'Show logs'))
contextMenu.add(new UserModule('user-module', 'Get user'))


// init app
contextMenu.init()
