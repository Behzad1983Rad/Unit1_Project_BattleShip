
let turn;
let winner;
let hitShipTrackerPlayer = [] 
let hitShipTrackerComputer = []
let missedHitsPlayer = []
let playerCanClick = true;



function init() {
    // ! Variables & Elements
    //? ELEMENTS
    // CREATE GRID
    const grid = document.querySelector('.grid');
    const myGrid = document.querySelector('.myGrid');
    const playAgainBtn = document.querySelector('button')
    const messageEl = document.querySelector('h1')

    

    // ? VARIABLE
    // BOARD CONFIG
    const width = 10;
    const height = 10;
    const cellCount = width * height;
    let cells = [];
    let cells2 = [];
    const occupiedCells = [];
    const occupiedCellsMyGrid = [];
    const occupiedCellsComGrid = []
    winner = false 
    turn = 1   

    //!FUNCTIONS
    // Create GRID Cells
    const shipPositions = {
        ship1: [],
        ship2: [],
        ship3: [],
        ship4: [],
        ship5: [],
    };

    function generateUniquePosition(length, usedPositions) {
        let position = Math.floor(Math.random() * cellCount);

        while (
            usedPositions.includes(position) ||
            usedPositions.includes(position + length) ||
            Math.floor(position / width) !== Math.floor((position + length) / width)
        ) {
            position = Math.floor(Math.random() * cellCount);
        }

        return position;
    }

    function createGrid(g, c, a) {
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div');
            cell.dataset.index = i;

            cell.style.height = `${100 / height}%`;
            cell.style.width = `${100 / height}%`;

            g.appendChild(cell);
            c.push(cell);
        }
        addShip('ship1', 4, c, a);
        addShip('ship2', 6, c, a);
        addShip('ship3', 3, c, a);
        addShip('ship4', 2, c, a);
        addShip('ship5', 2, c, a);
    }

    // ADD SHIP CLASS
    function addShip(shipType, length, c, a) {
        let position;
        do {
            position = generateUniquePosition(length, a);
        } while (checkOverlap(position, length, a));

        for (let i = 0; i < length; i++) {
            c[position + i].classList.add(shipType);
            a.push(position + i);
        }
    }

    // Function to check for overlaping
    function checkOverlap(position, length, a) {
        for (let i = 0; i < length; i++) {
            if (a.includes(position + i)) {
                return true;
            }
        }
        
        // console.log(position,length)
    }

    // Function to attack myGrid
    function attackMyGrid(event) {
        if (!playerCanClick || winner) {
            return;
        }
        
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.dataset.index);

        if (!hitShipTrackerPlayer.includes(cellIndex) && !missedHitsPlayer.includes(cellIndex) && !winner){
            if (clickedCell.parentElement.classList.contains('myGrid')) {
            

                if (occupiedCellsMyGrid.includes(cellIndex)) {
                    
                    console.log(clickedCell)                     
                    clickedCell.style.backgroundImage = "url(img/explosion.jpg)";
                    clickedCell.style.backgroundRepeat = 'no-repeat'
                    clickedCell.style.backgroundSize = 'cover'
                    hitShipTrackerPlayer.push(cellIndex) 
                    playExplosionSound()
                    clickedCell[cellIndex] = turn
    
                    turn*= -1
                        if (turn === 1) {
                            messageEl.innerText = 'Player Turn';
                        } 
                      
                    // console.log(hitShipTrackerPlayer)                
                        if (hitShipTrackerPlayer.length === 17)
                        {messageEl.innerText = 'Player Wins'
                        winner = true
                        setTimeout(() => { 
                            window.location.reload();                            
                        }, 10.0 * 1000);
                        }
                } else {
                    clickedCell.style.backgroundColor = 'blue';
                    missedHitsPlayer.push(cellIndex)
                }
            }

            clickedCell[cellIndex] = turn
    
            turn*= -1
            if (turn === 1 && winner === false) {
                messageEl.innerText = 'Player Turn';
            } else if (turn === -1 && winner === false ){
                messageEl.innerText = 'Computer Turn';
                playerCanClick = false;
    
                setTimeout(() => {
                    computerAttack();
                    playerCanClick = true;
                    messageEl.innerText = 'Player Turn';
                }, 2.5 * 1000);
            }
    
            // computerAttack()
            
            buttonControls ()
            
        }
        

    }

    // Function for computer's attack

    function computerAttack() {
        let target = Math.floor(Math.random() * cellCount) 
        while (occupiedCellsComGrid.includes(target)) {
            target = Math.floor(Math.random() * cellCount)
        }
        if (cells[target]) {
            const cellComIndex = parseInt(cells[target].dataset.index);
            if (occupiedCells.includes(cellComIndex)) {
                cells[target].style.backgroundImage = "url(img/explosion.jpg)";
                cells[target].style.backgroundRepeat = 'no-repeat'
                cells[target].style.backgroundSize = 'cover'
                playExplosionSound()
                hitShipTrackerComputer.push(target)  
                occupiedCellsComGrid.push(target)
                    if (hitShipTrackerComputer.length === 17)
                        {messageEl.innerText = 'Computer Wins'
                        winner = true
                        setTimeout(() => { 
                            window.location.reload();                            
                        }, 10.0 * 1000);
                        
                        }
                
                
            } else {
                cells[target].style.backgroundColor = 'blue';
                occupiedCellsComGrid.push(target)
            }
        }

        occupiedCellsComGrid[target] = turn
        turn*= -1 
        
    }

    // Function for addEventListener of attackMyGrid

    function addEventListenersToMyGrid(c, cellIndex) {
        
            c.forEach(cell => {
                cell.addEventListener('click', (event) => attackMyGrid(event));
            });
        
    
    }
    // Function to play explosion sound
    const explosionSound = new Audio('audio/explosion.mp3');

    function playExplosionSound() {
        const clonedAudio = explosionSound.cloneNode();
        clonedAudio.play();
    
        setTimeout(() => {
            clonedAudio.pause();
            clonedAudio.currentTime = 0;
        },1.0* 3000);
    }

    //Function for Button

    function buttonControls() {
        playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
        
    } 

    //! PAGE LOAD    
    createGrid(grid, cells, occupiedCells);
    createGrid(myGrid, cells2, occupiedCellsMyGrid);
    //!Events
    addEventListenersToMyGrid(cells2, occupiedCellsMyGrid);
}
window.addEventListener('DOMContentLoaded', init);

