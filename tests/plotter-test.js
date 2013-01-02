var plot = require('../plotter').plot;

plot({
	'data' : [ 3, 1, 2, 3, 4 ],
	'filename' : 'output.pdf'
});

plot({	
	'data' : [ 3, 1, 2, 3, 4 ],
	'filename' : 'output2.pdf',
	'style'	: 'linespoints',
	'title' : 'Example Title, \\n runs onto multiple lines',
	'logscale': true,
	'xlabel': 'time',
	'ylabel': 'length of string'
});

plot({	'title' : 'example',
	'data' : { 'tick' : [ 3, 1, 2, 3, 4 ] },
	'style'	: 'lines',
	'filename' : 'output3.pdf'
});

plot({	'title' : 'example',
	'data' : { 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	'style'	: 'lines',
	'filename' : 'output4.pdf'
});

plot({	'title' : 'example',
	'data' : { 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	'style'	: 'lines',
	'filename' : 'output5.pdf'
});

console.log("Done!");
