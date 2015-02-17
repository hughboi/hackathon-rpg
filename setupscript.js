init = function() {
    var stage = new createjs.Stage("demoCanvas");    
    var i;
    var j;
    var size = 80;

    var canvas = document.getElementById("demoCanvas");
    var img = new Image();
    img.src = "example.bmp";
    context = canvas.getContext('2d');
    
    var height = canvas.height;
    var width = canvas.width;

    context.drawImage( img, width, height );

    for ( i = 0; i < 100; i++ ){
        for ( j = 0; j < 100; j++ ){
            var pixelData = context.getImageData( height + i, width + j, 1, 1 ).data;
            var isBlack = false;
	    
            var d;
            for ( d = 0; d < 3; d++){
		if ( pixelData[d] > 20 ){
                    break;
		}
            }
	    
            if ( d == 3 ){
		isBlack = true;
            }
	    
            if ( isBlack ){
		var square  = new createjs.Shape();
		square.graphics.beginFill("Black").drawRect(0, 0, size, size);
		square.x = i*size;
		square.y = j*size;
		stage.addChild(square);
            } 
        }
    }
        
    stage.update();
    
}