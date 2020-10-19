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
let states = []; //Merge Sort
let states2 = [];//Gold's Poresort
let states3 = [];//Quicksort
let states4 = [];//Insertsort

//Seprate variables that define the new row of for each algorithm------------------
let newLineIndicator = 0;
let newLineIndicator2 = 0;
let newLineIndicator3 = 0;
let newLineIndicator4 = 0;

//What is the width size of the cell, measure by pixel units-----------------------  
let w = 20;

let status = 0;
let numcase = 0;
let setting = 0;

let values = [];
let values2 = [];
let values3 = [];
let values4 = [];

let startPositionValues = 0;	//Merge sort
let startPositionValues2 = 0;	//Gold's pore sort
let startPositionValues3 = 0;	//Quick sort	
let startPositionValues4 = 0;	//Insert sort

//What is the color states and values of each algorithm array----------------------
function initialStatesAndValues(myValuesArray, myStatesArray)
{
	for (let i = 0; i < values.length; i++) 
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
	startPositionValues2 = values2.length + 1;
	startPositionValues3 = values3.length*2 + 2;
	startPositionValues4 = values3.length*3 + 3;
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

function printAPassForAnAlgorithm(titleVar, x, newLineVar, valueVar,startVar)
{
	textSize(titleSize);
    fill("black");
    text(titleVar, x, 0, 300, 300);
    newLineVar++;
	initialPrintingOriginArray(valueVar, startVar);
	newLineVar++;
}

function setup() {
  createCanvas(1420, 1500);
  
  values = new Array(floor(15));
  values2 = new Array(floor(15));
  values3 = new Array(floor(15));
  values4 = new Array(floor(15));

  initialStatesAndValues(values, states);
  initialStatesAndValues(values2, states2);
  initialStatesAndValues(values3, states3);
  initialStatesAndValues(values4, states4);
  
  initialPositionValuesForPrinting();
  
  if (numcase == 0) {
    // Display mergesort
	printAPassForAnAlgorithm("MERGE SORT", 65, newLineIndicator, values, startPositionValues);
    
	// Dispaly Gold's poresort
    printAPassForAnAlgorithm("GOLD'S PORESORT", 350,newLineIndicator2, values2, startPositionValues2);
	
    // Display Quicksort
    printAPassForAnAlgorithm("QUICK SORT", 700, newLineIndicator3, values3, startPositionValues3);
	
	// Display Insertsort
    printAPassForAnAlgorithm("INSERT SORT", 1025, newLineIndicator4, values4, startPositionValues4);
  }
  numcase = 2;//Confirm that the drawing status is completed now

  mergeSort(values);

  poreSort(values2);

  quickSort(values3, 0, values3.length - 1);
  
  //insertSort(values3, 0, values3.length - 1);
}

//Implementation of the Merge Sort-----------------------------------------------------------------------
function mergeSort(myValuesArray)
{
  //Let's create a copy of the value array, then we will sort in the copy version
  convertedArray = myValuesArray.slice();
  mergeSortSlice(convertedArray, 0, convertedArray.length);//go to the detail
  return;
}

async function mergeSortSlice(arr, start, end) 
{
  if (end - start <= 1) 
  {
    return;
  }

  var mid = Math.round((end + start) / 2);

  await mergeSortSlice(arr, start, mid);
  await mergeSortSlice(arr, mid, end);

  let i = start,
    j = mid;
  for (let i = start; i < mid; i++) {
    states[i] = 2;
  }

  while (i < end && j < end) {
    if (arraysAreIdentical(arr, sortedArray) == true) {
      break;
    }
    if (arr[i] > arr[j]) {
      setting = 0;
      states[i] = 0;
      states[j] = 1;

      let t = arr[j];
      arr.splice(j, 1);
      arr.splice(i, 0, t);

      j++;
    } 
	else {
      setting = 1;
      await sleep(100);
      states[i] = 2;
      states[j] = 2;
      await sleep(100);
    }
    i++;
    if (i == j) {
      j++;
    }

    values = arr.slice();

    await sleep(100);
    if (setting == 0) newLineIndicator++;
    await sleep(100);
	for (let i = 0; i < values.length; i++) 
	{
      states[i] = -1;
    }
  }
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
  illustrateAPass(values, states, startPositionValues, newLineIndicator, "blue");
  
  //Draw Gold's poresort
  illustrateAPass(values2, states2, startPositionValues2, newLineIndicator2, "blue");
  
  //Draw Quicksort
  illustrateAPass(values3, states3, startPositionValues3, newLineIndicator3, "black");
}

// Gold's poresort
async function poreSort(arr) {
  for (let i = 0; i < values2.length; i++) 
  {
    if (arraysAreIdentical(arr, sortedArray) == true) 
	{
      break;
    }

    if (status == 0) {
      for (let j = 0; j < values2.length; j = j + 2) {
        await sleep(100);
        states2[j] = 2;
        states2[j + 1] = 2;
        await sleep(100);

        if (arr[j] > arr[j + 1]) {
          await sleep(100);
          states2[j] = 0;
          states2[j + 1] = 1;
          await sleep(50);
          await swapTwoValues(arr, j, j + 1);
          await sleep(50);
          states2[j] = 1;
          states2[j + 1] = 0;
          status = 1;
          await sleep(100);
          newLineIndicator2++;
          await sleep(100);
        } else {
          await sleep(100);
          states2[j] = 2;
          states2[j + 1] = 2;
          await sleep(100);
        }
        for (let i = 0; i < originArray.length; i++) {
          states2[i] = -1;
        }
      }
    } else if (status == 1) {
      for (let j = 1; j < values2.length; j = j + 2) {
        if (j != originArray.length - 1) {
          await sleep(100);
          states2[j] = 2;
          states2[j + 1] = 2;
          await sleep(100);

          if (arr[j] > arr[j + 1]) {
            await sleep(100);
            states2[j] = 0;
            states2[j + 1] = 1;
            await sleep(100);
            await swapTwoValues(arr, j, j + 1);
            await sleep(100);
            states2[j] = 1;
            states2[j + 1] = 0;
            status = 0;
            await sleep(100);
            newLineIndicator2++;
            await sleep(100);
          } else {
            await sleep(100);
            states2[j] = 2;
            states2[j + 1] = 2;
            await sleep(100);
          }
          for (let i = 0; i < originArray.length; i++) {
            states2[i] = -1;
          }
        }
      }
    }
    if (arraysAreIdentical(arr, sortedArray) == true) {
      break;
    }
    numcase = 2;
  }
}

// Quicksort
async function quickSort(myArray, leftPosition, rightPosition) {
  let myIndex = 0;

  if (myArray.length > 1) {
    leftPosition = (leftPosition < 0) ? 0 : leftPosition;
    rightPosition = (rightPosition < 0) ? myArray.length - 1 : rightPosition;

    myIndex = await partition(myArray, leftPosition, rightPosition);

    if (leftPosition < myIndex - 1) {
      await quickSort(myArray, leftPosition, myIndex - 1);
    }

    if (myIndex < rightPosition) {
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
	states3[pivotValue] = 2;

    //Right order? move on
	while (myArray[i] < pivotValue) { i++; } 
    while (myArray[j] > pivotValue) { j--; }
	
    //Comparing the array with the sorted array to
	if (arraysAreIdentical(myArray, sortedArray)) 
	{
      for (let i = 0; i < values3.length; i++) 
	  { 
		states[i] = -1;//For coloring purpose
	  }
      i++;
      j--;
    } 
	else if (i <= j && stopCondition == 0)//A good pair to swap
	{
      await sleep(200);
      states3[i] = 1;//For coloring purpose
      states3[j] = 0;//For coloring purpose
	  
      await sleep(200);
      await swapTwoValues(myArray, i, j);//then let's swap it here
	  
      await sleep(200); //and remark them with new color code
      states3[i] = 0;//For coloring purpose
      states3[j] = 1;//For coloring purpose
	  
      i++;//increment the left cursor for 1 unit
      j--;//decrement the right cursor for 1 unit

      await sleep(100);
      newLineIndicator3++;//Move to the next line
      await sleep(100);
    }
    for (let i = 0; i < originArray.length; i++) 
	{
      states3[i] = -1;//For coloring purpose
    }
  }
  return i; //Let return the new index for next partition time
}

//Swap 2 cells' values in an arrays--------------------------------------------------
async function swapTwoValues(myArray, firstPosition, secondPosition) {
  await sleep(100);
  let tempValue = myArray[firstPosition];
  myArray[firstPosition] = myArray[secondPosition];
  myArray[secondPosition] = tempValue;
}

//Set the time for completion/failure of running a task, measure by miliseconds------
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Comparing if 2 arrays are the same or not------------------------------------------
function arraysAreIdentical(firstArray, secondArray) {
  var arrayLength = firstArray.length; 
  if (firstArray.length !== secondArray.length) 
	  return false;
  
  for (var i = 0; i < arrayLength; i++) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
}
