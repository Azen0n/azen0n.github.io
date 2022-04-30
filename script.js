let lettersContainer = document.getElementById('container');
let buttons = document.getElementById('buttons');

let currentRow = 0;
let currentCol = 0;

let keyboardLetters = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
];

let words = ['PARK', 'TILE', 'BEAR', 'CRAB', 'RULE', 'REAL'];
let chosenWord = words[Math.floor(Math.random() * words.length)];

createLetterBoxes();
let letterBoxes = document.getElementsByClassName('letter');
createButtons();

function createLetterBoxes() {
    for (let row = 0; row < 5; ++row) {
        for (let col = 0; col < 4; ++col) {
            let letter = document.createElement('div');
            letter.classList.add('letter');
            lettersContainer.appendChild(letter);
        }
    }
}

function createControlButton(text) {
    let button = document.createElement('button');
    button.classList.add('button-control');
    button.innerHTML = text;
    return button;
}

function createButtons() {
    let enterButton = createControlButton('Enter');
    enterButton.addEventListener('click', function () {
        checkWord();
    });
    let clearButton = createControlButton('Clear');
    clearButton.addEventListener('click', function () {
        clearLetter();
    });

    for (const [i, row] of keyboardLetters.entries()) {
        let rowContainer = document.createElement('div');
        for (const letter of row) {
            let button = document.createElement('button');
            button.innerHTML = letter;
            button.addEventListener('click', function () {
                setLetter(letter);
            });
            rowContainer.appendChild(button);
        }
        if (i === 2) {
            rowContainer.insertBefore(enterButton, rowContainer.firstChild);
            rowContainer.appendChild(clearButton);
        }
        buttons.appendChild(rowContainer);
    }
}

function setLetter(letter) {
    if (currentCol === 4) {
        return;
    }
    letterBoxes[currentRow * 4 + currentCol].innerHTML = letter;
    ++currentCol;
}

function clearLetter() {
    if (currentCol > 0) {
        --currentCol;
    }
    letterBoxes[currentRow * 4 + currentCol].innerHTML = '';
}

function checkWord() {
    if (currentCol != 4) {
        alert('Complete the word first.');
        return;
    }

    let wordLetters = getWordLetters();

    if (!words.includes(wordLetters.join(''))) {
        alert('Not in the dictionary.');
        return;
    }

    for (const [i, letter] of wordLetters.entries()) {
        if (chosenWord[i] === letter) {
            letterBoxes[currentRow * 4 + i].style.background = '#58D68D';
            letterBoxes[currentRow * 4 + i].style.border = '2px solid #58D68D';
            letterBoxes[currentRow * 4 + i].style.color = '#FFFFFF';
        } else if (chosenWord.includes(letter)) {
            letterBoxes[currentRow * 4 + i].style.background = '#F4D03F';
            letterBoxes[currentRow * 4 + i].style.border = '2px solid #F4D03F';
            letterBoxes[currentRow * 4 + i].style.color = '#FFFFFF';
        } else {
            letterBoxes[currentRow * 4 + i].style.background = '#5D6D7E';
            letterBoxes[currentRow * 4 + i].style.border = '2px solid #5D6D7E';
            letterBoxes[currentRow * 4 + i].style.color = '#FFFFFF';
        }
    }

    if (wordLetters.join('') === chosenWord) {
        setTimeout(function () {
            victory();
        }, 500);
    }

    if (currentRow < 4) {
        ++currentRow;
        currentCol = 0;
    } else {
        setTimeout(function () {
            endGame();
        }, 500);
    }
}

function getWordLetters() {
    let letters = [];
    for (let i = 0; i < 4; ++i) {
        letters.push(letterBoxes[currentRow * 4 + i].innerHTML);
    }
    return letters;
}

function endGame() {
    alert('Unlucky. The word was "' + chosenWord + '".');
    setTimeout(function () {
        currentRow = 0;
        currentCol = 0;
        lettersContainer.innerHTML = '';
        createLetterBoxes();
        chosenWord = words[Math.floor(Math.random() * words.length)];
    }, 3000);
}

function victory() {
    alert('Congratulations!');
    currentCol = 4;
}
