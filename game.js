const diceDivs=document.querySelectorAll(".dice-div")

const diceImg1=document.getElementById('dice-img1');
const diceImg2=document.getElementById('dice-img2');

// variables

const snakesPlace = {
    17:7,
    54:34,
    62:19,
    64:60,
    87:24,
    93:73,
    95:75,
    98:79
}

const ladderPlace={
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

let currentPlayer=1;
let diceImg;

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

function diceHandling(){
    var randomNumber=generateRandomNumbers(1,6);
    console.log(randomNumber)

    diceImg.src="assets/DiceRolling.gif"

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
        // console.log(currentPlayer)
        
        coinMoving(randomNumber,currentPlayer);

    },1000)
}

function generateRandomNumbers(min,max){
    return Math.floor(Math.random()*max)+min
}


// Game board

const gameBoard=document.getElementById("game-board-div")


let gridId=0




for(let i=1; i<=100;i++){
        // if(i/10==0){
        //     gameBoard.style.direction='rtl';
        // }else{
        //     gameBoard.style.direction='ltr';
        // }
        gridId++;
        const cell=document.createElement("div");
        cell.classList.add("grid-cell");
        cell.style.border="2px solid red";
        cell.setAttribute('id','gridid'+gridId);
        gameBoard.appendChild(cell);
}



// coinMoving function

// function coinMoving(randomNumber,currentPlayer){
//     if(currentPlayer==1)
// }