// Default variable values
let gridSize = 16;
let colorChoice = "#000000";

const root = document.documentElement;
const container = document.querySelector(".grid");
const clearButton = document.querySelector("#clear");
const gridSelector = document.querySelector("#grid-selector");
const colorPicker = document.querySelector("#color-picker");

/************************EVENT HANDLERS************************/
const handleMouseOver = function (e) {
    e.target.style.backgroundColor = colorChoice;
};

const handleClear = function () {
    newGrid(gridSize);
};

const handleSizeSelector = function (e) {
    gridSize = e.target.value;
    root.style.setProperty("--num_rows", gridSize);
    newGrid(gridSize);
};

const handleColorChange = function (e) {
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
gridSelector.addEventListener("change", handleSizeSelector);
colorPicker.addEventListener("change", handleColorChange);

window.onload = () => {
    newGrid(gridSize);
};
