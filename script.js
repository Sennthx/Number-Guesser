// selecting submit button
const form = document.querySelector("form");
form.addEventListener("submit", startGame);
document.querySelector("#numberInput").value = "";

let randomNumber;
let numberOfRetries;

function startGame(e){
    e.preventDefault();
    const button = document.querySelector(".btn");
    if(button.id === "start"){
        start();
    }
    else if(button.id === "guess"){
        Game();
    } 
    else {
        start();
    }
}

function start(){
    // Getting elements from DOM
    const inputField = document.querySelector("#numberInput");
    const retriesCounter = document.querySelector("#retries");
    const button = document.querySelector(".btn");
    // Hiding messages if there are any
    inputField.addEventListener("focus", x => {
        document.querySelector("#messageField").style.display = "none";
        inputField.value = "";
    });
    // Initializing game
    randomNumber = Math.floor(Math.random()*10)+1;
    numberOfRetries = 5;
    button.textContent = "Submit";
    button.id = "guess";
    inputField.disabled = false;
    retriesCounter.textContent = numberOfRetries;
    retriesCounter.parentElement.style.display = "block";
    document.querySelector("#messageField").style.display = "none";
}

function Game(){
    const numberInput = document.querySelector("#numberInput");
    if(numberInput.value !== ""){
        if(!isNaN(parseInt(numberInput.value))){
            if(parseInt(numberInput.value) < 11 && parseInt(numberInput.value) > 0) {
                if(numberOfRetries > 1){
                    if(parseInt(numberInput.value) === randomNumber){
                        messageOutput("Congratulations you guessed the number!");
                        gameEnd();
                        numberOfRetries--;

                    }
                    else{
                        numberOfRetries--;
                        messageOutput(`The number isn't ${numberInput.value}`,0);
                    }
                }
                else {
                    messageOutput(`Your didn't guess the number! It was ${randomNumber}`,0);
                    numberOfRetries--;
                    gameEnd();
                }
                document.querySelector("#retries").textContent = numberOfRetries;
            }
            else messageOutput("The number given is not between 1 and 10!", 0)
        }
        else messageOutput("Please only use numbers!", 0)
    }
    else messageOutput("Please type in a number first!", 0); 
}

function gameEnd(){
    // Resetting game
    document.querySelector("#retries").textContent = numberOfRetries;
    const inputField = document.querySelector("#numberInput");
    const button = document.querySelector(".btn");
    const messageField = document.querySelector("#messageField");
    inputField.disabled = true;
    inputField.value = "";
    button.textContent = "Play Again";
    button.id = "end";
    messageField.style.padding = "10px 0 0 0";
}

function messageOutput(message, number){

    if(number === 0) messageField.style.color = "red";
    else messageField.style.color = "green";

    messageField.textContent = message;
    messageField.style.display = "block";
    messageField.style.padding = "5px 0 0 0";
}