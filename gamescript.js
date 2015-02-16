var canvas;
var ctx;


// Image drawing precautions and loading image files
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "Game/art/bg.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "Game/art/character.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "Game/art/spider.png";

// Game objects
var hero = {
	speed: 256,
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};
var monstersCaught = 0; // Some kind of counter

// Player input
var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

// Reset game when player touches spider
var reset = function() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// monster placed randomly
	monster.x = 32 + (Math.random()*(canvas.width-64));
	monster.y = 32 + (Math.random()*(canvas.height-64));
};

// Update objects
var update = function (modifier) {
	if (38 in keysDown) { // 38 = up button
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // 40 = down button
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // 37 = left button
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // 39 = right button
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 64)
		&& monster.x <= (hero.x + 64)
		&& hero.y <= (monster.y + 64)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function(){
	if (bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady){
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Draw Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBastline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function() {
	var now = Date.now();
	var delta = now - then;
	// then will be declared when starting the game

	update(delta / 1000);
	render();

	then = now;

	// Requestion to do this again ASAP
	// (Recalls main)
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Start game!
var then;
var start = function() {
	canvas = document.getElementById("canvas");
	ctx  = canvas.getContext("2d");
	then = Date.now();
	reset();
	main();
};