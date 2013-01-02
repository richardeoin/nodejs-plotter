/* Richard Meadows 2012 */

/* -------- Includes -------- */

var exec = require('child_process').exec;

/* -------- Helper Functions -------- */

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
function plot_to_pdf(data, filename, options) {
	if (!options.series_count) {
		options.series_count = -1; /* Flag as only having a single series */
	}
	if (!options.style) {
		options.style = 'lines'; /* Default to lines */
	}

	/* Execute Gnuplot specifing a function to be called when it terminates */
	gnuplot = exec('gnuplot | ps2pdf - '+filename, post_gnuplot_processing);

	/* Setup Gnuplot output */
	gnuplot.stdin.write('set term postscript landscape enhanced color dashed \"Helvetica\" 14\n');
	
	if (options.time) {
		/* Setup the x axis for time */
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
	if (options.logscale) {
		gnuplot.stdin.write('set logscale y\n');
	}

	/* The title */
	gnuplot.stdin.write('set title ""');
	if (options.time_string) { gnuplot.stdin.write(' for '+options.time_string); }
	gnuplot.stdin.write('.\\n');
	gnuplot.stdin.write('bfhd.\\n');
	
	gnuplot.stdin.write('set ylabel "Relative Signal Strength"\n');
	gnuplot.stdin.write('set nokey\n');
	gnuplot.stdin.write('set grid xtics ytics mxtics\n');
	gnuplot.stdin.write('set mxtics\n');
	
	/* The style string we use for the nth series */
	var series_style = function(n) { gnuplot.stdin.write('\'-\' using 1:2 with '+options.style+' lt 1 lc '+(n+1)); }
	
	if (options.moving_avg) {
		/* Setup a 3-point moving average */
		gnuplot.stdin.write('samples(x) = $0 > 2 ? 3 : ($0+1)\n');
		gnuplot.stdin.write('init(x) = (back1 = back2 = back3 = back4 = back5 = sum = 0)\n');
		gnuplot.stdin.write('max(x,y) = x > y ? x : y\n');
		gnuplot.stdin.write('shift3(x) = (back3 = back2, back2 = back1, back1 = x)\n');
		gnuplot.stdin.write('shift5(x) = (back5 = back4, back4 = back3, shift3(x))\n');
		/* Moving Averages */
		gnuplot.stdin.write('avg3(x) = (shift3(x), (back1+back2+back3)/samples($0))\n');
		/* Max Value */
		gnuplot.stdin.write('max3(x) = (shift3(x), z = max(back1, back2), max(z, back3))\n');
		gnuplot.stdin.write('max5(x) = (shift5(x), z1 = max(back1, back2), z2 = max(back3, back4), z3 = max(z1, z2), max(z3, back5))\n');

		/* Do the Plot */
		gnuplot.stdin.write('plot sum = init(0),');
		for (var i = 0; i < options.series_count-1; i++) {
			gnuplot.stdin.write('\'-\' using 1:(max3($2)) with lines,');
		}
		gnuplot.stdin.write('\'-\' using 1:(max3($2)) with lines\n');
	} else {
		/* Do the plot */
		gnuplot.stdin.write('plot');
		for (var i = 0; i < options.series_count-1; i++) {
			series_style(i); gnuplot.stdin.write(',');
		}
		series_style(i); gnuplot.stdin.write('\n');
	}

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
