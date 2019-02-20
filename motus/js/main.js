var wordLength;
var correctWord;
var guessWord;
// letters which have been guessed
var letterHistory = [];
// colors of letters which have been guessed
var colorHistory = [];
var errorMessage;
var falseColor = "grey";
var correctLetterPlacementColor = "aqua";
var correctLetterColor = "yellow";
var nGuesses;
var nLines = 7; // number of rows in table
var correctWordLists; // dictionary from which words to be guessed are chosen
var completeWordList; // big dictionary of all possible English words

function init() {

  nGuesses = 0;

  // start button
  var button = document.getElementById('startButton');
  button.addEventListener('click', function(e) {
    startGame();
  }, false);

  // start button
  var gbutton = document.getElementById('giveUpButton');
  gbutton.addEventListener('click', function(e) {
    giveUpGame();
  }, false);

  // text field for entering guesses
  var guessWordForm = document.getElementById('guessWordForm');
  guessWordForm.addEventListener("submit", function(e) {
    reactToGuess(guessWordForm.guessWord.value.toLowerCase());
    guessWordForm.guessWord.value = '';
    e.preventDefault(); // Don't forget this!
  }, false);

  // error message
  errorMessage = document.getElementById('errorMessage');

  data = loadWordLists();
  correctWordLists = data['correctWordLists'];
  completeWordList = data['completeWordList'];
}

function startGame() {

  resetGame();

  // word length chosen by user
  wordLength = document.querySelector('input[name="wordLength"]:checked').value;

  //randomly choose word for user to guess
  var maxIndex = correctWordLists[wordLength].length;
  var randomIndex = Math.floor(Math.random() * maxIndex);
  correctWord = correctWordLists[wordLength][randomIndex];

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

  guessWordForm.guessWord.focus();
}

function reactToGuess(guessWord) {

  console.log(guessWord);

  if (guessWord.length != wordLength) {
    errorMessage.innerHTML = 'Only guesses with ' + wordLength + ' letters are allowed!';
    return
  }

  if (! completeWordList.includes(guessWord)) {
    errorMessage.innerHTML = 'Guess words must be in the dictionary!';
    return
  }

  errorMessage.innerHTML = '';
  var letterArray = guessWord.toUpperCase().split("");
  var colorArray = testGuess(guessWord, correctWord);
  updateLine(letterArray, colorArray, nGuesses);
  nGuesses += 1;
  console.log('nGuesses ' + nGuesses);

  if (guessWord == correctWord) {
    alert('You win!');
    resetGame();
  }

  if (nGuesses >= nLines) {
    alert('You lose! The correct word was ' + correctWord);
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

  // display color for each char in guessWord
  var colorArray = [];
  // correctly guessed characters (in any position)
  var correctGuessedChars = '';

  for (var i = 0; i < guessWord.length; i++) {
    if (guessWord.charAt(i) == correctWord.charAt(i)) {
      colorArray.push(correctLetterPlacementColor);
      correctGuessedChars += guessWord.charAt(i);
    } else if (correctWord.includes(guessWord.charAt(i))) {
      // check this character hasnt already been correctly placed
      var nCorrect = correctWord.split(guessWord.charAt(i)).length - 1;
      var nGuessed = correctGuessedChars.split(guessWord.charAt(i)).length - 1;
      if (nCorrect > nGuessed) {
        colorArray.push(correctLetterColor);
        correctGuessedChars += guessWord.charAt(i);
      } else {
        colorArray.push(falseColor);
      }
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

function giveUpGame() {
  alert('The correct word was ' + correctWord);
  resetGame();
}
