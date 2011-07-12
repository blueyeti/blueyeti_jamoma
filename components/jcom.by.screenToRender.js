js

// inlets and outlets
inlets = 2;
outlets = 1;

var pix_position = new Array(0,0);
var pix_size = new Array(1024,768);
var pix_screen_size = new Array(1024,768);
var renderScale = 1.;
var v = new Array();
v[0]= v[1] = new Array();

function bang()
{
    var vpos = new Array(0.,0.);
    var vscale = new Array(1.,1.);
    var vrender_scale = new Array(1.3333333333333333333,1.);
    vrender_scale = ratio_screen(pix_screen_size,renderScale);
    vpos[0] = scale(pix_position[0]+0.5*pix_size[0],0,pix_screen_size[0],-vrender_scale[0],vrender_scale[0]);
    vpos[1] = scale(pix_position[1]+0.5*pix_size[1],0,pix_screen_size[1],vrender_scale[1],-vrender_scale[1]);
    vscale[0] = scale(pix_size[0],0,pix_screen_size[0],0.,vrender_scale[0]);
    vscale[1] = scale(pix_size[1],0,pix_screen_size[1],0.,vrender_scale[1]);

     outlet(0,"position", vpos, 0.);
     outlet(0,"scale", vscale, 1.);
}

function list()
{
    switch (inlet) {
        case 0:
            pix_position[0] = arguments[0];
            pix_position[1] = arguments[1];
            pix_size[0] = arguments[2];
            pix_size[1] = arguments[3];
        break;
        case 1:
            pix_screen_size[0] = arguments[0];
            pix_screen_size[1] = arguments[1];
        break;
    }
    bang();    
}


function render_scale(x)
{
    renderScale = x;
    bang();
}

//--------------------------
// Functions
//--------------------------
function scale(x, inMin, inMax, outMin, outMax)
{
    if ((inMax - inMin) != 0)
        var result = (x - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
    else
        var result = outMin;
    return result;
}

function ratio_screen(pScreen_size,pRender_scale)
{
    var vRatio = new Array(0,0);
    if(pScreen_size[0]*pScreen_size[1] != 0) {
        if(pScreen_size[0]>pScreen_size[1]) {
            vRatio[0] = pScreen_size[0]/pScreen_size[1]*pRender_scale;
            vRatio[1] = 1*pRender_scale;
        } else {
            vRatio[0] = 1*pRender_scale;    
            vRatio[1] = pScreen_size[1]/pScreen_size[0]*pRender_scale;
        }    
    } else {
        vRatio[0] = vRatio[1] = 0;    
    }
    return vRatio;
}
