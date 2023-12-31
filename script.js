// GAME
const GameBoard = (() => {
    
    function Cell() {
        let marker;
        return {marker};
    }
    
    let board = [
        Cell(), Cell(), Cell(), //Row one
        Cell(), Cell(), Cell(), //Row two
        Cell(), Cell(), Cell() //Row three
    ]
    

    return {board};
})()

function Player (marker) {
    return {marker};
}

const GameFlow = (() => {
    let whoseTurn = 'player one';
    let currentRound = 1;
    let playerOne;
    let playerTwo;
    let disabledButtons = [];

    function newGame () {
        currentRound = 1;
        //Reset the array to be empty.
        disabledButtons.splice(0, disabledButtons.length);
        DisplayController.clearDisplay()
        // Remove any values from the board array.
        for (let i = 0; i < GameBoard.board.length; i++) {
            GameBoard.board[i].marker = '';
        }


        DisplayController.updateGameBoardDisplay();
        whoseTurn = 'player one';
        DisplayController.updateTurnDisplay(whoseTurn);
        
        //Create new players.
        playerOne = Player('X');
        playerTwo = Player('O');

        round(); 
        return {disabledButtons};
    }


    function round () {
        // event listener loop for each button.
        let cell = document.querySelectorAll('.cell');
        cell.forEach( (item) => {
            item.addEventListener('click', (event) => {                
                //get data attributes (indexes) from clicked cell
                let cellIndex = item.getAttribute('data-index');
                //Push clicked cell's index to disabledButtons array
                disabledButtons.push(Number(cellIndex));
                //Change clicked cell marker
                if (whoseTurn === 'player one') {
                    GameBoard.board[cellIndex].marker = playerOne.marker;
                } else {
                    GameBoard.board[cellIndex].marker = playerTwo.marker;
                }
                //Change whose turn it is
                whoseTurn == 'player one' ? whoseTurn = 'player two' : whoseTurn = 'player one';
                DisplayController.clearDisplay()
                DisplayController.updateGameBoardDisplay();

                //Check if we have a winner. If so, return out of the round function.
                let isThereAWinner = scanArrayForWin();
                if (isThereAWinner == true) {
                    return;
                }
                currentRound ++;
                if (currentRound == 10) {
                    tie();
                    return;
                }
                DisplayController.updateTurnDisplay(whoseTurn);
                
                //Re-call the round() function to start a new round.
                round();
            })
        })
    }
    
    function scanArrayForWin() {
        let possibleWins = [
            [0, 1, 2], //Row one  
            [3, 4, 5], //Row two  
            [6, 7, 8], //Row THREE  
            [0, 3, 6], //Column ONE
            [1, 4, 7], //Column TWO
            [2, 5, 8], //Column THREE
            [0, 4, 8], //Diagonal ONE
            [2, 4, 6], //Diagonal TWO
        ]

        let isThereAWinner = false;

        possibleWins.forEach( (possibilityArray) => {
            const xWins = possibilityArray.every( (cell) => {
                return GameBoard.board[cell].marker == 'X';
            })

            if (xWins == true) {
                isThereAWinner = true;
                winner('player one');
                return;
            }
        })
       
       
        possibleWins.forEach( (possibilityArray) => {
            const oWins = possibilityArray.every( (cell) => {
                return GameBoard.board[cell].marker == 'O';
            })

            if (oWins == true) {
                isThereAWinner = true;
                winner('player two');
                return;
            }
        })
        return isThereAWinner;
    };

    function winner (winningPlayer)  {
        DisplayController.displayWinner(winningPlayer);
        DisplayController.displayNewGameBttn();
    }

    function tie ()  {
        DisplayController.displayTie();
        DisplayController.displayNewGameBttn();
    }
    
    return {newGame, disabledButtons, currentRound};
})()

const DisplayController = (() => {
    let mainDisplay = document.querySelector('.game-container');
    let gameBoardDisplay = document.querySelector('.game-board');
    let currentTurnDisplay = document.querySelector('.current-turn');
    let newGameDisplay = document.querySelector('.new-game-div');
    
    function clearDisplay(){
        gameBoardDisplay.textContent = '';
        currentTurnDisplay.textContent = '';
        newGameDisplay.textContent = ''
    }

    function updateGameBoardDisplay () {
        for (let i = 0; i < GameBoard.board.length; i++) {
            let cell = document.createElement('button');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.textContent = GameBoard.board[i].marker;

            // if this cell has already been filled, disable it.
            if (GameFlow.disabledButtons.includes(i)) {
                cell.disabled = true;
            };
            gameBoardDisplay.appendChild(cell);
        }

    }

    function updateTurnDisplay (whoseTurnIsIt) {
        let currentTurnPara = document.createElement('p');
        currentTurnPara.classList.add('current-turn-para');
        currentTurnPara.textContent = `It's ${whoseTurnIsIt}'s turn!`;
        currentTurnDisplay.appendChild(currentTurnPara);
    }

    function displayWinner (winningPlayer) {
        let winnerHeading = document.createElement('h1');
        winnerHeading.textContent = `${winningPlayer} won!`
        currentTurnDisplay.appendChild(winnerHeading);
    }

    function displayTie () {
        let TieHeading = document.createElement('h1');
        TieHeading.textContent = 'It\'s a tie!'
        currentTurnDisplay.appendChild(TieHeading);
    }

    function displayNewGameBttn () {
        let newGameBttn = document.createElement('button');
        newGameBttn.classList.add('bttn-new-game');
        newGameBttn.textContent = 'New Game';
        newGameDisplay.appendChild(newGameBttn);
        newGameBttn.addEventListener('click', () => {
            setTimeout(() => {
            GameFlow.newGame();
          }, 400);
        })
    }

    return {clearDisplay, updateGameBoardDisplay, updateTurnDisplay, displayWinner, displayTie, displayNewGameBttn};
})();



GameFlow.newGame();
