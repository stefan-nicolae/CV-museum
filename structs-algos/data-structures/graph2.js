class Node {
    constructor(value) {
        this.friends = []
        this.value = value
    }
}

export class Graph {
    insert(node1, node2, twoWay=true) {
        node1.friends.push(node2)
        if(twoWay) node2.friends.push(node1)
    }

    check(node1, node2, twoWay=true) {
       if(twoWay) return node1.friends.includes(node2) && node2.friends.includes(node1)
       else return node1.friends.includes(node2) !== node2.friends.includes(node1)
    }

    DFS (value, startNode) {
        const stack = [startNode], visited = [], resultArr = []
        while(stack.length) {
            const node = stack.pop()
            if(!visited.includes(node) && node.value === value) resultArr.push(node)
            visited.push(node)
            node.friends.forEach(friend => {
                if(!visited.includes(friend)) {
                    stack.push(friend)
                } 
            })
        }
        return resultArr
    }

    BFS (value, startNode) {
        const queue = [startNode], visited = [], resultArr = []
        while(queue.length) {
            const node = queue.shift()
            if(!visited.includes(node) && node.value === value) resultArr.push(node)
            visited.push(node)
            node.friends.forEach(friend => {
                if(!visited.includes(friend)) {
                    queue.push(friend)
                } 
            })
        }
        return resultArr
    }
}

//DOCS

// const graph = new Graph()

    // const n1 = new Node(1)
    // const n2 = new Node(2)
    // const n3 = new Node(3)
    // const n4 = new Node(4)
    // const n4_2 = new Node(4)
    // const n5 = new Node(5)
    // const n6 = new Node(6)
    // const n7 = new Node(7)
    // const n8 = new Node(8)

    // const insertNodePair = (node1, node2) => {
    //     graph.insert(node1, node2)
    // }

    // insertNodePair(n1, n7)
    // insertNodePair(n2, n6)
    // insertNodePair(n3, n5)
    // insertNodePair(n3, n1)
    // insertNodePair(n4, n6)
    // insertNodePair(n5, n4)
    // insertNodePair(n5, n2)
    // insertNodePair(n6, n8)
    // insertNodePair(n7, n2)
    // insertNodePair(n7, n8)
    // insertNodePair(n8, n4_2)

    // console.log(graph.BFS(4, n1))
    // console.log(graph.DFS(4, n1))



