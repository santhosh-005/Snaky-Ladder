const diceDivs=document.querySelectorAll(".dice-div")

const diceImg1=document.getElementById('dice-img1');
const diceImg2=document.getElementById('dice-img2');

// Audio files

const diceSound=new Audio("assets/dice-sound.mp3");
const bgMusic=new Audio("assets/Bg.mp3");
const nextPageSound=new Audio("assets/level-complete.mp3");
const rewardSound=new Audio("assets/bite-ladder.wav")

nextPageSound.play();
bgMusic.loop=true;
bgMusic.play();
bgMusic.volume=0.3;

// variables

const snakyLadderPlaces = {
    17:7,
    54:34,
    62:19,
    64:60,
    87:24,
    93:73,
    95:75,
    98:79,
    1:38,
    4:14,
    9:31,
    21:42,
    28:84,
    51:67,
    71:91,
    80:99
}


let playerPositions=[0,0]
let number=0;

let playerMoves=[0,0];

let currentPlayer=1;
let diceImg;

let value;

// winning function

function winnerFunction(nowPlayer) {
    let winner;
    if (nowPlayer == 1) {
        winner = localStorage.getItem('player1');
    } else {
        winner = localStorage.getItem('player2');
    }
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    let winnersList = [];
    let winingscoreList = [];

    // Push the existing winners and scores into new arrays
    if (localStorage.getItem('winners')) {
        winnersList.push(...JSON.parse(localStorage.getItem('winners')));
    }

    if (localStorage.getItem('winnerscore')) {
        winingscoreList.push(...JSON.parse(localStorage.getItem('winnerscore')));
    }

    // Push the current winner and score
   if(winner){ winnersList.push(winner.toString());}
    winingscoreList.push(playerMoves[nowPlayer - 1].toString());

    localStorage.setItem('winners', JSON.stringify(winnersList));
    localStorage.setItem('winnerscore', JSON.stringify(winingscoreList));

    window.location.href = 'gameover.html';
}



// setting player coin size according to the screen size

function mediaQuery(image){
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    if(mediaQuery.matches){
    image.style.height='30px'
    image.style.margin='3px'
    }
}
// Snakes and ladder handling function

function snakesAndLadder(currentPlayer,image){
     value=playerPositions[(3-currentPlayer)-1];
    if(snakyLadderPlaces[value]){
        rewardSound.play();
        document.getElementById('cell-'+snakyLadderPlaces[value]).appendChild(image);
        let containDiv=document.getElementById('cell-'+(playerPositions[(3-currentPlayer)-1]));
        const Element = containDiv.querySelector("img");
        if(Element){
            containDiv.removeChild(Element);
        }
        playerPositions[(3-currentPlayer)-1]=snakyLadderPlaces[playerPositions[(3-currentPlayer)-1]];
    }
}



function calling(){
    if(currentPlayer==1){
        diceDivs[1].removeEventListener("click", diceHandling);
        diceImg=diceImg1;
        diceDivs[0].addEventListener('click',diceHandling);
    }else if(currentPlayer==2){
        diceDivs[0].removeEventListener("click", diceHandling);
        diceImg=diceImg2;
        diceDivs[1].addEventListener('click',diceHandling);
    }
}

calling();

// dice handling and random number generating function

function diceHandling(){
    var randomNumber=generateRandomNumbers(1,6);
    console.log(randomNumber)

    diceImg.src="assets/DiceRolling.gif"
    diceSound.pause();
    diceSound.currentTime=0;
    diceSound.play();

    setTimeout(function showRandomNumberOnDice(){
        

        if(randomNumber==1){
            diceImg.src="assets/dice-numer-1.png"
        }else if(randomNumber==2){
            diceImg.src="assets/dice-numer-2.png"
        }else if(randomNumber==3){
            diceImg.src="assets/dice-numer-3.png"
        }else if(randomNumber==4){
            diceImg.src="assets/dice-numer-4.png"
        }else if(randomNumber==5){
            diceImg.src="assets/dice-numer-5.png"
        }else if(randomNumber==6){
            diceImg.src="assets/dice-numer-6.png"
        }

        

        
        currentPlayer=3-currentPlayer; 
        calling();
        coinMoving(randomNumber,currentPlayer);
        

    },1000)
}

function generateRandomNumbers(min,max){
    return Math.floor(Math.random()*max)+min
}


// Game board

const gameBoard=document.getElementById("game-board-div")

let rows=10;
let columns=10;
let idCounter = 1; 
let evenCounter = 20;


// creating 100 divs in gameBoard container using loop


for (let row = 1; row <= rows; row++) {
    if (row % 2 === 0) {
        // For even rows, go from right to left
        for (let col = 1; col <= columns; col++) {
            const cell=document.createElement("div");
            cell.classList.add("grid-cell");
            // cell.style.border="2px solid red";
            cell.style.overflow='hidden '
            cell.id = `cell-${evenCounter}`;
            gameBoard.appendChild(cell);
            evenCounter--;
            idCounter++;
        }
    } else {
        // For odd rows, go from left to right
        for (let col = 1; col <= columns; col++) {
            const cell=document.createElement("div");
            cell.classList.add("grid-cell");
            // cell.style.border="2px solid red";
            cell.style.overflow='hidden '
            cell.id = `cell-${idCounter}`;
            gameBoard.appendChild(cell);
            idCounter++;

        }
        if(row > 1){
            evenCounter = evenCounter + 30;
        }
    }
}

// coinMoving function

function coinMoving(randomNumber,currentPlayer){

    playerMoves[(3-currentPlayer)-1]+=1;
   
    if(number>=2){
    let currentDiv=document.getElementById('cell-'+(playerPositions[(3-currentPlayer)-1]));
    const imageElement = currentDiv.querySelector("img");
    if(imageElement){
        currentDiv.removeChild(imageElement);}
    }

    
    let image=document.createElement("img");
    image.style.height='52px';
    image.classList.add('coins');
    let nowPlayer=3-currentPlayer; 
    if(nowPlayer==1){
        image.src="assets/redcoin-rev.png";
        image.setAttribute('id','redcoin-coin');
        mediaQuery(image)
    }if(nowPlayer==2){
        image.src="assets/blackcoin-rev.png";
        image.setAttribute('id','blackcoin-coin');
        mediaQuery(image)
    }
    var count1=playerPositions[nowPlayer-1];
    playerPositions[nowPlayer-1]+=randomNumber;
    var count2=playerPositions[nowPlayer-1];

        function smoothMove(){
            count1++;
            if(count1<=count2){
                document.getElementById('cell-'+count1).appendChild(image);
            setTimeout(smoothMove,350)
            }
            else{
                snakesAndLadder(currentPlayer,image)
            }
        }
        smoothMove();
        number++;

        if(playerPositions[nowPlayer-1]>=100){
            winnerFunction(nowPlayer);
        }

}   


// localStorage.clear();

