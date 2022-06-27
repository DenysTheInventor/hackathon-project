import {Module} from '../core/module'
import { colors } from '../core/constants/setting'
import { workingArea } from '../core/constants/setting'
import html2canvas from 'html2canvas'

export class PaintModule extends Module {
    #colorBlocksArea
    #previewBlock
    #canvas
    #context
    #colors
    #size
    #isPressed
    #closeApp
    #thickNumber
    #opacityNumber
    #paintMarkerType
    #screenModule
    #thickSlider
    #color
    #x
    #y

    constructor(type, text) {
        super(type, text)

        this.#size = 1
        this.#isPressed = false;
        this.#color = "#000";
        this.#x = 0
        this.#y = 0

        this.#colorBlocksArea = null
        this.#canvas = null
        this.#context = null
        this.#previewBlock = null
        this.#colors = [...colors]
    }

    getCanvas() {
        this.#canvas = document.querySelector('canvas')
        this.#context = this.#canvas.getContext('2d')
        this.#context.canvas.width = document.documentElement.clientWidth;
        this.#context.canvas.height = document.documentElement.clientHeight;
        this.#paintMarkerType = document.querySelector('.paint-marker__choose')
        this.#colorBlocksArea = document.querySelector('.paint-color__samples')
        this.#previewBlock = document.querySelector('.color-box')
        this.#thickNumber = document.querySelector('.paint-thick__slider-number')
        this.#thickSlider = document.querySelector('.paint-thick__slider-input')
        this.#opacityNumber = document.querySelector('.paint-thick__opacity-number')
        this.#screenModule = document.querySelector('.paint-working__screen')
        this.#closeApp = document.querySelector('.paint-close')
    }

