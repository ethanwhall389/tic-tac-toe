const GameBoard = (() => {
    
    function Cell() {
        let marker;
        return {marker};
    }
    
    let board = [
        [Cell(), Cell(), Cell()], //Row one
        [Cell(), Cell(), Cell()], //Row two
        [Cell(), Cell(), Cell()] //Row three
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
            GameBoard.board[i].forEach(item => item.marker = '');
        }
        DisplayController.updateGameBoardDisplay();
        DisplayController.updateTurnDisplay(whoseTurn);
        
        //Create new players.
        playerOne = Player('X');
        playerTwo = Player('O');

        round();
        function round () {
            // event listener loop for each button.
            let cell = document.querySelectorAll('.cell');
            cell.forEach( (item) => {
                item.addEventListener('click', (event) => {
                    //get data attributes (indexes) from clicked cell
                    let indexRow = item.getAttribute('data-index-row');
                    let indexCell = item.getAttribute('data-index-cell');
                    //Change clicked cell marker
                    if (whoseTurn === 'player one') {
                        GameBoard.board[indexRow][indexCell].marker = playerOne.marker;
                    } else {
                        GameBoard.board[indexRow][indexCell].marker = playerTwo.marker;
                    }
                    //Change whose turn it is
                    whoseTurn == 'player one' ? whoseTurn = 'player two' : whoseTurn = 'player one';
                    DisplayController.clearDisplay()
                    DisplayController.updateGameBoardDisplay();

                    scanArrayForWin();
                    DisplayController.updateTurnDisplay(whoseTurn);

                    round();
                })
            })


        }
        
        function scanArrayForWin() {
            
        };
        
        // currentRound++;
        // if (currentRound == 10) {
        //     tie();
        //     return;
        // }



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
            for (let j = 0; j < GameBoard.board[i].length; j++) {
                let cell = document.createElement('button');
                cell.classList.add('cell');
                cell.setAttribute('data-index-row', i);
                cell.setAttribute('data-index-cell', j);
                cell.textContent = GameBoard.board[i][j].marker;
                gameBoardDisplay.appendChild(cell);
            }
        }
    }

    function updateTurnDisplay (whoseTurnIsIt) {
        let currentTurnPara = document.createElement('p');
        currentTurnPara.textContent = `It's ${whoseTurnIsIt}'s turn!`;
        currentTurnDisplay.appendChild(currentTurnPara);
    }

    return {clearDisplay, updateGameBoardDisplay, updateTurnDisplay};
})();



GameFlow.newGame();