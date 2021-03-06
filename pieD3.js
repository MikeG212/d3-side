var data = [1, 1, 1];

d3.select("body")
    .append("svg")
    .attr("id", "piechart")
    .attr("height", 200)
    .attr("width", 300);

var svg = d3.select("#piechart"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00']);

// Generate the pie
var pie = d3.pie();

// Generate the arcs
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

//Generate groups
var arcs = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc")

//Draw arc paths
arcs.append("path")
    .attr("fill", function (d, i) {
        return color(i);
    })
    .attr("d", arc);
