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
     //   console.log(availableCell.getValue());
        if(availableCell.getValue() !==0){
            console.log("Cell taken.")
            return;
        }
        
        availableCell.addMark(player);
    }

    const printBoard = () => {
        const boardWithCells = board.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCells);
    }

    //if arrays horizontally/diagonally/vertically same, then win - use looping since every row is an array and each column is an array within!

    const checkWin = () => {
        const topRow = board[0];
        const midRow = board[1];
        const botRow = board[2];

        const leftDia = [board[0][0], board[1][1], board[2][2]];
        const rightDia = [board[0][2], board[1][1], board[2][0]];

        const leftCol = [board[0][0], board[1][0], board[2][0]];
        const midCol = [board[0][1], board[1][1], board [2][1]];
        const rightCol = [board[0][2], board[1][2], board [2][2]];

        if(topRow.every(cell => cell.getValue() === "x")){
            console.log("x wins upper row");
        }
        if(topRow.every(cell => cell.getValue() === "o")){
            console.log("o wins upper row");
        }
        if(midRow.every(cell => cell.getValue() === "x")){
            console.log("x wins middle row");
        }
        if(midRow.every(cell => cell.getValue() === "o")){
            console.log("o wins middle row");
        }
        if(botRow.every(cell => cell.getValue() === "x")){
            console.log("x wins bottom row");
        }
        if(botRow.every(cell => cell.getValue() === "o")){
            console.log("o wins bottom row");
        }

        if(leftDia.every(cell => cell.getValue() === "o")){
            console.log("o wins left diagonal");
        }
        if(leftDia.every(cell => cell.getValue() === "x")){
            console.log("x wins left diagonal");
        }
        if(rightDia.every(cell => cell.getValue() === "o")){
            console.log("o wins right diagonal");
        }
        if(rightDia.every(cell => cell.getValue() === "x")){
            console.log("x wins right diagonal");
        }

        if(leftCol.every(cell => cell.getValue() === "x")){
            console.log("x wins left column");
        }
        if(leftCol.every(cell => cell.getValue() === "o")){
            console.log("o wins left column");
        }
        if(midCol.every(cell => cell.getValue() === "x")){
            console.log("x wins middle column");
        }
        if(midCol.every(cell => cell.getValue() === "o")){
            console.log("o wins middle column");
        }
        if(rightCol.every(cell => cell.getValue() === "x")){
            console.log("x wins right column");
        }
        if(rightCol.every(cell => cell.getValue() === "o")){
            console.log("o wins right column");
        }
    }


    return {getBoard, makeMark, printBoard, checkWin};
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

        board.checkWin();

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