// code for sun set
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

// Function to update the position and scale of the sun
function updateSunPosition() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
//   const hours = currentDate.getSeconds() % 24;
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Calculate position and scale based on the current time
  let sunLeft, sunTop, sunScale;

  if (hours >= 6 && hours < 12) {
    // Morning: 6am to 12pm
    const percentProgress =
      ((hours - 6) * 3600 + minutes * 60 + seconds) / (6 * 3600); // Total seconds from 6am to 12pm
    sunLeft = -1 + percentProgress * (46 - -1); // Interpolate between -1% and 46%
    sunTop = 80 - percentProgress * (80 - 10); // Interpolate between 80% and 10%
    sunScale = 2 + percentProgress; // Scale increases from 2 to 3
  } else if (hours >= 12 && hours < 18) {
    // Afternoon: 12pm to 6pm
    const percentProgress =
      ((hours - 12) * 3600 + minutes * 60 + seconds) / (6 * 3600); // Total seconds from 12pm to 6pm
    sunLeft = 46 + percentProgress * (106 - 46); // Interpolate between 46% and 106%
    sunTop = 10 + percentProgress * (83 - 10); // Interpolate between 10% and 83%
    sunScale = 3 - percentProgress; // Scale decreases from 3 to 2
  } else {
    // Evening: 6pm to 6am
    sunLeft = 106;
    sunTop = 83;
    sunScale = 2;
  }

  // Update the CSS properties of the sun
  sun.style.left = sunLeft + "%";
  sun.style.top = sunTop + "%";
  sun.style.transform = `scale(${sunScale})`;
}

// Function to update the position and scale of the moon
function updateMoonPosition() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
// const hours =1;
//   const hours = currentDate.getSeconds() % 24;
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  // Calculate position and scale based on the current time
  let moonLeft, moonTop, moonScale, moonRotate;
// Calculate total time in seconds
const totalSeconds = hours * 3600 + minutes * 60 + seconds;

// Moon visible from 6pm to 6am
if (totalSeconds >= 18 * 3600 && totalSeconds < 24 * 3600) {
    // First 6 hours
    const elapsedSeconds = totalSeconds - 18 * 3600;
    moonLeft = 106 - (63 / 6) * (elapsedSeconds / 3600); // 106 - 43 = 63
    moonTop = -26 + (110 / 6) * (elapsedSeconds / 3600); // -26 + 110 = 84
    moonScale = 1 + (2 / 6) * (elapsedSeconds / 3600); // 3 - 1 = 2
    moonRotate = elapsedSeconds * 45 / 3600 + 'deg';
} else if (totalSeconds >= 0 && totalSeconds <= 6 * 3600) {
    // Next 6 hours
    const elapsedSeconds = totalSeconds;
    moonLeft = 43 - (57 / 6) * (elapsedSeconds / 3600); // 43 - 57 = -14
    moonTop = 84 - (102 / 6) * (elapsedSeconds / 3600); // 84 - 102 = -18
    moonScale = 3 - (2 / 6) * (elapsedSeconds / 3600); // 1
    moonRotate = 299 +'deg'//+ (66 * (elapsedSeconds / 3600)) + 'deg'; // Adding rotation
} else {
    // Last 12 hours
    // const elapsedSeconds = totalSeconds - 6 * 3600;
    moonLeft = -14 //+ (120 / 12) * (elapsedSeconds / 3600); // -14 + 120 = 106
    moonTop = -18 //- (8 / 12) * (elapsedSeconds / 3600); // -18 - 8 = -26
    moonScale = 1;
    moonRotate = 349+'deg'// + (84 * (elapsedSeconds / 3600) / 12) + 'deg'; // Adding rotation
}


// Update the CSS properties of the moon
moon.style.left = moonLeft + '%';
moon.style.top = moonTop + '%';
moon.style.transform = 'scale(' + moonScale + ') rotate(' + moonRotate + ')';
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

// Update positions, moon, and background every second
setInterval(() => {
  updateSunPosition();
  updateMoonPosition();
  changeBackground();
}, 1000);


// Easter_egg
// make a fuction for changing moon
 
function soul_easter_egg(){
    // variables
    const email = document.querySelector('.email').value.trim().toLowerCase();
    const password = document.querySelector('.password').value.trim();

    // check if the word was entered 
    if (email.includes('soul')&& password===''){
        //alert('test worked')
        // we want to change the moon image 
        moon.style.backgroundImage= "url('images/moon2.png')"
        moon.style.transform = 'scale(4)';
        moon.style.transform = 'rotate(0deg)';
    }
}
document.getElementById('green_button').addEventListener('click', soul_easter_egg);
document.addEventListener('keydown', function(event){
    if (event.key ==='Enter'){
        soul_easter_egg();
    }
});

 
function roll_easter_egg(){
    // variables
    const stranger = document.querySelector('.stranger');
    const email = document.querySelector('.email').value.trim().toLowerCase();
    const password = document.querySelector('.password').value.trim();

    // check if the word was entered 
    if (email.includes('do a barrel roll')&& password===''){
        //alert('test worked')
        // stranger will do a roatation 
        stranger.style.animation = 'roll 3s linear forwards';
        
    }
}
document.getElementById('green_button').addEventListener('click', roll_easter_egg);
document.addEventListener('keydown', function(event){
    if (event.key ==='Enter'){
        roll_easter_egg();
    }
});


// var realPassword = ''; // Variable to store the real user's password

// // Attach event listener to password input field
// document.querySelector('.password').addEventListener('input', function(event) {
//     // Store the real user input in the realPassword variable
//     realPassword = event.target.value;
//     // Replace the password value with random characters
//     var randomChars = generateRandomChars(realPassword.length);
//     event.target.value = randomChars;
// });

// // Function to generate random characters
// function generateRandomChars(length) {
//     var chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     var randomChars = '';
//     for (var i = 0; i < length; i++) {
//         var randomIndex = Math.floor(Math.random() * chars.length);
//         randomChars += chars[randomIndex];
//     }
//     return randomChars;
// }

// // Function to handle login button click
// document.getElementById('green_button').addEventListener('click', function() {
//     // Access the realPassword variable and do something with it (e.g., authentication)
//     console.log("Real Password: " + realPassword);
//     // Clear the realPassword variable after use (for security reasons)
//     realPassword = '';
// });


// version above works 
var realPassword = "";

// function for changing password
function maskPassword(){
    var passwordInput = document.getElementById('password');
    var maskedPassword = "";
    realPassword = passwordInput.value
    console.log('real Password: ',realPassword)
    // now to change the input into ***
    for(var i =0; i < realPassword.length; i++) {
        maskedPassword += "*";
    }
    passwordInput.value = maskedPassword;
}

// listeners
document.getElementById('password').addEventListener("keydown",function(event){
if (event.key=="Enter"){
    maskPassword();
}
});

document.getElementById("green_button").addEventListener("click", function() {
    maskPassword();
});