//Initial page setup

//Get container element
const container = document.querySelector('.grid-container');

//Initial grid settings
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
colorPicker.addEventListener('change',setbgColor);

//Create the color label
const currentColorLabel = document.querySelector('#current-color');
currentColorLabel.innerText = bgColor;

const rainbowCheckbox = document.querySelector('#rainbow-checkbox');
rainbowCheckbox.addEventListener('change',toggleRainbow);

const shadingCheckbox = document.querySelector('#shading-checkbox');
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
    currentColorLabel.innerText = bgColor;
    //clearGrid();
    //createGrid(gridSize);
}

function createGridEvent (divList) {
    
    let shadeFactor = getShadeFactor(bgColor);

    let bgColorValues = separateColor(bgColor);
    for (const item of divList) {
        item.addEventListener("mouseenter", function( event ) {
            
            //If the background color is white, change to the chosen bg color 
            //or rainbow if rainbow is true
            if (item.style.backgroundColor === 'white' && rainbowColor === false) {
                item.setAttribute('style', `background: ${bgColor}`);
                //Set the base-color attribute to the current color
                item.setAttribute('data-base-color',bgColor);
                console.log(item.getAttribute('data-base-color'));
            } else if (item.style.backgroundColor === 'white' && rainbowColor === true) {
                item.setAttribute('style', `background: ${getRandomColor()}`);
                item.setAttribute('data-base-color',item.style.backgroundColor);
                console.log(item.getAttribute('data-base-color'));
            }
            //If the background color is not white, take the current 
            //background color and minus the shade factor
            else {
                let currentColor = item.style.backgroundColor;
            
                event.target.setAttribute('style', `background: ${darkenBackground(currentColor,shadeFactor)}`);
            }
            
        })
    }
}

function toggleRainbow (event) {
    //Check if input is checked
    if (event.target.checked === false) {
        rainbowColor = false;
        currentColorLabel.innerText = bgColor;
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





function getShadeFactor(rgbValue) {
    
    let colorArray = separateColor(rgbValue);

    let rFactor = colorArray[0]/10;
    let gFactor = colorArray[1]/10;
    let bFactor = colorArray[2]/10;
    console.log([rFactor,gFactor,bFactor]);
    return [rFactor,gFactor,bFactor];
}

function separateColor(rgbValue) {
    let myRe = /\d+/g;
    return rgbValue.match(myRe);
}

function darkenBackground (currentColor,shadeFactor) {
    let currentColorArray = separateColor(currentColor);

    let newrValue = currentColorArray[0] - shadeFactor[0];
    let newgValue = currentColorArray[1] - shadeFactor[1];
    let newbValue = currentColorArray[2] - shadeFactor[2];

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

function cleanGrid() {
    for (const item of (document.querySelectorAll('.square'))) {
        item.style.backgroundColor = 'white';
    }
}



function clearGrid() {
    document.querySelectorAll('.square').forEach(el => el.remove());
    
        //item.setAttribute('style','background: white; border: 1px solid #5e6363');
    
}




