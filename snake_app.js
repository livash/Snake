$(document).ready(function() {
	var game = new Snake.Game(200);
	var ui = new Snake.UI(game);
	//alert("Hello");
	ui.start();
});