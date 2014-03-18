**nodejs-plotter** is a [node.js](http://nodejs.org/) module that
  turns an array of data into a graph. Uses
  [gnuplot](http://www.gnuplot.info/) and
  [ps2pdf](http://pages.cs.wisc.edu/~ghost/doc/AFPL/6.50/Ps2pdf.htm).

## Installation ##

Prerequisites:

```
sudo apt-get install gnuplot ghostscript
```

If you have [npm](https://npmjs.org/) installed, just run:

```
npm install plotter
```

## Usage ##

```javascript
var plot = require('plotter').plot;

plot({
	data:		[ 3, 1, 2, 3, 4 ],
	filename:	'output.png'
});
```

Plotting is achieved by calling the plot function with an object
containing various properties. Both `'data'` and `'filename'` are
essential, all other properties are optional.

### Output format ###

This defaults to `.png` but specifing `format: svg` changes the output
to [.svg](http://www.w3.org/Graphics/SVG/) and `format: pdf` changes
the output format to
[.pdf](http://en.wikipedia.org/wiki/Portable_Document_Format).

```javascript
var plot = require('plotter').plot;

plot({
	data:		[ 3, 1, 2, 3, 4 ],
	filename:	'output.svg',
	format:		'svg'
});
```

### Formatting ###

The following properties can be used:
- `title` : _Sets the title of the graph_
- `xlabel` : _Sets the label on the x axis of the graph_
- `ylabel` : _Sets the label on the y axis of the graph_
- `logscale` : _Makes the y axis of the graph appear in a log scale_
- `style` : _The style of the lines on the graph. Possibilites include
  `lines` (default), `points` and `linespoints`_
- `nokey` : _Disables the graph key_

The following example shows these in use:

```javascript
plot({
	data:		[ 3, 1, 2, 3, 4 ],
	filename:	'output.pdf',
	style:		'linespoints',
	title:		'Example \'Title\', \\n runs onto multiple lines',
	logscale:	true,
	xlabel:		'time',
	ylabel:		'length of string',
	format:		'pdf'
});
```

### Specifing X and Y values ###

```javascript
plot({
	data:		{ 'line' : { 1: 5, 5: 6 } },
	filename:	'output.png'
});
```

Instead of specifing an array for `data`, you can specify an object
with a named series inside.

### Multiple Series ###

```javascript
plot({
	data:		{ 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	filename:	'output.png'
});
```

You can specify multiple series inside an object.

### Moving Averages and Maximums ###

```javascript
plot({
	data:		{ 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ],
		'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ] },
	filename:	'output.png',
	moving_avg:	4
});
```

This will plot the points with a 4-point moving average. A
`moving_max` can also be specified, which if applied alongside a
`moving_avg` will be calculated after the moving average.

### Time Formatting ###

```javascript
plot({
	data:		{ 'temperature' :
			{ 1357162672: 22, 1357162782: 23, 1357162892: 24 } },
	time:		'hours',
	filename:	'output.png'
});
```

The x axis can be formatted as a time series if the x values are given
as a [unix time](http://en.wikipedia.org/wiki/Unix_time). The `time`
property can be specified as either `'hours'` (the default), `'days'`
or with a
[gnuplot time format](http://gnuplot.sourceforge.net/docs_4.2/node274.html)
like `'%H:%M'`.

## LICENSE ###

MIT
