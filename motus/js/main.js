var wordLength;
var correctWord;
var guessWord;
// letters which have been guessed
var letterHistory = [];
// colors of letters which have been guessed
var colorHistory = [];
var errorMessage;
var falseColor = "grey";
var correctLetterPlacementColor = "blue";
var correctLetterColor = "yellow";
var nGuesses;
var nLines = 6; // number of rows in table

function init() {

  nGuesses = 0;

  // start button
  var button = document.getElementById('startButton');
  button.addEventListener('click', function(e) {
    startGame();
  }, false);

  // text field for entering guesses
  var guessWordForm = document.getElementById('guessWordForm');
  guessWordForm.addEventListener("submit", function(e) {
    reactToGuess(guessWordForm.guessWord.value);
    e.preventDefault(); // Don't forget this!
  }, false);

  // error message
  errorMessage = document.getElementById('errorMessage');
}

function startGame() {
  wordLength = document.querySelector('input[name="wordLength"]:checked').value;

  //load dictionary
  //randomly choose word
  correctWord = 'checks';

  //build table
  var table = document.getElementById('gameTable');
  for (var i = 0; i < nLines; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < wordLength; j++) {
      var td = document.createElement('td');
      if ((i == 0) && (j == 0)) {
        //put first letter
        var text = document.createTextNode(correctWord.substring(0, 1).toUpperCase());
        td.appendChild(text);
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function reactToGuess(guessWord) {

  if (nGuesses > nLines) {
    alert('You lose! Word was ' + correctWord);
    resetGame();
  }

  console.log(guessWord);

  if (guessWord.length != wordLength) {
    errorMessage.innerHTML = 'Only guesses with ' + wordLength + ' letters are allowed!';
    return
  }

  errorMessage.innerHTML = '';
  var letterArray = guessWord.toUpperCase().split("");
  var colorArray = testGuess(guessWord, correctWord);
  updateLine(letterArray, colorArray, nGuesses);
  nGuesses += 1;

  if (guessWord == correctWord) {
    alert('You win!');
    resetGame();
  }
}

function updateLine(letterArray, colorArray, rowIndex) {
  if (letterArray.length != colorArray.length) {
    console.log('Error in updateLine!');
  }
  var table = document.getElementById("gameTable");
  var row = table.rows[rowIndex];
  for (var i = 0; i < letterArray.length; i++) {
    var cell = row.cells[i];
    var text = document.createTextNode(letterArray[i]);
    if (cell.firstChild) {
      cell.removeChild(cell.firstChild); // Not needed
    }
    cell.appendChild(text);
    cell.style.backgroundColor = colorArray[i];
  }
}

function testGuess (guessWord, correctWord) {
  var colorArray = [];
  for (var i = 0; i < guessWord.length; i++) {
    if (guessWord.charAt(i) == correctWord.charAt(i)) {
      colorArray.push(correctLetterPlacementColor);
    } else if (correctWord.includes(guessWord.charAt(i))) {
      colorArray.push(correctLetterColor);
    } else {
      colorArray.push(falseColor);
    }
  }
  return colorArray;
}

function resetGame() {
  var table = document.getElementById('gameTable');
  table.innerHTML = '';
  nGuesses = 0;
}
