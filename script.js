// Default variable values
let gridSize = 16;
let colorChoice = "#000000";
let mode = "userChoice"

const root = document.documentElement;
const container = document.querySelector(".grid");
const clearButton = document.querySelector("#clear");
const rainbowMode = document.querySelector("#rainbow");
const gridSelector = document.querySelector("#grid-selector");
const colorPicker = document.querySelector("#color-picker");

/************************EVENT HANDLERS************************/
const handleMouseOver = function (e) {
    if (mode == "userChoice") {
        e.target.style.backgroundColor = colorChoice;
    } else if (mode == "rainbow") {
        const randomInt = function () {
            return (Math.floor(Math.random() * 255 + 1))
        }
        const red = randomInt();
        const green = randomInt();
        const blue = randomInt();
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
};

const handleClear = function () {
    newGrid(gridSize);
    if (mode == "rainbow") {
        handleRainbow();
    }
};

const handleRainbow = function () {
    if (mode == "userChoice") {
        mode = "rainbow";
    } else if (mode == "rainbow") {
        mode = "userChoice";
    }
    rainbowMode.classList.toggle("rainbow-mode");
}

const handleSizeSelector = function (e) {
    gridSize = e.target.value;
    root.style.setProperty("--num_rows", gridSize);
    newGrid(gridSize);
};

const handleColorChange = function (e) {
    if (mode == "rainbow") {
        handleRainbow();
    }
    colorChoice = e.target.value;
};
/***********************************************************/

const newGrid = function (gridSize) {
    // Remove current "pixels"
    const allPixels = Array.from(container.querySelectorAll("div"));
    for (pixel in allPixels) {
        const currentPixel = allPixels[pixel];
        container.removeChild(currentPixel);
    }
    // Create new grid of "pixels"
    for (let i = 0; i < gridSize * gridSize; i++) {
        const newPixel = document.createElement("div");
        newPixel.classList.add("pixel");
        newPixel.addEventListener("mouseover", handleMouseOver);
        container.appendChild(newPixel);
    }
};

clearButton.addEventListener("mouseup", handleClear);
rainbowMode.addEventListener("mouseup", handleRainbow);
gridSelector.addEventListener("change", handleSizeSelector);
colorPicker.addEventListener("change", handleColorChange);

window.onload = () => {
    newGrid(gridSize);
};
