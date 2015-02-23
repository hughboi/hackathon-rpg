var setup = function( context, stage ){
    console.log('Whassup');
    for ( i = 0; i < 100; i++ ){
        for ( j = 0; j < 100; j++ ){
            var pixelData = context.getImageData( i, j, 1, 1 ).data;
            var isBlack = false;
            var d;
	    
            for ( d = 0; d < 3; d++){
		if ( pixelData[d] < 200 ){
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
		console.log( "What now" );
		stage.addChild(square);
            } 
        }
    }
};

self.onmessage = function(e) {
    console.log('Entered worker');
    setup( JSON.parse(e.data.stage), JSON.parse(e.data.canvas) );

    self.postMessage ({
	'stage': JSON.stringify(e.data.canvas)
    });
};