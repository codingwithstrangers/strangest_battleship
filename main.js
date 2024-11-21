// Battle ship code 


// This is the code for the back ground movement 

const sun = document.getElementById("sun");

const moon = document.getElementById("moon");

// document.body.appendChild(sun);
// Function to update the position and scale of the sun
function updateSunPosition() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    // const hours = currentDate.getSeconds() % 24;
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    let sunLeft, sunTop, sunScale;

    if (hours >= 6 && hours < 12) {
        const percentProgress = ((hours - 6) * 3600 + minutes * 60 + seconds) / (6 * 3600);
        sunLeft = -1 + percentProgress * (46 - -1);
        sunTop = 40 - percentProgress * (40);
        sunScale = 5 - percentProgress * (4);
    } else if (hours >= 12 && hours < 18) {
        const percentProgress = ((hours - 12) * 3600 + minutes * 60 + seconds) / (6 * 3600);
        sunLeft = 56 + percentProgress * (30);
        sunTop = 20 + percentProgress * (10);
        sunScale = 5 + percentProgress * -2;
    } else {
        sunLeft = 106;
        sunTop = 83;
        sunScale = 1;
    }

    sun.style.left = sunLeft + "%";
    sun.style.top = sunTop + "%";
    sun.style.transform = `scale(${sunScale})`;
}

// Function to update the position and scale of the moon
function updateMoonPosition() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    // const hours = currentDate.getSeconds() % 24;
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    let moonLeft, moonTop, moonScale, moonRotate;

    if (totalSeconds >= 18 * 3600 && totalSeconds < 24 * 3600) {
        const elapsedSeconds = totalSeconds - 18 * 3600;
        moonLeft = 106 - (63 / 6) * (elapsedSeconds / 3600);
        moonTop =  -20 +(60 / 6) * (elapsedSeconds / 3600);
        moonScale =  2 + (2 / 6) * (elapsedSeconds / 3600);
        moonRotate = elapsedSeconds * 45 / 3600 + 'deg';
    } else if (totalSeconds >= 0 && totalSeconds <= 6 * 3600) {
        const elapsedSeconds = totalSeconds;
        moonLeft = 55 - (70/6)*(elapsedSeconds / 3600);
        moonTop = 30 - (100/15) *(elapsedSeconds / 3600);
        moonScale = 4 - (1/2) * (elapsedSeconds / 3600);
        moonRotate = elapsedSeconds * 250 / 3600 + 'deg';
    } else {
        moonLeft = -14;
        moonTop = -18;
        moonScale = 0;
        moonRotate = 349 + 'deg';
    }

    moon.style.left = moonLeft + '%';
    moon.style.top = moonTop + '%';
    moon.style.transform = `scale(${moonScale}) rotate(${moonRotate})`;
}

// Function to update background based on the time of day
function changeBackground() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    // const hours = currentDate.getSeconds() % 24

    // Calculate total time in seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    let gradient;

    // Transition background from 6:00 to 17:00
    if (totalSeconds >= 6 * 3600 && totalSeconds < 17 * 3600) {
        // Linear interpolation for gradient colors
        const percent = (totalSeconds - 6 * 3600) / (17 * 3600 - 6 * 3600);
        gradient = `linear-gradient(91deg, #48c6f8, #fbfddf, #05b8ff)`;
    }
    // Start transitioning background from 17:00 to 18:00
    else if (totalSeconds >= 17 * 3600 && totalSeconds < 18 * 3600) {
        // Linear interpolation for gradient colors
        const percent = (totalSeconds - 17 * 3600) / (18 * 3600 - 17 * 3600);
        gradient = `linear-gradient(91deg, #48c6f8, #fbfddf, #05b8ff, #18067b, #5762b6, #1f143b)`;
    }
    // From 18:00 onwards, use the second gradient
    else if (totalSeconds >= 18 * 3600 || totalSeconds < 6 * 3600) {
        gradient = `linear-gradient(91deg, #18067b, #5762b6, #1f143b)`;
    }

    // Update the CSS background image property
    document.body.style.backgroundImage = gradient;
}

// Call the functions initially
updateSunPosition();
updateMoonPosition();
changeBackground();

// Update positions every second
setInterval(() => {
    updateSunPosition();
    updateMoonPosition();
    changeBackground();
}, 1000);


// battle ship code
// battle ship code

// let placedShips = [];
// let lastPlacedShip = null;
// let currentShipIndex = 0;  // Index to track the current ship being placed
// const ships = [5, 4, 3, 2, 2]; // Ship sizes
// let shipsPlaced = 0; // Counter to track how many ships have been placed

// document.addEventListener("DOMContentLoaded", () => {
//     const radarBoard = document.getElementById("radar_board");
//     const mainBoard = document.getElementById("mainboard");
//     const npcBoard = document.getElementById("npc_board");
//     const boardSize = 8;
//     const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

//     // Generate the boards
//     generateBoard(radarBoard, "radar", true);
//     generateBoard(mainBoard, "main", false);
//     generateBoard(npcBoard, "npc", false)

//     // New Game button event listener
//     const newGameButton = document.querySelector(".button");
//     newGameButton.addEventListener("click", () => {
//         const isConfirmed = confirm("Are you sure you want to start a new game? This will clear the board.");
//         if (isConfirmed) {
//             clearBoard(radarBoard); // Clear the radar board
//             placedShips = []; // Reset the ship positions
//             shipsPlaced = 0; // Reset ship placement counter
//             currentShipIndex = 0; // Reset to start with the first ship
//         }
//     });

//     // Random Place button event listener
//     const randomPlaceButton = document.querySelector(".random");
//     randomPlaceButton.addEventListener("click", () => {
//         if (shipsPlaced < 5) {
//             // Only place the current ship if there are still ships to place
//             placeNextShip(boardSize, radarBoard);
//         } else {
//             alert("All ships have been placed!"); // Alert when all ships are placed
//         }
//     });

