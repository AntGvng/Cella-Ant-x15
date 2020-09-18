/*Project #1 - Cella Ant #x15
Tiffanny Hernaez  890419724 - Tiffannyhernaez@csu.fullerton.edu
Kevin Nguyen 888118833 - kevin5nguyen1@csu.fullerton.edu
Trong Pham 888223237 - phdtrong@csu.fullerton.edu
Robert Kenny 890096985 - rlkenny@csu.fullerton.edu
----------------------------------------------------------------------------------------

Modified code: move_bot and draw_bot functions to accept our new code

Added code: - testCase function for testing purposes. 
            -  set_new_color, get_current_color, move_left, move_right functions.
                - These were added to satisfy the requirements of project 1. 

Module name: cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference

 
Specific coloring codes;  (+1)(%5)

    0.Black = fill(0,0,0);
    1.Red = fill(255,0,0);
    2.Yellow = fill(255,255,0);
    3.Blue = fill(0,0,255);
    4.Green = fill(0,255,0);             
*/
// ------------------------------------------------------------------------------------

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:41, hgt:41 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 1; // Update every 'mod' frames.
var g_stop = 0; // Go by default.


// p5 Setup function .
function setup() 
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 10, 50, 'white', 'yellow' );
}

var g_bot = { dir:0, x:20, y:20, color:0}; // Dir is 0..3, w 0 up, 1 down, 2 left, 3 right
var g_box = { hgt:40, wid:40 }; // Box in which bot can move.

// This function changes the cell color depending on which state the cell is in .
function set_new_color()
{
    switch (g_bot.color)
    { //0->1->2->3->4->0
	case 0: fill(255,0,0); break;
	case 1: fill(255,255,0); break;
	case 2: fill(0,0,255); break;
	case 3: fill(0,255,0); break;
	case 4: fill(0,0,0); break;
    }   
}

// This function obtains the current color information of the cell .
function get_current_color(red, green, blue)
{
    let color_code=0;
    if (red==255)
    {
	if (green==0) 
	     color_code = 1;//red
	else
	     color_code = 2;//yellow
    }
    else//red=0
    {
	if (green==255)
	     color_code = 4;
	else//green=0
	{
	     if(blue==255)
		color_code = 3;
	     else
		color_code = 0;
	}	
    }
    return color_code;
}

let dx = 0; // x-position change per step
let dy = 0; // y-position change per step
let new_dir=0;//new direction of the ant


// This function gives the LEFT direction.
function move_left()
{
    switch(g_bot.dir)
    {
	case 0: { dx = -1;	new_dir=2;	break;}//up
	case 1: { dx = 1;	new_dir=3;	break;}//down
	case 2: { dy = 1;	new_dir=1;	break;}//left
	case 3: { dy = -1;	new_dir=0;	break;}//right
    }
}

// This function gives the RIGHT direction.
function move_right()
{
    switch(g_bot.dir)
    {
	case 0: { dx = 1;	new_dir=3;	break;}//up
	case 1: { dx = -1;	new_dir=2;	break;}//down
	case 2: { dy = -1;	new_dir=0;	break;}//left
	case 3: { dy = 1;	new_dir=1;	break;}//right
    }
}

/*This function determines the next direction and updates position for the ant
  by calling our move_left and move_right functions.
 */
function move_bot( )
{
    dx=0;
    dy=0;
    switch (g_bot.color) {
    case 0 : {move_left();  break;}	//black  //left
    case 1 : {move_right(); break;}	//red    //right
    case 2 : {move_left();  break;}	//yellow //left
    case 3 : {move_right(); break;}	//blue   //right
    case 4 : {move_left();  break;}	//green  //left
    }
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.

    g_bot.x = x; // Update bot x.
    g_bot.y = y; // Update bot y.
    g_bot.dir = new_dir; // Update bot direction.

}

function draw_bot( ) // Convert bot pox to grid pos & draw bot.
{
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz; // Set y one pixel inside the sz-by-sz cell.
    let big = sz -2; // Stay inside cell walls.

    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    fill( "#" + g_bot.color ); // Concat string, auto-convert the number to string.
    //console.log( "x,y,big = " + x + "," + y + "," + big );

    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
    console.log( " current colors = " + acolors[ 0 ] +","+ acolors[ 1 ] +","+ acolors[ 2 ]);

    // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
    if (0 != pix) { fill( 0 ); stroke( 0 ); } // Turn off color of prior bot-visited cell.
    else { stroke( 'white' ); } // Else Bot visiting this cell, so color it.

    // Paint the cell by the new color.
    g_bot.color = get_current_color(acolors[0], acolors[1], acolors[2]);
    set_new_color();
    
    rect( x, y, big, big );
}

// This function updates our display.
function draw_update() 
{
    draw_bot( );// Draw the bot
    move_bot( );// Move the bot
    
    //testCase(g_frame_cnt/g_frame_mod);
}

// P5 Frame Re-draw Fcn, Called for Every Frame.
function draw() 
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

// This function is called when a key is pressed, which pauses movement
function keyPressed( )
{
    g_stop = ! g_stop;
}

// This function is called when the mouse is pressed, which restarts bot movement on cursor position 
function mousePressed( )
{
    let x = mouseX;
    let y = mouseY;
    //console.log( "mouse x,y = " + x + "," + y );
    
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );
    
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );
    
    g_bot.y %= g_box.hgt;
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
    
    draw_update();
}

// This function checks for the 1000'th iteration
/*function testCase(T)
{
 if ( (T % 1000) == 0) //Every
    {keyPressed(); 
     g_frame_cnt = 0; 
     console.log("Hello World!\n" + T +" Moves completed.")}
}*/