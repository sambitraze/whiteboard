function distance(x1,y1,x2,y2){
	return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
}

function push(){
	stIndex++;
	states[stIndex] = document.getElementById('canvas').toDataURL();
	states[stIndex+1] = '~';	
}

function undo(){
	
	if (stIndex >= 0){
		stIndex--;
		var ctx = document.getElementById('canvas').getContext("2d");		
		var canvasPic = new Image();
        canvasPic.src = states[stIndex];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
	}
}

function redo(){
	if(states[stIndex+1] != '~'){
		stIndex++;
		var ctx = document.getElementById('canvas').getContext("2d");		
		var canvasPic = new Image();
		canvasPic.src = states[stIndex];
		canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
	}
}

function copy(){
	clipboard[0] = canvasBackup;
	clipboard[1] = selection;
}

function paste(){
	var ctx = canvas.getContext('2d');	
	var canvasPic = new Image();
	canvasPic.src = clipboard[0];
	canvasPic.onload = function (){
		ctx.drawImage(canvasPic, 0, 0);
		ctx.drawImage(canvasPic, clipboard[1][0], clipboard[1][1], clipboard[1][2], clipboard[1][3], 0, 0, clipboard[1][2], clipboard[1][3]  );
		push();
		canvasBackup = document.getElementById('canvas').toDataURL();
		selection = [0, 0, clipboard[1][2], clipboard[1][3]];
		makeSelection(0, 0, clipboard[1][2], clipboard[1][3]);
		clipboard=[];
	}	
}

function save(){
	var canvasContents = document.getElementById('canvas').toDataURL();
	var data = { image: canvasContents, date: Date.now() };
	var string = JSON.stringify(data);

	var file = new Blob([string], {type: 'application/json'});
	
	var fName = prompt("What would you like to name this file?", "diagram1");
	
	var a = document.createElement('a');
	a.href = URL.createObjectURL(file);
	a.download = fName+'.json';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function saveAsImage(){
	var canvasContents = document.getElementById('canvas').toDataURL("image/jpeg");
	// var data = { image: canvasContents, date: Date.now() };
	// var string = JSON.stringify(data);

	//var file = new Blob([canvasContents], {type: "application/octet-stream"});
	var fName = prompt("What would you like to name this file?", "image1");
	
	var a = document.createElement('a');
	a.href = canvasContents;
	a.download = fName+'.jpeg';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

var reader = new FileReader();
reader.onload = function () {
  var data = JSON.parse(reader.result);
  var image = new Image();
  image.onload = function () {
	var ctx = document.getElementById('canvas').getContext("2d");	
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0); // draw the new image to the screen
  }
  image.src = data.image; // data.image contains the data URL
};

function load(file){	
	if (file) {    
		reader.readAsText(file);
	}		
}

function toggleDebugDisplay(){
	var debug = document.getElementById('debug_tools');
	if(debug.style.display == 'none')
		debug.style.display = 'inline';
	else
		debug.style.display = 'none';
}