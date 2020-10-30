Fall 2020 CPSC 335-02 25837
Project #2 - Sort Race
Tiffanny Hernaez  890419724 - Tiffannyhernaez@csu.fullerton.edu
Kevin Nguyen 888118833 - kevin5nguyen1@csu.fullerton.edu
Trong Pham 888223237 - phdtrong@csu.fullerton.edu
Robert Kenny 890096985 - rlkenny@csu.fullerton.edu
------------------------------------------------------------
Intro

  This application will display sorting and have them race to see which algorithm sorts faster. We are displaying the following algorithms: Merge Sort, Gold’s Poresort, Quick Sort, and Insert Sort. Every couple of seconds the race will start over once again with a new array to sort.

Zip Contents
*   File readme.txt:  This file.

*   File p5.js: This is the P5 package. It is loaded inside the HTML file.

*   File index.html: This is the P5 package. It is loaded inside the HTML file.

*   File algorithm.js: This contains several P5 user-defined linkage functions

 ***Variables:
statesArrayOf<SortingAlgName>: 4 arrays indicates status colors for elements along the sorting
newLineIndicator: 4 indicators for new line for 4 sorting algorithms respectively
valuesArrayOf<SortingAlgName>: 4 arrays that stores their elements along the sorting
startPositionValues<1,2,3,4>: The relative position indicator to draw algorithms respectively on the screen.
w: fix width of the cell in the grid
OddOrEvenStatus, needANewLine: Supportive variable in Gold’s Poresort
 
***Functions:
   * getARandomHexaArray(myList) - Randomly pick an array from the list

   * initialStatesAndValues(myValuesArray, myStatesArray)- The color state and it’s value for each algorithm 

   * initialPositionValuesForPrinting() - Starting printing position 

   * initialPrintingOriginArray(myValueArray, myStartPosition)- Print out first title and origin array before sorting

   * printAPassForAnAlgorithm(titleVar, x, newLineVar, valueVar,startVar)- Called to print out each pass for an algorithm

   * raceMgr()- Race Manager

   * rotateArrayOneUnit(myArray)

   * setup() - Setups the formatting and canvas grid of the index.html page

   * mergeSort(myValuesArray) - Implementation for merge sort
   
   * mergeSortSlice(arr, start, end) - Slices the array in half for mergeSort function

   * swapAndIllustrateAStepGoldPoreSort(myArray)- Implementation of Gold's poresort

   * poreSort(arr) - Checks if array is identical to original array. If not it will illustrate a swap in the array.

   * quickSort(myArray, leftPosition, rightPosition) - Implementation of Quicksort

   * partition(myArray, leftPosition, rightPosition) - partitioning the array by comparing each cells with the pivot value

   * insertSort(myArray) - Implementation of the Insertion Sort

   * swapTwoValues(myArray, firstPosition, secondPosition)- Swap 2 cells values in an arrays

   * sleep(ms)- Set the time for completion/failure of running a task, measure by miliseconds

   * illustrateAPass(myValueArray, myStateArray, myStartPosition, myNewLine, lastColorIndex) - Provide the last color and styling of the pass to demonstrate an algorithm pass

   * draw() - Draws the Sorting Race Algorithm onto the page


   * arraysAreIdentical(firstArray, secondArray) - Condition to stop the sorting at the end of each run


***Installation & Running


1. Extract the .zip file into a folder.
2.  Click the index HTML file, index.html. The example P5 program should start immediately on your web browser.  You should see a 1420x1500 grid with row/column headers and some of the grid cells colored.


Known Bugs
*  There are no known bugs.


Warnings
* There are no visible warnings.


Testing
*   With the installation instruction above, we watched the program run and
 tried keypresses and mouse clicks. 


Credits
  Some code was borrowed and modified from Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.


  And, of course, thanks to the HTML and P5.js developers.


  Special credit for Professor Charles Siska - Instructor @ CSUF, Fall 2020.

