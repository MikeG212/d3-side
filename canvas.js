var container = d3.select('body')
    .append('div')
    .attr('id', 'container');

var width = 750, height = 400;

var canvas = d3.select('#container')
    .append('canvas')
    .attr('width', width)
    .attr('height', height);

var context = canvas.node().getContext('2d');

var dataContainer = container.append('custom');

function drawCustom(data) {
    var scale = d3.scaleLinear()
        .range([10, 390])
        .domain(d3.extent(data));

    var dataBinding = dataContainer.selectAll('custom.rect')
        .data(data, function (d) { return d; });

    // update existing element to have size 15 and fill green
    dataBinding
        .attr('size', 15)
        .attr('fillStyle', 'green');

    // for new elements, create a 'custom' dom node, of class rect
    // with the appropriate rect attributes
    dataBinding.enter()
        .append('custom')
        .classed('rect', true)
        .attr('x', scale)
        .attr('y', 100)
        .attr('size', 8)
        .attr('fillStyle', 'red');

    // for exiting elements, change the size to 5 and make them grey.
    dataBinding.exit()
        .attr('size', 5)
        .attr('fillStyle', 'lightgrey');

    drawCanvas();
}

function drawCanvas() {

    // clear canvas
    context.fillStyle = '#fff';
    context.rect(0, 0, canvas.attr('width'), canvas.attr('height'));
    context.fill();

    var elements = dataContainer.selectAll('custom.rect');
    elements.each(function (d) {
        var node = d3.select(this);

        context.beginPath();
        context.fillStyle = node.attr('fillStyle');
        context.rect(node.attr('x'), node.attr('y'), node.attr('size'), node.attr('size'));
        context.fill();
        context.closePath();

    });
}

drawCustom([1, 2, 13, 20, 23]);
