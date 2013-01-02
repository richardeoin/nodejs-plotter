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
	'filename' : 'output2.pdf',
	'style'	: 'linespoints',
	'title' : 'Example Title, \\n runs onto multiple lines',
	'logscale': true,
	'xlabel': 'time',
	'ylabel': 'length of string'
});
```

### Multiple Series ###

### Moving Averages and Maximums ###


