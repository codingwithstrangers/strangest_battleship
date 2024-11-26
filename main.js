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
        this.boardElement = boardElement;
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
        this.radarBoardElement = this.radarBoardElement
        this.npcBoard = npcBoard;
        this.hasClicked = false; // Track whether a click has occurred
        this.radarBoard = radarBoard; // Ensure this is the RadarBoard instance
        this.gameFlow = gameFlow;
        
        
    }

    takeTurn() {
        return new Promise((resolve) => {
            const handleSquareClick = (event) => {
                const square = event.target.id;
    
                // Ensure the clicked element is a valid square
                if (!event.target.classList.contains("square")) {
                    console.log("Clicked element is not a square. Ignoring.");
                    return;
                }
    
                console.log(`Square double-clicked: ${square}`);
    
                // Resolve the Promise with the square's id
                resolve(square);
    
                // Remove the event listener after a successful click
                this.radarBoard.boardElement.removeEventListener("dblclick", handleSquareClick);
            };
    
            // Retry adding the event listener until the boardElement exists
            const tryAddingEventListener = () => {
                if (this.radarBoard && this.radarBoard.boardElement) {
                    this.radarBoard.boardElement.addEventListener("dblclick", handleSquareClick);
                } else {
                    console.log("Radar board element not found, retrying...");
                    setTimeout(tryAddingEventListener, 10000); // Retry after 100ms
                }
            };
    
            tryAddingEventListener();
        });
    
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
    const gameFlow = new GameFlow(radarBoardElement,  npcBoardElement);
    gameFlow.manageTurns();

    // Create an instance of NpcBoard and place ships randomly
    const npcBoard = new NpcBoard(npcBoardElement);
    npcBoard.placeShipsRandomly();

    // Create an instance of RadarBoard
    const radarBoard = new RadarBoard(radarBoardElement, gameFlow);
    const main = new Board(mainBoard, "main");

    // Radar can now access and log NPC ship locations
    radarBoard.retrieveNpcShipLocations(npcBoard);

    const player1 = new Player1(radarBoardElement, npcBoardElement, gameFlow);
    player1.takeTurn().then((squareId) => {
        console.log("Turn completed on square:", squareId);})

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
