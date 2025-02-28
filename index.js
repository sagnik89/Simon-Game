let originalPattern = [];
let userPattern = [];
let start = false;
let level = 1;

const choice = ['red', 'green', 'blue', 'yellow'];

function addToSequence() {

    // choosing a random color
    const randomColor = choice[Math.floor(Math.random() * choice.length)];
    originalPattern.push(randomColor);
    console.log("OriginalPattern -> ", originalPattern);


    //showing it on webpage
    const reqElement = document.getElementById(`${randomColor}`);
    reqElement.classList.add('pressed');
    setTimeout(() => {
        reqElement.classList.remove('pressed');
        
    }, 100);

    //adding sound to the button
    // hoping this will run
    let beat = new Audio(`sounds/${randomColor}.mp3`);
    beat.play();

}

function startGame() {
    start = true;
    document.querySelector("#level-title").innerHTML = `Level ${level}`;
    addToSequence();
}

function checkOrder() {

    let n = originalPattern.length
    if (userPattern.length === n) {
        if (userPattern[n - 1] == originalPattern[n - 1])
            return true;
        else
            return false;
            
    }
    else {
        for (let i = 0; i < userPattern.length; i++){
            if (userPattern[i] !== originalPattern[i]) {
                return false;
            }
        }
        return true;
    }
}

document.addEventListener("keydown", (e) => {
    // console.log(e);
    (e.key === 'a' && start === false)? startGame() : null;
})


const buttonElements = document.querySelectorAll('.btn');

buttonElements.forEach((button) => {
    button.addEventListener('click', (e) => {
        let colorPressed = e.currentTarget.id;
        // console.log(colorPressed);
        
        
        userPattern.push(colorPressed);
        console.log("UserPattern -> ", userPattern);

        const currentElement = document.getElementById(`${colorPressed}`);
        currentElement.classList.add('pressed');
        setTimeout(() => {
            currentElement.classList.remove('pressed');
            
        }, 100);
        
        //adding sound to the button if right, else playing the wrong sound if wrong
        
        if (checkOrder()) {
            let beat = new Audio(`sounds/${colorPressed}.mp3`);
            beat.play();

            
            // need to have some kind of delay here.
            if (userPattern.length === originalPattern.length) {
                userPattern = [];
                setTimeout(() => {
                    level++;
                    document.querySelector("#level-title").innerHTML = `Level ${level}`;
                    addToSequence();
                }, 1000);                
            }

        }
        else {
            let beat = new Audio(`sounds/wrong.mp3`);
            beat.play();
            start = false;
            originalPattern = [];
            level = 1;
            userPattern = [];

            // show how to restart the game. 
            document.querySelector("#level-title").innerHTML = `Press A to restart the game`;
        }
        
    })
})


