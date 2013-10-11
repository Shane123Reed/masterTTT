'use strict';

angular.module('masterTTTApp')
 .controller('MainCtrl', function ($scope, angularFire) {
   // binding these to firebase
   $scope.games = [];
   $scope.queue = {};

   var games = new Firebase("https://sjrtictactoe.firebaseio.com/games");
   angularFire(games, $scope, "games").then(function () {

     var queue = new Firebase("https://sjrtictactoe.firebaseio.com/queue");
     angularFire(queue, $scope, "queue").then(function () {
       if ($scope.queue.gameId == undefined) {
         console.log("I'm player 1");
         $scope.player = "p1";

         var newGame = {
           board: [[{mark:"", r="0", c="0"},{mark:"", r="0", c="1"},{mark:"", r="0", c="2"}],
                   [{mark:"", r="1", c="0"},{mark:"", r="1", c="1"},{mark:"", r="1", c="2"}],
                   [{mark:"", r="2", c="0"},{mark:"", r="2", c="1"},{mark:"", r="2", c="2"}]],
           turn: 'p1',
           win: false,
           turnCount: 0,
           playerTurn: 1



         };

         $scope.gameId = $scope.games.push(newGame) - 1;
         $scope.queue.gameId = $scope.gameId;
         console.log("Player 1's game is: " + $scope.gameId);

       } else {
         console.log("I'm player 2");
         $scope.player = "p2";

         $scope.gameId = $scope.queue.gameId;
         $scope.queue = {};
         console.log("Player 2's game is: " + $scope.gameId);
       }
     });

   });



//end of firebase binding


$scope.clickSquare = function(cell){
  if($scope.games[$scope.gameId].playerTurn % 2 == 1)
         cell.mark = "x";
       else
         cell.mark = "o";
     $scope.games[$scope.gameId].playerTurn++;
};


$scope.findimg = function(cell){
     switch (cell.mark){
     case "x": 
     return "img/dotsx.png";
     case "o":
     return "img/dots.png";
     }
};

$scope.winningCombo = function() {
//Diagonal
if($scope.board[1][1].mark != ""){

if($scope.board[0][0].mark == $scope.board[1][1].mark &&
$scope.board[1][1].mark == $scope.board[2][2].mark ||
$scope.board[0][2].mark == $scope.board[1][1].mark &&
$scope.board[1][1].mark == $scope.board[2][0].mark) {
alert("WINS");
}
}


// //columns
for (var c=0; c<=2; ++c) {
if($scope.board[0][c].mark != "" &&
$scope.board[0][c].mark == $scope.board[1][c].mark &&
$scope.board[1][c].mark == $scope.board[2][c].mark) {
alert("WINS");
}
}

//rows
for (var r=0; r<=2; ++r) {
if($scope.board[r][0].mark != "" &&
$scope.board[r][0].mark == $scope.board[r][1].mark &&
$scope.board[r][1].mark == $scope.board[r][2].mark) {
alert("WINS");
}
}
};




//Everything above this line ----------

 });