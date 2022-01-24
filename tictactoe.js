

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
        newCell.setAttribute('class', "gameCell");
        gameboardDiv.appendChild(newCell);
    }    
}

function handleClick(cellClicked){
    console.log('clicked');
}

createBoard();