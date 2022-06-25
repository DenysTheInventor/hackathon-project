import './styles.css'
import { ContextMenu } from './menu'
import { BackgroundModule } from './modules/background.module'

const contextMenu = new ContextMenu('.menu')
contextMenu.add(new BackgroundModule('backgrounde-module', 'Background'))

contextMenu.init()

