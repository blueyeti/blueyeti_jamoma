// Utility to do multiple && 


var outvar=0;
var inArray = new Array();
inArray[0] = 0;
inArray[1] = 0;

if (jsarguments.length>1)
    inlets = jsarguments.length-1;
else
    inlets = 2;

for (var i = 0; i< inlets; i++) {
    inArray[i] = jsarguments[i+1];
}

function bang()
{
outvar = inArray[0];
for (var i = 1; i< inlets; i++) {
    outvar = outvar && inArray[i];
//    post("received int " + v + "\n");
}
    outlet(0,outvar);
}

function msg_int(v)
{
//    post("received int " + v + "\n");
    inArray[inlet] = v;
    bang();
}

function msg_float(v)
{
//    post("received float " + v + "\n");
    inArray[inlet] = int(v);
   bang();
}

function list()
{
    var a = arrayfromargs(arguments);
    post("received list " + a + "\n");
//    myval = a;
    bang();
}

function anything()
{
    var a = arrayfromargs(messagename, arguments);
    post("received message " + a + "\n");
 //   myval = a;
    bang();
}