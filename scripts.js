let gridSizeController = document.querySelector('#grid-size');
let gridDimension = gridSizeController.getAttribute('value');

let coloringGrid = document.querySelector('#coloring-grid');



resizeColoringGrid(gridDimension);


function resizeColoringGrid(gridDimension) {
    coloringGrid.setAttribute(
        'style',
        `grid-template-columns: repeat(${gridDimension}, 1fr);
         grid-template-rows: repeat(${gridDimension}, 1fr)`
    )
}

