// Draw stuff, with P5  // CF p5js.org/reference
/*Project #1 - Cella Ant #x15
Tiffanny Hernaez  890419724 - Tiffannyhernaez@csu.fullerton.edu
Kevin Nguyen 888118833 - kevin5nguyen1@csu.fullerton.edu
Trong Pham 888223237 - phdtrong@csu.fullerton.edu
Robert Kenny 890096985 - rlkenny@csu.fullerton.edu
----------------------------------------------------------------------------------------

 Code modified: Removed the display of major cell numbers.
 
*/

// =====================================================  draw_grid ====
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.
function draw_grid( rminor, rmajor, rstroke, rfill  ) 
{
    stroke( rstroke );
    fill( rfill );;
    let sz = g_canvas.cell_size;
    let width = g_canvas.wid*sz;
    let height = g_canvas.hgt*sz
    for ( var ix = 0; ix < width; ix += rminor )
    {
        let big_linep = (ix % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( ix, 0, ix, height );
        strokeWeight( 1 );
        //if ( ix % rmajor == 0 ) { text( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        let big_linep = (iy % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( 0, iy, width, iy );
        strokeWeight( 1 );
        //if ( iy % rmajor == 0 ) { text( iy, 0, iy + 10 ); }
    }
}
