var color = "#FF0000";
var lineStyle = 1;

function drawSelectedObject(selectedObj, x1, y1, x2, y2){
	var ctx = canvas.getContext('2d');
	
	switch(selectedObj){
		case 'circle':							
			ctx.beginPath();
			ctx.arc(x1, y1, distance(x1,y1,x2,y2), 0, 2 * Math.PI);
			ctx.fillStyle = color;
			ctx.fill();						
			break;
		case 'rectangle':										
			ctx.beginPath();			
			ctx.fillStyle = color;
			ctx.fillRect(x1, y1, x2-x1, y2-y1);
			ctx.closePath();
			break;
		case 'line':	
			if(!is_down){
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);	
				ctx.lineWidth = lineStyle;		
				ctx.strokeStyle = color;
				ctx.stroke();
				ctx.closePath();
			}
			break;
		case 'triangle':	
			ctx.beginPath();
			ctx.moveTo(trngl[0][0], trngl[0][1]);
			ctx.lineTo(trngl[1][0], trngl[1][1]);
			ctx.lineTo(trngl[2][0], trngl[2][1]);
			ctx.fillStyle = "#7fdde9";
			ctx.fill();			
			break;
	}
}

function makeSelection(x1, y1, x2, y2){
	var ctx = canvas.getContext('2d');	
	ctx.beginPath();
	ctx.setLineDash([6]);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(x1, y1, x2-x1, y2-y1);	
	ctx.setLineDash([0]);
	ctx.closePath();
}


function colorChanged(c){
	color = c;
}

function lStyleChanged(w){
	lineStyle = w;
}