Battleship Game ReadMe
Description


I developed this Battleship game as a part of my journey in learning web development. The project was completed during my Full Stack Web Development course at General Assembly. The game is a classic rendition of Battleship, where players strategically place ships on a grid and take turns trying to sink each other's fleet. It was my first project after 2 weeks of starting Bootcamp in General Assembly.


Deployment link
https://behzad1983rad.github.io/Unit1_Project_BattleShip/



Timeframe & Working Team (Solo/Pair/Group)

Completed over a span of one week.
Working Solo: I developed this project independently.

Technologies Used: 

HTML
CSS
JavaScript





Brief
The project brief required the creation of a Battleship game with a focus on implementing core concepts of web development, including user interactions and game logic.


Planning

During the planning stage, I started by sketching out the basic structure of the game interface. I created wireframes to visualize the front end and UI, ensuring a clean and user-friendly design. Additionally, I utilised pseudocode to outline the logic behind the game's functionality. For project management, I used Trello to plan the sprint, allocate tasks, and set timelines.



Build/Code Process


1. Project Initialization and Grid Creation
The first step in the build process involved initialising the project and creating the game grid. I defined global variables for turns, winners, and arrays to track hits and misses for both the player and the computer. The grid was dynamically generated using HTML and CSS. I utilised the createGrid function to create a 10x10 grid for both the player and the computer.
// Global variables
let turn;
let winner;
let hitShipTrackerPlayer = [];
let hitShipTrackerComputer = [];
let missedHitsPlayer = [];
let playerCanClick = true;

// Initialize function
function init() {
    // ... (omitting other code)

    // Functions
    // Function to create grid cells
    function createGrid(g, c, a) {
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div');
            cell.dataset.index = i;

            cell.style.height = `${100 / height}%`;
            cell.style.width = `${100 / height}%`;

            g.appendChild(cell);
            c.push(cell);
        }
        // Additional code to add ships to the grid using the addShip function
    }

    // Page load
    createGrid(grid, cells, occupiedCells);
    createGrid(myGrid, cells2, occupiedCellsMyGrid);

    // ... (omitting other code)
}

// Event listener for page load
window.addEventListener('DOMContentLoaded', init);

2. Ship Placement and Game Logic
I implemented the ship placement logic in the addShip function. This function ensured that each ship was placed in a unique position on the grid without overlapping with other ships. The generateUniquePosition function played a crucial role in achieving this. Additionally, I incorporated game logic to handle player clicks on the grid, check for hits, and update the game state accordingly.
// Function to add ship class
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

// Function to check for overlapping
function checkOverlap(position, length, a) {
    for (let i = 0; i < length; i++) {
        if (a.includes(position + i)) {
            return true;
        }
    }
}

// Function to handle player's attack on myGrid
function attackMyGrid(event) {
    // ... (omitting other code)
}

3. Computer's Attack and Sound Effects
I implemented the computer's attack logic in the computerAttack function. This function randomly selected a target on the player's grid, checked for hits or misses, and updated the game state accordingly. Additionally, I added a function to play an explosion sound effect when a ship is hit.
// Function for computer's attack
function computerAttack() {
    let target = Math.floor(Math.random() * cellCount);
    while (occupiedCellsComGrid.includes(target)) {
        target = Math.floor(Math.random() * cellCount);
    }
    if (cells[target]) {
        // Additional code to handle computer's attack and update game state
    }
}

// Function to play explosion sound
function playExplosionSound() {
    // ... (omitting other code)
}

4. Button Controls and Endgame Handling
I included a function, buttonControls, to manage the visibility of the "Play Again" button based on the game's status. This function helped improve the user interface by displaying the button when there was a winner. Additionally, I added a timeout function to reload the page after 10 seconds when a player wins, providing a brief pause before restarting the game.
// Function for button controls
function buttonControls() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

// ... (omitting other code)

These key snippets showcase the core functionalities of the Battleship game, including grid creation, ship placement, attack handling, and game state management. Each step in the code process contributed to the overall functionality and user experience of the game.





Challenges
Implementing a responsive grid for the game board.
Managing and updating the game state efficiently.
Ensuring proper synchronisation between user interactions and game logic.

Wins

Wins from the project:
Successful implementation of the core Battleship game logic.
Clean and intuitive user interface design.
Effective handling of user inputs and game state updates.



Key Learnings/Takeaways

Improved proficiency in HTML, CSS, and JavaScript.
Enhanced understanding of event handling and DOM manipulation.
Gained experience in planning and managing project tasks using Trello.


Bugs

No bugs were encountered during the development of this project.




Future Improvements


Implementation of additional game features, such as different ship types.
Integration of a scoring system and multiplayer functionality.
Enhancements to the visual design and user experience.
