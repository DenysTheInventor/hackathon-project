import './styles.css'

import { TimerModule } from './modules/timer.module'

const timerModule = new TimerModule('Module', 'Timer Module')

timerModule.trigger()