var boxes = [];
var boxElements = document.querySelectorAll('.box');
for (var i = 0; i < boxElements.length; i++) {
    boxes.push(boxElements[i]);
}
var message = document.getElementById('message');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'MDN';
let gameIsRunning = true;

var winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function resultIsValid() {
    let thereIsAWinner = false;
    for (let i = 0; i < winningPatterns.length; i++) {
        var winningPattern = winningPatterns[i];
        var firstBoxValue = board[winningPattern[0]];
        var secondBoxValue = board[winningPattern[1]];
        var thridBoxValue = board[winningPattern[2]];
        if (firstBoxValue !== '' && firstBoxValue === secondBoxValue && secondBoxValue === thridBoxValue) {
            thereIsAWinner = true;
            break;
        }
    }

    if (thereIsAWinner) {
        if (currentPlayer === 'MDN') {
            message.innerHTML = `I'm lovin' it! McDonald's takes the win!`;
        } else {
            message.innerHTML = 'Winner, winner, KFC dinner!';
        }
        gameIsRunning = false;
        return;
    }
    
    let isTie = true;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            isTie = false;
            break;
        }
    }
    if (isTie) {
        message.innerHTML = `Looks like it's a draw! Try again for a winner.`
        gameIsRunning = false;
        return;
    }
}

var isValidMove = function (box) {
    if (box.innerHTML !== ""){
        return false;
    }
    return true;
};

var changePlayer = function () {
    if (currentPlayer === 'MDN') {
        currentPlayer = 'KFC';
    } else {
        currentPlayer = 'MDN';
    }
}

var updateBoard = function (index) {
    board[index] = currentPlayer;
}

// var userAction = (box, index) => {
//     if(isValidMove(box) && gameIsRunning) {
//         box.innerText = currentPlayer;
//         box.classList.add(currentPlayer);
//         updateBoard(index);
//         resultIsValid();
//         changePlayer();
//     }
// }

var userAction = (box, index) => {
    if (isValidMove(box) && gameIsRunning) {
        // box.innerText = " ";
      var img = document.createElement("img");
      img.src = (currentPlayer === "MDN") ? "./images/pic2.png" : "./images/kfc.jpeg";
      img.alt = currentPlayer;
      img.classList.add("symbol-image");
      box.appendChild(img);
      box.classList.add(currentPlayer);
      updateBoard(index);
      resultIsValid();
      changePlayer();
    }
  };
  
  

// Add event listener for each box element
for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    box.addEventListener('click', function () {
      userAction(box, i);
    });
  }

  var quotes = [
    "Get ready to battle it out in the ultimate fast food showdown!",
    "The finger-lickin' good KFC faces off against the world-famous Mcdonald's!",
    "Can you lead KFC or Mcdonald's to victory in this game of Tic Tac Toe?",
    "It's time to see which fast food giant comes out on top in this game of strategy and skill!",
    "Get ready to test your strategy skills in this fast food-themed game of Tic Tac Toe!",
    "Can you outsmart your opponent and claim victory for your fast food chain of choice?",
    "The battle between KFC and Mcdonald's is about to commence. Let the games begin!",
    "Choose your side, make your moves, and claim ultimate fast food glory!",
    "The fate of fast food rests in your hands. Good luck!",
    "Think you've got what it takes to dominate the fast food industry? Prove it in this game of Tic Tac Toe!"
  ];
  
  var getRandomQuote = function () {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };
  
  message.innerHTML = getRandomQuote();
  

//   var getQuote = function () {
//     fetch('https://api.quotable.io/random')
//       .then(response => response.json())
//       .then(data => {
//         message.innerHTML = `${data.content} - ${data.author}`;
//       })
//       .catch(error => {
//         console.log(error);
//         message.innerHTML = 'Error fetching quote. Please try again later.';
//       });
//   };
  
//   getQuote();
  