//     // Undo button event listener
//     const undoButton = document.querySelector(".undo");
//     undoButton.addEventListener("click", () => {
//         if (shipsPlaced > 0) {
//             undoLastShip(boardSize, radarBoard);
//         } else {
//             alert("No ships to undo!"); // Alert if no ships have been placed yet
//         }
//     });
// });

// // Function to generate the board
// function generateBoard(boardElement, boardClassPrefix, isRadarBoard = false) {
//     const boardSize = 8;
//     const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
//     for (let row = 1; row <= boardSize; row++) {
//         for (let col = 0; col < boardSize; col++) {
//             const square = document.createElement("div");
//             const coordinate = `${columns[col]}${row}`;

//             square.id = `${boardClassPrefix}_${coordinate}`;
//             square.className = `${boardClassPrefix}_${coordinate}`;
//             square.textContent = coordinate;

//             square.style.width = "60px";
//             square.style.height = "60px";
//             square.style.border = "5px solid #333";
//             square.style.display = "flex";
//             square.style.justifyContent = "center";
//             square.style.alignItems = "center"; 
//             square.style.backgroundColor = "#ccc";
//             square.style.cursor = "pointer";
//             square.style.position = "relative";
//             square.style.padding = "10px 20px";
//             square.style.background = "white";
//             square.style.fontSize = "28px";
//             square.style.borderTopRightRadius = "10px";

//             if (isRadarBoard) {
//                 square.addEventListener('mouseover', function() {
//                     // Only apply hover color if it's not a ship position
//                     if (!placedShips.includes(coordinate)) {
//                         square.style.backgroundColor = "#ffd034"; // Hover color
//                     }
//                 });
//                 square.addEventListener('mouseout', function() {
//                     // Restore the color based on ship presence
//                     if (placedShips.includes(coordinate)) {
//                         square.style.backgroundColor = "blue"; // Ship color
//                     } else {
//                         square.style.backgroundColor = "#ccc"; // Default color
//                     }
//                 });
//             }

//             boardElement.appendChild(square);
//         }
//     }
// }

// // Function to clear the board
// function clearBoard(boardElement) {
//     Array.from(boardElement.children).forEach(square => {
//         square.style.backgroundColor = "#ccc"; // Reset color to default
//     });
// }

// // Function to place the next ship from the array (one ship at a time)
// function placeNextShip(boardSize, boardElement) {
//     const shipLength = ships[currentShipIndex]; // Get the current ship length
//     const shipCoordinates = placeShip(boardSize, shipLength, boardElement); // Place the ship

//     placedShips.push(...shipCoordinates); // Store the placed ship coordinates
//     shipsPlaced++; // Increment the number of ships placed
//     currentShipIndex++; // Move to the next ship in the array

//     highlightShips(boardElement); // Ensure ships remain highlighted

//     // If all ships are placed, notify the user
//     if (shipsPlaced === 5) {
//         alert("All ships have been placed!");
//         checkAndStartGame(placedShips, shipsPlaced);
//         return true
        
//     }
// }

// // Function to place a ship (random placement logic for simplicity)
// function placeShip(boardSize, shipLength, boardElement) {
//     const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
//     while (true) {
//         const randomOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
//         const startRow = Math.floor(Math.random() * (randomOrientation === "horizontal" ? boardSize : boardSize - shipLength + 1)) + 1;
//         const startCol = Math.floor(Math.random() * (randomOrientation === "horizontal" ? boardSize - shipLength + 1 : boardSize));

//         const shipCoordinates = Array.from({ length: shipLength }, (_, i) =>
//             `${columns[startCol + (randomOrientation === "horizontal" ? i : 0)]}${startRow + (randomOrientation === "vertical" ? i : 0)}`
//         );

//         if (isValidPlacement(shipCoordinates)) {
//             shipCoordinates.forEach((coord) => {
//                 const square = document.getElementById(`radar_${coord}`);
//                 if (square) square.style.backgroundColor = "blue"; // Mark ship coordinates
//             });
//             return shipCoordinates; // Return the placed coordinates
//         }
//     }
// }

// // Helper function to validate ship placement
// function isValidPlacement(shipCoordinates) {
//     return shipCoordinates.every(
//         (coord) => !placedShips.includes(coord) && document.getElementById(`radar_${coord}`)
//     );
// }

// // Function to highlight stored ship positions
// function highlightShips(boardElement) {
//     placedShips.forEach(coord => {
//         const square = boardElement.querySelector(`#radar_${coord}`);
//         if (square) square.style.backgroundColor = "blue"; // Highlight ships in blue
//     });
// }

// // Function to undo the last placed ship
// function undoLastShip(boardSize, boardElement) {
//     if (shipsPlaced > 0) {
//         // Remove the last placed ship coordinates from placedShips
//         const shipCoordinates = placedShips.slice(-ships[shipsPlaced - 1]); // Get the last placed ship's coordinates
//         placedShips = placedShips.slice(0, -ships[shipsPlaced - 1]); // Remove last ship from placedShips array

//         // Update the board to remove the ship (reset its color)
//         shipCoordinates.forEach(coord => {
//             const square = document.getElementById(`radar_${coord}`);
//             if (square) {
//                 square.style.backgroundColor = "#ccc"; // Reset to default color
//             }
//         });

//         // Decrease the ships placed count
//         shipsPlaced--;
//         currentShipIndex--; // Go back to the last placed ship
//     }
// }

// // skynet Class
// class Skynet {
//     constructor(boardSize = 8) {
//         this.boardSize = boardSize; // Board dimensions (8x8)
//         this.board = this.initializeBoard(); // Skynet's hidden board
//         this.ships = [5, 4, 3, 2, 2]; // Ship sizes to place
//         this.placedShips = []; // Tracks all placed ship coordinates
//         this.shipsPlaced = 0; // Counter for placed ships
//     }