    handleClose() {
        this.#closeApp.addEventListener('click', () => {
            workingArea.innerHTML = ''
            document.querySelector('.paint-wrapper').remove()
        })
    }

    updateThickNumber(value) {
        this.#thickNumber.value = value
    }

    updateThickSlider(value) {
        this.#thickSlider.value = value
    }

    updateOpacityNumber(value) {
        this.#opacityNumber.value = value
    }

    createColorBlock(color) {
        const colorBlock = document.createElement('li')
              colorBlock.className = 'paint-color__samples-item'
              colorBlock.style.background = color
        
        this.#colorBlocksArea.append(colorBlock)
    }

    setPreviewBlock(color = '#000') {
        this.#previewBlock.style.background = color
    }

    setColorBlocks() {
        this.#colors.forEach(item => {
            this.createColorBlock(item)
        })
    }

    listenMouseDown() {
        this.#canvas.addEventListener("mousedown", (e) => {
            this.#isPressed = true

            this.#x = e.offsetX
            this.#y = e.offsetY
        });
    }

    listenMouseUp() {
        this.#canvas.addEventListener("mouseup", (e) => {
            this.#isPressed = false
          
            this.#x = undefined
            this.#y = undefined
        });
    }

    listenMouseMove() {
        this.#canvas.addEventListener("mousemove", (e) => {
            if (this.#isPressed) {

              const x2 = e.offsetX
              const y2 = e.offsetY
          
              this.drawCircle(x2, y2)
              this.drawLine(this.#x, this.#y, x2, y2)
          
              this.#x = x2
              this.#y = y2
            }
        })
    }

    drawCircle(x, y) {
        this.#context.beginPath()
        this.#context.arc(x, y, this.#size, 0, Math.PI * 2)
        this.#context.fillStyle = this.#color
        this.#context.fill()
    }
      
    drawLine(x1, y1, x2, y2) {
        this.#context.beginPath()
        this.#context.moveTo(x1, y1)
        this.#context.lineTo(x2, y2)
        this.#context.strokeStyle = this.#color
        this.#context.lineWidth = this.#size * 2
        this.#context.stroke()
    }

    getCurrentThick() {
        const thickInput = document.querySelector('.paint-thick__slider-input')
        this.updateThickNumber(thickInput.value)

        thickInput.addEventListener('change', () => {
            const value = thickInput.value
            this.updateThickNumber(thickInput.value)
            this.setSize(value)
        })
    }

    getCurrentOpacity() {
        const opacityInput = document.querySelector('.paint-thick__opacity-input')
        this.updateOpacityNumber(opacityInput.value)

        opacityInput.addEventListener('change', () => {
            const value = opacityInput.value
            this.updateOpacityNumber(value)
            this.setOpacity(value/100)
        })
    }

    setSize(newSize) {
        this.#size = newSize
    }

    setOpacity(opacity) {
        this.#context.globalAlpha = opacity
    }

    initApp() {
        this.listenMouseDown()
        this.listenMouseUp()
        this.listenMouseMove()
        this.drawCircle()
        this.drawLine()
        this.getCurrentThick()
        this.getCurrentOpacity()
        this.pickColor()
        this.handleClose()
        this.choosePaintType()
        this.makeScreenshot()
        this.eraseArea()
    }

    eraseArea() {
        document.querySelector('.paint-working__erase').addEventListener('click', () => {
            this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
        })
    }

    setUpColor(color) {
        this.#previewBlock.style.background = color
        this.#color = color
    }

    pickColor() {
        this.#colorBlocksArea.addEventListener('click', (e) => {
            const { target } = e

            if(target.classList.contains('paint-color__samples-item')) {
                const newColor = target.style.background
                this.setUpColor(newColor)
            }
        })
    }

    choosePaintType() {
        this.#paintMarkerType.addEventListener('click', (e) => {
            const { target } = e            

            if(target.classList.contains('paint-marker__item')) {
                const allTypes = this.#paintMarkerType.querySelectorAll('.paint-marker__item')
                allTypes.forEach(type => {
                    if(type.classList.contains('active')) {
                        type.classList.remove('active')
                    }
                })
                target.classList.add('active')

                const width = target.dataset.width
                const title = target.dataset.name

                this.updateThickNumber(width)
                this.updateThickSlider(width)
                this.setSize(width)
                this.setTypeHeading(title)

                if(title === 'Fill') {
                    this.#canvas.style.background = this.#color
                }
            }
        })
    }

    setTypeHeading(text) {
        document.querySelector('.paint-marker__heading').textContent = text 
    }

    makeScreenshot() {
        this.#screenModule.addEventListener('click', () => {
            html2canvas(document.getElementById("canvas"), {
                allowTaint: true,
                useCORS: true,
              })
              .then(function (canvas) {
                canvas.classList.add('screenshot')
                document.body.appendChild(canvas)
                setTimeout(() => {
                    canvas.remove()
                }, 3000)
              })
              .catch((e) => {
                console.log(e)
              })
        })
    }

    createApp() {
        const app = document.createElement('div')
              app.className = 'paint-wrapper'
              app.insertAdjacentHTML('afterbegin', `
                <div class="paint-working__area">
                <div class="paint-working__area-panel">
                <div class="paint-working__title">
                    <p class="paint-working__area-title">Simple Paint</p>
                    <i class="fa-solid fa-circle-xmark paint-close"></i>
                </div>
                <div class="paint-control__head">
                    <div class="paint-working__screen">
                        <i class="fa-solid fa-camera-retro"></i>
                    </div>
                    <div class="paint-working__erase">
                        <i class="fa-solid fa-eraser"></i>
                    </div>
                </div>
                </div>
                <div class="paint-working__area-draw">
                    <canvas id="canvas"></canvas>
                </div>
                </div>
                <div class="paint-control__area">
                <div class="paint-marker">
                <h2 class="paint-marker__heading">Marker</h2>
                <ul class="paint-marker__choose">
                  <li class="paint-marker__item active" data-name="Marker" data-width="8">
                    <i class="fa-solid fa-pen"></i>
                  </li>
                  <li class="paint-marker__item" data-name="Brush" data-width="30">
                    <i class="fa-solid fa-brush"></i>
                  </li>
                  <li class="paint-marker__item" data-name="Fill" data-width="100">
                    <i class="fa-solid fa-fill-drip"></i>
                  </li>
                </ul>
                <div class="paint-thick">           
                  <div class="paint-thick__control">
                    <div class="paint-thick__slider">
                      <div class="paint-thick__slider-info">
                        <h3 class="paint-thick__heading">Thickness</h3>
                        <input class="paint-thick__slider-number" type="number" disabled>
                      </div>
                      <input class="paint-thick__slider-input" type="range" name="thick"
                      min="0" max="100" value="8">
                    </div>
                    <div class="paint-thick__opacity">
                      <div class="paint-thick__opacity-info">
                        <h3 class="paint-thick__heading">Opacity</h3>
                        <input class="paint-thick__opacity-number" type="number" disabled>
                      </div>
                      <input class="paint-thick__opacity-input" type="range" name="opacity"
                      min="0" max="100" value="100">
                    </div>
                  </div>
                </div>
                </div>
                <div class="paint-color">
                <div class="paint-color__choose">
                  <div class="color-box"></div>
                  <div class="color-choose">
                    <i class="fa-solid fa-eye-dropper"></i>
                  </div>
                </div>
                <ul class="paint-color__samples">
                  
                </ul>
                </div>
                </div>
              `)
        workingArea.append(app)

        this.getCanvas()
    }

    trigger() {
        if(!document.querySelector('.paint-wrapper')) {
            try {
            this.createApp()
            this.setColorBlocks()
            this.setPreviewBlock()
            this.initApp()
            } catch (error) {
                console.error(error)
            }
            
        }
    }
}
