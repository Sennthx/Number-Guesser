// selecting submit button
const form = document.querySelector("form");
form.addEventListener("submit", startGame);
document.querySelector("#numberInput").value = "";

let randomNumber;
let numberOfRetries;
let givenInput;

function startGame(e){
    e.preventDefault();
    const button = document.querySelector(".btn");
    if(button.id === "start"){
        start();
    }
    else if(button.id === "guess"){
        givenInput = parseInt(document.querySelector("input").value);
        Game();
    } 
    else {
        reset();
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
}

function Game(){
    const numberInput = document.querySelector("#numberInput");
    if(numberInput.value !== ""){
        if(!isNaN(parseInt(numberInput.value))){
            if(parseInt(numberInput.value) < 11 && parseInt(numberInput.value) > 0) {
                if(numberOfRetries > 1){
                    if(givenInput === randomNumber){
                        messageOutput("Congratulations you guessed the number!");
                        gameEnd();
                    }
                    else{
                        numberOfRetries--;
                        messageOutput(`The number isn't ${givenInput}`,0);
                        document.querySelector("#retries").textContent = numberOfRetries;
                    }
                }
                else {
                    messageOutput(`Your didn't guess the number! It was ${randomNumber}`,0);
                    gameEnd();
                }
            }
            else messageOutput("The number given is not between 1 and 10!", 0)
        }
        else messageOutput("Please only use numbers!", 0)
    }
    else messageOutput("Please type in a number first!", 0); 
}

function gameEnd(){
    // Resetting game
    document.querySelector("#numberInput").disabled = true;
    const button = document.querySelector(".btn");
    randomNumber = 0;
    button.textContent = "Play Again";
    button.id = "end";
    const messageField = document.querySelector("#messageField");
    messageField.style.padding = "10px 0 0 0";
    // Initializing game
    numberInput.value = "";
    const asd = document.querySelector("#asd");
    asd.style.display = "none";
}

function reset(){
    const button = document.querySelector(".btn");
    button.textContent = "Start Game";
    button.id = "start";
    document.querySelector("#messageField").style.display = "none";
}

function messageOutput(message, number){

    if(number === 0) messageField.style.color = "red";
    else messageField.style.color = "green";

    messageField.textContent = message;
    messageField.style.display = "block";
    messageField.style.padding = "5px 0 0 0";
}