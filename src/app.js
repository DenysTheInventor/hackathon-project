import './styles.css'
import { ContextMenu } from './menu'
// attach modules here
import { BackgroundModule } from './modules/background.module'
import { SoundModule } from './modules/sound.module'


const contextMenu = new ContextMenu('.menu')

// add modules to menu here
// contextMenu.add(new BackgroundModule('backgrounde-module', 'Background'))
contextMenu.add(new SoundModule('sound-module', 'Play sound'))

// init app
contextMenu.init()

