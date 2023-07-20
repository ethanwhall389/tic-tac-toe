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

    function newGame () {
        DisplayController.clearDisplay()
        // Remove any values from the board array.
        for (let i = 0; i < GameBoard.board.length; i++) {
            GameBoard.board[i].marker = '';
        }
        DisplayController.updateGameBoardDisplay();
        DisplayController.updateTurnDisplay(whoseTurn);
        
        //Create new players.
        playerOne = Player('X');
        playerTwo = Player('O');

        round(); 
        
    }


    function round () {
        // event listener loop for each button.
        let cell = document.querySelectorAll('.cell');
        cell.forEach( (item) => {
            item.addEventListener('click', (event) => {
                //get data attributes (indexes) from clicked cell
                let cellIndex = item.getAttribute('data-index');
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
                DisplayController.updateTurnDisplay(whoseTurn);
                currentRound ++;
                if (currentRound == 10) {
                    tie();
                    return;
                }
                
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
        console.log(`${winningPlayer} won!`);
        DisplayController.displayWinner(winningPlayer);
    }

    function tie ()  {
        console.log('It\'s a tie!');
        DisplayController.displayTie();
    }
    
    return {newGame};
})()

const DisplayController = (() => {
    let mainDisplay = document.querySelector('.game-container');
    let gameBoardDisplay = document.querySelector('.game-board');
    let currentTurnDisplay = document.querySelector('.current-turn');
    
    function clearDisplay(){
        gameBoardDisplay.textContent = '';
        currentTurnDisplay.textContent = '';
    }

    function updateGameBoardDisplay () {
        for (let i = 0; i < GameBoard.board.length; i++) {
            let cell = document.createElement('button');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.textContent = GameBoard.board[i].marker;
            gameBoardDisplay.appendChild(cell);
        }

    }

    function updateTurnDisplay (whoseTurnIsIt) {
        let currentTurnPara = document.createElement('p');
        currentTurnPara.textContent = `It's ${whoseTurnIsIt}'s turn!`;
        currentTurnDisplay.appendChild(currentTurnPara);
    }

    function displayWinner (winningPlayer) {
        let winnerHeading = document.createElement('h1');
        winnerHeading.textContent = `${winningPlayer} won!`
        mainDisplay.appendChild(winnerHeading);
    }

    function displayTie () {
        let TieHeading = document.createElement('h1');
        TieHeading.textContent = 'It\'s a tie!'
        mainDisplay.appendChild(TieHeading);
    }

    return {clearDisplay, updateGameBoardDisplay, updateTurnDisplay, displayWinner, displayTie};
})();



GameFlow.newGame();