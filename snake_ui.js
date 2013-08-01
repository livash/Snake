
Snake.UI = (function() {
	function UI(game) {
		this.game = game;
	}
	
	UI.prototype.start = function() {
		var that = this;
		
		that.drawBoard();
		that.drawSnakeApple();
			
		var refreshIntervalId = window.setInterval(function() {
			that.clearBoard();
			that.game.step();
			that.drawSnakeApple();
			
			if (that.game.isOver()) {
				clearInterval(refreshIntervalId);
			}
		}, 5);
	}
	
	UI.prototype.drawBoard = function() {
		var that = this;
		var board = $('<div>');
		board.addClass('board');
		
		for(var i = 0; i < that.game.board.length; i++) {
			var row = $('<div>');
			row.addClass('row');
			board.append(row);
			
			for(var j = 0; j <that.game.board.length; j++) {
				var element = $('<div>');
				element.addClass('element');
				element.text('');
				element.css({'float' : 'left'});
				row.append(element);
			}	
		}
		$('body').append(board);
		
	}
	
	UI.prototype.drawSnakeApple = function() {
		var snakeBody = this.game.snake.body;
		var boardDim = this.game.board.length;
		var snakeBodyToIdx = [];
		var applePos = this.game.apple.position;
		var applePosToIdx = applePos[1] + applePos[0] * boardDim;
	
		_.each(snakeBody, function(position, i) {
			var k = position[1] + position[0] * boardDim;
			snakeBodyToIdx.push(k);
		});
		
		$('.element').each(function(idx, element) {
			for(var j = 0; j < snakeBodyToIdx.length; j++) {
				if (snakeBodyToIdx[j] === idx) {
					$(element).addClass('snake');
				} else if (applePosToIdx === idx) {
					$(element).addClass('apple');
				}
			};
		});
	}
	
	UI.prototype.clearBoard = function() {
		var apple = $('.apple').removeClass();
		apple.addClass('element');
		var snake = $('.snake').removeClass();
		snake.addClass('element');
	}
	
	return UI;
})();









