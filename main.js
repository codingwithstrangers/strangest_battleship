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
        sunLeft = 46 + percentProgress * (134);
        sunTop = 10 + percentProgress * (30);
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
        moonTop = -25 + (50 / 6) * (elapsedSeconds / 3600);
        moonScale = 1 + (2 / 6) * (elapsedSeconds / 3600);
        moonRotate = elapsedSeconds * 45 / 3600 + 'deg';
    } else if (totalSeconds >= 0 && totalSeconds <= 6 * 3600) {
        const elapsedSeconds = totalSeconds;
        moonLeft = 80  * (elapsedSeconds / 3600);
        moonTop = 13 * (elapsedSeconds / 3600);
        moonScale = 3 - (1/ 3) * (elapsedSeconds / 3600);
        moonRotate = 335 + 'deg' ;
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
