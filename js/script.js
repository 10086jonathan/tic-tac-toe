/*----- constants -----*/
// model

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': '',
};

/*----- app's state (variables) -----*/
// model

let turn, winner, gameboard;

/*----- cached element references -----*/
// view

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square');
const $buttonEl = $('#reset-btn');
const $messageEl = $('#message');

/*----- event listeners -----*/
// controller
$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit);

/*----- functions -----*/
// controller

// start the game once the browser loads
handleInit();

function handleInit() {
    // this function will do two things

    // 1) start the game
    // a) create an empty gameboard
    gameboard = new Array(9).fill().map(() => null);
    // b) assign the turn - player 1 goes first - X goes!
    turn = 1;
    // c) set the winner to false
    winner = false;
    // d) visualize the state of the game to the DOM - render()
    render();
    // 2) reset the game
};

function checkWinner() {
    // compare the positions of the players pieces (1 or -1) in the combos array
    for(let i = 0; i < COMBOS.length; i++) {
        if(Math.abs(gameboard[COMBOS[i][0]] + gameboard[COMBOS[i][1]] + gameboard[COMBOS[i][2]]) === 3) {
            return gameboard[COMBOS[i][0]]
        }
    } if(gameboard.includes(null)) return false;
    return 'T';
}

function handleMove(event) {
    const position = event.target.dataset.index;
    if(winner || gameboard[position]) return;
    gameboard[position] = turn;
    // to see if we have a winner
    winner = checkWinner();
    turn *= -1;
    render();
};

function render() {
    // render is going to look at the gameboard array
    gameboard.forEach(function(value, index) {
        $($squareEls[index]).text(LOOKUP[value]);
    });
    // render will also update out message based on the turn or if we won
    if(!winner) {
        $messageEl.text(`it's player ${LOOKUP[turn]}'s turn`);
    } else if(winner === 'T') {
        $messageEl.text('it\'s a tie');
    } else {
        $messageEl.text(`congratulations ${LOOKUP[winner]} wins`);
    }
}