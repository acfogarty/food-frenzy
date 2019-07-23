// types of playing cards in the deck
var cardTypes = ["circle", "cross", "square", "triangle"];
var nCardTypes = cardTypes.length;

// grid used to lay out playing cards
var nColumns = 10;
var nRows = 10;
var nCards = nColumns * nRows; // TODO has to be even number
var cardsGrid = new Array(nRows, nColumns).fill('empty');

// create shuffled deck containing pairs of cards
var deck = [];
for (var i; i < nCards; i++) {
  // randomly choose a card type
  var irandom = Math.floor(Math.random() * nCardTypes);
  // put two cards of that type in the deck
  deck.push(cardTypes[irandom]);
  deck.push(cardTypes[irandom]);
}
deck = shuffle(deck);

// place cards on grid
for (var i; i < nRows; i++) {
  for (var j; j < nColumns; j++) {
    cardsGrid[i][j] = deck[i*j];
  }
}


// place cards on canvas


// react to clicks
reactToClicks(card1, card2) {
  var picture1 = grid
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

sum(array) {
   var sum = 0;
   for (var i=0, n=array.length; i < n; i++)
   {
      sum += array[i];
   }
   return sum;
}



// number of each type of card in the pack
var nCardsPerType = [4, 4, 4, 4]; // should be even numbers
var nCards = sum(numberOfCards);
    // if a card has already been placed here, skip
    if (cards[i][j] != 'empty') {
      continue;
    }
    // randomly choose which deck to draw from
    //
    // randomly draw a card
