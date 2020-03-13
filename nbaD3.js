// set the dimensions and margins of the graph
var header = d3.select("body")
    .append("h2")
    .text("NBA Win Percentage vs PPG")

var scatterplot = d3.select("body")
    .append("div")
    .attr("id", "scatterplot")

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
d3.select("#scatterplot")
    .append("canvas")
    .attr("id", "scatterplot-canvas")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var canvas = document.querySelector("#scatterplot-canvas");
var context = canvas.getContext("2d");

context.fillStyle = "red";
context.beginPath();
context.arc(119, 85, 0, 2 * Math.PI, true);
context.fill();
context.closePath();

d3.csv("NBAData.csv", function (d) {
    return {
        team: d.name,
        wins: d.wins,
        losses: d.losses,
        winPercentage: d.winPercentage,
        gamesBehind: d.gamesBehind,
        pointsPerGame: d.pointsPerGame,
        pointsAllowedPerGame: d.pointsAllowedPerGame
    };
}).then(function (data) {
    for (var i = 0; i < data.length; i++) {
        var node = data[i];
        displayWinPercentage = parseFloat(node.winPercentage) * 100;

        context.fillStyle = "black";
        context.beginPath();
        context.arc(node.pointsPerGame, displayWinPercentage, 1.5, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
    };
});
