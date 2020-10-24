//GLOBAL VARIBABLES AND FUNCTION DEFINITIONS========================================
//What is the list of hexa string?--------------------------------------------------
var myList = 
[
	"05CA627BC2B6F03",
	"065DE6671F040BA",
	"0684FB893D5754E",
	"07C9A2D183E4B65",
	"09F48E7862D2616",
	"1FAB3D47905C286",
	"286E1D0342D7859",
	"30E530C4786AF21",
	"328DE4765C10BA9",
	"34F2756F18E90BA",
	"90BA34F0756F180",
	"D7859286E2D0342"
];
//Randomly pick an array from the list----------------------------------------------
function getARandomHexaArray(myList)
{
  return myList[Math.floor(Math.random() * myList.length)];
}

//Get the random hexa array now (should be 15 hexa digits)--------------------------
let randomizedString = getARandomHexaArray(myList);

//Convert the string into an array of hexa digits-----------------------------------
let originArray = randomizedString.split("");

//Let store the result of the sorted array first, then make a comparison later------
//to see if the sorting array is matched with the sorted array----------------------
let array2 = randomizedString.split("");//Get the sorting array, stored as an array
let sortedArray = array2.sort();//Get it sorted now

//Separate variables that mark the working cell(s) in each run of each algorithm----
let statesArrayOfMergeSort = []; //Merge Sort
let statesArrayOfGoldPoreSort = [];//Gold's Poresort
let statesArrayOfQuickSort = [];//Quicksort
let statesArrayOfInsertSort = [];//Insertsort
let waitTime = 100; //Wait time for synchornize the result

//Seprate variables that define the new row of for each algorithm Row Mgr-----------
let newLineIndicator = 0;
let newLineIndicator2 = 0;
let newLineIndicator3 = 0;
let newLineIndicator4 = 0;

//What is the width size of the cell, measure by pixel units-----------------------  
let w = 20;

let OddOrEvenStatus = 0; //Use to check cases of odd and even pairs in Gold PoreSort
let needANewLine = 0;

let valuesArrayOfMergeSort = [];
let valuesArrayOfGoldPoreSort = [];
let valuesArrayOfQuickSort = [];
let valuesArrayOfInsertSort = [];

let startPositionValues = 0;	//Merge sort
let startPositionValues2 = 0;	//Gold's pore sort
let startPositionValues3 = 0;	//Quick sort	
let startPositionValues4 = 0;	//Insert sort

//What is the color states and values of each algorithm array----------------------
function initialStatesAndValues(myValuesArray, myStatesArray)
{
	for (let i = 0; i < valuesArrayOfMergeSort.length; i++) 
	{
		myValuesArray[i] = originArray[i];
		myStatesArray[i] = -1;
	}
}

//Where is the starting printing position per array of each algorithm--------------
function initialPositionValuesForPrinting()
{
	newLineIndicator = newLineIndicator2 = newLineIndicator3 = newLineIndicator4 = 2;
	startPositionValues = 0;
	startPositionValues2 = valuesArrayOfGoldPoreSort.length + 1;
	startPositionValues3 = valuesArrayOfQuickSort.length*2 + 2;
	startPositionValues4 = valuesArrayOfInsertSort.length*3 + 3;
}

//Let's print out some first title and origin array before any sorting-------------
function initialPrintingOriginArray(myValueArray, myStartPosition)
{
    textSize(numberSize);//set size of text
    //Print out the origin array
	for (let j = 0; j < myValueArray.length; j++)
	{
      fill("black");
      text(myValueArray[j], (j+myStartPosition) * w, w, w, w);
    }
}

//Font text size
let titleSize = 25;
let numberSize = 20;

function rotateArrayOneUnit(myArray)
{
	let temp = myArray[myArray.length-1];
	for (let i = myArray.length-1; i > 0 ; i--)
	{
		myArray[i]=myArray[i-1];
	}
	myArray[0] = temp;
}

//Pass
async function printAPassForAnAlgorithm(titleVar, xPosition, newLineVar, valueVar,startVar, sortID)
{
	textSize(titleSize);
    fill("black");
    text(titleVar, xPosition, 0, 300, 300);
    newLineVar++;
	initialPrintingOriginArray(valueVar, startVar);
	newLineVar++;
	
	switch(sortID)
	{
		case 1: mergeSort(valuesArrayOfMergeSort); break;
		case 2: poreSort(valuesArrayOfGoldPoreSort); break;
		case 3: quickSort(valuesArrayOfQuickSort, 0, valuesArrayOfQuickSort.length - 1); break;
		case 4: insertSort(valuesArrayOfInsertSort); break;
	};
}

