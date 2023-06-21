// Define the graph data (replace with your own graph data)
var graphData = {
    nodes: [
        { id: "A" },
        { id: "B" },
        { id: "C" },
    ],
    links: [
        { source: "A", target: "B", label: "Edge 1" },
        { source: "B", target: "C", label: "Edge 2" },
    ],
};

// Create the D3.js force-directed graph
var svg = d3.select("#graph")
    .append("svg")
    .attr("width", 400)
    .attr("height", 300);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(200, 150));

var link = svg.selectAll(".link")
    .data(graphData.links)
    .enter().append("line")
    .attr("class", "link");

var node = svg.selectAll(".node")
    .data(graphData.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10);

var label = svg.selectAll(".label")
    .data(graphData.links)
    .enter().append("text")
    .attr("class", "label")
    .text(function(d) { return d.label; });

simulation.nodes(graphData.nodes).on("tick", ticked);
simulation.force("link").links(graphData.links);

function ticked() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    label.attr("x", function(d) { return (d.source.x + d.target.x) / 2; })
        .attr("y", function(d) { return (d.source.y + d.target.y) / 2; });
}

