let lettersContainer = document.getElementById('container');
let buttons = document.getElementById('buttons');

let currentRow = 0;
let currentCol = 0;

let keyboardLetters = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
];

let chosenWord = solutionWords[Math.floor(Math.random() * solutionWords.length)];

createLetterBoxes();
let letterBoxes = document.getElementsByClassName('letter');
createButtons();
let letterButtons = document.getElementsByTagName('button');

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
    if (currentCol >= 4) {
        return;
    }
    letterBoxes[currentRow * 4 + currentCol].innerHTML = letter;
    ++currentCol;
}

function clearLetter() {
    if (currentCol > 4) {
        return;
    }
    if (currentCol > 0) {
        --currentCol;
    }
    letterBoxes[currentRow * 4 + currentCol].innerHTML = '';
}

function checkWord() {
    if (currentCol < 4) {
        alert('Complete the word first.');
        return;
    }
    if (currentCol > 4) {
        return;
    }

    let wordLetters = getWordLetters();

    if (!solutionWords.includes(wordLetters.join('')) && !supportWords.includes(wordLetters.join(''))) {
        alert('Not in the dictionary.');
        return;
    }

    for (const [i, letter] of wordLetters.entries()) {
        if (chosenWord[i] === letter) {
            fillBox(currentRow, i, '#58D68D');
            fillButton(letter, '#58D68D');
        } else if (chosenWord.includes(letter)) {
            fillBox(currentRow, i, '#F4D03F');
            fillButton(letter, '#F4D03F');
        } else {
            fillBox(currentRow, i, '#5D6D7E');
            fillButton(letter, '#5D6D7E');
        }
    }

    if (wordLetters.join('') === chosenWord) {
        setTimeout(function () {
            victory();
        }, 500);
    } else {
        if (currentRow < 4) {
            ++currentRow;
            currentCol = 0;
        } else {
            setTimeout(function () {
            endGame();
        }, 500);
        }
    }
}

function fillBox(i, j, color) {
	letterBoxes[i * 4 + j].style.background = color;
    	letterBoxes[i * 4 + j].style.border = '2px solid ' + color;
    	letterBoxes[i * 4 + j].style.color = '#FFFFFF';
}

function getWordLetters() {
	let letters = [];
    	for (let i = 0; i < 4; ++i) {
		letters.push(letterBoxes[currentRow * 4 + i].innerHTML);
    	}
    	return letters;
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
        clearButtons();
        chosenWord = solutionWords[Math.floor(Math.random() * solutionWords.length)];
    }, 3000);
}

function victory() {
    alert('Congratulations!');
    currentCol = 5;
}

function fillButton(letter, color) {
	for (let button of letterButtons) {
  	if (button.innerHTML === letter) {
    	button.style.background = color;
    }
  }
}

function clearButtons() {
	for (let button of letterButtons) {
  	button.style.background = '#EBEDEF';
  }
}
