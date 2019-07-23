// types of playing cards in the deck
var cardTypes = ["circle", "cross", "square", "triangle"];
var cardWidth = 70; // in pixels
var cardHeight = 100;

// grid used to lay out playing cards
var nColumns = 10;
var nRows = 5;
var nCards = nColumns * nRows; // TODO has to be even number
var cardsGrid = [];

var cardImages = {};

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = cardWidth * nColumns;
canvas.height = cardHeight * nRows;
console.log(canvas.width);

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

  // TODO event listener for clicks

  // start button
  var button = document.getElementById('startButton');
  button.addEventListener('click', function(e) {
    startGame();
  }, false);

  startGame();

}

function startGame() {

  nPairsMatched = 0;

  // create shuffled deck containing pairs of cards
  deck = createDeck(nCards, cardTypes);

  // place cards on grid
  for (var i = 0; i < nRows; i++) {
    //console.log(i);
    cardsGrid.push([]);
    for (var j = 0; j < nColumns; j++) {
      //console.log(j);
      //console.log(i*nColumns + j);
      cardsGrid[i].push(deck[i*nColumns + j]);
    }
  }

  render();

}

var render = function () {
	//if (bgReady) {
	//	ctx.drawImage(bgImage, 0, 0);
	//}

  drawCards();

};


// create shuffled deck containing pairs of cards
function createDeck(nCards, cardTypes) {
  var deck = [];
  var nCardTypes = cardTypes.length;
  for (var i = 0; i < nCards / 2; i++) {
    // randomly choose a card type
    var irandom = Math.floor(Math.random() * nCardTypes);
    // put two cards of that type in the deck
    deck.push(cardTypes[irandom]);
    deck.push(cardTypes[irandom]);
  }
  deck = shuffle(deck);
  return deck;
}


// place cards on canvas
function drawCards() {
  console.log('here1');
  for (var i = 0; i < nRows; i++) {
    for (var j = 0; j < nColumns; j++) {
      // dont draw cards which have already been matched
      if (cardsGrid[i][j] == 'vanished') {
        continue;
      }
      //
      image = cardImages[cardsGrid[i][j]];
      console.log(i);
      console.log(j);
      console.log(image);
      ctx.drawImage(image, j * cardWidth, i * cardHeight, cardWidth, cardHeight);
    }
  }
}

// react to clicks
function reactToClicks(card1, card2) {
  if (cardsGrid[card1[0]][card1[1]] == cardsGrid[card2[0]][card2[1]]) {
    cardsGrid[card1[0]][card1[1]] == 'vanished';
    cardsGrid[card2[0]][card2[1]] == 'vanished';
  }
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
