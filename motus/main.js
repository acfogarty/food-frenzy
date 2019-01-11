var wordLength;
var correctWord;
var guessWord;
// letters which have been guessed
var letterHistory = [];
// colors of letters which have been guessed
var colorHistory = [];

function init() {
  var button = document.getElementById('startButton');
  button.addEventListener('click', function(e) {
    startGame();
  }, false);
}

function startGame() {
  wordLength = document.querySelector('input[name="wordLength"]:checked').value;

  //load dictionary
  //randomly choose word
  correctWord = 'checked';

  //build table
  var table = document.getElementById('gameTable');
  var nLines = 6;
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
  var guessWord = "goodbye"
  var letterArray = guessWord.split("");
  var colorArray = "";
  updateLine(letterArray, colorArray, 3);
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
    cell.appendChild(text);
    // color
  }
}
