const PLAYER_X = 'X';
const PLAYER_O = 'O';

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

let currentPlayer = PLAYER_X;
let currentBoard = [null,null,null,null,null,null,null,null,null];

const newGameButton = document.getElementById('startButton');

newGameButton.addEventListener('click', newGame);

function createBoard() {
    let gameboardDiv = document.getElementById('gameBoard');

    //Remove Current Board
    while(gameboardDiv.firstChild) {
        gameboardDiv.removeChild(gameboardDiv.firstChild);
    }

    //Create New Board
    for (let i = 0; i < 9; i++) {
        let newCell = document.createElement('div');
        newCell.addEventListener('click', handleClick, {once : true});
        newCell.setAttribute('class', 'gameCell');
        newCell.setAttribute('id', i);
        gameboardDiv.appendChild(newCell);
    }    
}

function handleClick(cellClicked) {
    cellClicked.target.innerText = currentPlayer;
    currentBoard[cellClicked.target.id] = currentPlayer;

    console.log(currentBoard);

    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

    console.log();
    
    if (!checkGameOver()){
        updatePlayerText(currentPlayer);
    } else {

    }
    

}

function updatePlayerText(currentPlayer){
    let textArea = document.getElementById('playerText');
    textArea.innerText = `It's ${currentPlayer}'s Turn`;
}

function checkGameOver()
{
    return false;
}

function resetCurrentBoard() {
    for (let i = 0; i < currentBoard.length; i++) {
        currentBoard[i] = null;
    }

    console.log(currentBoard);
}

function newGame (){
    createBoard();
    currentPlayer = PLAYER_X;
    updatePlayerText(currentPlayer);
    resetCurrentBoard();
}




createBoard();

