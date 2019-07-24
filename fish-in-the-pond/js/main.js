// types of playing cards in the deck
var faceCardTypes = ["circle", "cross", "square", "triangle"];
var cardTypes = faceCardTypes.concat(["back"]);
var cardWidth = 70; // in pixels
var cardHeight = 100;
var cardImages = {}; // contains loaded image objects for each card type

// grid used to lay out playing cards
var nColumns = 10;
var nRows = 5;
var nCards = nColumns * nRows; // TODO has to be even number
var cardsGrid = [];

// list of max 2 cards clicked by the player
cardsClicked = [];

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = cardWidth * nColumns;
canvas.height = cardHeight * nRows;

function init() {

  document.body.appendChild(canvas);

  // Background image
  var bgReady = false;
  var bgImage = new Image();
  bgImage.onload = function () {
  	bgReady = true;
  };
  bgImage.src = "images/background.png";

  var imagesLoaded = 0;
  for (var i=0; i<cardTypes.length; i++) {
    var image = new Image();
    image.src = 'images/' + cardTypes[i] + '.png';
    cardImages[cardTypes[i]] = image;
    image.onload = function() {
      imagesLoaded++;
      if(imagesLoaded == cardTypes.length){
        render();
      }
    }
  }

  // event listener for clicks on cards
  canvas.addEventListener('click', function(e) {
    reactToClick(e);
  }, false);

  // // start button
  // var button = document.getElementById('startButton');
  // button.addEventListener('click', function(e) {
  //   startGame();
  // }, false);

  startGame();

}

function startGame() {

  nPairsMatched = 0;

  // create shuffled deck containing pairs of cards
  deck = createDeck(nCards, faceCardTypes);

  // place cards on grid
  for (var i = 0; i < nRows; i++) {
    cardsGrid.push([]);
    for (var j = 0; j < nColumns; j++) {
      cardsGrid[i].push(deck[i*nColumns + j]);
    }
  }

  render();

}

var render = function () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCards();

};


// create shuffled deck containing pairs of cards
function createDeck(nCards, faceCardTypes) {
  var deck = [];
  var nCardTypes = faceCardTypes.length;
  for (var i = 0; i < nCards / 2; i++) {
    // randomly choose a card type
    var irandom = Math.floor(Math.random() * nCardTypes);
    // put two cards of that type in the deck
    deck.push(faceCardTypes[irandom]);
    deck.push(faceCardTypes[irandom]);
  }
  deck = shuffle(deck);
  return deck;
}


// place cards on canvas
function drawCards() {

  for (var i = 0; i < nRows; i++) {
    for (var j = 0; j < nColumns; j++) {

      // dont draw cards which have already been matched
      if (cardsGrid[i][j] == 'removed') {
        continue;
      }

      // check if this card has been clicked by the user
      var card = [i, j];
      card = JSON.stringify(card);
      var present = JSON.stringify(cardsClicked).indexOf(card);
      if (present != -1) {
        // cards chosen by user are facing up
        image = cardImages[cardsGrid[i][j]];
      } else {
        // all other cards are facing down
        image = cardImages["back"];
      }

      ctx.drawImage(image, j * cardWidth, i * cardHeight, cardWidth, cardHeight);
    }
  }
}

function reactToClick(e) {
  // find which card was clicked
  var rect = canvas.getBoundingClientRect()
  var x = e.clientX - rect.left
  var y = e.clientY - rect.top
  var i = Math.floor(y / cardHeight);
  var j = Math.floor(x / cardWidth);
  cardsClicked.push([i,j]);

  // only have a maximum of 2 cards turned over at one time
  if (cardsClicked.length > 2) {
    cardsClicked.shift();
  }

  render();

  if (cardsClicked.length == 2) {
    checkGuess();
  }

}


// check if the two cards are the same
function checkGuess() {

  var card1 = cardsClicked[0];
  var card2 = cardsClicked[1];
  if (cardsGrid[card1[0]][card1[1]] == cardsGrid[card2[0]][card2[1]]) {
    cardsGrid[card1[0]][card1[1]] = 'removed';
    cardsGrid[card2[0]][card2[1]] = 'removed';
    nPairsMatched++;
    window.alert('Well done!');
  } else {
    window.alert('Wrong!');
  }

  // turn the cards back over
  cardsClicked = [];

  render();
}


function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function sum(array) {
   var sum = 0;
   for (var i=0, n=array.length; i < n; i++)
   {
      sum += array[i];
   }
   return sum;
}
