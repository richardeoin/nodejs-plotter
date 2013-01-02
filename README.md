**nodejs-plotter** is a [node.js](http://nodejs.org/) module that turns an array of data into a graph in a [pdf](http://www.adobe.com/products/acrobat/adobepdf.html) document. Uses [gnuplot](http://www.gnuplot.info/) and [ps2pdf](http://pages.cs.wisc.edu/~ghost/doc/AFPL/6.50/Ps2pdf.htm).

## Installation ##

```
sudo apt-get install gnuplot ghostscript
```

TODO: npm

## Usage ##

```javascript
var plot = require('plotter').plot;

plot({
	'data' : [ 3, 1, 2, 3, 4 ],
	'filename' : 'output.pdf'
});
```

Plotting is achieved by calling the plot function with an object containing various properties. Both `'data'` and `'filename'` are essential, all other properties are optional.

### Formatting ###

The following properties can be used:
* `'title'` - _Sets the title of the graph_
* `'xlabel'` - _Sets the label on the x axis of the graph_
* `'ylabel'` - _Sets the label on the y axis of the graph_
* `'logscale'` - _Makes the y axis of the graph appear in a log scale_
* `'style'` - _The style of the lines on the graph. Possibilites include `lines` (default), `points` and `linespoints`_

The following example shows these in use:

```javascript
plot({	
	'data' : [ 3, 1, 2, 3, 4 ],
	'filename' : 'output.pdf',
	'style'	: 'linespoints',
	'title' : 'Example Title, \\n runs onto multiple lines',
	'logscale': true,
	'xlabel': 'time',
	'ylabel': 'length of string'
});
```

### Specifing X and Y values ###

```javascript
plot({
	'data' : { 'line' : { 1: 5, 5: 6 } },
	'filename' : 'output.pdf'
});
```

Instead of specifing an array for `data`, you can specify an object with a named series inside.

### Multiple Series ###

```javascript
plot({
	'data' : { 'tick' : [ 3, 1, 2, 3, 4 ], 'line' : { 1: 5, 5: 6 } },
	'filename' : 'output.pdf'
});
```

You can specify multiple series inside an object.

### Moving Averages and Maximums ###

```javascript
plot({
	'data' : { 'tick' : [ 3, 1, 2, 3, 4, 15, 3, 2, 4, 11 ], 'tick2' : [ 3, 10, 2, 30, 4, 15, 3, 20, 4, 11 ] },
	'filename' : 'output.pdf'
	'moving_avg': 4,
});
```

This will plot the points with a 4-point moving average. A `moving_max` can also be specified, which if applied alongside a `moving_avg` will be calculated after the moving average.

### Time Formatting ###