//     // Initialize the board as a 2D array
//     initializeBoard() {
//         return Array.from({ length: this.boardSize }, () =>
//             Array(this.boardSize).fill(0) // 0 indicates empty space
//         );
//     }

//     // Function to place all ships on the board
//     placeShips() {
//         for (let shipSize of this.ships) {
//             let placed = false;
//             while (!placed) {
//                 const randomOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
//                 const startRow = Math.floor(Math.random() * this.boardSize);
//                 const startCol = Math.floor(Math.random() * this.boardSize);

//                 // Generate ship coordinates
//                 const shipCoordinates = this.generateShipCoordinates(startRow, startCol, shipSize, randomOrientation);

//                 // Validate placement
//                 if (this.validatePlacement(shipCoordinates)) {
//                     this.markShipOnBoard(shipCoordinates);
//                     this.placedShips.push(shipCoordinates);
//                     this.shipsPlaced++;
//                     placed = true;
//                     checkAndStartGame(placedShips, shipsPlaced);
//                 }
//             }
//         }
//     }

//     // Generate coordinates for a ship
//     generateShipCoordinates(startRow, startCol, shipSize, orientation) {
//         const coordinates = [];
//         for (let i = 0; i < shipSize; i++) {
//             const row = orientation === "horizontal" ? startRow : startRow + i;
//             const col = orientation === "horizontal" ? startCol + i : startCol;

//             // Push coordinates as [row, col] pairs
//             coordinates.push([row, col]);
//         }
//         return coordinates;
//     }

//     // Validate ship placement
//     validatePlacement(coordinates) {
//         return coordinates.every(([row, col]) => 
//             row >= 0 && row < this.boardSize && // Within row bounds
//             col >= 0 && col < this.boardSize && // Within column bounds
//             this.board[row][col] === 0 // Not overlapping another ship
//         );
//     }

//     // Mark ship on the board
//     markShipOnBoard(coordinates) {
//         coordinates.forEach(([row, col]) => {
//             this.board[row][col] = 1; // 1 indicates part of a ship
//         });
//     }

//     // Debugging tool: Print board to console (optional for testing)
//     printBoard() {
//         console.log(this.board.map(row => row.join(" ")).join("\n"));
//     }
// }

// // Example usage
// const skynet = new Skynet();
// skynet.placeShips();
// skynet.printBoard(); // Outputs Skynet's hidden board (for debugging)


// // game flow



// // Check if both players are ready and prompt first move
//     function checkAndStartGame(placedShips, shipsPlaced) {
//         if (placedShips && shipsPlaced) {
//             // Randomly select the first move
//             const firstPlayer = Math.random() < 0.5 ? "Player 1" : "Skynet";
//             alert(`${firstPlayer} will make the first move.`);
//             return true
//         }
//     }




// Refactor 


// making the board
// document.addEventListener("DOMContentLoaded", () => {
//     const radarBoard = document.getElementById("radar_board");
//     const mainBoard = document.getElementById("main_board");
//     const npcBoard = document.getElementById("npc_board");

//     // Create instances of the Board class for each of the 3 boards
//     const radar = new Board(radarBoard, "radar");
//     const main = new Board(mainBoard, "main");
//     const npc = new Board(npcBoard, "npc");
// });

// class Board {
//     constructor(boardElement, boardClassPrefix) {
//         this.boardElement = boardElement;
//         this.boardClassPrefix = boardClassPrefix;
//         this.boardSize = 8;
//         this.columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
//         this.generateBoard();
//     }

//     // Method to generate the board and append it to the DOM
//     generateBoard() {
//         for (let row = 1; row <= this.boardSize; row++) {
//             for (let col = 0; col < this.boardSize; col++) {
//                 const square = document.createElement("div");
//                 const coordinate = `${this.columns[col]}${row}`;

//                 square.id = `${this.boardClassPrefix}_${coordinate}`;
//                 square.className = `${this.boardClassPrefix}_${coordinate}`;
//                 square.textContent = coordinate;

//                 square.style.width = "60px";
//                 square.style.height = "60px";
//                 square.style.border = "5px solid #333";
//                 square.style.display = "flex";
//                 square.style.justifyContent = "center";
//                 square.style.alignItems = "center"; 
//                 square.style.backgroundColor = "#ccc";
//                 square.style.cursor = "pointer";
//                 square.style.position = "relative";
//                 square.style.padding = "10px 20px";
//                 square.style.background = "white";
//                 square.style.fontSize = "28px";
//                 square.style.borderTopRightRadius = "10px";

//                 this.boardElement.appendChild(square);
//             }
//         }
//     }
// }

// player 1 handling 

// class Player {
//     constructor(radarBoard, mainBoard, npcBoard) {
//         this.radarBoard = radarBoard;
//         this.mainBoard = mainBoard;
//         this.ships = [5, 4, 3, 2, 2]; // Ship sizes
//         this.shipCount = 0;
//         this.placedShips = []; // Tracks coordinates of all placed ships
//         this.shipPlacementHistory = []; // Tracks placement details for undo
//         this.shipPlacementInProgress = false;
//         this.playerAttempts = {};    // Tracks player attempts and their results
//         this.skynetShipLocations = npcBoard; // Locations of Skynet's ships
//     }

  

//     // Randomly place a ship
//     placeShip() {
//         if (this.shipCount >= this.ships.length) {
//             alert("All ships are placed");
//             return;
//         }

//         this.shipPlacementInProgress = true;
//         const shipSize = this.ships[this.shipCount];
//         let placed = false;

//         // Attempt to randomly place the ship
//         while (!placed) {
//             const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
//             const startX = Math.floor(Math.random() * 8); // Row (0-7)
//             const startY = Math.floor(Math.random() * 8); // Column (0-7)

