/* Richard Meadows 2012 */

/* -------- Includes -------- */

var exec = require('child_process').exec;
var _ = require('underscore');

/* -------- Helper Functions -------- */

/**
 * Performs a n-point moving average on array.
 */
function moving_average(array, n) {
	var nums = [];
	
	for (i in _.range(array.length)) { /* Sequential Foreach */
		nums.push(array[i]);
		if (nums.length > n) { nums.splice(0,1); } /* Remove the first element of the array */
		/* Take the average of the n items in this array */
		var sum = _.reduce(nums, function(memo, num){ return memo + num; }, 0);
		array[i] = sum/nums.length;
	}
}
/**
 * Performs a n-point maximum on array.
 */
function moving_maximum(array, n) {
	var nums = [];
	
	for (i in _.range(array.length)) { /* Sequential Foreach */
		nums.push(array[i]);
		if (nums.length > n) { nums.splice(0,1); } /* Remove the first element of the array */
		/* Take the average of the n items in this array */
		var maximum = _.max(nums);
		array[i] = maximum;
	}
}
/**
 * Returns the string to give to gnuplot based on the value of options.time.
 */
function time_format(options) {
	if (_.isString(options.time) {
		/* Translate the string we've been given into a format */
		switch(options.time) {
			case 'days':
			case 'Days':
				return "%d/%m";
			case 'hours':
			case 'Hours':
				return "%H:%M";
			default: /* Presume we've been given a gnuplot-readable time format string */
				return options.time;
		}
	} else { /* Just default to hours */
		return "%H:%M";
	}
}

/**
 * Called after Gnuplot has finished.
 */
function post_gnuplot_processing(error, stdout, stderr) {
	/* Print stuff */
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
} 

/* -------- Public Functions -------- */

/**
 * Plots data to a PDF file. If it does not exist, the PDF file will be created, otherwise this plot will
 * be appended as a new page.
 */
function plot(options) {
	/* Required Options */
	if (!options.data || !options.filename) {
		throw("The options object must have 'data' and 'filename' properties!");
		return;
	}
	/* Translate data into an object if needs be */
	if (_.isArray(options.data)) {
		options.data = { options.data };
	}

	/* Defaults */
	if (!options.style) {
		options.style = 'lines'; /* Default to lines */
	}

	/* Execute Gnuplot specifing a function to be called when it terminates */
	gnuplot = exec('gnuplot | ps2pdf - '+options.filename, post_gnuplot_processing);

	/* Setup Gnuplot output to postscript so ps2pdf can interpret it */
	gnuplot.stdin.write('set term postscript landscape enhanced color dashed \"Helvetica\" 14\n');
	
	/* Formatting Options */
	if (options.time) {
		gnuplot.stdin.write('set xdata time\n');
		gnuplot.stdin.write('set timefmt "%s"\n');
		gnuplot.stdin.write('set format x "' + time_format(options.time) + '"\n');
		gnuplot.stdin.write('set xlabel "time"\n');
	}
	if (options.title) {
		gnuplot.stdin.write('set title "'+options.title+'"\n');
	}
	if (options.logscale) {
		gnuplot.stdin.write('set logscale y\n');
	}
	if (options.xlabel) {
		gnuplot.stdin.write('set xlabel "'+options.xlabel+'"\n');
	}
	if (options.ylabel) {
		gnuplot.stdin.write('set ylabel "'+options.ylabel+'"\n');
	}
	
	/* Setup ticks */
	gnuplot.stdin.write('set grid xtics ytics mxtics\n');
	gnuplot.stdin.write('set mxtics\n');
	
	/* TODO */
	gnuplot.stdin.write('set nokey\n');

	/* Find out how many series there are */
	var series_count = _.values(options.data).length;
	
	/* Print the command to actually do the plot */
	gnuplot.stdin.write('plot');
	var i = 1;
	while (1) {
		gnuplot.stdin.write('\'-\' using 1:2 with '+options.style+' lt 1 lc '+(i++));
		if (i > series_count) { break; }
		gnuplot.stdin.write(',');
	}
	gnuplot.stdin.write('\n');
	
	/* Print out the data */
	for (series in options.data) { /* For each series */
		for (key in options.data[series]) { /* For each datapoint */
			gnuplot.stdin.write(key+' '+options.data[series][key]+'\n');
		}
		/* Terminate the data */
		gnuplot.stdin.write('e\n');
	}

	gnuplot.stdin.end();
}

/* -------- Exports -------- */

exports.plot = plot;
