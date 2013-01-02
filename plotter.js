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
 * be appended as a new page. TODO: Describe options object.
 */
function plot_to_pdf(options) {
	/* Defaults */
	if (!options.style) {
		options.style = 'lines'; /* Default to lines */
	}

	/* Execute Gnuplot specifing a function to be called when it terminates */
	gnuplot = exec('gnuplot | ps2pdf - '+options.filename, post_gnuplot_processing);

	/* Setup Gnuplot output */
	gnuplot.stdin.write('set term postscript landscape enhanced color dashed \"Helvetica\" 14\n');
	
	/* Formatting Options */
	if (options.time) {
		gnuplot.stdin.write('set xdata time\n');
		gnuplot.stdin.write('set timefmt "%s"\n');
		if (options.time == 'days') { /* Time format */
			var time_fmt = "%d/%m";
		} else {
			var time_fmt = "%H:%M";
		}
		gnuplot.stdin.write('set format x "'+time_fmt+'"\n');
		gnuplot.stdin.write('set xlabel "time"\n');
	}
	if (options.title) {
		gnuplot.stdin.write('set title "'+options.title+"');
	}
	if (options.logscale) {
		gnuplot.stdin.write('set logscale y\n');
	}
	if (options.ylabel) {
		gnuplot.stdin.write('set ylabel "'+options.ylabel+'"\n');
	}
	
	gnuplot.stdin.write('set nokey\n');
	gnuplot.stdin.write('set grid xtics ytics mxtics\n');
	gnuplot.stdin.write('set mxtics\n');
		
	/* Print the command to actually do the plot */
	gnuplot.stdin.write('plot');
	var i = 1;
	while (1) {
		gnuplot.stdin.write('\'-\' using 1:2 with '+options.style+' lt 1 lc '+(i++));
		if (i > options.data.length) { break; }
		gnuplot.stdin.write(',');
	}
	gnuplot.stdin.write('\n');
	
	/* Print out the data */

	if (options.series_count == -1) { /* No series */
		for (key in data) { /* Foreach datapoint */
			gnuplot.stdin.write(key+' '+data[key]+'\n');
		}
	} else {
		for (var i = 0; i < options.series_count; i++) { /* Print out all the series */
			/* Write out the data */
			for (key in data) { /* Foreach datapoint */
				gnuplot.stdin.write(key+' '+data[key][i]+'\n');
			}

			/* Terminate the data */
			gnuplot.stdin.write('e\n');
		}
	}

	gnuplot.stdin.end();
}

/* -------- Exports -------- */

exports.plot_to_pdf = plot_to_pdf;