//             if (this.isValidPlacement(startX, startY, shipSize, direction)) {
//                 placed = this.placeShipOnBoard(startX, startY, shipSize, direction);
//                 this.shipPlacementHistory.push({ startX, startY, shipSize, direction });
//                 this.shipCount++;
//             }
//         }

//         this.shipPlacementInProgress = false;
//     }

    
//     // Attempt to place the ship at a specific coordinate and direction
//     tryPlaceShip(startCoordinate, shipSize) {
//         const direction = prompt("Enter direction (horizontal or vertical):").toLowerCase();
//         if (!["horizontal", "vertical"].includes(direction)) {
//             alert("Invalid direction. Use 'horizontal' or 'vertical'.");
//             return false;
//         }

//         const startX = parseInt(startCoordinate.slice(1)) - 1; // Row number
//         const startY = startCoordinate.charCodeAt(0) - 65; // Column number

//         if (!this.isValidPlacement(startX, startY, shipSize, direction)) {
//             return false;
//         }

//         this.placeShipOnBoard(startX, startY, shipSize, direction);
//         return { startX, startY, direction };
//     }

//     // Check if a ship can be placed at a location without overlapping
//     isValidPlacement(startX, startY, shipSize, direction) {
//         if (direction === 'horizontal') {
//             if (startY + shipSize > 8) return false;
//             for (let i = 0; i < shipSize; i++) {
//                 const coord = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
//                 if (this.placedShips.includes(coord)) {
//                     return false;
//                 }
//             }
//         } else {
//             if (startX + shipSize > 8) return false;
//             for (let i = 0; i < shipSize; i++) {
//                 const coord = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
//                 if (this.placedShips.includes(coord)) {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     }

//     // Place a ship on the board
//     placeShipOnBoard(startX, startY, shipSize, direction) {
//         if (direction === 'horizontal') {
//             for (let i = 0; i < shipSize; i++) {
//                 const coord = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
//                 this.placedShips.push(coord);
//                 this.highlightShipOnBoard(coord);
//             }
//         } else {
//             for (let i = 0; i < shipSize; i++) {
//                 const coord = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
//                 this.placedShips.push(coord);
//                 this.highlightShipOnBoard(coord);
//             }
//         }
//         return true;
//     }

//     // Highlight the ship on both radar and main boards
//     highlightShipOnBoard(coordinate) {
//         const radarSquare = document.getElementById(`radar_${coordinate}`);
//         const mainSquare = document.getElementById(`main_${coordinate}`);

//         if (radarSquare && mainSquare) {
//             radarSquare.style.backgroundColor = 'blue';
//             mainSquare.style.backgroundColor = 'blue';
//         }
//     }

//     // Undo the last ship placement
//     undoLastShip() {
//         if (this.shipPlacementHistory.length > 0) {
//             const lastShip = this.shipPlacementHistory.pop();
//             this.removeShipFromBoard(lastShip);
//             this.shipCount--;
//         } else {
//             alert("No ships to undo!");
//         }
//     }

//     // Remove a ship from the board
//     removeShipFromBoard(ship) {
//         const { startX, startY, shipSize, direction } = ship;

//         if (direction === 'horizontal') {
//             for (let i = 0; i < shipSize; i++) {
//                 const coord = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
//                 this.placedShips = this.placedShips.filter(c => c !== coord);
//                 this.resetBoardSquare(coord);
//             }
//         } else {
//             for (let i = 0; i < shipSize; i++) {
//                 const coord = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
//                 this.placedShips = this.placedShips.filter(c => c !== coord);
//                 this.resetBoardSquare(coord);
//             }
//         }
//     }

//     // Reset the visual appearance of a board square
//     resetBoardSquare(coordinate) {
//         const radarSquare = document.getElementById(`radar_${coordinate}`);
//         const mainSquare = document.getElementById(`main_${coordinate}`);

//         if (radarSquare && mainSquare) {
//             radarSquare.style.backgroundColor = '#ccc'; // Default color
//             mainSquare.style.backgroundColor = '#ccc'; // Default color
//         }
//     }  
  
        
//     // Method to handle player selection (clicking on radar board)
//     handlePlayerSelection(coordinate) {
//         // Implement logic to handle what happens when the player selects a square
//         console.log(`Player selected coordinate: ${coordinate}`);
        
//         // Example: You can update the radar board visually to show a hit or miss.
//         const selectedSquare = document.getElementById(`radar_${coordinate}`);
//         if (selectedSquare) {
//             selectedSquare.style.backgroundColor = "pink"; // This is just an example to mark the square as selected
//         }
//     }

// }


// // Main Game Setup
// document.addEventListener("DOMContentLoaded", () => {
//     const radarBoard = document.getElementById("radar_board");
//     const mainBoard = document.getElementById("main_board");
//     const randomPlaceButton = document.querySelector(".random");
//     const undoButton = document.querySelector(".undo");
  
//     const player1 = new Player(radarBoard, mainBoard);
  
//     // Button click handler to place ships one at a time
//     randomPlaceButton.addEventListener('click', () => {
//         player1.placeShip();
//     });
  
//     // Button click handler to undo last ship placement
//     undoButton.addEventListener('click', () => {
//         player1.undoLastShip();
//     });
  
//     // Click handler to register player selections
//     radarBoard.addEventListener('dblclick', (event) => {
//         // Check if the clicked element is a square (with 'radar_' prefix in id)
//         if (event.target && event.target.id && event.target.id.startsWith('radar_')) {
//             const coordinate = event.target.id.replace("radar_", ""); // Get the coordinate from the clicked square's ID
//             player1.handlePlayerSelection(coordinate); // Handle the selection
//         }
//     });
// });


