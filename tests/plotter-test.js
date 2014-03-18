var plot = require('../plotter').plot;

/* ==== PNG ==== */

plot({
	data:		[ 3, 1, 2, 3, 4 ],
	filename:	'output1.png',
	format:		'png'
});

plot({
	data:		[ 3, 1, 2, 3, 4 ],
	filename:	'output2.png',
	style:		'linespoints',
	title:		'Example \'Title\', \\n runs onto multiple lines',
	logscale:	true,
	xlabel:		'time',
	ylabel:		'length of string',
	format:		'png'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4 ] },
	style:		'lines',
	filename:	'output3.png',
	format:		'png'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	style:		'lines',
	filename:	'output4.png',
	format:		'png'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	style:		'lines',
	filename:	'output5.png',
	format:		'png'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ], 'line' : { 1: 5, 5: 6 } },
	moving_avg:	4,
	style:		'lines',
	filename:	'output6.png',
	format:		'png'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ], 'line' : { 1: 5, 5: 6 } },
	moving_max:	2,
	style:		'lines',
	filename:	'output7.png',
	format:		'png'
});

plot({
	title:		'example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ], 'line' : { 1: 5, 5: 6 } },
	moving_max:	2,
	style:		'lines',
	filename:	'output8.png',
	nokey:		true,
	format:		'png'
});

plot({
	title:		'bad_example',
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : function(i) { return i; }, 'line' : { 1: 5, 5: 6 } },
	moving_max:	2,
	style:		'lines',
	filename:	'output9.png',
	nokey:		true,
	format:		'png'
});

plot({
	title:		'example',
	data:		{ 'temperature' : { 1357162672: 22, 1357162782: 23, 1357162892: 24 } },
	time:		'hours',
	style:		'linespoints',
	filename:	'output10.png',
	format:		'png'
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
