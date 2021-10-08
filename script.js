const gridSize = 16;

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

const container = document.querySelector(".grid");

for (let i = 0; i < gridSize * gridSize; i++) {
    const newPixel = document.createElement("div");
    newPixel.classList.add("pixel");
    newPixel.addEventListener("mouseover", handleMouseOver);
    container.appendChild(newPixel);
}

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("mouseup", handleClear);
