function barchart(dataset) {
    var nodes = dataset;

    //Loop over the nodes dataset and draw each circle to the canvas
    for (var i = 0; i < nodes.length; i++) {
        //Select one of the nodes/circles
        var node = nodes[i];

        //Draw each circle
        context.fillStyle = node.children ? colorCircle(node.depth) : "white";
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
    };
};
