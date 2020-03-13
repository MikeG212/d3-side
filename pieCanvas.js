var container = d3.select('body')
    .append('div')
    .attr('id', 'container')

var width = 400, height = 400;
var radius = Math.min(width, height) / 2;

var canvas = d3.select('#container')
    .append('canvas')
    .attr('width', width)
    .attr('height', height)

var context = canvas.node().getContext('2d');

var customBase = document.createElement('custom');

var custom = d3.select(customBase);

var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00']);

function databind(data) {
    var pie = d3.pie();
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    var join = custom.selectAll('custom.arc')
        .data(pie(data));
    var arcs = join.enter()
        .append('custom')
        .attr('class', 'arc')
    arcs.append('path')
        .attr('fillStyle', function (d, i) {
            return color(i);
        })
        .attr('d', arc);
}

function draw(data) {
    context.clearRect(0,0, width,height);
    var minLength = Math.min(width, height);
    var mid = minLength / 2;
    var radius = mid - 5;
    var colors = ['#4CAF50', '#00BCD4', '#E91E63', '#FFC107', '#9E9E9E', '#CDDC39'];

    var total = data.reduce(function (acc, el) {
        return acc + el;
    })
    var angles = data.map(function(el) {
        return Math.PI * 2 * el / total;
    })
    // Temporary variables, to store each arc angles
    var beginAngle = 0;
    var endAngle = 0;

    // Iterate through the angles
    for (var i = 0; i < angles.length; i = i + 1) {
        // Begin where we left off
        beginAngle = endAngle;
        // End Angle
        endAngle = endAngle + angles[i];

        context.beginPath();
        // Fill color
        context.fillStyle = colors[i % colors.length];

        // Same code as before
        context.moveTo(mid, mid);
        context.arc(mid, mid, radius, beginAngle, endAngle);
        context.lineTo(mid, mid);
        context.stroke();

        // Fill
        context.fill();
    }
}
var data = [1,1,1];
// databind(data);
draw(data);
