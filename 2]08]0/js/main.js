/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var margin = { left:100, right:10, top:10, bottom:120 };

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

/* Set up canvas */
var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
	.attr("transform","translate(" + margin.left + ", " + margin.top +")")

	/* Grabbing data from a file (in this case .json) */
d3.json("data/buildings.json").then(function(data){
    data.forEach(function(d) {
    	d.height = +d.height; /* Simple syntax converting strings to numerical */
    });
    console.log(data)  /* This outputs to the browser console */

	/* Automatically set x Domain -> Range (names of buildings) */
	var x = d3.scaleBand()
		.domain(data.map(function(d){ 
			return d.name; // ["Burj Khalifa",etc. etc.]
		})) 
		.range([0, width])
		.paddingInner(0.2)
		.paddingOuter(0.1);

	/* Automatically set y Domain -> Range (extent of values) */
	var y = d3.scaleLinear()
		.domain([0, d3.max(data, function(d){
			return d.height; // [0, MaxHeight]
		})]) 
		.range([0, height])

	/* Axis and ticks */
	var xAxisCall = d3.axisBottom(x);
	g.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxisCall)
		.selectAll("text")
			.attr("y", "10")
			.attr("x", "-5")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-40)");

	var yAxisCall = d3.axisLeft(y);
	g.append("g")
		.attr("class", "y-axis")
		.call(yAxisCall);

	/* This creates a rect for each data entry
	Will be covered in detail later on in the course */
	var bars = g.selectAll("rect")
		.data(data)
		/* Defining the rects based on each data entry */
		.enter()
		.append("rect")
			.attr("x", function(d){
				return x(d.name); 
			})
			.attr("y", 0)
			.attr("width", x.bandwidth)
			.attr("height", function(d){
				/* This defines the height of each bar based on its actual data entry */
				return y(d.height);
			})
			.attr("fill", "grey")

}).catch(function(error){
	/* This will catch errors and output to console (e.g. mistyping data file name) */
	console.log(error); 
})