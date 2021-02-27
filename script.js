//Initial page setup

//Get container element
const container = document.querySelector('.grid-container');

//Initial grid and options settings
let gridSize = 16;
let bgColor = 'rgb(199,117,235)';
let shading = false;
let rainbowColor = false;

//Initialize page controls
//Clean grid button
const cleanButton = document.querySelector('.clean-button');
cleanButton.addEventListener('click',cleanGrid);

//Grid size input
const gridSizeInput = document.querySelector('#grid-size');
gridSizeInput.value = gridSize;
gridSizeInput.addEventListener('change',validateInput);

//Get the color picker element and create event
const colorPicker = document.querySelector('#color-picker');
colorPicker.defaultValue = '#c775eb';
colorPicker.addEventListener('change',setbgColor);

//Create the color label
const currentColorLabel = document.querySelector('#current-color');
currentColorLabel.innerText = bgColor;

const rainbowCheckbox = document.querySelector('#rainbow-checkbox');
rainbowCheckbox.checked = false;
rainbowCheckbox.addEventListener('change',toggleRainbow);

const shadingCheckbox = document.querySelector('#shading-checkbox');
shadingCheckbox.checked = false;
shadingCheckbox.addEventListener('change',toggleShading);

//Create the starting grid
createGrid(gridSize);

function createGrid (size) {
    //Format the grid
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    container.style.gridColumnGap = '1px';
    container.style.gridRowGap = '1px';
    
    for (i=0;i<(size**2);i++) {
        const div1 = document.createElement('div');
        div1.classList.add('square');
        div1.style['background-color'] = 'white';
        container.appendChild(div1);
    }

    const gridDivs = document.querySelectorAll('.square');
    createGridEvent(gridDivs);
}

function setbgColor(event) {
    bgColor = event.target.value;
    if (rainbowColor === false) {
        if (bgColor[0] === '#') {
                currentColorLabel.innerText = convertColor(bgColor);
        } else {
                currentColorLabel.innerText = bgColor;
        }
    }
}

function createGridEvent (divList) {
    for (const item of divList) {
        item.addEventListener("mouseenter", function( event ) {
            
            //If the background color is white, change to the chosen bg color 
            //or rainbow if rainbow is true
            if (item.style.backgroundColor === 'white' && rainbowColor === false) {
                item.setAttribute('style', `background: ${bgColor}`);
                //Set the base-color attribute to the current color
                item.setAttribute('data-shade-factor',getShadeFactor(bgColor));
                //console.log(item.getAttribute('data-shade-factor'));
            
            } else if (item.style.backgroundColor === 'white' && rainbowColor === true) {
                item.setAttribute('style', `background: ${getRandomColor()}`);
                //Set the base-color attribute to the current background color
                item.setAttribute('data-shade-factor',getShadeFactor(item.style.backgroundColor));
                //console.log(item.getAttribute('data-shade-factor'));
            }
            //If the background color is not white or black and the shade factor is on, subtract 
            //the shade factor
            else if (shading && item.style.backgroundColor != '#000000') {
                let currentColor = item.style.backgroundColor;
                let shadeArray = item.getAttribute('data-shade-factor');
                console.log(`current color: ${currentColor}`);
                console.log(`shade array: ${shadeArray}`);
            
                item.setAttribute('style', `background: ${darkenBackground(currentColor,shadeArray)}`);
            }
        })
    }
}

function convertColor (hexColor) {

    if (hexColor[0] === '#') {
        let rSlice = hexColor.slice(1,3);
        let gSlice = hexColor.slice(3,5);
        let bSlice = hexColor.slice(5);
        return `rgb(${parseInt(rSlice,16)},${parseInt(gSlice,16)},${parseInt(bSlice,16)})`;
    }
    else {
        return hexColor;
    }  
}

function toggleRainbow (event) {
    //Check if input is checked
    if (event.target.checked === false) {
        rainbowColor = false;
        currentColorLabel.innerText = convertColor(bgColor);
    } else {
        rainbowColor = true;
        currentColorLabel.innerText = 'Rainbow!';
    }
}

function toggleShading (event) {
    //Check if input is checked
    if (event.target.checked === false) {
        shading = false;
    } else {
        shading = true;
    }
}

function getShadeFactor(color) {
    
    //Convert color to rgb if in hex form
    if (color[0] === '#') {
        color = convertColor(color);
    } 

    let colorArray = separateColor(color);

    let rFactor = colorArray[0]/10;
    let gFactor = colorArray[1]/10;
    let bFactor = colorArray[2]/10;
    
    return [rFactor,gFactor,bFactor];
}

function separateColor(rgbValue) {
    let myRe = /\d+/g;
    let stringArray = rgbValue.match(myRe);
    //Convert string values to numbers
    let intArray = stringArray.map(Number);

    return intArray;
}

function darkenBackground (currentColor,shadeFactor) {
    let currentColorArray = separateColor(currentColor);
    
    let shadeIntArray = shadeFactor.split(',').map(Number);
    
    let newrValue = currentColorArray[0] - shadeIntArray[0];
    let newgValue = currentColorArray[1] - shadeIntArray[1];
    let newbValue = currentColorArray[2] - shadeIntArray[2];

    //Ensure rgb value don't get below 0
    if (newrValue < 0) {
        newrValue = 0;
    }
    if (newbValue < 0) {
        newbValue = 0;
    }
    if (newgValue < 0) {
        newgValue = 0;
    }
    return `rgb(${newrValue},${newgValue},${newbValue})`;
}

function getRandomColor () {
    let x = Math.floor(Math.random() * 255);
    let y = Math.floor(Math.random() * 255);
    let z = Math.floor(Math.random() * 255);
    let bgColor = `rgb(${x},${y},${z})`;
    return bgColor;
}

function validateInput(e) {
    if (e.target.value > 0 && e.target.value < 101) {
        gridSize = e.target.value;
        gridSizeInput.value = gridSize;
        clearGrid();
        createGrid(gridSize);
    }
}

function clearGrid() {
    document.querySelectorAll('.square').forEach(el => el.remove());
}

function cleanGrid() {
    for (const item of (document.querySelectorAll('.square'))) {
        item.style.backgroundColor = 'white';
    }
}




