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

    exists(node) {
        return this.nodeList.includes(node)
    }

    findNodeByValue(value) {
        return this.nodeList.find(node => node.value===value)
    }

    insert(node1, node2, twoWay=true) {
        if(node1.value === node2.value) return
        if(!this.exists(node1) && !this.firstNode) this.firstNode = node1 
        else if(!this.exists(node1) && this.firstNode) return
        
        this._push(this.nodeList, node1)
        this._push(this.nodeList, node2)
        this._push(node1.friends, node2)
        if(twoWay) this._push(node2.friends, node1)        
    }

    check(node1, node2, twoWay=true) {
       if(twoWay) return node1.friends.includes(node2) && node2.friends.includes(node1)
       else return node1.friends.includes(node2) !== node2.friends.includes(node1)
    }

    DFS (value, select=()=>{}, startNode=this.nodeList[0]) {
        const stack = [startNode], visited = [], resultArr = []
        while(stack.length) {
            const node = stack.pop()
            if(!visited.includes(node) && node.value === value) resultArr.push(node)
            visited.push(node)
            select(node.value)
            node.friends.forEach(friend => {
                if(!visited.includes(friend)) {
                    stack.push(friend)
                } 
            })
        }
        return resultArr
    }

    BFS (value, select=()=>{}, startNode=this.nodeList[0]) {
        const queue = [startNode], visited = [], resultArr = []
        while(queue.length) {
            const node = queue.shift()
            if(!visited.includes(node) && node.value === value) resultArr.push(node)
            visited.push(node)
            select(node.value)
            node.friends.forEach(friend => {
                if(!visited.includes(friend)) {
                    queue.push(friend)
                } 
            })
        }
        return resultArr
    }
    
    remove(nodeToGo) {
        if(this.exists(nodeToGo)) {
            this.nodeList.forEach((node, i) => {
                if(node === nodeToGo) {
                    this.nodeList[i].friends.forEach(friend => {
                        let execute = true
                        this.nodeList.forEach(someone => {
                            if(someone.friends.includes(friend) && someone !== nodeToGo) {
                                execute = false
                                return
                            }
                        })
                        if(execute) this.remove(friend)
                    })
                    this.nodeList.splice(i, 1)
                }
                else {
                    this.nodeList[i].friends.forEach((friend, j) => {
                        if(friend === nodeToGo) {
                            this.nodeList[i].friends.splice(j, 1)
                        }
                    })
                }
            })
        }
    }
}
