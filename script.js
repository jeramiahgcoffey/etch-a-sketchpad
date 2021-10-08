let gridSize = 16;

const root = document.documentElement;
const container = document.querySelector(".grid");
const clearButton = document.querySelector("#clear");
const gridSelector = document.querySelector("#grid-selector");
const colorPicker = document.querySelector("#color-picker");

/************************EVENT HANDLERS************************/
const handleMouseOver = function (e) {
    e.target.classList.add("activate");
};

const handleClear = function () {
    const pixels = Array.from(document.querySelectorAll(".pixel"));
    for (const pixel in pixels) {
        const currentPixel = pixels[pixel];
        if (currentPixel.classList.contains("activate")) {
            currentPixel.classList.remove("activate");
        }
    }
};

const handleSelector = function (e) {
    gridSize = e.target.value;
    root.style.setProperty("--num_rows", gridSize);
    createGrid(gridSize);
};

const handleColor = function (e) {
    colorChoice = e.target.value;
    root.style.setProperty("--color_choice", colorChoice);
    console.log(colorChoice);
};
/************************************************/

const createGrid = function (gridSize) {
    const allPixels = Array.from(container.querySelectorAll("div"));
    for (pixel in allPixels) {
        const currentPixel = allPixels[pixel];
        container.removeChild(currentPixel);
    }
    for (let i = 0; i < gridSize * gridSize; i++) {
        const newPixel = document.createElement("div");
        newPixel.classList.add("pixel");
        newPixel.addEventListener("mouseover", handleMouseOver);
        container.appendChild(newPixel);
    }
};

clearButton.addEventListener("mouseup", handleClear);
gridSelector.addEventListener("change", handleSelector);
colorPicker.addEventListener("change", handleColor);

createGrid(gridSize);
