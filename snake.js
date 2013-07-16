//_ = require('underscore');
var Snake = {};

Snake.Game = (function() {
	function SnakeGame(gridDim) {
		this.gridDim = gridDim;
		this.snake = new Snake(this.gridDim);
		this.apple = new Apple(this.gridDim);
		this.emptyMark = "_";
		this.score = this.snake.score;
		this.board = new Array();
		
		this.initializeBoard();
		// this.snake.draw(this.board);
// 		this.apple.draw(this.board);
	}
	
	SnakeGame.prototype.initializeBoard = function() {
		//draw square board with empty marks 
		
		var that = this;
		//console.log(that);
		_.times(that.gridDim, function() {
			//console.log(that.emptyMark);
			var row = new Array(that.gridDim);
			//console.log(that.gridDim);
			for(var i = 0; i < row.length; i++) {
				row[i] = that.emptyMark;
			}
			that.board.push(row);
		});
	}
	
	SnakeGame.prototype.isOver = function() {
		return this.snake.isHitWall();
	}
	
	SnakeGame.prototype.print = function(){
		var that = this;
		_.each(that.board, function(row, idx) {
			console.log(row);
		});
	}
	
	SnakeGame.prototype.step = function(){
		var that = this;
		that.snake.move(that.snake.direction);
		// that.snake.draw(this.board);
// 		that.apple.draw(this.board);
		if (that.snake.isHitWall()) {
			console.log("Game over");
			return false;
			
		} else if (that.snake.isHitApple(this.apple)) {
			that.snake.eatApple(this.apple);
			that.snake.grow();
		}
		return true;
	}
	
	function Snake(boardDim) {
		this.body = [];
		this.direction = 'north';
		this.boardDim = boardDim;
		this.lastTailPos =[]; 
		this.score = 0;
		
		this.makeNewSnake();
	}
	
	Snake.prototype.makeNewSnake = function() {
		var col = this.boardDim / 2;
		var row = this.boardDim / 2;
		this.body.push([row, col]);
		this.body.push([row - 1, col]);
	}
	
	Snake.prototype.move = function(direction) {
		
		switch(direction) {
		case "north":
			var headPos = _.last(this.body);
			var newPos = [headPos[0] - 1, headPos[1]];
			this.body.push(newPos);
			this.lastTailPos = this.body.shift();
			break;
		case "south":
			var headPos = _.last(this.body);
			var newPos = [headPos[0] + 1, headPos[1]];
			this.body.push(newPos);
			this.lastTailPos = this.body.shift();
			break;
		case "east":
			var headPos = _.last(this.body);
			var newPos = [headPos[0], headPos[1] + 1];
			this.body.push(newPos);
			this.lastTailPos = this.body.shift();
			break;
		case "west":
			var headPos = _.last(this.body);
			var newPos = [headPos[0], headPos[1] - 1];
			this.body.push(newPos);
			this.lastTailPos = this.body.shift();
			break;
		default:
			console.log('no such direction');
			return false;	
		};
	}
	
	
	Snake.prototype.isHitApple = function(apple) {
		//snake head is next to an apple
		var headPos = _.last(this.body);
		if (apple.position[0] === headPos[0] && apple.position[1] === headPos[1]) {
			return true;
		} else {
			return false;
		}
	}
	
	Snake.prototype.isHitWall = function() {
		var headPos = _.last(this.body);
		if (headPos[0] <= 0 || headPos[0] >= this.boardDim ) {
			return true;
		}
		if (headPos[1] <= 0 || headPos[1] >= this.boardDim ) {
			return true;
		}
		return false;
	}
	
	Snake.prototype.eatApple = function(apple) {
			this.score += apple.score;
			apple.makeNewApple();
			return true;
	}
	
	Snake.prototype.grow = function() {
		//add one square to the head ontop of the apple square.
		this.body.unshift(this.lastTailPos);
	}
	
	Snake.prototype.draw = function(board) {
		
		for (var i = 0; i < this.body.length; i++) {
			var row = this.body[i][0];
			var col = this.body[i][1];
			board[row][col] = "S";
		}
	}
	
	function Apple(boardDim) {
		this.position = [];
		this.boardDim = boardDim;
		this.score = 10;
		this.makeNewApple();
	}
	
	Apple.prototype.draw = function(board) {
		var row = this.position[0];
		var col = this.position[1];
		board[row][col] = "A";
	}
	
	Apple.prototype.makeNewApple = function() {
		var col = Math.ceil(Math.random() * this.boardDim) - 1;
		var row = Math.ceil(Math.random() * this.boardDim) - 1;
		//apple can not be made on the body of the snake
		this.position = [row, col];
		return true;
	}
	
	return SnakeGame;
})();


