var boxes = [];
var boxElements = document.querySelectorAll('.box');
for (var i = 0; i < boxElements.length; i++) {
    boxes.push(boxElements[i]);
}
var message = document.getElementById('message');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
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
        var a = board[winningPattern[0]];
        var b = board[winningPattern[1]];
        var c = board[winningPattern[2]];
        if (a !== '' && a === b && b === c) {
            thereIsAWinner = true;
            break;
        }
    }

    if (thereIsAWinner) {
        if (currentPlayer === 'X') {
            message.innerHTML = `Mcdonald's Won`;
        } else {
            message.innerHTML = 'KFC Won';
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
        message.innerHTML = `It's a tie.`
        gameIsRunning = false;
        return;
    }
}

var isValidMove = function (box) {
    if (box.innerText === 'X' || box.innerText === 'O'){
        return false;
    }
    return true;
};

var changePlayer = function () {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
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
      var img = document.createElement("img");
      img.src = (currentPlayer === "X") ? "./images/pic2.png" : "./images/kfc.jpeg";
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

  var getQuote = function () {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        message.innerHTML = `${data.content} - ${data.author}`;
      })
      .catch(error => {
        console.log(error);
        message.innerHTML = 'Error fetching quote. Please try again later.';
      });
  };
  
  getQuote();
  
