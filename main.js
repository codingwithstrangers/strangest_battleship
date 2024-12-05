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
    const percentProgress =
      ((hours - 6) * 3600 + minutes * 60 + seconds) / (6 * 3600);
    sunLeft = -1 + percentProgress * (46 - -1);
    sunTop = 40 - percentProgress * 40;
    sunScale = 5 - percentProgress * 4;
  } else if (hours >= 12 && hours < 18) {
    const percentProgress =
      ((hours - 12) * 3600 + minutes * 60 + seconds) / (6 * 3600);
    sunLeft = 56 + percentProgress * 30;
    sunTop = 20 + percentProgress * 10;
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
    moonTop = -20 + (60 / 6) * (elapsedSeconds / 3600);
    moonScale = 2 + (2 / 6) * (elapsedSeconds / 3600);
    moonRotate = (elapsedSeconds * 45) / 3600 + "deg";
  } else if (totalSeconds >= 0 && totalSeconds <= 6 * 3600) {
    const elapsedSeconds = totalSeconds;
    moonLeft = 55 - (70 / 6) * (elapsedSeconds / 3600);
    moonTop = 30 - (100 / 15) * (elapsedSeconds / 3600);
    moonScale = 4 - (1 / 2) * (elapsedSeconds / 3600);
    moonRotate = (elapsedSeconds * 250) / 3600 + "deg";
  } else {
    moonLeft = -14;
    moonTop = -18;
    moonScale = 0;
    moonRotate = 349 + "deg";
  }

  moon.style.left = moonLeft + "%";
  moon.style.top = moonTop + "%";
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
const radarBoard = document.getElementById("radar_board");
let currentShipLength = 5; // Start with the first ship length
const shipLengths = [5, 4, 3, 2, 2]; // Define ship lengths
let placedShips = []; // Store valid ships
let selectedSquares = []; // Array to store selected spots

// Function to handle square selection
function pickASpot() {
  radarBoard.addEventListener("dblclick", (event) => {
    if (selectedSquares.length >= 16) {
      console.log("All ships are placed. Double-clicking is now disabled.");
      return; // Exit if 16 entries are submitted
    }

    const clickedElement = event.target;
    if (clickedElement && clickedElement.id === "radar_square") {
      console.log(
        `Double-click detected on ${clickedElement.textContent.trim()}.`
      );

      const squareId = clickedElement.textContent.trim();
      if (!selectedSquares.includes(squareId)) {
        // Add square and change background color
        selectedSquares.push(squareId);
        clickedElement.style.backgroundColor = "royalblue";
        console.log("Selected squares:", selectedSquares);

        if (selectedSquares.length === currentShipLength) {
          if (validateShipPlacement()) {
            // Store ship and prepare for the next
            const coordinates = convertToCoordinates(selectedSquares);
            placedShips.push(coordinates);
            console.log("Placed ships:", placedShips);
            updateMainBoard();

            if (placedShips.length < shipLengths.length) {
              currentShipLength = shipLengths[placedShips.length];
              alert(`Now place a ship of length ${currentShipLength}.`);
            } else {
              alert("All ships are placed. Ready to start the game!");
            }
            selectedSquares = []; // Reset for the next ship
          } else {
            resetLastSelection();
          }
        }
      } else {
        console.log(`Square ${squareId} is already selected.`);
      }
    }
  });

  radarBoard.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement && clickedElement.id === "radar_square") {
      console.log(
        `Single-click detected on ${clickedElement.textContent.trim()}.`
      );

      const squareId = clickedElement.textContent.trim();
      const index = selectedSquares.indexOf(squareId);

      if (index !== -1) {
        // Deselect the square
        selectedSquares.splice(index, 1);
        clickedElement.style.backgroundColor = ""; // Reset color
        console.log("Selected squares after removal:", selectedSquares);
      }
    }
  });
}

// Validate ship placement
function validateShipPlacement() {
  const coordinates = convertToCoordinates(selectedSquares);

  // Check alignment
  const isHorizontal = coordinates.every(([row]) => row === coordinates[0][0]);
  const isVertical = coordinates.every(([, col]) => col === coordinates[0][1]);

  if (!isHorizontal && !isVertical) {
    alert(
      "Ship must be in a straight line (horizontal or vertical). Try again."
    );
    return false;
  }

  // Check consecutive positions
  const positions = isHorizontal
    ? coordinates.map(([, col]) => col).sort((a, b) => a - b)
    : coordinates.map(([row]) => row).sort((a, b) => a - b);

  for (let i = 1; i < positions.length; i++) {
    if (positions[i] - positions[i - 1] !== 1) {
      alert("Ship squares must be consecutive. Try again.");
      return false;
    }
  }

  return true; // Passed validation
}

// Convert selected squares to coordinates
function convertToCoordinates(squares) {
  return squares.map((square) => {
    const row = square[0].toUpperCase().charCodeAt(0) - 65; // Convert 'A'-'H' to 0-7
    const col = parseInt(square.slice(1)) - 1; // Convert '1'-'8' to 0-7
    return [row, col];
  });
}

// Reset the last selected square if placement is invalid
function resetLastSelection() {
  const lastSquare = selectedSquares.pop();
  console.log(`Invalid placement. Removing the last square: ${lastSquare}`);
  const lastSquareElement = [...radarBoard.children].find(
    (square) => square.textContent.trim() === lastSquare
  );
  if (lastSquareElement) {
    lastSquareElement.style.backgroundColor = ""; // Reset to default
  }
}

