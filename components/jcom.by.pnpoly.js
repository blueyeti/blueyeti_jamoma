js// inlets and outletsinlets = 2;outlets = 1;var npol = 0;var xp = new Array();var yp = new Array();var x = 0;var y = 0;function bang(){//    int pnpoly(int npol, float *xp, float *yp, float x, float y)      var i, j, c = 0;      for (i = 0, j = npol-1; i < npol; j = i++) {        if ((((yp[i]<=y) && (y<yp[j])) ||             ((yp[j]<=y) && (y<yp[i]))) &&            (x < (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i]))          c = !c;      }	outlet(0, c);}function list(){	var i;	switch (inlet) {		case 0:			x = arguments[0];			y = arguments[1];		bang();			break;		case 1:			npol = arguments.length/2;      			for (i = 0; i < npol; i++) {				xp[i] = arguments[2*i];				yp[i] = arguments[2*i+1];			}		break;	}}