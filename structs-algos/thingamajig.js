export function networkGraph(nodeList) {
    // Define the data for your graph (you can replace this with your own data).

    console.log(nodeList)
    const nodes = nodeList.map(obj => ({ "id": obj.value }))
    const links = []
    nodeList.forEach(obj => {
        obj.friends.forEach(friend => {
            links.push(
                { source: obj.value, target: friend.value }
            )
        })
    })



    console.log("Graph created")
    // Create an SVG container for the graph inside the "div.graph" element.
    const svg = d3.select("div.graph").append("svg")
        .attr("width", 400)
        .attr("height", 300);

        svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 45) // Adjust the position of the arrowhead if needed
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("class", "arrowhead");


    // Create a D3 force simulation.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(80)) // Set the desired link distance
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(200, 150));

    // Create links and nodes.
    const link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke", "black")
    .attr("marker-end", "url(#arrowhead)"); // Use the arrowhead marker with the ID "arrowhead"


    const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", 20)
        .attr("fill", "steelblue"); // Set the circle fill color to steel blue

    node.append("text")
        .text(d => d.id)
        .attr("dy", 5)
        .attr("dx", -5)

    // Define a tick function to update the positions of nodes and links.
    const ticked = () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    };

    // Update the positions of nodes and links during the simulation.
    simulation.on("tick", ticked);

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; // Set the fixed x-coordinate
        d.fy = d.y; // Set the fixed y-coordinate
    }
    
    function dragged(event, d) {
        d.fx = event.x; // Update the fixed x-coordinate based on the drag event
        d.fy = event.y; // Update the fixed y-coordinate based on the drag event
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; // Release the fixed x-coordinate
        d.fy = null; // Release the fixed y-coordinate
    }
    
}
