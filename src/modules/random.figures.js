import {Module} from '../core/module'

export class geometricFigurs extends Module {
    constructor(type, text) {
        super(type, text)  
    } 

    // degToRad(deg) {
    //     return Math.PI * deg / 180;
    // }
    
    intRand(min, max) {
        return Math.round(min + (max - min) * Math.random());
    }
    

    startPaint(){
        const   A = this.intRand(80,980),
                B = this.intRand(80,300),
                C = this.intRand(40,250),              
                color = `rgb(${this.intRand(0, 255)},${this.intRand(0, 255)},${this.intRand(0, 255)})`,
                rnd = this.intRand(0, 9);    
           
        switch(rnd) {
            case 0 :
                const createDivForFigurs = document.createElement('div');   
                createDivForFigurs.setAttribute('style', `position: absolute; 
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     width: ${C}px;
                    height: ${C}px;
                    background: ${color};
                /* Rotate */
                    -webkit-transform: rotate(-45deg);
                    -moz-transform: rotate(-45deg);
                    -ms-transform: rotate(-45deg);
                    -o-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                /* Rotate Origin */
                    -webkit-transform-origin: 0 100%;
                    -moz-transform-origin: 0 100%;
                    -ms-transform-origin: 0 100%;
                    -o-transform-origin: 0 100%;
                    transform-origin: 0 100%;
                    margin: 60px 0 10px 310px;`);
                                document.body.append(createDivForFigurs);
                 setTimeout(() => {
                 createDivForFigurs.remove();
                 }, 5000);
            break;     
            case 1 :
                const createDivForFigurs1 = document.createElement('div');   
                createDivForFigurs1.setAttribute('style', `position: absolute; 
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     width: ${C}px;
                     height: ${C}px;
                     background: ${color};
	                 -moz-border-radius: 50px;
                     -webkit-border-radius: 50px;
	                 border-radius: ${C}px;`);
                document.body.append(createDivForFigurs1);
                 setTimeout(() => {
                 createDivForFigurs1.remove();
                 }, 5000);
            break;     
            case 2 :
                const createDivForFigurs2 = document.createElement('div');   
                createDivForFigurs2.setAttribute('style', `position: absolute; 
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     width: 0;
                     height: 0;
                     border-left: ${C}px solid transparent;
	                 border-right: ${C}px solid transparent ;
	                 border-bottom: ${C}px solid ${color}`);
                document.body.append(createDivForFigurs2);
                 setTimeout(() => {
                 createDivForFigurs2.remove();
                 }, 5000);
            break;
            case 3 :
                const createDivForFigurs3 = document.createElement('div');   
                const D = this.intRand(15,80);
                createDivForFigurs3.setAttribute('style', `position: absolute;
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     border-bottom: ${C}px solid ${color};
	                 border-left: ${D}px solid transparent;
	                 border-right: ${D}px solid transparent;
                     height: 0;
                     width: ${C}px;`);
                document.body.append(createDivForFigurs3);
                 setTimeout(() => {
                 createDivForFigurs3.remove();
                 }, 5000);
            break;
            case 4 :
                const createDivForFigurs4 = document.createElement('div');   
                createDivForFigurs4.setAttribute('style', `position: absolute; 
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     width: 0;
                     height: 0;
                     border-top: ${C}px solid transparent;
	                 border-right: ${C}px solid ${color};
	                 border-bottom: ${C}px solid transparent`);
                document.body.append(createDivForFigurs4);
                 setTimeout(() => {
                 createDivForFigurs4.remove();
                 }, 5000);
            break;
            case 5 :
                const createDivForFigurs5 = document.createElement('div');   
                createDivForFigurs5.setAttribute('style', `position: absolute; 
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     width: 0;
                     height: 0;
                     border-top: ${C}px solid transparent;
	                 border-left: ${C}px solid ${color};
	                 border-bottom: ${C}px solid transparent`);
                document.body.append(createDivForFigurs5);
                 setTimeout(() => {
                 createDivForFigurs5.remove();
                 }, 5000);
            break;
            case 6 :
                const createDivForFigurs6 = document.createElement('div');   
                createDivForFigurs6.setAttribute('style', `position: absolute; 
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     width: ${C}px;
                     height: ${C}px;
                     background: ${color}`);
                document.body.append(createDivForFigurs6);
                 setTimeout(() => {
                 createDivForFigurs6.remove();
                 }, 5000);
            break;  
            case 7 :
                const createDivForFigurs7 = document.createElement('div');
                createDivForFigurs7.setAttribute('style', `position: absolute; 
                     left: ${A}px; 
                     bottom: ${B}px;
                     z-index: 1; 
                     width: ${C}px;
                     height: ${C}px;
                     background: ${color}`);
                document.body.append(createDivForFigurs7);
                 setTimeout(() => {
                 createDivForFigurs7.remove();
                 }, 5000);
             break;   
            case 8 :
               const createDivForFigurs8 = document.createElement('div');
               createDivForFigurs8.setAttribute('style', `position: absolute; 
                    left: ${A}px; 
                    bottom: ${B}px;
                    z-index: 1; 
                    width: ${C}px;
                    height: ${this.intRand(10,120)}px;
                    background: ${color};
                    -moz-border-radius: 100px / 50px;
                    -webkit-border-radius: 100px / 50px;
                    border-radius: 100px / 50px` );
               document.body.append(createDivForFigurs8);
                 setTimeout(() => {
                 createDivForFigurs8.remove();
                 }, 5000);
            break;   
            case 9 :
               const createDivForFigurs9 = document.createElement('div');
               createDivForFigurs9.setAttribute('style', `position: absolute; 
                    left: ${A}px; 
                    bottom: ${B}px;
                    z-index: 1; 
                    width: ${this.intRand(60,280)}px;
                    height: ${this.intRand(60,280)}px;
                    -webkit-transform: skew(${this.intRand(10,60)}deg);
                    -moz-transform: skew(${this.intRand(10,60)}deg);
                    -o-transform: skew(${this.intRand(10,50)}deg);
                    background: ${color}` );
               document.body.append(createDivForFigurs9);
                 setTimeout(() => {
                 createDivForFigurs9.remove();
                 }, 5000);
            break;                   
            }
          //  else {
            //     console.log('просим прльзователя обновить наконец-то браузер');
            // }         
        }
    trigger() {
       console.log('figures');
       this.startPaint();     
    }
}




