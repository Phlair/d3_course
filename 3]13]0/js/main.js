/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { left:100, right:10, top:10, bottom:150 };

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

/* Set up canvas */
var g = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform","translate(" + margin.left + ", " + margin.top +")");

// X axis label	
g.append("text")
	.attr("class", "x axis-label")
	.attr("x", width / 2)
	.attr("y", height + 50)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Month"); 

// Y axis label	
g.append("text")
	.attr("class", "y axis-label")
	.attr("x", - (height / 2))
	.attr("y", -60)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.attr("transform","rotate(-90)")
	.text("Revenue");

	/* Grabbing data from a file (in this case .json) */
d3.json("data/revenues.json").then(function(data){
    data.forEach(function(d) {
    	d.revenue = +d.revenue; /* Simple syntax converting strings to numerical */
    });
    console.log(data)  /* This outputs to the browser console */

	/* Automatically set x Domain -> Range (names of months) */
	var x = d3.scaleBand()
		.domain(data.map(function(d){ 
			return d.month; // ["January", "February" etc.]
		})) 
		.range([0, width])
		.paddingInner(0.2)
		.paddingOuter(0.1);

	/* Automatically set y Domain -> Range (0 - Max) */
	var y = d3.scaleLinear()
		.domain([0, d3.max(data, function(d){
			return d.revenue; // [0, MaxRevenue]
		})]) 
		.range([height, 0]) // flip to reverse SVG co-ords

	/* Axis and ticks */
	var xAxisCall = d3.axisBottom(x);
	g.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxisCall)
		.selectAll("text")
			.attr("y", "10")
			.attr("x", "-5")
			.attr("text-anchor", "end");

	var yAxisCall = d3.axisLeft(y)
		.ticks(10)
		.tickFormat(function(d){
			return "$" + d;
		});
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
				return x(d.month); 
			})
			.attr("y", function(d){
				return y(d.revenue); //anchors bars to bottom of y axis
			})
			.attr("width", x.bandwidth)
			.attr("height", function(d){
				/* This defines the height of each bar based on its actual data entry */
				return height - y(d.revenue);
			})
			.attr("fill", "grey")

}).catch(function(error){
	/* This will catch errors and output to console (e.g. mistyping data file name) */
	console.log(error); 
})