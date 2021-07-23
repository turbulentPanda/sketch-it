// ****** Variable Declarations ******

// Coloring Grid Variables
let gridSizeController = document.querySelector('#grid-size-controller');
let gridDimension = getGridDimension();
let coloringGrid = document.querySelector('#coloring-grid');

// Pencil Color Variables
let pencil = document.querySelector('#pencil');
let pencilColor = pencil.value;
let pencilColorCopy;

// ****** Functions to Run Upon Loading of the Webpage ******
initializeColoringGrid();
setPencilColor();

// ****************** Event Listeners ******************
// Events Related to Grid Size
gridSizeController.addEventListener('input',
    resizeColoringGrid,
    () => {
        gridDimension = getGridDimension()
    });

// ***Events Related to Coloring the Grid***
function addEventListenerToColoringSquares() {
    let coloringSquares = document.querySelectorAll('.coloring-square');
    coloringSquares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = pencilColor;
        });
    });
}

// Set Eraser to Grid BackgroundColor Upon Toggle
let eraser = document.querySelector('#eraser');
eraser.addEventListener('input', () => {
    pencilColorCopy = pencilColor;
    pencilColor = getGridBackgroundColor();
});

// Set Pencil Color to Value Before Eraser Was Toggled upon Toggle
pencil.addEventListener('input', () => {
    pencilColor = pencilColorCopy;
});

// Events to Choose Pencil Color
let uniqueColorPicker = document.querySelector('#unique-color-picker');
uniqueColorPicker.addEventListener('input', () => {
    pencilColor = uniqueColorPicker.value;
    document.getElementById('user-selected-color').checked = true;
});

let blackPencil = document.querySelector('#black-pencil');
blackPencil.addEventListener('input', () => {
    pencilColor = '#000000';
});

//Event to Change Grid BackgroundColor
let gridBackgroundColorController = document.querySelector('#grid-background-color');
gridBackgroundColorController.addEventListener('input', setGridBackgroundColor);

// Event to Clear Grid
let clearGridButton = document.querySelector('#clear-grid-button');
clearGridButton.addEventListener('click', setGridBackgroundColor);

// ****** Choosing the Pencil Color ******
function setPencilColor(color = '#02a0cc') {
    pencilColorCopy = pencilColor;
    pencilColor = `${color}`;
    return [pencilColor, pencilColorCopy];
}

// ****** Sizing and Initializing the Coloring Grid ******
function initializeColoringGrid() {
    setColoringGridLayout(gridDimension);
    displayGridSize();
    appendColoringSquares(gridDimension);
    setGridBackgroundColor();
    addColoringSquareBorders();
    addEventListenerToColoringSquares();
}

function resizeColoringGrid() {
    let newGridDimension = getGridDimension();
    removeColoringSquares();
    setColoringGridLayout(newGridDimension);
    displayGridSize();
    appendColoringSquares(newGridDimension);
    setGridBackgroundColor();
    addColoringSquareBorders();
    addEventListenerToColoringSquares();
}

function getGridDimension() {
    return gridSizeController.value;
}

function setColoringGridLayout(gridDimension) {
    coloringGrid.setAttribute(
        'style',
        `grid-template-columns: repeat(${gridDimension}, 1fr);
         grid-template-rows: repeat(${gridDimension}, 1fr)`
    )
}

function displayGridSize() {
    let gridDimension = gridSizeController.value;
    let gridDimensionDisplays = document.querySelectorAll('label > span');
    gridDimensionDisplays.forEach((gridDimensionDisplay) => {
        gridDimensionDisplay.textContent = `${gridDimension}`;
    });
}

function appendColoringSquares(gridDimension) {
    for (let i = 0; i < (gridDimension ** 2); i++) {
        let coloringSquare = document.createElement('div');
        coloringSquare.classList.add('coloring-square');
        if ((i + 1) % gridDimension === 0) {
            coloringSquare.classList.add('right-border-square');
        } // Adds special class to coloring squares on the grid's rightmost edge

        if ((i - gridDimension) >= (gridDimension ** 2 - 2 * gridDimension)) {
            coloringSquare.classList.add('bottom-border-square');
        } //Adds special class to coloring squares on the grid's bottommost edge

        coloringGrid.appendChild(coloringSquare);
    }
}

function removeColoringSquares() {
    while (coloringGrid.firstChild) {
        coloringGrid.removeChild(coloringGrid.firstChild);
    }
}

function setGridBackgroundColor() {
    let gridBackgroundColor = getGridBackgroundColor();
    let coloringSquares = document.querySelectorAll('.coloring-square');
    coloringSquares.forEach((coloringSquare) => {
        coloringSquare.style.backgroundColor = `${gridBackgroundColor}`;
    });
}

function getGridBackgroundColor() {
    let gridColorPicker = document.querySelector('#grid-background-color');
    return gridColorPicker.value;
}

// ****** Styling and Adding the Internal Borders of the Coloring Grid ******
function addColoringSquareBorders() {
    addTopAndLeftBorders();
    addRightBorders();
    addBottomBorders();
}

function addTopAndLeftBorders() {
    let coloringSquares = document.querySelectorAll('.coloring-square');
    coloringSquares.forEach((coloringSquare) => {
        coloringSquare.style.borderTop = "1px solid rgba(0, 0, 0, .5)";
        coloringSquare.style.borderLeft = "1px solid rgba(0, 0, 0, .5";
    });
}

function addRightBorders() {
    let rightBorderSquares = document.querySelectorAll('.right-border-square');
    rightBorderSquares.forEach((rightBorderSquare) => {
        rightBorderSquare.style.borderRight = "1px solid rgba(0, 0, 0, .5)";
    });
}

function addBottomBorders() {
    let bottomBorderSquares = document.querySelectorAll('.bottom-border-square');
    bottomBorderSquares.forEach((bottomBorderSquares) => {
        bottomBorderSquares.style.borderBottom = "1px solid rgba(0, 0, 0, .5)";
    });
}

// ****************** Coloring the Color Squares ******************
