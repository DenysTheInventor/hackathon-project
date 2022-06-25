import './styles.css'
import { ContextMenu } from './menu'
// attach modules here
import { BackgroundModule } from './modules/background.module'


const contextMenu = new ContextMenu('.menu')

// add modules to menu here
contextMenu.add(new BackgroundModule('backgrounde-module', 'Background'))


// init app
contextMenu.init()

