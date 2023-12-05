const rootStyles = getComputedStyle(document.documentElement);

const backgroundColor = rootStyles.getPropertyValue('--backgroundColor');
const textColor = rootStyles.getPropertyValue('--textColor');
const darkGray = rootStyles.getPropertyValue('--darkGray');
const highlightColor = rootStyles.getPropertyValue('--highlightColor');
const darkerTextColor = rootStyles.getPropertyValue('--darkerTextColor');

export function networkGraph(nodeList) {
    // Define the data for your graph (you can replace this with your own data).

    console.log(nodeList)
    let counter = 0
    nodeList.map(node => {
        node.id = counter++
    })

    const nodes = nodeList.map(node => ({id: node.id, value: node.value}))
    const links = []
    nodeList.forEach(node => {
        node.friends.forEach(friend => {
            links.push({source: node.id, target: friend.id})
        })
    } )

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
        .attr("class", "arrowhead")
        .attr("fill", darkGray)


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
        .attr("stroke", darkGray)
        .attr("marker-end", "url(#arrowhead)"); // Use the arrowhead marker with the ID "arrowhead"


    const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")

    node.append("circle")
        .attr("r", 20)
        .attr("fill", highlightColor); // Set the circle fill color to steel blue

    node.append("text")
        .text(d => d.value)
        .attr("dy", 5)
        .attr("dx", -5)
        .style("fill", backgroundColor)

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
}