// // npcboard
// class NpcBoard {
//     constructor(boardElement) {
//         this.boardElement = boardElement;
//         this.boardSize = 8;
//         this.columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
//         this.boardState = {};  // Track the state (hit/miss) of each square
//         this.generateBoard();
//     }

//     // Method to generate the board and append it to the DOM
//     generateBoard() {
//         for (let row = 1; row <= this.boardSize; row++) {
//             for (let col = 0; col < this.boardSize; col++) {
//                 const square = document.createElement("div");
//                 const coordinate = `${this.columns[col]}${row}`;

//                 square.id = `npc_${coordinate}`;
//                 square.className = `npc_${coordinate}`;
//                 square.textContent = coordinate;

//                 square.style.width = "60px";
//                 square.style.height = "60px";
//                 square.style.border = "5px solid #333";
//                 square.style.display = "flex";
//                 square.style.justifyContent = "center";
//                 square.style.alignItems = "center";
//                 square.style.backgroundColor = "#ccc";
//                 square.style.cursor = "pointer";
//                 square.style.position = "relative";
//                 square.style.padding = "10px 20px";
//                 square.style.background = "white";
//                 square.style.fontSize = "28px";
//                 square.style.borderTopRightRadius = "10px";

//                 // Add the square to the board
//                 this.boardElement.appendChild(square);

//                 // Initialize the board state for each square
//                 this.boardState[coordinate] = 'empty';  // 'empty', 'hit', 'miss'
//             }
//         }
//     }

//     // Method to update the square color based on hit or miss
//     updateSquare(coordinate, result) {
//         const square = document.getElementById(`npc_${coordinate}`);
//         if (square) {
//             if (result === 'hit') {
//                 square.style.backgroundColor = 'green'; // Hit on NPC ship
//             } else if (result === 'miss') {
//                 square.style.backgroundColor = 'red'; // Missed shot
//             }
//             // Update the board state
//             this.boardState[coordinate] = result;
//         }
//     }

//     // Method to check if a square is already hit or missed
//     isSquareHit(coordinate) {
//         return this.boardState[coordinate] === 'hit';
//     }

//     // Method to reset the board (useful for starting a new game)
//     resetBoard() {
//         // Reset all squares to their initial state
//         for (const coordinate in this.boardState) {
//             this.boardState[coordinate] = 'empty';
//             const square = document.getElementById(`npc_${coordinate}`);
//             if (square) {
//                 square.style.backgroundColor = '#ccc'; // Reset to default color
//             }
//         }
//     }
// }

// // Example of how to initialize and use the NpcBoard
// document.addEventListener("DOMContentLoaded", () => {
//     const npcBoardElement = document.getElementById("npc_board");
//     const npcBoard = new NpcBoard(npcBoardElement);
// });


// // skynet code

// class Skynet {
//     constructor(boardElement) {
//         this.boardElement = boardElement;
//         this.ships = [5, 4, 3, 2, 2];  // Ship sizes
//         this.shipCount = 0;  // Number of placed ships
//         this.placedShips = []; // Array to track placed ships
//         this.boardState = {}; // Object to track state of the board
//         // this.generateBoard(); // Generate the board
//     }

//     // Method to generate the board (like the NPC board, but we won't show ships here)
//     generateBoard() {
//         for (let row = 1; row <= 8; row++) {
//             for (let col = 0; col < 8; col++) {
//                 const square = document.createElement("div");
//                 const coordinate = `${String.fromCharCode(65 + col)}${row}`;

//                 square.id = `npc_${coordinate}`;
//                 square.className = `npc_${coordinate}`;
//                 square.style.width = "60px";
//                 square.style.height = "60px";
//                 square.style.border = "5px solid #333";
//                 square.style.display = "flex";
//                 square.style.justifyContent = "center";
//                 square.style.alignItems = "center";
//                 square.style.backgroundColor = "#ccc"; // Default color for empty squares
//                 square.style.position = "relative";
//                 square.style.padding = "10px 20px";
//                 square.style.fontSize = "28px";
//                 square.style.borderTopRightRadius = "10px";

//                 // Add the square to the board
//                 this.boardElement.appendChild(square);

//                 // Initialize the board state for each square
//                 this.boardState[coordinate] = 'empty';  // 'empty', 'hit', 'miss'
//             }
//         }
//     }

//     // Function to place all ships randomly on the board
//     placeShips() {
//         while (this.shipCount < 5) {
//             const shipSize = this.ships[this.shipCount];
//             let placed = false;

//             // Try placing the ship until it's successfully placed
//             while (!placed) {
//                 const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
//                 const startX = Math.floor(Math.random() * 8); // Random starting x
//                 const startY = Math.floor(Math.random() * 8); // Random starting y

//                 // Check if placement is valid
//                 if (this.isValidPlacement(startX, startY, shipSize, direction)) {
//                     placed = this.placeShip(startX, startY, shipSize, direction);
//                     this.shipCount++;
//                 }
//             }
//         }
//     }

//     // Check if the ship can be placed without overlapping
//     isValidPlacement(startX, startY, shipSize, direction) {
//         if (direction === 'horizontal') {
//             if (startY + shipSize > 8) return false; // Ship extends past the right edge
//             for (let i = 0; i < shipSize; i++) {
//                 const coordinate = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
//                 if (this.boardState[coordinate] === 'occupied') {
//                     return false; // Overlap with an existing ship
//                 }
//             }
//         } else {
//             if (startX + shipSize > 8) return false; // Ship extends past the bottom edge
//             for (let i = 0; i < shipSize; i++) {
//                 const coordinate = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
//                 if (this.boardState[coordinate] === 'occupied') {
//                     return false; // Overlap with an existing ship
//                 }
//             }
//         }
//         return true;
//     }

