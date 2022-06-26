import {Module} from '../core/module'
import { random } from '../utils';
import { randomColor } from '../utils';
import { workingArea } from '../core/constants/setting';

export class RandomFigures extends Module {
    constructor(type, text) {
        super(type, text)
    }     

    createStyle() {
     const A = random(80,980),
           B = random(80,300),
           C = random(40,250),
           D = random(2,15),              
           color = randomColor(),  
           number = random(0, 9)

     const styles = [
          `position: absolute; left: ${A}px; bottom: ${B}px; z-index: 1; width: ${C}px; height: ${C}px; background: ${color};-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg); -webkit-transform-origin: 0 100%;-moz-transform-origin: 0 100%;-ms-transform-origin: 0 100%; -o-transform-origin: 0 100%;transform-origin: 0 100%;margin: 60px 0 10px 310px;`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: ${C}px;height: ${C}px;background: ${color};-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: ${C}px;`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: 0;height: 0;border-left: ${C}px solid transparent;border-right: ${C}px solid transparent;border-bottom: ${C}px solid ${color}`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;border-bottom: ${C}px solid ${color};border-left: ${D}px solid transparent;border-right: ${D}px solid transparent;height: 0;width: ${C}px;`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: 0;height: 0;border-top: ${C}px solid transparent;border-right: ${C}px solid ${color};border-bottom: ${C}px solid transparent`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: 0;height: 0;border-top: ${C}px solid transparent;border-left: ${C}px solid ${color};border-bottom: ${C}px solid transparent`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: ${C}px;height: ${C}px;background: ${color}`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: ${C}px;height: ${C}px;background: ${color}`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: ${C}px;height: ${random(10,120)}px;
          background: ${color};-moz-border-radius: 100px / 50px;-webkit-border-radius: 100px / 50px;border-radius: 100px / 50px`,

          `position: absolute;left: ${A}px;bottom: ${B}px;z-index: 1;width: ${random(60,280)}px;height: ${random(60,280)}px;-webkit-transform: skew(${random(10,60)}deg);-moz-transform: skew(${random(10,60)}deg);-o-transform: skew(${random(10,50)}deg);background: ${color}`
     ]  

     return styles[number]
    }

    randomFigure() {
     const figure = document.createElement('div')
           figure.setAttribute('style', this.createStyle())
     
     workingArea.append(figure)
     setTimeout(() => {
          figure.remove()
     }, 5000)
    }


    trigger() {
       this.randomFigure()   
    }
}




