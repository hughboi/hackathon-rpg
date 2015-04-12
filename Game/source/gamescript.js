var canvas;
var ctx;

// Holds the points of the wall
// when project started 
var points;

// Image drawing precautions and loading image files
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "../art/bg.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "../art/character.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "../art/spider.png";

var wallBlockReady = false;
var wallBlockImage = new Image();
wallBlockImage.onload = function(){
	wallBlockReady = true;
};
wallBlockImage.src = "../art/block.png";

// Game objects
var wallBlock = {
	x: 0, 
	y: 0, 
	h: 64, 
	w: 64
};
var hero = {
	speed: 256,
	x: 0, 
	y: 0, 
	h: 64, 
	w: 64
};
var monster = {
	x: 0, 
	y: 0, 
	h: 64, 
	w: 64
};
var camera = {
	x: 0,
	y: 0,
	h: 0,
	w: 0
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
	// monster placed randomly
	monster.x = 32 + (Math.random()*(canvas.width-64));
	monster.y = 32 + (Math.random()*(canvas.height-64));
};

// Checks the rectangles of two objects and
// 		sees if they are touching
var check_collision = function( object1, object2 ){
	var top_left_x;
	var top_left_y;
	var bottom_right_x;
	var bottom_right_y;

	if ( object2.x < object1.x ){
		top_left_x = object2.x;
	} else {
		top_left_x = object1.x;
	}
	if ( object2.y < object1.y ){
		top_left_y = object2.y;
	} else {
		top_left_y = object1.y;
	}
	if ( object1.x + object1.w > object2.x + object2.w ){
		bottom_right_x = object1.x + object1.w;
	} else {
		bottom_right_x = object2.x + object2.w;
	}
	if ( object1.y + object1.h > object2.y + object2.h ){
		bottom_right_y = object1.y + object1.h;
	} else {
		bottom_right_y = object2.y + object2.h;
	}

	var threshold_h = object1.h + object2.h;
	var threshold_w = object1.w + object2.w;
	var containing_h = Math.abs(bottom_right_y - top_left_y);
	var containing_w = Math.abs(bottom_right_x - top_left_x);

	if ( 
		threshold_h > containing_h &&
		threshold_w > containing_w
	) {
		return true;
	} else {
		return false;
	}

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
		check_collision( hero, monster )
	) {
		++monstersCaught;
		reset();
	}

};

// Draw everything
var render = function(){
	if ( bgReady ){
		ctx.drawImage(bgImage, 0, 0);
	}
	if ( heroReady ){
		ctx.drawImage(
			heroImage, 
			hero.x, 
			hero.y
		);
	}
	if ( 
		monsterReady && 
		check_collision (monster, camera)
	){
		ctx.drawImage(
			monsterImage, 
			monster.x - camera.x, 
			monster.y - camera.y
		);
	}
	if ( wallBlockReady ){
		ctx.drawImage(
			wallBlockImage, 
			camera.x - wallBlock.x, 
			camera.y - wallBlock.y
		);
	}

	// Draw Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBastline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);

	// Draw walls
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
	camera.h = canvas.height;
	camera.w = canvas.width;
	points = getpoints();
	ctx  = canvas.getContext("2d");
	then = Date.now();
	reset();
	main();
};