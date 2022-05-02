function translateSelectedArea(selection, x, y){
	var ctx = canvas.getContext('2d');		
	var canvasPic = new Image();
    canvasPic.src = canvasBackup;
    canvasPic.onload = function () {
		ctx.drawImage(canvasPic, 0, 0);
		ctx.fillStyle = "#FFFFAA";
		ctx.fillRect(selection[0], selection[1], selection[2], selection[3]);
		ctx.drawImage(canvasPic, selection[0], selection[1], selection[2], selection[3], x, y, selection[2], selection[3]  ); 		
	}	
}

function rotateSelectedArea(selection, x, xDown, y, yDown, xOld){
	var ctx = canvas.getContext('2d');		
	var canvasPic = new Image();
    canvasPic.src = canvasBackup;
    canvasPic.onload = function () {
		ctx.drawImage(canvasPic, 0, 0);
		ctx.fillStyle = "#FFFFAA";
		ctx.fillRect(selection[0], selection[1], selection[2], selection[3]);
		x -= selection[0] + (selection[2] / 2);	
		xDown -= selection[0] + (selection[2] / 2);
		xOld -= selection[0] + (selection[2] / 2);
		y -= selection[1] + (selection[3] / 2);			
		yDown -= selection[1] + (selection[3] / 2);
		yOld -= selection[1] + (selection[3] / 2);
		
		a = (x * xDown) + (y * yDown);
		b = Math.sqrt(x * x + y * y) * Math.sqrt(xDown * xDown + yDown * yDown);
		angle = Math.acos(a/b);
		
		if(x > xOld)
			angle = -angle;		
		
		ctx.translate( selection[0] + (selection[2] / 2), selection[1] + (selection[3] / 2));
		ctx.rotate(angle);
		ctx.translate( -(selection[0] + (selection[2] / 2)), -(selection[1] + (selection[3] / 2)) );		
		ctx.drawImage(canvasPic, selection[0], selection[1], selection[2], selection[3], selection[0], selection[1], selection[2], selection[3]  ); 		
		ctx.translate( selection[0] + (selection[2] / 2), selection[1] + (selection[3] / 2));
		ctx.rotate(-angle);
		ctx.translate( -(selection[0] + (selection[2] / 2)), -(selection[1] + (selection[3] / 2)) );
	}	
}

function scaleSelectedArea(selection, ratio){
	var ctx = canvas.getContext('2d');	
	var canvasPic = new Image();
    canvasPic.src = canvasBackup;
    canvasPic.onload = async function () {
		// ctx.drawImage(canvasPic, 0, 0);
		ctx.fillStyle = "#FFFFAA";
		ctx.fillRect(selection[0], selection[1], selection[2], selection[3]);
		ctx.drawImage(canvasPic, selection[0], selection[1], selection[2], selection[3], selection[0] + ratio/2, selection[1] + ratio/2, selection[2] - ratio/2, selection[3] - ratio/2);
		changeSelection([selection[0] + ratio/2, selection[1] + ratio/2, selection[2] - ratio/2, selection[3] - ratio/2], document.getElementById('canvas').toDataURL());
	}
}

function changeSelection(x, b){	
	selection = x;
	// canvasBackup = b;
}