//     // Function to place the ship on the board
//     placeShip(startX, startY, shipSize, direction) {
//         if (direction === 'horizontal') {
//             for (let i = 0; i < shipSize; i++) {
//                 const coordinate = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
//                 this.boardState[coordinate] = 'occupied'; // Mark the square as occupied
//                 this.placedShips.push(coordinate); // Track the placed ship
//                 this.highlightShip(coordinate); // Optional: Visual highlight
//             }
//         } else {
//             for (let i = 0; i < shipSize; i++) {
//                 const coordinate = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
//                 this.boardState[coordinate] = 'occupied'; // Mark the square as occupied
//                 this.placedShips.push(coordinate); // Track the placed ship
//                 this.highlightShip(coordinate); // Optional: Visual highlight
//             }
//         }
//         return true;
//     }

//     // Highlight the placed ship on the board (visual purposes only)
//     highlightShip(coordinate) {
//         const square = document.getElementById(`npc_${coordinate}`);
//         if (square) {
//             square.style.backgroundColor = 'skyblue'; // Mark ship locations (blue for now)
//         }
//     }
// }

// // Example of how to use the Skynet class
// document.addEventListener("DOMContentLoaded", () => {
//     const npcBoardElement = document.getElementById("npc_board");
//     const skynet = new Skynet(npcBoardElement);
//     skynet.placeShips(); // Place all ships randomly on the board
// });


// // game flow

// refactor 2

// making the board


class Board {
    constructor(boardElement, boardClassPrefix) {
        this.boardElement = boardElement;
        this.boardClassPrefix = boardClassPrefix;
        this.boardSize = 8;
        this.columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this.boardState = {};  // Store board state (ship positions, hits/misses)
        this.generateBoard();
    }

    generateBoard() {
        for (let row = 1; row <= this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const square = document.createElement("div");
                const coordinate = `${this.columns[col]}${row}`;
                square.id = `${this.boardClassPrefix}_${coordinate}`;
                square.className = `${this.boardClassPrefix}_${coordinate}`;
                square.textContent = coordinate;
                square.style.width = "60px";
                square.style.height = "60px";
                square.style.border = "5px solid #333";
                square.style.display = "flex";
                square.style.justifyContent = "center";
                square.style.alignItems = "center"; 
                square.style.backgroundColor = "#ccc";
                square.style.cursor = "pointer";
                square.style.position = "relative";
                square.style.fontSize = "28px";
                this.boardElement.appendChild(square);
            }
        }
    }
}

class NpcBoard extends Board {
    constructor(boardElement) {
        super(boardElement, "npc");
        this.ships = [5, 4, 3, 2, 2]; // Ship sizes: 5-spot, 4-spot, 3-spot, 2-spot, 2-spot
        this.placedShips = []; // Track placed ship coordinates
        this.shipCount = 0; // Count of ships placed
        this.boardState = {}; // Store board state (occupied or empty)
        this.attachResetListener(); // Attach the reset listener
        this.placeShipsRandomly(); // Initial random placement
    }

    // Attach event listener to the reset button
    attachResetListener() {
        const resetButton = document.querySelector(".button"); // Button to trigger the reset
        resetButton.addEventListener('click', () => {
            this.resetBoard(); // Reset the NPC board when the button is clicked
        });
    }
    
    resetBoard() {
        // Clear the tracking arrays and counters
        this.placedShips = [];
        this.shipCount = 0;
        this.boardState = {};
    
        // Reset the visual representation of the board
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const coordinate = `${this.columns[j]}${i + 1}`;
                const npcsquare = document.getElementById(`npc_${coordinate}`);
    
                if (npcsquare) {
                    npcsquare.style.backgroundColor = '#ccc'; // Reset square color to default
                }
            }
        }
    
        // Place new ships randomly
        this.placeShipsRandomly();
    
        console.log("NPC Board has been reset with new ships.");
    }
    
    
    // Function to place all ships randomly on the board
    placeShipsRandomly() {
        while (this.shipCount < 5) {
            const shipSize = this.ships[this.shipCount];
            let placed = false;

            // Try placing the ship until it's successfully placed
            while (!placed) {
                const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                const startX = Math.floor(Math.random() * 8); // Random starting x
                const startY = Math.floor(Math.random() * 8); // Random starting y

                // Check if placement is valid
                if (this.isValidPlacement(startX, startY, shipSize, direction)) {
                    placed = this.placeShip(startX, startY, shipSize, direction);
                    this.shipCount++;
                }
            }
        }

        // Log the ship locations after placing them
        console.log("NPC Board Ship Locations:", this.placedShips);
    }



    // Check if the ship can be placed without overlapping
    isValidPlacement(startX, startY, shipSize, direction) {
        if (direction === 'horizontal') {
            if (startY + shipSize > 8) return false; // Ship extends past the right edge
            for (let i = 0; i < shipSize; i++) {
                const coordinate = `${this.columns[startY + i]}${startX + 1}`;
                if (this.boardState[coordinate] === 'occupied') {
                    return false; // Overlap with an existing ship
                }
            }
        } else {
            if (startX + shipSize > 8) return false; // Ship extends past the bottom edge
            for (let i = 0; i < shipSize; i++) {
                const coordinate = `${this.columns[startY]}${startX + 1 + i}`;
                if (this.boardState[coordinate] === 'occupied') {
                    return false; // Overlap with an existing ship
                }
            }
        }
        return true;
    }

    // Function to place the ship on the board
    placeShip(startX, startY, shipSize, direction) {
        if (direction === 'horizontal') {
            for (let i = 0; i < shipSize; i++) {
                const coordinate = `${this.columns[startY + i]}${startX + 1}`;
                this.boardState[coordinate] = 'occupied'; // Mark the square as occupied
                this.placedShips.push(coordinate); // Track the placed ship
                this.highlightShip(coordinate); // Optional: Visual highlight
            }
        } else {
            for (let i = 0; i < shipSize; i++) {
                const coordinate = `${this.columns[startY]}${startX + 1 + i}`;
                this.boardState[coordinate] = 'occupied'; // Mark the square as occupied
                this.placedShips.push(coordinate); // Track the placed ship
                this.highlightShip(coordinate); // Optional: Visual highlight
            }
        }
        return true;
    }

    // Highlight the placed ship on the board (visual purposes only)
    highlightShip(coordinate) {
        const square = document.getElementById(`npc_${coordinate}`);
        if (square) {
            square.style.backgroundColor = 'skyblue'; // Mark ship locations (blue for now)
        }
    }
}

