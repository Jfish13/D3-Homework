// @TODO: YOUR CODE HERE!

// Creating the Variables that will be used for the SVGs height and Width paramaters
var svgWidth = 950;
var svgHeight = 500;
var margin = {top: 50, right: 50, bottom: 50, left: 50};
var Width = svgWidth - margin.left - margin.right;
var Height = svgHeight - margin.top - margin.bottom;

// Create SVG Wrapper and chartgroup to be used in Scatter Div in the Index file
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var chartGroup = svg.append("g")
     .attr("transform", `translate(${margin.left}, ${margin.top})`);

// pull data from CSV file
d3.csv("assets/data/data.csv")
    .then(function(Data) {

    Data.forEach(function(data) {
        data.abbr = data.abbr;
        // data.poverty = +data.obesity;
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
     
    });
// Create Scales
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(Data, d => d.poverty)])
      .range([0, Width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(Data, d => d.healthcare)])
        .range([Height, 0]);
// Creat Axis and add to chart
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${Height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

      // Create circles
      var circles = chartGroup.selectAll("circle")
        .data(Data)
        .enter()
        .append("circle")
        .attr("class", "CircleText")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill","lightblue")


    var text = chartGroup.selectAll(null) 
        .data(Data)
        .enter()
        .insert("text")
        .attr("text-anchor", "middle")
        .attr("class", "AbbrText")
        .attr("dx", d => xLinearScale(d.poverty))
        .attr("dy", d => yLinearScale(d.healthcare))
        .text( function (d) { return d.abbr})
        .attr("font-size", 9)
        // .attr("fill", "black");

        svg.append("text")
            .attr("class", "active")
            .attr("text-anchor", "end")
            // .attr("y", 0 - margin.left)
            .attr("y", 0)
            .attr("dy", "1em")
            .attr("dx", "-12em")
            .attr("transform", "rotate(-90)")
            .text("Lacks Healthcare (%)");

        svg.append("text")
            .attr("class", "active")
            .attr("text-anchor", "end")
            .attr("x", svgWidth - 500 )
            .attr("y", svgHeight -5)
            .text("In Poverty (%)");

        
    });