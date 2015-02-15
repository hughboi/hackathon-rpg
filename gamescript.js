var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};

bgImage.src = "images"