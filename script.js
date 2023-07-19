// GameBoard is an IIFE, AKA a module.
    // Inside the game board we store the grid Cells using a 2D array.
const GameBoard = (() => {
    const board = [
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
    ]
    //each inner array is a row.
    // to access a specific Cell, we use board[rowIndex][columnIndex]
        //e.g. board[0][1] will return the second Cell in the first row.
    return {board: board};
})();

// Each cell is a factory function.
function Cell() {
    // value of 0 means no play has been made.
    let value;

    //This method will get the marker for the chosen player and change value to that marker.
    const addMarker = (player) => value = player.marker;

    return {value: value, addMarker: addMarker}
}

function Player (name, marker) {
    return {name, marker};
}


//ScreenController is an IIFE Module
const ScreenController = (() => {
    
    let gameBoard = document.querySelector('.game-board');
    
    const clearScreen = () => {
        //remove what is currently on screen
        gameBoard.textContent = '';
    }

    const updateGameBoard = () => {
        clearScreen();
        //loop through the outermost board array (rows)
        for (let i = 0; i < GameBoard.board.length; i++) {
            //loop through the inner array (cells)
            for (let j = 0; j < GameBoard.board[i].length; j++) {
                let cell = document.createElement('button');
                cell.classList.add('cell');
                cell.textContent = GameBoard.board[i][j].value;
                gameBoard.appendChild(cell);
            }
        }
    }

    const choosePlayers = () => {
        //code to choose players-- should this be here or go somewhere unique?
    }
    return {updateGameBoard, clearScreen};
})();


const GameFlow = (() => {
    const newGame = () => {
        ScreenController.clearScreen();
    };
})();


// Update the screen on page load
ScreenController.updateGameBoard();