//Race Manager
async function raceMgr()
{	
		initialStatesAndValues(valuesArrayOfMergeSort, statesArrayOfMergeSort);
		initialStatesAndValues(valuesArrayOfGoldPoreSort, statesArrayOfGoldPoreSort);
		initialStatesAndValues(valuesArrayOfQuickSort, statesArrayOfQuickSort);
		initialStatesAndValues(valuesArrayOfInsertSort, statesArrayOfInsertSort);
	  
		initialPositionValuesForPrinting();
		
		await printAPassForAnAlgorithm("MERGE SORT", 65, newLineIndicator, valuesArrayOfMergeSort, startPositionValues,1);
		await printAPassForAnAlgorithm("GOLD'S PORESORT", 350,newLineIndicator2, valuesArrayOfGoldPoreSort, startPositionValues2,2);
		await printAPassForAnAlgorithm("QUICK SORT", 700, newLineIndicator3, valuesArrayOfQuickSort, startPositionValues3,3);
		await printAPassForAnAlgorithm("INSERT SORT", 1025, newLineIndicator4, valuesArrayOfInsertSort, startPositionValues4,4);
}

async function setup() 
{
	createCanvas(1420, 1500);
	
	valuesArrayOfMergeSort = new Array(floor(15));
	valuesArrayOfGoldPoreSort = new Array(floor(15));
	valuesArrayOfQuickSort = new Array(floor(15));
	valuesArrayOfInsertSort = new Array(floor(15));

	for (let i = 0; i < originArray.length; i++)
	{
		await raceMgr();
		await sleep(waitTime*900);
		await rotateArrayOneUnit(originArray);
		canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
	}
	//Then the draw will do the rest (with built-in asynchornized sleep function)
}

//Implementation of the Merge Sort-----------------------------------------------------------------------
async function mergeSort(myValuesArray)
{
  //Let's create a copy of the value array, then we will sort in the copy version
  convertedArray = myValuesArray.slice();
  mergeSortSlice(convertedArray, 0, convertedArray.length);//go to the detail
  return;
}

async function mergeSortSlice(myArray, startPosition, endPosition) 
{
  if (endPosition - startPosition <= 1) 
  {
    return;
  }

  var midPosition = Math.round((endPosition + startPosition) / 2);

  await mergeSortSlice(myArray, startPosition, midPosition);
  await mergeSortSlice(myArray, midPosition, endPosition);

  let i = startPosition;
  let j = midPosition;
  for (let i = startPosition; i < midPosition; i++) 
  {
    statesArrayOfMergeSort[i] = 2;
  }

  while (j < endPosition && i < endPosition) 
  {
    if (arraysAreIdentical(myArray, sortedArray) == true) 
	{
      break;
    }
    if (myArray[i] > myArray[j]) //Check to see if a new line needed
	{
      
      needANewLine = 0;//need a new line to re-list all numbers, remember to swap
      statesArrayOfMergeSort[i] = 0;
      statesArrayOfMergeSort[j] = 1;

      let t = myArray[j];
	  
      myArray.splice(j, 1);
      myArray.splice(i, 0, t);

      j++;//Then increment
    } 
	else //Check to see if a new line needed		
	{
      needANewLine = 1;//myArray[i < myArray[j] : no need to re-list a new line
      await sleep(waitTime);
      statesArrayOfMergeSort[i] = 2;
      statesArrayOfMergeSort[j] = 2;
      await sleep(waitTime);
    }
    
	i++; //Done the swap? let increase i
    
	if (i == j)
	{
      j++;
    }

    valuesArrayOfMergeSort = myArray.slice();

    await sleep(waitTime);
    if (needANewLine == 0) 
	{
		newLineIndicator++;
	}
	await sleep(waitTime);//Let's redraw new line
    for (let i = 0; i < valuesArrayOfMergeSort.length; i++) //and wait for next loop 
	{
      statesArrayOfMergeSort[i] = -1;
    }
  }
}

