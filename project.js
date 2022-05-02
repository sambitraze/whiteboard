var is_down = false;
var action = 'draw';
var states = [];
var stIndex = -1;
var selection = [];
var clipboard = [];
var canvasBackup = null;
window.onload = function(){	
	canvas = document.getElementById( "canvas" );   
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		ctx.fillStyle = "#FFFFAA";
		ctx.fillRect(0, 0, canvas.width, canvas.height);						
		
		states[stIndex] = document.getElementById('canvas').toDataURL();
		states[stIndex + 1] = '~';
	}
	else{
		alert("context not found!");
	}
};

function actionChanged(x){	
	// ele = document.getElementById('controls');
	if(x == 'select'){	
		if(canvasBackup != null){
			var ctx = canvas.getContext('2d');	
			var canvasPic = new Image();
			canvasPic.src = canvasBackup;
			canvasPic.onload = function (){
				ctx.drawImage(canvasPic, 0, 0);							
			}
		}
		else{
			canvasBackup = document.getElementById('canvas').toDataURL();
		}
	}
	else if(x == 'draw'){
		if(canvasBackup != null){
			var ctx = canvas.getContext('2d');	
			var canvasPic = new Image();
			canvasPic.src = canvasBackup;
			canvasPic.onload = function (){
				ctx.drawImage(canvasPic, 0, 0);							
				canvasBackup = null;
			}
		}
	}
	else if(x == 'scale'){
		
	}	
	action = x;
}

// callback for mouse down events
var xDown;
var yDown;

function mouse_down(event) {
	
	xDown = event.clientX - 50;
	yDown = event.clientY - 100;

	is_down = true;

	coords = "X: "+ xDown + " Y: " + yDown;

	document.getElementById("down").innerHTML = coords;
	
	if(action == 'select'){
		if(canvasBackup != null){
			var ctx = canvas.getContext('2d');	
			var canvasPic = new Image();
			canvasPic.src = canvasBackup;
			canvasPic.onload = function (){
				ctx.drawImage(canvasPic, 0, 0);							
			}
		}
	}
	
}

// callback for mouse move events
var xOld;
var yOld;
function mouse_move(event) {

	x = event.clientX - 50;
	y = event.clientY - 100;

	if(is_down)	{
		var obj = document.getElementById('shape').value;
		switch(action){
			case 'draw':
				drawSelectedObject(obj, xDown, yDown, x, y);				
				break;			
			case 'translate':
				if(canvasBackup != null)
					translateSelectedArea(selection, x, y);
				break;
			case 'rotate':	
				if(canvasBackup != null)
					rotateSelectedArea(selection, x, xDown, y, yDown, xOld);
				break;
			case 'scale':				
				scaleSelectedArea(selection, x - xOld);
				break;

		}
	}

	coords = "X: "+ x + " Y: " + y;	
	document.getElementById("move").innerHTML = coords;
	xOld = x;
	yOld = y;
}


// callback for mouse up events
function mouse_up(event) {

	xUp = event.clientX - 50;
	yUp = event.clientY - 100;

	is_down = false;	
	if(xUp != xDown || yUp != yDown){
		var obj = document.getElementById('shape').value;
		switch(action){
			case 'draw':
				drawSelectedObject(obj, xDown, yDown, xUp, yUp);				
				push();
				break;
			case 'select':
				makeSelection(xDown, yDown, xUp, yUp);
				selection = [xDown, yDown, xUp-xDown, yUp-yDown];				
				break;
			case 'translate':
				if(canvasBackup != null){
					canvasBackup = document.getElementById('canvas').toDataURL();
					push();
					selection[0] = xUp;
					selection[1] = yUp;
					makeSelection(selection[0], selection[1], xUp+selection[2], yUp+selection[3]);					
				}
				break;
			case 'rotate':
				canvasBackup = null;
				push();				
			break;
		}		
	}
	coords = "X: "+ xUp + " Y: " + yUp;

	document.getElementById("up").innerHTML = coords;	
}

function key_down(event){	
	if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 'c':
            event.preventDefault();
			copy();
            break;
        case 'v':
            event.preventDefault();
            paste();			
            break;
        case 'z':
            event.preventDefault();
            undo();
			canvasBackup = null;
            break;
		case 'y':
            event.preventDefault();
            redo();
			canvasBackup = null;
            break;	
        }
    }
}