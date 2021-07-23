// ****** Variable Declarations ******

// Coloring Grid Variables
let gridSizeController = document.querySelector('#grid-size-controller');
let gridDimension = getGridDimension();
let coloringGrid = document.querySelector('#coloring-grid');

// Pencil Color Variables
let pencil = document.querySelector('#pencil');
let pencilColor = document.querySelector('#unique-color-picker').value;
let pencilColorCopy;
let greyScalePencil = document.querySelector('#greyscale-pencil');
let greyscaleColor = '#000000';
let storedPencil;
let squareOpacity = '0.1';


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

// Events Related to Grid Borders
let gridlineController = document.querySelector('#gridlines');
gridlineController.addEventListener('input', changeGridlines);

// Set Eraser to Grid BackgroundColor Upon Toggle
let eraser = document.querySelector('#eraser');
eraser.addEventListener('input', () => {
    pencilColorCopy = pencilColor;
    pencilColor = getGridBackgroundColor();
    uncheckPencils();
});

// Set Pencil Color to Value Before Eraser Was Toggled upon Toggle
pencil.addEventListener('input', () => {
    pencilColor = pencilColorCopy;
    uncheckEraser();
});

// Events to Choose Pencil Color
let uniqueColorPicker = document.querySelector('#unique-color-picker');
uniqueColorPicker.addEventListener('input', () => {
    pencilColor = uniqueColorPicker.value;
    document.getElementById('user-selected-color').checked = true;
});


// ***Events Related to Coloring the Grid***
function addEventListenerToColoringSquares() {
    let coloringSquares = document.querySelectorAll('.coloring-square');
    coloringSquares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            choosePencilColor(),
                square.style.backgroundColor = pencilColor;
            if (greyScalePencil.checked == true) {
                square.style.opacity = chooseOpacity(square.style.opacity);
            } else {
                square.style.opacity = '1';
            }
        });
    });
}

let pencils = document.querySelectorAll('.pencil');
pencils.forEach((pencil) => {
    pencil.addEventListener('input', () => {
        uncheckEraser();
    });
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

function removeBorders() {
    let coloringSquares = document.querySelectorAll('.coloring-square');
    coloringSquares.forEach((coloringSquare) => {
        coloringSquare.style.border = "none";
    });
}

function changeGridlines() {
    let gridlineController = document.querySelector('#gridlines');
    (gridlineController.checked) ? addColoringSquareBorders() : removeBorders();
}

// ****************** Coloring the Color Squares ******************


function choosePencilColor() {
    const uniquePencil = document.querySelector('#user-selected-color');
    const blackPencil = document.querySelector('#black-pencil');
    let greyscalePencil = document.querySelector('#greyscale-pencil')
    const coolPalettePencil = document.querySelector('#cool-palette-pencil');
    const warmPalettePencil = document.querySelector('#warm-palette-pencil');
    const randomPencil = document.querySelector('#random-pencil');

    if (!eraser.checked) {
        if (uniquePencil.checked) {
            pencilColor = document.getElementById('unique-color-picker').value;
            storedPencil = uniquePencil.getAttribute('id');
        } else if (blackPencil.checked === true) {
            pencilColor = '#000000';
            storedPencil = blackPencil.getAttribute('id');
        } else if (greyscalePencil.checked === true) {
            pencilColor = '#000000'
            storedPencil = greyscalePencil.getAttribute('id');
        } else if (coolPalettePencil.checked === true) {
            pencilColor = generateRandomCoolPaletteColor();
            storedPencil = coolPalettePencil.getAttribute('id');
        } else if (warmPalettePencil.checked === true) {
            pencilColor = generateRandomWarmPaletteColor();
            storedPencil = warmPalettePencil.getAttribute('id');
        } else if (randomPencil.checked === true) {
            pencilColor = generateRandomHexColor();
            storedPencil = randomPencil.getAttribute('id');
        }
        pencilColorCopy = pencilColor;
        getStoredPencil();
    } else {
        pencilColor = getGridBackgroundColor();
    }

    uniqueColorPicker.value = pencilColor;
}

function uncheckEraser() {
    eraser.checked = false;
    pencil.checked = true;
}

function getStoredPencil() {
    if (storedPencil) {
        document.getElementById(storedPencil).checked = true;
    }
}


function uncheckPencils() {
    for (let pencil of pencils) {
        pencil.checked = false;
    }
}

function changeOpacity(square) {
    let squareColor = square.style.backgroundColor;
    let currentOpacity = square.style.opacity;
    if (greyScalePencil.checked === true) {
        square.style.opacity = chooseOpacity(currentOpacity);
    } else {
        square.style.opacity = '1';
    }
}

function checkIfGreyScale(square) {
    return (square.style.backgroundColor === '#000000') ?
        true : false;
}

function generateRandomCoolPaletteColor() {
    const coolPalette = [
        '#7400B8',
        '#6930C3',
        '#5E60CE',
        '#5390D9',
        '#4EA8DE',
        '#48BFE3',
        '#56CFE1',
        '#64DFDF',
        '#72EFDD',
        '#80FFDB'
    ];
    let randomIndex = generateRandomNumber(coolPalette.length);
    return coolPalette[randomIndex];
}

function generateRandomWarmPaletteColor() {
    const warmPalette = [
        '#9D0208',
        '#D00000',
        '#DC2F02',
        '#E85D04',
        '#F48C06',
        '#FAA307',
        '#FFBA08'
    ];
    let randomIndex = generateRandomNumber(warmPalette.length);
    return warmPalette[randomIndex];
}

function generateRandomHexColor() {
    let randomNumber;
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        randomNumber = generateRandomNumber(9).toString(16);
        hexColor += randomNumber;
    }
    return hexColor;
}

function generateRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}

function chooseOpacity(currentOpacity) {
    currentOpacity *= 10;
    switch (currentOpacity) {
        case 1:
            return 0.2;
        case 2:
            return 0.3;
        case 3:
            return 0.4;
        case 4:
            return 0.5;
        case 5:
            return 0.6;
        case 6:
            return 0.7;
        case 7:
            return 0.8;
        case 8:
            return 0.9;
        case 9:
            return 1;
        default:
            return 0.1;
    }
}


