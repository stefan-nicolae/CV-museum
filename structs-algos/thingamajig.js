const rootStyles = getComputedStyle(document.documentElement);
const backgroundColor = rootStyles.getPropertyValue('--backgroundColor');
const textColor = rootStyles.getPropertyValue('--textColor');
const darkGray = rootStyles.getPropertyValue('--darkGray');
const highlightColor = rootStyles.getPropertyValue('--highlightColor');

export function networkGraph(nodeList) {
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

    const svg = d3.select("div.graph").append("svg")
        .attr("width", 400)
        .attr("height", 300);

    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 45) 
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class", "arrowhead")
        .attr("fill", darkGray)


    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(80)) 
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(200, 150));

    const link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", darkGray)
        .attr("marker-end", "url(#arrowhead)");


    const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")

    node.append("circle")
        .attr("r", 20)
        .attr("fill", highlightColor); 

    node.append("text")
        .text(d => d.value)
        .attr("dy", 5)
        .attr("dx", -5)
        .style("fill", backgroundColor)

    const ticked = () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    };

    simulation.on("tick", ticked);
}
