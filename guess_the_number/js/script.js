let minRange, maxRange, secretNumber, attempts, attemptsLeft;

document.getElementById('startGame').addEventListener('click', function() {
    minRange = parseInt(document.getElementById('minRange').value);
    maxRange = parseInt(document.getElementById('maxRange').value);

    if (minRange >= maxRange) {
        alert("Минимальное значение должно быть меньше максимального.");
        return;
    }

    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange; //загаданное число
    attempts = Math.ceil(Math.log2(maxRange - minRange + 1)); //число попыток
    attemptsLeft = attempts;

    document.getElementById('start').style.display = 'none';
    document.getElementById('playGame').style.display = 'block';
    document.getElementById('attemptsLeft').textContent = attemptsLeft;
    document.getElementById('message').textContent = '';
});

document.getElementById('checkGuess').addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    attemptsLeft--;

    if (userGuess === secretNumber) {
        document.getElementById('finalMessage').textContent = 'Поздравляем! Вы угадали число!';
        endGame();
    } else if (attemptsLeft === 0) {
        document.getElementById('finalMessage').textContent = `Вы не угадали число. Загаданное число: ${secretNumber}`;
        endGame();
    } else {
        if (userGuess < secretNumber) {
            document.getElementById('message').textContent = 'Загаданное число больше!';
        } else {
            document.getElementById('message').textContent = 'Загаданное число меньше!';
        }
        document.getElementById('attemptsLeft').textContent = attemptsLeft;
    }
});

function endGame() {
    document.getElementById('playGame').style.display = 'none';
    document.getElementById('endGame').style.display = 'block';
}

document.getElementById('restartGame').addEventListener('click', function() {
    document.getElementById('endGame').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    document.getElementById('minRange').value = '';
    document.getElementById('maxRange').value = '';
    document.getElementById('userGuess').value = '';
});
;