//Implementation of the Gold's poresort
async function swapAndIllustrateAStepGoldPoreSort(myArray)
{
	//If I visit the odd pairs already, let's visit the even pairs also, and vice versa
	OddOrEvenStatus = (OddOrEvenStatus == 0)?1:0;
	for (let j = OddOrEvenStatus; j < valuesArrayOfGoldPoreSort.length; j = j + 2) 
	{
		statesArrayOfGoldPoreSort[j] = 2;//For coloring purpose
		statesArrayOfGoldPoreSort[j + 1] = 2;//For coloring purpose
		
		await sleep(waitTime); // Then illustrate them
		
		if (myArray[j] > myArray[j + 1]) 
		{
			await sleep(waitTime);
			statesArrayOfGoldPoreSort[j] = 0;//For coloring purpose
			statesArrayOfGoldPoreSort[j + 1] = 1;//For coloring purpose
			  
			await sleep(waitTime);
			await swapTwoValues(myArray, j, j + 1);
			await sleep(waitTime);
		
			statesArrayOfGoldPoreSort[j] = 1;//For coloring purpose
			statesArrayOfGoldPoreSort[j + 1] = 0;//For coloring purpose
			  
			await sleep(waitTime);
			newLineIndicator2++;
			await sleep(waitTime);
		} 
		else 
		{
			await sleep(waitTime);
			statesArrayOfGoldPoreSort[j] = 2;//For coloring purpose
			statesArrayOfGoldPoreSort[j + 1] = 2;//For coloring purpose
			await sleep(waitTime);
		}
		for (let i = 0; i < statesArrayOfGoldPoreSort.length; i++) 
		{
			statesArrayOfGoldPoreSort[i] = -1;//For coloring purpose
		}
	}
}
async function poreSort(myArray) 
{
  OddOrEvenStatus = 0;
  for (let i = 0; i < valuesArrayOfGoldPoreSort.length; i++) 
  {
    if (arraysAreIdentical(myArray, sortedArray) == true) 
	{
      break;
    }
	//sleep(waitTime);
	await swapAndIllustrateAStepGoldPoreSort(myArray);
	//await sleep(waitTime);
  }
}

//Implementation of the Quicksort
async function quickSort(myArray, leftPosition, rightPosition) 
{
  let myIndex = 0;

  if (myArray.length > 1) 
  {
    leftPosition = (leftPosition < 0) ? 0 : leftPosition;
    rightPosition = (rightPosition < 0) ? myArray.length - 1 : rightPosition;

    myIndex = await partition(myArray, leftPosition, rightPosition);

    if (leftPosition < myIndex - 1) 
	{
      await quickSort(myArray, leftPosition, myIndex - 1);
    }

    if (myIndex < rightPosition) 
	{
      await quickSort(myArray, myIndex, rightPosition);
    }
  }

  return myArray;
}

let stopCondition = 0;//Stopping condition for the paritioning function
//Let partitioning the array by comparing each cells with the pivot value------
async function partition(myArray, leftPosition, rightPosition) 
{
  //What is the pivot value
  var pivotValue = myArray[Math.floor((leftPosition+rightPosition) / 2)];
  
  //Let indexing the left and right position of the array to stat comparing loops
  var i = leftPosition;
  var j = rightPosition;
  
  //Looping to compare every pair of numbers
  while (i <= j) 
  {
    //Initial states of the pivot value
	statesArrayOfQuickSort[pivotValue] = 2;

    //Right order? move on
	while (myArray[i] < pivotValue) { i++; } 
    while (myArray[j] > pivotValue) { j--; }
	
    //Comparing the array with the sorted array to
	if (arraysAreIdentical(myArray, sortedArray)) 
	{
      for (let i = 0; i < valuesArrayOfQuickSort.length; i++) 
	  { 
		statesArrayOfMergeSort[i] = -1;//For coloring purpose
	  }
      i++;
      j--;
    } 
	else if (i <= j && stopCondition == 0)//A good pair to swap
	{
      await sleep(waitTime);
      statesArrayOfQuickSort[i] = 1;//For coloring purpose
      statesArrayOfQuickSort[j] = 0;//For coloring purpose
	  
      await sleep(waitTime);
      await swapTwoValues(myArray, i, j);//then let's swap it here
	  
      await sleep(waitTime); //and remark them with new color code
      statesArrayOfQuickSort[i] = 0;//For coloring purpose
      statesArrayOfQuickSort[j] = 1;//For coloring purpose
	  
      i++;//increment the left cursor for 1 unit
      j--;//decrement the right cursor for 1 unit

      await sleep(waitTime);
      newLineIndicator3++;//Move to the next line
      await sleep(waitTime);
    }
    for (let i = 0; i < originArray.length; i++) 
	{
      statesArrayOfQuickSort[i] = -1;//For coloring purpose
    }
  }
  return i; //Let return the new index for next partition time
}

