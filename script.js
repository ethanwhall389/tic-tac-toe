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
    let choosePlayersDiv = document.querySelector('.choose-players');
    
    const clearScreen = () => {
        //remove what is currently on screen
        gameBoard.textContent = '';
        choosePlayersDiv.style.display = 'none';
    }

    const updateGameBoard = () => {
        clearScreen();
        //loop through the outermost board array (rows)
        for (let i = 0; i < GameBoard.board.length; i++) {
            //loop through the inner array (cells)
            for (let j = 0; j < GameBoard.board[i].length; j++) {
                let cell = document.createElement('button');
                cell.classList.add('cell');
                cell.setAttribute('data-index-one', i);
                cell.setAttribute('data-index-two', j);
                cell.textContent = GameBoard.board[i][j].value;
                gameBoard.appendChild(cell);
            }
        }
    }

    const choosePlayers = () => {
        let playerOne;
        let playerTwo;
        choosePlayersDiv.style.display = 'block';
        let playerHeading = document.querySelector('.player-heading');
        let playerMarker = document.querySelector('.player-marker');
        let formPlayerOne = document.querySelector('.form-player-one');
        let formPlayerTwo = document.querySelector('.form-player-two');
        let inputPlayerOne = document.querySelector('input[name="input-player-one"]');
        let inputPlayerTwo = document.querySelector('input[name="input-player-two"]');
        let formOneButton = document.querySelector('.form-one-bttn');
        let formTwoButton = document.querySelector('.form-two-bttn');
        // Hide the player two form and display text for player one.
        formPlayerTwo.style.display = 'none';
        playerHeading.textContent = 'Player One';
        playerMarker.textContent = 'X';
        formOneButton.addEventListener('click', (event) => {
            event.preventDefault();
            // GameFlow.newGame.playerOne = Player(inputPlayerOne.value, 'X');
            playerOne = Player(inputPlayerOne.value, 'X');
            console.log(playerOne);
            showPlayerTwo();
        })
        // Hide player one form and display text for player two.
        function showPlayerTwo () {
            formPlayerOne.style.display = 'none';
            formPlayerTwo.style.display = 'block';
            playerHeading.textContent = 'Player Two';
            playerMarker.textContent = 'O';
            formTwoButton.addEventListener('click', (event) => {
                event.preventDefault();
                // GameFlow.newGame.playerTwo = Player(inputPlayerTwo.value, 'O');
                playerTwo = Player(inputPlayerTwo.value, 'O');
                console.log(playerTwo);
                GameFlow.round();
            })
        }
        return {playerOne, playerTwo};
    }


    
    return {updateGameBoard, clearScreen, choosePlayers};
})();


const GameFlow = (() => {
    let playerOne = ScreenController.choosePlayers.playerOne;
    let playerTwo = ScreenController.choosePlayers.playerTwo;
    const newGame = () => {
        ScreenController.clearScreen();
        ScreenController.choosePlayers();
        // round();
        return {playerOne, playerTwo};
    };
    
    let currentPlayer = playerOne;
    const round = () => {
        ScreenController.clearScreen();
        ScreenController.updateGameBoard();
        //Add marker to clicked cells
        let cell = document.querySelectorAll('.cell');
        cell.forEach( (item) => {
            item.addEventListener('click', () => {
                console.log('cell was clicked');
                //get the data attribute (array index) of clicked cell.
                let cellIndexOne = item.getAttribute('data-index-one');
                let cellIndexTwo = item.getAttribute('data-index-two');
                //go into the board array index of that particular cell and use the addMarker method.
                GameBoard.board[cellIndexOne][cellIndexTwo].value = currentPlayer.marker;
                //Change player's turn.
                currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
                console.log(currentPlayer);
                // new round.
                round();
            })
        })
    }

   return {newGame, round, currentPlayer};
})();


// Update the screen on page load
GameFlow.newGame();