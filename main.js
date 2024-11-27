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
let selectedSquares = []; // Array to store the selected squares

function pickASpot() {
    const radarBoard = document.getElementById("radar_board");

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

                // Check if the number of selected squares has reached 16
                if (selectedSquares.length === 16) {
                    console.log("All ships are placed.");
                    // Optionally, you can display a message on the UI here
                    alert("All ships are placed.");

                    // Remove the double-click event listener after 16 entries
                    radarBoard.removeEventListener("dblclick", arguments.callee);
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


// Clear board 
function clearBoard() {
    const radarBoard = document.getElementById("radar_board");
    const squares = radarBoard.getElementsByClassName("square");

    // Clear the selectedSquares array
    selectedSquares = [];

    // Loop through each square and reset its background color
    for (let square of squares) {
        square.style.backgroundColor = ''; // Set to the default color, e.g., white or transparent
    }

    console.log('Board has been cleared.');
}

// Example usage: Call clearBoard when you want to reset the radar board
// clearBoard();