class RadarBoard extends Board {
    constructor(boardElement, gameFlow) {
        super(boardElement, "radar");
        // super(boardElement, "main");
        this.ships = [5, 4, 3, 2, 2]; // Ship sizes
        this.shipCount = 0;
        this.gameFlow = gameFlow;
        this.placedShips = []; // Tracks coordinates of all placed ships
        this.shipPlacementHistory = []; // Tracks placement details for undo
        this.shipPlacementInProgress = false;
        this.playerAttempts = {};    // Tracks player attempts and their results
        this.attachResetListener(); // Attach the reset listener
        this.boardElement = boardElement;
        
    }

    // Attach event listener to the reset button
    attachResetListener() {
        const resetButton = document.querySelector(".button"); // Button to trigger the reset
        resetButton.addEventListener('click', () => {
            this.resetBoard(); // Reset this radar board when the button is clicked
        });
    }
    // lets the game flow know the board is set 
    // placeAndLogShip() {
    //     // ...
    //     if (this.shipCount >= this.ships.length) {
    //         // ...
    //         this.startGameCallback();
    //     }
    // }

    // Function to reset the radar board
    resetBoard() {
        this.placedShips = [];
        this.shipCount = 0;
        this.boardState = {};
    
        // Reset the board visually (clear ship locations, etc.)
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const coordinate = `${this.columns[j]}${i + 1}`;
                const radarSquare = document.getElementById(`radar_${coordinate}`);
                const mainSquare = document.getElementById(`main_${coordinate}`);
    
                if (radarSquare) {
                    radarSquare.style.backgroundColor = '#ccc'; // Reset radar board square color
                }
                if (mainSquare) {
                    mainSquare.style.backgroundColor = '#ccc'; // Reset main board square color
                }
            }
        }
    
        console.log("Radar Board and Main Board Reset.");
    }
    

    // Log placed ships to the console with coordinates in one line
    logShipLocations() {
        console.log("Current Radar Ship Locations:");
        this.placedShips.forEach((coord, index) => {
            const shipIndex = this.shipCount - 1; // Get the index of the last ship placed
            const shipSize = this.ships[shipIndex]; // Get the size of the ship
            const shipName = `Ship ${shipSize}`; // Name the ship based on its size

            // Group coordinates for the same ship in a single string
            let shipCoords = this.placedShips.filter(c => c.startsWith(coord[0]) && c.length === coord.length)
                .join(', '); // Join coordinates with commas

            console.log(`${shipName} is placed at coordinates: ${shipCoords}`);
        });
    }

    placeAndLogShip() {
        if (this.shipCount >= this.ships.length) {
            alert("All ships are placed");
            const undoButton = document.querySelector(".undo");
            if (undoButton) undoButton.disabled = true;
    
            console.log("Calling gameFlow.manageTurns()"); // Debug log
            if (this.gameFlow) {
                this.gameFlow.manageTurns();
                console.log("gameFlow.manageTurns() was successfully called");
            } else {
                console.error("this.gameFlow is undefined");
            }
            return;
        }
    
     

        this.shipPlacementInProgress = true;
        const shipSize = this.ships[this.shipCount];
        let placed = false;

        // Attempt to randomly place the ship
        while (!placed) {
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const startX = Math.floor(Math.random() * 8); // Row (0-7)
            const startY = Math.floor(Math.random() * 8); // Column (0-7)

            if (this.isValidPlacement(startX, startY, shipSize, direction)) {
                placed = this.placeShipOnBoard(startX, startY, shipSize, direction);
                this.shipPlacementHistory.push({ startX, startY, shipSize, direction });
                this.shipCount++;
            }
        }

        this.shipPlacementInProgress = false;
        this.logShipLocations(); // Log ship locations after placement
    }

    // Check if a ship can be placed at a location without overlapping
    isValidPlacement(startX, startY, shipSize, direction) {
        if (direction === 'horizontal') {
            if (startY + shipSize > 8) return false;
            for (let i = 0; i < shipSize; i++) {
                const coord = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
                if (this.placedShips.includes(coord)) {
                    return false;
                }
            }
        } else {
            if (startX + shipSize > 8) return false;
            for (let i = 0; i < shipSize; i++) {
                const coord = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
                if (this.placedShips.includes(coord)) {
                    return false;
                }
            }
        }
        return true;
    }

    // Place a ship on the board
    placeShipOnBoard(startX, startY, shipSize, direction) {
        const shipCoordinates = [];
        if (direction === 'horizontal') {
            for (let i = 0; i < shipSize; i++) {
                const coord = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
                this.placedShips.push(coord);
                shipCoordinates.push(coord);
                this.highlightShipOnBoard(coord);
            }
        } else {
            for (let i = 0; i < shipSize; i++) {
                const coord = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
                this.placedShips.push(coord);
                shipCoordinates.push(coord);
                this.highlightShipOnBoard(coord);
            }
        }
        console.log(`Ship ${shipSize} placed at coordinates: ${shipCoordinates.join(', ')}`);
        return true;
    }

    // Highlight the ship on both radar and main boards
    highlightShipOnBoard(coordinate) {
        const radarSquare = document.getElementById(`radar_${coordinate}`);
        const mainSquare = document.getElementById(`main_${coordinate}`);

        if (radarSquare && mainSquare) {
            radarSquare.style.backgroundColor = 'blue';
            mainSquare.style.backgroundColor = 'blue';
        }
    }

    // Undo the last ship placement
    undoLastShip() {
        if (this.shipPlacementHistory.length > 0) {
            const lastShip = this.shipPlacementHistory.pop();
            this.removeShipFromBoard(lastShip);
            this.shipCount--;
        } else {
            alert("No ships to undo!");
        }
    }

    // Remove a ship from the board
    removeShipFromBoard(ship) {
        const { startX, startY, shipSize, direction } = ship;

        if (direction === 'horizontal') {
            for (let i = 0; i < shipSize; i++) {
                const coord = `${String.fromCharCode(65 + startY + i)}${startX + 1}`;
                this.placedShips = this.placedShips.filter(c => c !== coord);
                this.resetBoardSquare(coord);
            }
        } else {
            for (let i = 0; i < shipSize; i++) {
                const coord = `${String.fromCharCode(65 + startY)}${startX + 1 + i}`;
                this.placedShips = this.placedShips.filter(c => c !== coord);
                this.resetBoardSquare(coord);
            }
        }
    }

    // Reset the visual appearance of a board square
    resetBoardSquare(coordinate) {
        const radarSquare = document.getElementById(`radar_${coordinate}`);
        const mainSquare = document.getElementById(`main_${coordinate}`);

        if (radarSquare && mainSquare) {
            radarSquare.style.backgroundColor = '#ccc'; // Default color
            mainSquare.style.backgroundColor = '#ccc'; // Default color
        }
    }  

    

    // Method to retrieve NPC ship locations
    retrieveNpcShipLocations(npcBoard) {
        console.log("Radar knows NPC ship locations:", npcBoard.placedShips);
    }
   

}


