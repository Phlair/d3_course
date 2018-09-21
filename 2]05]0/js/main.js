/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

/* Set up canvas */
var svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 400);

/* SVG Rectangle */
var rect1 = svg.append("rect")
	.attr("x", 20)
	.attr("y", 10)
	.attr("width", 80)
	.attr("height", 120)
	.attr("fill", "blue");

/* SVG Line */
var line1 = svg.append("line")
	.attr("x1", 380)
	.attr("y1", 380)
	.attr("x2", 360)
	.attr("y2", 240)
	.attr("stroke", "orange")
	.attr("stroke-width", 6);

/* SVG Circle */
var circle1 = svg.append("circle")
	.attr("cx", 30)
    .attr("cy", 200)
	.attr("r", 20)
	.attr("fill", "purple");

/* SVG Ellipse */
var ellipse1 = svg.append("ellipse")
	.attr("cx", 210)
    .attr("cy", 140)
	.attr("rx", 40)
	.attr("ry", 10)
	.attr("fill", "pink");