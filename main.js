const lengthSlider = document.querySelector(".pass-length input"),
generateBtn = document.querySelector(".generate-btn"),
options = document.querySelectorAll(".options input"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
copyIcon = document.querySelector(".input-box span");





// Function to update the value of the slider whenever an input is taken from the slider.
const updateSlider = () => {

    // Passing the slider value as the counter text.
    document.querySelector(".pass-length .details span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
    
};




// Updating the Indicator's color on chnaging the password length
const updatePassIndicator = () => {
    // Changing the id of the password ndicator depending on the number of characters in the password
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}






// Function to trigger when the generate password button is pressed
const generatePassword = () => {                 
    let staticPassword = "",
    passLength = lengthSlider.value,
    randomPassword = "",
    excludeDuplicate = false;


    options.forEach(option => {                 // Looping through each option's checkbox

        if(option.checked)                      // Getting Checked input on button click
        {

            if(option.id !== "exc-duplicate" && option.id !== "spaces")
            {
                // Adding particular key value to static password constant
                staticPassword += characters[option.id];
            }
            else if(option.id === "spaces"){    // Adding spaces if the checkbox is checked
                staticPassword += ` ${staticPassword} `;
            }
            else{   // Pass true value to exclude duplicate
                excludeDuplicate = true;
            }
        }

        
    });
    
    // Randomly arranging the characters according to the slider length
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        // Excluding duplicate characters
        if(excludeDuplicate)
        {   
            // If the randomPassword doesn't contain the current rand char then is equal to space then 
            // simply decrement the iteration so that current iteration could be repeated
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }
        else
        {
            randomPassword += randomChar;
        }
    }


    // Passing random password to random input value to be displayed on the screen.
    passwordInput.value = randomPassword;
}








// Object of letter numbers and special characters
const characters = {            
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|{}[]():;.,*+-#@<>~"
}





// Function to cop the password and to play with the icons
const copyPasword = () => {
    // Wrting the password text to system clipboard to copy
    navigator.clipboard.writeText(passwordInput.value);

    // Changing copy icon to tick
    copyIcon.innerHTML = "<i class='bx bx-check-double'></i>";

    // Changing tick icon back to copy icon after 1500ms
    setTimeout(() => {
        copyIcon.innerHTML = "<i class='bx bx-copy'></i>";
    }, 1500);
}






lengthSlider.addEventListener("input", updateSlider);               
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPasword);


