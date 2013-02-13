var plot = require('../plotter').plot;

/* ==== PDF ==== */

plot({
	data:		[ 3, 1, 2, 3, 4 ],
	filename:	'output1.pdf',
	format:		'pdf'
});

plot({
	data:		[ 3, 1, 2, 3, 4 ],
	filename:	'output2.pdf',
	style:		'linespoints',
	title:		'Example \'Title\', \\n runs onto multiple lines',
	logscale:	true,
	xlabel:		'time',
	ylabel:		'length of string',
	format:		'pdf'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4 ] },
	style:		'lines',
	filename:	'output3.pdf',
	format:		'pdf'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	style:		'lines',
	filename:	'output4.pdf',
	format:		'pdf'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	style:		'lines',
	filename:	'output5.pdf',
	format:		'pdf'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ], 'line' : { 1: 5, 5: 6 } },
	moving_avg:	4,
	style:		'lines',
	filename:	'output6.pdf',
	format:		'pdf'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ], 'line' : { 1: 5, 5: 6 } },
	moving_max:	2,
	style:		'lines',
	filename:	'output7.pdf',
	format:		'pdf'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ], 'line' : { 1: 5, 5: 6 } },
	moving_max:	2,
	style:		'lines',
	filename:	'output8.pdf',
	nokey:		true,
	format:		'pdf'
});

plot({
	title:		'bad_example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : function(i) { return i; }, 'line' : { 1: 5, 5: 6 } },
	moving_max:	2,
	style:		'lines',
	filename:	'output9.pdf',
	nokey:		true,
	format:		'pdf'
});

plot({
	title:		'example',
	data:		{ 'temperature' : { 1357162672: 22, 1357162782: 23, 1357162892: 24 } },
	time:		'hours',
	style:		'linespoints',
	filename:	'output10.pdf',
	format:		'pdf'
});

/* ==== SVG ==== */

plot({
	title:		'svg example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'line' : { 1: 5, 5: 6 } },
	style:		'lines',
	filename:	'output.svg',
	format:		'svg',
	nokey:		true
});


console.log("Done!");
