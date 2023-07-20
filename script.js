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
        // Removes any values from the board array.
        for (let i = 0; i < GameBoard.board.length; i++) {
            GameBoard.board[i].forEach(item => item.marker = '');
        }
        DisplayController.updateGameBoardDisplay();
        DisplayController.updateTurnDisplay(whoseTurn);
        
        //Create new players.
        playerOne = Player('X');
        playerTwo = Player('O');


        function round () {
            // add content for the game round
        }
        
        // scanArrayForWin();
        
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