// player1
class Player1 {
    constructor(radarBoard, npcBoard, gameFlow) {
        this.radarBoard = radarBoard;
        this.npcBoard = npcBoard;
        this.hasClicked = false; // Track whether a click has occurred
        this.addEventListener
        
    }

    takeTurn() {
        return new Promise((resolve) => {
            
        })
    
}}


// skynet
class Skynet {
    constructor(radarBoard, npcBoard) {
        this.radarBoard = radarBoard;
        this.npcBoard = npcBoard;
    }

    takeTurn() {
        // Implement Skynet's turn logic, e.g., randomly pick an unmarked square
        const squareId = this.pickSquare();
        const hit = this.checkHit(squareId);
        return { hit, squareId };
    }

    pickSquare() {
        // Logic to pick a square (e.g., randomly select from untried squares)
        return "B2"; // Example
    }

    checkHit(squareId) {
        // Check if the square hits a player's ship
        return Math.random() > 0.5; // Example logic
    }
}


// game Logic
class GameFlow {
    constructor(radarBoard, npcBoard) {
        this.radarBoard = radarBoard;
        radarBoard.gameFlow = this;
        this.npcBoard = npcBoard;
        this.player1 = new Player1(radarBoard, npcBoard);
        this.skynet = new Skynet(radarBoard, npcBoard);
        this.currentPlayer = 'player1';
        this.hits = { player1: 0, skynet: 0 };
        this.maxHits = 16; // First to 16 hits wins
    }
// FSM-based turn manager
async manageTurns() {
    // Check if a win condition is met
    if (this.hits.player1 >= this.maxHits) {
        console.log("Heero wins!");
        return;
    }
    if (this.hits.skynet >= this.maxHits) {
        console.log("Skynet wins!");
        return;
    }

    // Execute the turn for the current player
    if (this.currentPlayer === 'player1') {
        const turnData = await this.player1.takeTurn(); 
        const { hit, squareId } = turnData;
        this.storeTurnInfo('player1', hit, squareId);
        this.currentPlayer = 'skynet'; // Switch turns
    } else if (this.currentPlayer === 'skynet') {
        const turnData = await this.player1.takeTurn(); 
        const { hit, squareId } = this.skynet.takeTurn();
        this.storeTurnInfo('skynet', hit, squareId);
        this.currentPlayer = 'player1'; // Switch turns
    }

    // Recursively continue turns until the game ends
    this.manageTurns();
}

// Store turn info and update hit counts
storeTurnInfo(player, hit, squareId) {
    console.log(`${player} attacked square ${squareId} and it was a ${hit ? 'hit' : 'miss'}.`);
    if (hit) {
        this.hits[player]++;
    }
}
}

document.addEventListener("DOMContentLoaded", () => {
    // Get the board elements
    const radarBoardElement = document.getElementById("radar_board");
    const npcBoardElement = document.getElementById("npc_board");
    const mainBoardElement = document.getElementById("main_board");
    const mainBoard = document.getElementById("main_board");

    // Instantiate the GameFlow class
    const gameFlow = new GameFlow(radarBoardElement, npcBoardElement);
    gameFlow.manageTurns();

    // Create an instance of NpcBoard and place ships randomly
    const npcBoard = new NpcBoard(npcBoardElement);
    npcBoard.placeShipsRandomly();

    // Create an instance of RadarBoard
    const radarBoard = new RadarBoard(radarBoardElement, gameFlow);
    const main = new Board(mainBoard, "main");

    // Radar can now access and log NPC ship locations
    radarBoard.retrieveNpcShipLocations(npcBoard);

    // Button click handler to place ships randomly
    const randomPlaceButton = document.querySelector(".random");
    randomPlaceButton.addEventListener('click', () => {
        radarBoard.placeAndLogShip(); // Call placeAndLogShip method from RadarBoard instance
    });

    // Button click handler to undo last ship placement
    const undoButton = document.querySelector(".undo");
    undoButton.addEventListener('click', () => {
        radarBoard.undoLastShip(); // Call undoLastShip method from RadarBoard instance
    });
    
});