//Implementation of the Insertsort
async function insertSort(myArray) 
{
	let keyValue = 0;//The key value that we need to compare and swap
	let jPosition = 0;//Position before key value
	for (let i = 1; i < valuesArrayOfInsertSort.length; i++) 
	{
		if (arraysAreIdentical(myArray, sortedArray) == true) 
		{
		  break;
		}
		
		//Mark the key value
		await sleep(waitTime);
		keyValue = myArray[i];
		statesArrayOfInsertSort[i] = 2;
		await sleep(waitTime);

		jPosition = i-1;
		statesArrayOfInsertSort[jPosition] = -1;
		await sleep(waitTime);

		while (jPosition >= 0 && myArray[jPosition] > keyValue)
		{
			await sleep(waitTime);
			myArray[jPosition+1] = myArray[jPosition];
			jPosition--;
			await sleep(waitTime);
			
			statesArrayOfInsertSort[jPosition+1] = 1;
			statesArrayOfInsertSort[jPosition] = 0;
			
			await sleep(waitTime);
			myArray[jPosition+1] = keyValue;
			statesArrayOfInsertSort[jPosition+1] = 1;
			await sleep(waitTime);
			
			await sleep(waitTime);
			newLineIndicator4++;
			await sleep(waitTime);	
		}
			
		for (let i = 0; i < valuesArrayOfQuickSort.length; i++) 
		{ 
			statesArrayOfInsertSort[i] = -1;//For coloring purpose
		}
	}
}
//Swap 2 cells' values in an arrays--------------------------------------------------
async function swapTwoValues(myArray, firstPosition, secondPosition) 
{
  await sleep(waitTime);
  let tempValue = myArray[firstPosition];
  myArray[firstPosition] = myArray[secondPosition];
  myArray[secondPosition] = tempValue;
}

//Set the time for completion/failure of running a task, measure by miliseconds------
function sleep(ms) 
{
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Comparing if 2 arrays are the same or not------------------------------------------
function arraysAreIdentical(firstArray, secondArray) 
{
  var arrayLength = firstArray.length; 
  if (firstArray.length !== secondArray.length) 
	  return false;
  
  for (var i = 0; i < arrayLength; i++) 
  {
    if (firstArray[i] !== secondArray[i]) 
	{
      return false;
    }
  }
  return true;
}


function illustrateAPass(myValueArray, myStateArray, myStartPosition, myNewLine, lastColorIndex)
{
  let myColor = "pink"; //Default input that indicates the number's output color
  for (let i = 0; i < myValueArray.length; i++) 
  {  
	fill("white");
	textSize(numberSize);
	
	rect((i+myStartPosition) * w, w * myNewLine, w, w);
	
	switch (myStateArray[i])
	{
		case -1: myColor = "pink"; break;
		case 0 : myColor = "red"; break;
		case 1 : myColor = "blue"; break;
		case 2 : myColor = lastColorIndex; break;
	}
	fill(myColor);
	text(myValueArray[i], (i+myStartPosition) * w, myNewLine * w, w, w);
  }
}

function draw() 
{
  // Draw mergesort
  illustrateAPass(valuesArrayOfMergeSort, statesArrayOfMergeSort, startPositionValues, newLineIndicator, "blue");
  
  //Draw Gold's poresort
  illustrateAPass(valuesArrayOfGoldPoreSort, statesArrayOfGoldPoreSort, startPositionValues2, newLineIndicator2, "blue");
  
  //Draw Quicksort
  illustrateAPass(valuesArrayOfQuickSort, statesArrayOfQuickSort, startPositionValues3, newLineIndicator3, "black");
  
  //Draw Insertsort
  illustrateAPass(valuesArrayOfInsertSort, statesArrayOfInsertSort, startPositionValues4, newLineIndicator4, "black");
}