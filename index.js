// set the dimensions and margins of the graph

var scatterplot = d3.select("body")
    .append("div")
    .attr("id", "scatterplot")

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("NBAData.csv", function(d) {
    return {
        team: d.name,
        wins: d.wins,
        losses: d.losses,
        winPercentage: d.winPercentage,
        gamesBehind: d.gamesBehind,
        pointsPerGame: d.pointsPerGame,
        pointsAllowedPerGame: d.pointsAllowedPerGame
    };
}).then(function(data) {
    var x = d3.scaleLinear()
        .domain([0, 120])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - height / 2 + 20)
        .text("Win Percentage")
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 20)
        .text("Points Per Game");

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.pointsPerGame); })
        .attr("cy", function (d) { return y(d.winPercentage); })

        .attr("r", 1.5)
        .style("fill", "#69b3a2")
});
