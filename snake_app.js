$(document).ready(function() {
	
	var boardDimention = 100; //assume square board
	var game = new Snake.Game(boardDimention);
	var ui = new Snake.UI(game);
	ui.start();
});