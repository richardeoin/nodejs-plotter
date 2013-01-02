var plot = require('../plotter').plot;

plot({	'title' : 'example',
	'data' : [ 3, 1, 2, 3, 4 ],
	'style'	: 'lines',
	'filename' : 'output.pdf'
});

plot({	'title' : 'example',
	'data' : { 'tick' : [ 3, 1, 2, 3, 4 ] },
	'style'	: 'lines',
	'filename' : 'output2.pdf'
});

plot({	'title' : 'example',
	'data' : { 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	'style'	: 'lines',
	'filename' : 'output3.pdf'
});
