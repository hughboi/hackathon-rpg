/**
This file gets the coordinates of all the
wall block
**/

var getpoints = function() {
	var wallPoints = [];

	var imgReady = false;
	var imgMap = new Image();
	imgMap.onload = new function(){
		imgReady = true;
	};
	imgMap.src = "map.png";

	// poll till the image is ready
	while( ! imgReady ){}

	var context = document.getElementById("canvas").getContext("2d");
	context.drawImage(imgMap,0,0);

	for ( var i = 0; i < 100; i++ ){
		for ( var j = 0; j < 100; j++ ){
			d = context.getImageData(i,j,1,1).data;
			if ( d[0] < 100 && d[1] < 100 && d[2] < 100 ){
				wallPoints.push( [i,j] );
			}
		}
	}

	return wallPoints;
}