function writeALetter(context, word, posx, posy, color) {
	context.save();
	context.font="20px sans-serif";
	context.beginPath();
	context.fillStyle = color;
	context.fillText(word, posx, posy);
	context.fill();
	context.restore();
}

function writeHexaNumbers(context, array, posx, posy, color) {
	for (var i of array) {
		//writeALetter(context, i.toString(16).toUpperCase(), posx, posy, color);
		writeALetter(context, parseInt(i, 10).toString(16), posx, posy, color);
		posx += 20;
	}
}
function erase(context, posx, posy, numElements) {
	for (var i = 0; i < numElements; i++) {
		context.save();
		context.fillStyle = "#ffffff";
		context.fillRect(posx, posy, 20, -18);
		context.restore();
		posx += 20;
	}
}


// BUBBLE SORT----------------------------------------------------
/*
async function do() {
	while(true) {
		await pause(id);

	}
}
*/

function pause(id) {
	return new Promise(resolve => setTimeout(() => {
		console.log("pause is over"); resolve(); }, 500));
}

var x = true;

async function swap(array, i, j, context, posy) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  //writeHexaNumbers(context, array, 650, posy);
  //writeHexaNumbers(context, array, 650, posy, "#009de6");
}

async function bubblesort(array, posy, context) {
	while(x) {
		for(var i = 0; i < array.length; i++) {
			for(var j = 1; j < array.length; j++) {
		      if(array[j - 1] > array[j]) {
		      	writeHexaNumbers(context, array, 650, posy);
		      	await pause(1);
		      	erase(context, 650, posy, array.length);
		      	writeHexaNumbers(context, array, 650, posy, "#009de6");
		        swap(array, j-1, j, context, posy);
		        posy = posy + 20;
		    	}
		    }
	   	}
	   	x = false;
	}
  return;
}


// MERGE SORT -----------------------------------------------------
var positiony = 75;
var index = 0;

function merge(left, right, array, context, posy, original) {
	console.log(original);

	nl = left.length;
	nr = right.length;
	i = 0; j = 0; k = 0;

	while (i < nl && j < nr) {
		if (left[i] <= right[j]) {
			array[k] = left[i];
			original[k] = left[i];
			i++;
		}
		else {
			array[k] = right[j];
			original[k] = right[j];
			j++;
		}
		k++;
	}
	while (i < nl) {
		array[k] = left[i];
		original[k] = left[i];
		i++; k++; 
	}
	while (j < nr) {
		array[k] = right[j];
		original[k] = right[j];
		j++; k++; 
	}
	return original;
}

async function mergesort(array, context, posy, original) {
	await pause(2);
	n = array.length;
	if (n < 2) {
		return;
	}
	var mid = Math.floor(n/2);
	var left = new Array(mid);
	var right = new Array(n-mid);
	for (var i = 0; i < mid; i++) {
		left[i] = array[i];
	}
	for (var i = mid; i < n; i++) {
		right[i-mid] = array[i];
	}
	//positiony += 20;
	//writeHexaNumbers(context, original, 10, positiony, "#009de6")
	mergesort(left, context, posy, original);
	mergesort(right, context, posy, original);
	var myArray = merge(left, right, array, context, posy, original);
	positiony += 20;
	writeHexaNumbers(context, myArray, 650, positiony, "#009de6");
}

// QUICK SORT -------------------------------------------------
yposition = 75;

function partition(array, start, end, context, posy){
   var pivot = array[end];
   var pindex = start;

   for (var i = start; i < end; i++) {
      if(array[i] <= pivot) {
        temp = array[i];
        array[i] = array[pindex];
        array[pindex] = temp;
        pindex++;
      }
   }
   temp = array[pindex];
   array[pindex] = array[end];
   array[end] = temp;
  
   return pindex;
}

async function quicksort(array, start, end, context, posy){
   if (start < end) {
   	yposition += 20;
   	posy = yposition;
   	writeHexaNumbers(context, array, 1000, posy);
    await pause(3);
    erase(context, 1000, posy, array.length);
    writeHexaNumbers(context, array, 1000, posy, "#009de6");
    pindex = partition(array, start, end, context, posy);
    quicksort(array, start, pindex-1, context, posy);
    quicksort(array, pindex+1, end, context, posy);
   }
}

// INSERT SORT -------------------------------------------------
var ypos = 75;

function insert(array, start, end, value){
		var tempArray = new Array(11);
		tempArray[0] = value;
		for(var j = start +1; j<end; j++){
			tempArray[j] = array[j-1];
		}
		array = tempArray;
		return;
}

async function InsertSort(array, start, end, context, posy){
	 for(var i = end; i>=start; i--){
		
		writeHexaNumbers(context, array, 10, posy);
		await pause(3);
		
		erase(context, 10, posy, array.length);
		var insertArray = insert(array,  start,  end, array[i])
		writeHexaNumbers(context, array, 10, posy, "#009de6");
		posy += 20;
	 }
}



