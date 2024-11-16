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
        sunLeft = 46 + percentProgress * (30);
        sunTop = 10 + percentProgress * (10);
        sunScale = 2 + percentProgress * 6;
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

let placedShips = [];
let lastPlacedShip = null;
let currentShipIndex = 0;  // Index to track the current ship being placed
const ships = [5, 4, 3, 2, 2]; // Ship sizes
let shipsPlaced = 0; // Counter to track how many ships have been placed

document.addEventListener("DOMContentLoaded", () => {
    const radarBoard = document.getElementById("radar_board");
    const mainBoard = document.getElementById("board");
    const boardSize = 8;
    const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

    // Generate the boards
    generateBoard(radarBoard, "radar", true);
    generateBoard(mainBoard, "main", false);

    // New Game button event listener
    const newGameButton = document.querySelector(".button");
    newGameButton.addEventListener("click", () => {
        const isConfirmed = confirm("Are you sure you want to start a new game? This will clear the board.");
        if (isConfirmed) {
            clearBoard(radarBoard); // Clear the radar board
            placedShips = []; // Reset the ship positions
            shipsPlaced = 0; // Reset ship placement counter
            currentShipIndex = 0; // Reset to start with the first ship
        }
    });

    // Random Place button event listener
    const randomPlaceButton = document.querySelector(".random");
    randomPlaceButton.addEventListener("click", () => {
        if (shipsPlaced < 5) {
            // Only place the current ship if there are still ships to place
            placeNextShip(boardSize, radarBoard);
        } else {
            alert("All ships have been placed!"); // Alert when all ships are placed
        }
    });

    // Undo button event listener
    const undoButton = document.querySelector(".undo");
    undoButton.addEventListener("click", () => {
        if (shipsPlaced > 0) {
            undoLastShip(boardSize, radarBoard);
        } else {
            alert("No ships to undo!"); // Alert if no ships have been placed yet
        }
    });
});

// Function to generate the board
function generateBoard(boardElement, boardClassPrefix, isRadarBoard = false) {
    const boardSize = 8;
    const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let row = 1; row <= boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement("div");
            const coordinate = `${columns[col]}${row}`;

            square.id = `${boardClassPrefix}_${coordinate}`;
            square.className = `${boardClassPrefix}_${coordinate}`;
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
            square.style.padding = "10px 20px";
            square.style.background = "white";
            square.style.fontSize = "28px";
            square.style.borderTopRightRadius = "10px";

            if (isRadarBoard) {
                square.addEventListener('mouseover', function() {
                    // Only apply hover color if it's not a ship position
                    if (!placedShips.includes(coordinate)) {
                        square.style.backgroundColor = "#ffd034"; // Hover color
                    }
                });
                square.addEventListener('mouseout', function() {
                    // Restore the color based on ship presence
                    if (placedShips.includes(coordinate)) {
                        square.style.backgroundColor = "blue"; // Ship color
                    } else {
                        square.style.backgroundColor = "#ccc"; // Default color
                    }
                });
            }

            boardElement.appendChild(square);
        }
    }
}

// Function to clear the board
function clearBoard(boardElement) {
    Array.from(boardElement.children).forEach(square => {
        square.style.backgroundColor = "#ccc"; // Reset color to default
    });
}

// Function to highlight stored ship positions
function highlightShips(boardElement) {
    placedShips.forEach(coord => {
        const square = boardElement.querySelector(`#radar_${coord}`);
        if (square) square.style.backgroundColor = "blue"; // Highlight ships in blue
    });
}

// Function to place the next ship from the array (one ship at a time)
function placeNextShip(boardSize, boardElement) {
    const shipLength = ships[currentShipIndex]; // Get the current ship length
    const shipCoordinates = placeShip(boardSize, shipLength, boardElement); // Place the ship

    placedShips.push(...shipCoordinates); // Store the placed ship coordinates
    highlightShips(boardElement); // Ensure ships remain highlighted

    shipsPlaced++; // Increment the number of ships placed
    currentShipIndex++; // Move to the next ship in the array

    // If all ships are placed, notify the user
    if (shipsPlaced === 5) {
        alert("All ships have been placed!");
    }
}

// Function to place a ship (random placement logic for simplicity)
function placeShip(boardSize, shipLength, boardElement) {
    const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
    while (true) {
        const randomOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        const startRow = Math.floor(Math.random() * (randomOrientation === "horizontal" ? boardSize : boardSize - shipLength + 1)) + 1;
        const startCol = Math.floor(Math.random() * (randomOrientation === "horizontal" ? boardSize - shipLength + 1 : boardSize));

        const shipCoordinates = Array.from({ length: shipLength }, (_, i) =>
            `${columns[startCol + (randomOrientation === "horizontal" ? i : 0)]}${startRow + (randomOrientation === "vertical" ? i : 0)}`
        );

        if (isValidPlacement(shipCoordinates)) {
            shipCoordinates.forEach((coord) => {
                const square = document.getElementById(`radar_${coord}`);
                if (square) square.style.backgroundColor = "blue"; // Mark ship coordinates
            });
            return shipCoordinates; // Return the placed coordinates
        }
    }
}

// Helper function to validate ship placement
function isValidPlacement(shipCoordinates) {
    return shipCoordinates.every(
        (coord) => !placedShips.includes(coord) && document.getElementById(`radar_${coord}`)
    );
}

function undoLastShip() {
    if (shipsPlaced > 0) {
        // Remove the last placed ship coordinates from placedShips
        const shipCoordinates = placedShips.slice(-ships[shipsPlaced - 1]); // Get the last placed ship's coordinates
        placedShips = placedShips.slice(0, -ships[shipsPlaced - 1]); // Remove last ship from placedShips array

        // Update the board to remove the ship (reset its color)
        shipCoordinates.forEach(coord => {
            const square = document.getElementById(`radar_${coord}`);
            if (square) {
                square.style.backgroundColor = "#ccc"; // Reset to default color
            }
        });

        // Decrease the ships placed count
        shipsPlaced--;
    }
}