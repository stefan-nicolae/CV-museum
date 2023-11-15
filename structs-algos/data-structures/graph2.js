export class Node {
    constructor(value) {
        this.friends = []
        this.value = value
    }
}

export class Graph {
    constructor() {
        this.nodeList = []
    }

    _push (myArray, newValue) {
        if (!myArray.includes(newValue)) myArray.push(newValue);
    }

    find(node) {
        return this.nodeList.includes(node)
    }

    findNodeByValue(value) {
        return this.nodeList.find(node => node.value===value)
    }

    insert(node1, node2, twoWay=true) {
        //if node1 doesn't exist and firstNode doesn't exist, make node1 the firstnode
        if(!this.find(node1) && !this.firstNode) this.firstNode = node1 
        //if node1 doesn't exist and firstNode exists, return
        else if(!this.find(node1) && this.firstNode) return
        //create the connection if it doesn't already exist 
        this._push(this.nodeList, node1)
        this._push(this.nodeList, node2)
        this._push(node1.friends, node2)
        if(twoWay) this._push(node2.friends, node1)
        console.log(this.nodeList)
        
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
