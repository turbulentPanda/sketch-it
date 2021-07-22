let gridSizeController = document.querySelector('#grid-size');
let gridDimension = gridSizeController.getAttribute('value');

let coloringGrid = document.querySelector('#coloring-grid');



resizeColoringGrid(gridDimension);
appendColoringSquares(gridDimension);
setGridBackgroundColor();
addColoringSquareBorders();


function resizeColoringGrid(gridDimension) {
    coloringGrid.setAttribute(
        'style',
        `grid-template-columns: repeat(${gridDimension}, 1fr);
         grid-template-rows: repeat(${gridDimension}, 1fr)`
    )
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

function setGridBackgroundColor() {
    let gridColorPicker = document.querySelector('#grid-background-color');
    let gridBackgroundColor = gridColorPicker.getAttribute('value');
    let coloringSquares = document.querySelectorAll('.coloring-square');
    coloringSquares.forEach((coloringSquare) => {
        coloringSquare.style.backgroundColor = `${gridBackgroundColor}`;
    });
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
