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
    
    worker.onMessage = function(e){
	stage = JSON.parse(e.data.stage);
    };

    console.log('Here?');

    var strcanvas = JSON.stringify(canvas);
    console.log('Or Here?');
    // error located here
    // cant stringify the stage
    var strstage = JSON.stringify(stage);
    console.log('Or Even Here?');
    worker.postMessage({
	'canvas': strcanvas,
	'stage': strstage
    });
    console.log('Nope');

    console.log("setup complete");    
    stage.update();    
}

