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


// Array to store all selected spots
let selectedSquares = [];
function pickASpot() {
    const radarBoard = document.getElementById("radar_board");
    let currentShipLength = 5; // Start with the length of the first ship
    const shipLengths = [5, 4, 3, 2, 2]; // Define ship lengths
    let placedShips = []; // Store valid ships

    radarBoard.addEventListener("dblclick", (event) => {
        if (selectedSquares.length >= 16) {
            console.log("All ships are placed. Double-clicking is now disabled.");
            return; // Exit the function if 16 entries have been submitted
        }

        const clickedElement = event.target;
        if (clickedElement && clickedElement.id === "radar_square") {
            console.log(`Double-click detected on ${clickedElement.textContent.trim()}.`);

            // Change the background color to royal blue
            clickedElement.style.backgroundColor = 'royalblue';

            // Add the clicked element's text content to the selectedSquares array
            if (!selectedSquares.includes(clickedElement.textContent.trim())) {
                selectedSquares.push(clickedElement.textContent.trim());
                console.log('Selected squares:', selectedSquares);

                // Validate the current selection when the required length is reached
                if (selectedSquares.length === currentShipLength) {
                    if (validateShipPlacement()) {
                        // If valid, store the ship and prepare for the next one
                        placedShips.push([...selectedSquares]);
                        console.log("Placed ships:", placedShips);

                        if (placedShips.length < shipLengths.length) {
                            currentShipLength = shipLengths[placedShips.length];
                            alert(`Now place a ship of length ${currentShipLength}.`);
                        } else {
                            alert("All ships are placed. Ready to start the game!");
                        }

                        // Clear the current selection
                        selectedSquares = [];
                    } else {
                         // If invalid, remove the last square and reset its visual state
                         const lastSquare = selectedSquares.pop();
                         console.log(`Invalid placement. Removing the last square: ${lastSquare}`);
 
                         // Find the square element and reset its color
                         const lastSquareElement = [...radarBoard.children].find(
                             square => square.textContent.trim() === lastSquare
                         );
                         if (lastSquareElement) {
                             lastSquareElement.style.backgroundColor = ''; // Reset to default
                         }
                    }
                }
            } else {
                console.log(`Square ${clickedElement.textContent.trim()} is already selected.`);
            }
        }
    });


    radarBoard.addEventListener("click", (event) => {
        const clickedElement = event.target;
        if (clickedElement && clickedElement.id === "radar_square") {
            console.log(`Single-click detected on ${clickedElement.textContent.trim()}.`);

            // Check if the clicked square is in the selectedSquares array
            const index = selectedSquares.indexOf(clickedElement.textContent.trim());
            if (index !== -1) {
                // Remove the clicked square from the array
                selectedSquares.splice(index, 1);
                console.log('Selected squares after removal:', selectedSquares);

                // Revert the color of the clicked element to the previous state (e.g., white or default)
                clickedElement.style.backgroundColor = ''; // You can set this to any previous color you wish
            }
        }
    });
}

// Function to validate ship placement

let placedShips = []; // Stores all valid ships placed
let currentShipLength = 5; // Start with the first ship length
const shipLengths = [5, 4, 3, 2, 2]; // Define the required ship lengths

function validateShipPlacement() {
    // Convert selected squares into row/column coordinates
    const coordinates = selectedSquares.map(square => {
        const row = square[0].toUpperCase().charCodeAt(0) - 65; // Convert 'A'-'H' to 0-7
        const col = parseInt(square.slice(1)) - 1; // Convert '1'-'8' to 0-7
        return [row, col];
    });

    // Check for straight line alignment
    const isHorizontal = coordinates.every(([row]) => row === coordinates[0][0]);
    const isVertical = coordinates.every(([, col]) => col === coordinates[0][1]);

    if (!isHorizontal && !isVertical) {
        alert("Ship must be in a straight line (horizontal or vertical). Try again.");
        return false;
    }

    // Check for consecutive positions
    const positions = isHorizontal
        ? coordinates.map(([, col]) => col).sort((a, b) => a - b)
        : coordinates.map(([row]) => row).sort((a, b) => a - b);

    for (let i = 1; i < positions.length; i++) {
        if (positions[i] - positions[i - 1] !== 1) {
            alert("Ship squares must be consecutive. Try again.");
            return false;
        }
    }

    // Validation passed
    return true;
}

function handleSquareSelection(square) {
    if (selectedSquares.length >= currentShipLength) {
        alert(`You can only select ${currentShipLength} squares for this ship.`);
        return;
    }

    if (!selectedSquares.includes(square)) {
        selectedSquares.push(square);
        console.log("Selected squares:", selectedSquares);

        if (selectedSquares.length === currentShipLength) {
            if (validateShipPlacement()) {
                // Add the valid ship to placedShips
                placedShips.push([...selectedSquares]);
                console.log("Placed ships:", placedShips);

                // Prepare for the next ship
                if (placedShips.length < shipLengths.length) {
                    currentShipLength = shipLengths[placedShips.length];
                    alert(`Now place a ship of length ${currentShipLength}.`);
                } else {
                    alert("All ships are placed. Ready to start the game!");
                }

                // Clear the current selection
                selectedSquares = [];
            } else {
                selectedSquares = []; // Reset selection if invalid
            }
        }
    } else {
        alert("Square already selected. Choose a different square.");
    }
}

// Example usage
const radarBoard = document.getElementById("radar_board");
radarBoard.addEventListener("click", event => {
    const clickedElement = event.target;

    if (clickedElement && clickedElement.classList.contains("radar_square")) {
        handleSquareSelection(clickedElement.textContent.trim());
    }
});


// Function to return the current selected squares if 16 spots are selected
function getSelectedSquares() {
    if (selectedSquares.length === 16) {
        return selectedSquares;
    } else {
        alert('Please finish placing all ships before retrieving the selected squares.');
    }
}

// Example usage: Call pickASpot to start the event listeners
pickASpot();

// To get the current state of selected squares
console.log(getSelectedSquares());



// clear board
function newGame() {
    // Clear the selectedSquares array
    selectedSquares = [];
    console.log('Selected squares cleared:', selectedSquares);

    // Reset the background color of all radar squares
    const radarSquares = document.querySelectorAll('#radar_square');
    radarSquares.forEach((square) => {
        square.style.backgroundColor = ''; // Reset to default or original color
    });

    console.log('Board reset to the beginning.');
}

// Add an event listener to the "new_game" button
const newGameButton = document.getElementById('new_game');
newGameButton.addEventListener('click', newGame);