// Update the main board
function updateMainBoard() {
  placedShips.forEach((ship) => {
    ship.forEach(([row, col]) => {
      const squareId = String.fromCharCode(65 + row) + (col + 1);
      const mainSquare = document.querySelector(`.main_${squareId}`);
      if (mainSquare) {
        mainSquare.style.backgroundColor = "lime"; // Highlight ship position
      }
    });
  });
}

// Get the current state of selected squares
function getSelectedSquares() {
  if (placedShips.length === shipLengths.length) {
    return placedShips
      .flat()
      .map(([row, col]) => String.fromCharCode(65 + row) + (col + 1));
  } else {
    alert(
      "Please finish placing all ships before retrieving the selected squares."
    );
    return [];
  }
}

// Example usage: Call pickASpot to start
pickASpot();

// NPC Board and ship
// Variables for the NPC board and ships
const npcShipCount = 5; // Total number of ships
const npcShips = [5, 4, 3, 2, 2]; // Ship sizes
let npcPlacedShips = []; // Array to store placed ships
let npcBoardState = {}; // Tracks the state of the board
const npcColumns = "ABCDEFGH".split(""); // Columns for an 8x8 board

// Function to randomly place all ships
function placeShipsRandomly() {
  let currentShipCount = 0;

  while (currentShipCount < npcShips.length) {
    const shipSize = npcShips[currentShipCount];
    let placed = false;

    // Try placing the ship until it's successfully placed
    while (!placed) {
      const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
      const startX = Math.floor(Math.random() * 8); // Random starting row (0-7)
      const startY = Math.floor(Math.random() * 8); // Random starting column (0-7)

      // Check if placement is valid
      if (isValidPlacement(startX, startY, shipSize, direction)) {
        placed = placeShip(startX, startY, shipSize, direction);
        currentShipCount++;
      }
    }
  }

  // Log the ship locations after placing them
  console.log("NPC Board Ship Locations:", npcPlacedShips);
}

// Check if the ship can be placed without overlapping
function isValidPlacement(startX, startY, shipSize, direction) {
  if (direction === "horizontal") {
    if (startY + shipSize > 8) return false; // Ship extends past the right edge
    for (let i = 0; i < shipSize; i++) {
      const coordinate = `${npcColumns[startY + i]}${startX + 1}`;
      if (npcBoardState[coordinate] === "occupied") {
        return false; // Overlap with an existing ship
      }
    }
  } else {
    if (startX + shipSize > 8) return false; // Ship extends past the bottom edge
    for (let i = 0; i < shipSize; i++) {
      const coordinate = `${npcColumns[startY]}${startX + 1 + i}`;
      if (npcBoardState[coordinate] === "occupied") {
        return false; // Overlap with an existing ship
      }
    }
  }
  return true;
}

// Function to place the ship on the board
function placeShip(startX, startY, shipSize, direction) {
  const shipCoordinates = [];

  if (direction === "horizontal") {
    for (let i = 0; i < shipSize; i++) {
      const coordinate = `${npcColumns[startY + i]}${startX + 1}`;
      npcBoardState[coordinate] = "occupied"; // Mark the square as occupied
      shipCoordinates.push(coordinate);
      highlightShip(coordinate); // Visual highlight
    }
  } else {
    for (let i = 0; i < shipSize; i++) {
      const coordinate = `${npcColumns[startY]}${startX + 1 + i}`;
      npcBoardState[coordinate] = "occupied"; // Mark the square as occupied
      shipCoordinates.push(coordinate);
      highlightShip(coordinate); // Visual highlight
    }
  }

  npcPlacedShips.push(shipCoordinates); // Track the placed ship
  return true;
}

// Highlight the placed ship on the board (visual purposes only)
function highlightShip(coordinate) {
  const square = document.getElementById(`npc_square_${coordinate}`);
  if (square) {
    square.style.backgroundColor = "orange"; // Mark ship locations
  }
}

// Call this function to place ships on the NPC board
placeShipsRandomly();

// MAIN Board

// clear board
function newGame() {
    // Clear the selectedSquares and placedShips arrays
    selectedSquares = [];
    placedShips = [];
    console.log('Selected squares and placed ships cleared:', {
        selectedSquares,
        placedShips
    });

    // Reset the background color of all radar squares
    const radarSquares = document.querySelectorAll('#radar_square');
    const mainSquares = document.querySelectorAll('#main_square');
    
    radarSquares.forEach((square) => {
        square.style.backgroundColor = ''; // Reset to default or original color
    });

    mainSquares.forEach((square) => {
        square.style.backgroundColor = ''; // Reset to default or original color
    });

    // Reset the NPC board
    resetNPCBoard();

    // Place NPC ships again
    placeShipsRandomly();

    // Reset the current ship length and other game variables
    currentShipLength = shipLengths[0]; // Start from the first ship length
    console.log('Game variables reset. Ready to start a new game.');

    alert('The game has been reset. You can start placing ships again.');
}

// Function to clear the NPC board and reset its state
function resetNPCBoard() {
    // Clear all visual highlights on the NPC board
    const npcSquares = document.querySelectorAll('[id^="npc_square_"]'); // Matches all NPC squares
    npcSquares.forEach(square => {
        square.style.backgroundColor = ''; // Reset to default or original color
    });

    // Reset board state and placed ships
    npcBoardState = {}; // Clear board state
    npcPlacedShips = []; // Clear placed ships array

    console.log('NPC board and ships have been reset.');
}

// Add an event listener to the "new_game" button
const newGameButton = document.getElementById('new_game');
if (newGameButton) {
    newGameButton.addEventListener('click', newGame);
} else {
    console.error('New Game button not found! Make sure it exists in the HTML with the id "new_game".');
}
