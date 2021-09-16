//All player attribute
const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}
const p3 = {
    score: 0,
    button: document.querySelector('#p3Button'),
    display: document.querySelector('#p3Display')
}
const p4 = {
    score: 0,
    button: document.querySelector('#p4Button'),
    display: document.querySelector('#p4Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponents) {
    //if score is duece e.g. 0 3 3 2 the player four has to score 4 to win
    for (let opponent of opponents) {
        if (player.score === opponent.score && player.score === (winningScore - 1)) {
            winningScore++;
            break;
        }
    }
    if (!isGameOver) {
        player.score++;
        //if player score is win
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            for (let opponent of opponents) {
                opponent.display.classList.add('has-text-danger');
                opponent.button.disabled = true;
            }
            player.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

//when button click
p1.button.addEventListener('click', function () {
    updateScores(p1, [p2, p3, p4]);
})

p2.button.addEventListener('click', function () {
    updateScores(p2, [p1, p3, p4]);
})

p3.button.addEventListener('click', function () {
    updateScores(p3, [p1, p2, p4]);
})

p4.button.addEventListener('click', function () {
    updateScores(p4, [p1, p2, p3]);
})

//select options
winningScoreSelect.addEventListener('change', function () {
    //convert string to integer, cause this.value source is string
    winningScore = parseInt(this.value);
    //reset the score before choose the winningScore
    reset();
})

//button reset
resetButton.addEventListener('click', reset);

//reset function 
function reset() {
    isGameOver = false;
    for (let p of [p1, p2, p3, p4]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}