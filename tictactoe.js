//Constants used to keep track of current player and their tic mark
const PLAYER_X = 'X';
const PLAYER_O = 'O';


//Array of Valid Win Conditions
const WIN_CONDITIONS = [
    // ROWS
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    // COLUMNS
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //DIAGONALS
    [0,4,8],
    [2,4,6]
]

// Lets start the starting player - X always goes first
let currentPlayer = PLAYER_X;

// Keep track of current board start
let currentBoard = [null,null,null,null,null,null,null,null,null];

// Grab the New Game button from the DOM
const newGameButton = document.getElementById('startButton');

// Add an event listener to the New Game button 
newGameButton.addEventListener('click', newGame);

// Creating the Tic-Tac-Toe board via JavaScript
function createBoard() {
    // Get the gameBoard Div from the DOM
    let gameboardDiv = document.getElementById('gameBoard');

    //Remove the current board
    while(gameboardDiv.firstChild) {
        gameboardDiv.removeChild(gameboardDiv.firstChild);
    }

    //Create New Board
    for (let i = 0; i < 9; i++) {
        //Create a new DIV element
        let newCell = document.createElement('div');
        //Add the class gameCell to the newly created DIV
        newCell.setAttribute('class', 'gameCell');
        //Add an ID to the current DIV
        newCell.setAttribute('id', i);
        //Add event listener to cell for when a user clicks on it.
        newCell.addEventListener('click', handleClick, {once : true});
        //Add the newly created DIV to the DOM
        gameboardDiv.appendChild(newCell);
    }    
}

function handleClick(cellClicked) {

    //Set clicked game cell to Current Player
    cellClicked.target.innerText = currentPlayer;

    //Update currentBoard with most recent click
    currentBoard[cellClicked.target.id] = currentPlayer;

    // Check the current game state and see if we have a winner or a draw
    switch(checkGameState()){
        case "WINNER" :
            console.log(currentPlayer + " wins!");
            break;
        case "DRAW" :
            console.log("It's a Draw");
            break;
        default:
            console.log("Keep Playing");
            //Switch to next player
            switchCurrentPlayer();
    }
}

function checkGameState() {
    //Set current gameState to CONTINUE
    let gameState = "CONTINUE";

    // Check for a Winner.  Compare the cells needed for a winning condition to the current player.
    // If all cells needed for a win match the current player a winner is found.
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
        if (currentBoard[WIN_CONDITIONS[i][0]] == currentPlayer && 
            currentBoard[WIN_CONDITIONS[i][1]] == currentPlayer && 
            currentBoard[WIN_CONDITIONS[i][2]] == currentPlayer) {
                 gameState = "WINNER";
                 //Once a winning condition is found no sense in checking any more
                 break;
        }
    }

    // If there is no WINNER and all spots on the board are filled we have a DRAW
    if (gameState != "WINNER" && !currentBoard.some(val => val === null)){
        gameState = "DRAW";
    }

    //Return the current gameState
    return gameState;
}

function switchCurrentPlayer() {
    //Ternary if to swap the current player
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    //Update text to show who is the current player
    updatePlayerText();
}

function updatePlayerText() {
    //Grab the playerText area from the DOM
    let textArea = document.getElementById('playerText');
    //Change the Text to the currentPlayer's turn
    textArea.innerText = `It's ${currentPlayer}'s Turn`;
}

function resetCurrentBoard() {
    //loop through the gameBoard and set all values to null;
    for (let i = 0; i < currentBoard.length; i++) {
        currentBoard[i] = null;
    }
}

//What to do when the New Game button is clicked
function newGame () {
    //Delete and create a new board on the DOM
    createBoard();
    //Make sure the current player is PLAYER_X
    currentPlayer = PLAYER_X;
    //Reset player text area to be PLAYER_X
    updatePlayerText(currentPlayer);
    //Delete values in gameBoard to start fresh
    resetCurrentBoard();
}

createBoard();

