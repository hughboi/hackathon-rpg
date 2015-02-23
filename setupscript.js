init = function() {
    var stage = new createjs.Stage("demoCanvas");    
    var i, j;
    var size = 80;

    var canvas = document.getElementById("demoCanvas");
    var img = new Image();
    img.src = "example.bmp";
    context = canvas.getContext('2d');
    
    var height = canvas.height;
    var width = canvas.width;

    context.drawImage( img, 0, 0 );

    var worker = new Worker('game2webworker.js');
    
    worker.onmessage = function(e){
	stage = e.data.stage;
    };

    worker.postMessage({
	'canvas': canvas,
	'stage': stage
    });

    console.log("setup complete");    
    stage.update();
    
}

