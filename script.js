function gameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i]=[];    //creates an array for each row; i.e. 3.
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());  //pushes a cell into each of these arrays; 3 cells into each of the 3 arrays, this is the common way create a 2d array
        }
    }   //the outermost array signifies the row; the inner ones are the columns

    const  getBoard = () => board;  //this method will eventually render the board

    const makeMark = (row, column, player) => {
        const availableCell = board[row][column];
        console.log(availableCell.getValue());
        if(availableCell.getValue() !==0){
            console.log("Cell taken.")
            return;
        }
        
        availableCell.addMark(player);
    }

    const printBoard = () => {
        const boardWithCells = board.map((row) =>     // Replace printBoard checks or add to it with winchecks.
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCells);
    }

    return {getBoard, makeMark, printBoard};
}

function Cell(){
    let value = 0;

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return{
        addMark,
        getValue,
    }
}

function Controller(
    playerOne = "Player One",
    playerTwo = "Player Two"
){
    const board = gameBoard();

    const players = [
        {
            name: playerOne,
            mark: "x",
        },
        {
            name: playerTwo,
            mark: "o",
        },
    ];

    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printBoard = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = (row, column) => {
        console.log(
            `${getActivePlayer().name} marks cell: ${row}, ${column}.`
        )
        board.makeMark(row, column, getActivePlayer().mark);

        switchTurn();
        printBoard();
    };

    printBoard();

    return{
        playRound,
        getActivePlayer,
    }
}

const game = Controller();