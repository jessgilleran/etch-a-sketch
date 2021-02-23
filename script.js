//on page open, generate a grid of 16x16 divs
//When mouse passes over div, they change colour
//Button clears grid and asks user for size

//Create grid on page open
const container = document.querySelector('.grid-container');
createGrid();

function createGridEvent (divList) {
    let bgColor = getRandomColor();
    console.log(bgColor);
    let shadeFactor = getShadeFactor(bgColor);

    let bgColorValues = separateColor(bgColor);
    for (const item of divList) {
        item.addEventListener("mouseenter", function( event ) {
            // highlight the mouseenter target
            //If the background color is white, change to the chosen bg color
            if (item.style.backgroundColor === 'white') {
                event.target.setAttribute('style', `background: ${bgColor}`);
            } 
            //If the background color is not white, take the current 
            //background color and minus the shade factor
            else {
                let currentColor = item.style.backgroundColor;
            
                event.target.setAttribute('style', `background: ${darkenBackground(currentColor,shadeFactor)}`);
                console.log(item.style.backgroundColor);
            }
            
        })
    }
}

function getShadeFactor(rgbValue) {
    
    let colorArray = separateColor(rgbValue);

    let rFactor = colorArray[0]/10;
    let gFactor = colorArray[1]/10;
    let bFactor = colorArray[2]/10;

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

const resetButton = document.querySelector('.reset-prompt');
resetButton.addEventListener('click',promptUser);

function clearGrid() {
    document.querySelectorAll('.square').forEach(el => el.remove());
    
        //item.setAttribute('style','background: white; border: 1px solid #5e6363');
    
}

function promptUser() {
    console.log('in prompt');
    let validInput = false;
    clearGrid();
    do {
        let side = parseInt(prompt('Enter grid size (enter a number from 1 to 100): '));
        if (side >= 1 && side <= 100) {
            
            validInput = true;
            createGrid(side);
        } 
    }while(!validInput);
}

function createGrid (size=16) {

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for (i=0;i<(size**2);i++) {
        const div1 = document.createElement('div');
        div1.classList.add('square');
        div1.style['border'] = '1px solid #5e6363'
        div1.style['background-color'] = 'white';
        
        container.appendChild(div1);
    }

    const gridDivs = document.querySelectorAll('.square');
    createGridEvent(gridDivs);
    //container.style.gridTemplateColumns = 'repeat(size,1fr)';
    
}

