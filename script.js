class GridController {
    constructor(size = 16) {
        this.size = size
        this.colorChoice = '#000000'
        this.colorMode = 'userChoice'
        this.drawMode = 'default'
        this.isDown = false
    }

    getSize() {
        return this.size
    }

    getDrawMode() {
        return this.drawMode
    }

    getColorMode() {
        return this.colorMode
    }

    getColorChoice() {
        return this.colorChoice
    }

    getIsDown() {
        return this.isDown
    }

    setSize(size) {
        this.size = size
    }

    setDrawMode(mode) {
        this.drawMode = mode
    }

    setColorMode(mode) {
        this.colorMode = mode
    }

    setColorChoice(color) {
        this.colorChoice = color
    }

    setIsDown(isDown) {
        this.isDown = isDown
    }
}

const grid = new GridController()

/***************************SELECTORS***************************/
const root = document.documentElement
const container = document.querySelector('.grid')
const clearButton = document.querySelector('#clear')
const rainbowMode = document.querySelector('#rainbow')
const clickToDrawMode = document.querySelector('#click-mode')
const gridSelector = document.querySelector('#grid-selector')
const colorPicker = document.querySelector('#color-picker')

/************************EVENT HANDLERS************************/
const handleMouseOver = (e) => {
    const colorMode = grid.getColorMode()
    const colorChoice = grid.getColorChoice()
    const drawMode = grid.getDrawMode()
    const isDown = grid.getIsDown()
    if (drawMode == 'default' || (drawMode == 'click-mode' && isDown)) {
        if (colorMode == 'userChoice') {
            e.target.style.backgroundColor = colorChoice
        } else if (colorMode == 'rainbow') {
            const randomInt = () => {
                return Math.floor(Math.random() * 255 + 1)
            }
            const red = randomInt()
            const green = randomInt()
            const blue = randomInt()
            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
        }
    }
}

const handleRainbow = () => {
    const colorMode = grid.getColorMode()
    if (colorMode == 'userChoice') {
        grid.setColorMode('rainbow')
    } else if (colorMode == 'rainbow') {
        grid.setColorMode('userChoice')
    }
    rainbowMode.classList.toggle('rainbow-mode')
}

const handleClear = () => {
    newGrid(grid.getSize())
    if (grid.getColorMode() == 'rainbow') {
        handleRainbow()
    }
}

const handleClickToDraw = () => {
    if (grid.getDrawMode() == 'default') {
        grid.setDrawMode('click-mode')
    } else {
        grid.setDrawMode('default')
    }
    clickToDrawMode.classList.toggle('click-to-draw')
}

const handleSizeSelector = (e) => {
    grid.setSize(e.target.value)
    root.style.setProperty('--num_rows', grid.getSize())
    newGrid(grid.getSize())
}

const handleColorChange = (e) => {
    if (grid.getColorMode() == 'rainbow') {
        handleRainbow()
    }
    grid.setColorChoice(e.target.value)
}

/***********************MAIN**************************/
const newGrid = (size) => {
    // Remove current "pixels"
    const allPixels = Array.from(container.querySelectorAll('div'))
    for (pixel in allPixels) {
        const currentPixel = allPixels[pixel]
        container.removeChild(currentPixel)
    }
    // Create new grid of "pixels"
    for (let i = 0; i < size * size; i++) {
        const newPixel = document.createElement('div')
        newPixel.classList.add('pixel')
        newPixel.addEventListener('mouseover', handleMouseOver)
        container.appendChild(newPixel)
    }
}

container.addEventListener('mousedown', (event) => {
    event.preventDefault()
    grid.setIsDown(true)
})

container.addEventListener('touchstart', (event) => {
    event.preventDefault()
    grid.setIsDown(true)
})

container.addEventListener('mouseup', () => grid.setIsDown(false))
container.addEventListener('touchend', () => grid.setIsDown(false))
clearButton.addEventListener('mouseup', handleClear)
rainbowMode.addEventListener('mouseup', handleRainbow)
clickToDrawMode.addEventListener('mouseup', handleClickToDraw)
gridSelector.addEventListener('change', handleSizeSelector)
colorPicker.addEventListener('change', handleColorChange)

window.onload = () => {
    newGrid(grid.size)
}
