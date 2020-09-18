Time-stamp: <2020-09-18 03:42:44 Team AntGng>
Fall 2020 CPSC 335-02 25837
Project #1 - Cella Ant #x15
Tiffanny Hernaez  890419724 - Tiffannyhernaez@csu.fullerton.edu
Kevin Nguyen 888118833 - kevin5nguyen1@csu.fullerton.edu
Trong Pham 888223237 - phdtrong@csu.fullerton.edu
Robert Kenny 890096985 - rlkenny@csu.fullerton.edu
------------------------------------------------------------


Intro


  This example draws a grid and runs a visible bot from cell to cell
on the grid changing its colors.  You can stop/restart the bot with
any keypress. You can move the bot to any cell with a mouse-click.


Zip Contents
*   File readme.txt:  This file.


*   File index-js-p5-example.html: Click the file to run the example. Users shall click to set a new location for the ant-bot (via mousePressed). Hit (almost) any key to toggle the ant bot’s movement on or off (via keyPressed) on the keyboard.


*   File p5.js: This is the P5 package. It is loaded inside the HTML file.


*   File cs-sketch.js: This contains several P5 user-defined linkage functions
   * setup() - Runs once before page display
   * draw() - Runs once per display frame
   * draw_bot() - This will draw a color onto the cell depending on get_current_color()’s result
   * draw_update() - Calls draw_bot() and move_bot() functions
   * keyPressed() - Switches the state whether the ant bot resumes movement or stops movement.
   * mousePressed() - Grabs the location of where the mouse clicked and begins the ant bot’s movement on the cell.
   * move_bot() - Checks the cell color and depending on the color will send the ant to move left or right. This function utilizes the move_left() and move_right() functions
   * Support functions:
      * move_left() and move_right() - Corresponding directions and color of the ant
      * set_new_color() - Sets the new color for the cell
      * get_current_color() - Gets the current color of the cell
*   File assets/styles.css:  This is an extra-small example of controlling web page styling.
           // Loaded inside the html.


*   File assets/draw-stuff.js: This is an example to show loading a JS script file from a folder other than the index HTML file's folder location.  It also includes the utility draw_grid function written in P5+JS. // Loaded inside the HTML.


Installation & Running


1. Extract the .zip file into a folder.
2. Change the file name to just .js with the following files: p5.js.txt, cs-sketch.js.txt, draw-stuff.js.txt 
3.  Click the index HTML file, index-js-p5-example.html. The example P5 program should start immediately on your web browser.  You should see a 41x41 grid (white lines on black background) with row/column headers and some of the grid cells colored.


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