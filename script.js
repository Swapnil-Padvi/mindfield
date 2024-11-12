var elementArr = [1,2,3,4,5,6,7,8,9];
var resStack = [];
var arr = [];

var isNumHidden = false;
const timerDisplay = document.getElementById("timer");
let countdown = 5;
let timerInterval;
let timeToPlay = 0;

function startGame(){
    arr = shuffleArray(elementArr);
    for(var i = 0 ; i <= arr.length-1 ; i++){
        var id = i+1;
        document.getElementById("item-"+id+"").innerHTML = arr[i];
    }
     addEventListener(arr);
     countdown = 5
     startTimer();
}

function startGameActivity(){
    for(var i = 0 ; i <= arr.length-1 ; i++){
        var id = i+1;
        document.getElementById("item-"+id+"").innerHTML = '';
    }
}

function checkCorrectElements(id,elem){
    
    if((resStack.length <= 0 && elem ==1)  || resStack[resStack.length-1] == elem-1){
        document.getElementById("item-"+id+"").innerHTML = elem;
        resStack.push(elem);
    }else{
        document.getElementById("item-"+id+"").innerHTML = elem;
        setTimeout(() => {
            document.getElementById("item-"+id+"").innerHTML = '';
        }, 500);
    }

    //this means that game is over , because all correct elements are push in the stack
    if(resStack.length == elementArr.length){
        endGame();
    }
}

function endGame(){
    clearInterval(timerInterval);
    console.log('end');
}

function updateGameTimer(){
    timerDisplay.textContent = "Game Starts in " + timeToPlay + "...";
    timeToPlay++;
}


//randomize the numbers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];   // Swap elements
    }
   return array;
}

function startTimer() {
   // countdown = 5; // Reset countdown if needed
    
    clearInterval(timerInterval); // Clear any existing interval to avoid duplicates
    if(countdown <= 0){
        timerInterval = setInterval(updateGameTimer, 1000); // Start the interval
    }else{
        timerDisplay.textContent = "Game Starts in " + countdown + "..."; // Display initial countdown
        timerInterval = setInterval(updateTimer, 1000); // Start the interval for game countdown
    }
}



function updateTimer() {
    timerDisplay.textContent = "Game Starts in " + countdown + "...";
    if (countdown === 0) {
      clearInterval(timerInterval);  // Stop the timer
      startGameActivity();           // Call the function when the timer ends
      startTimer();
    } else {
      countdown--;
    }
}

//add event listensers to all the cells
function addEventListener(arr){
    arr.forEach((item, index) => {
        document.getElementById(`item-${index+1}`).addEventListener("click", () => {
            checkCorrectElements(index+1,item);
        });
    });
}


startGame();