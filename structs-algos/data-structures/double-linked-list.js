class Node {
    constructor(value, prevNode, nextNode) {
        this.value = value
        this.prevNode = prevNode
        this.nextNode = nextNode
    }
}

export class DoubleLinkedList {
    constructor(valuesArray = []) {
        this.lastNode = undefined
        valuesArray.forEach(node => this.insert(node))
    }

    insert(value, targetNode = this.lastNode) {
        try {
            if(!this.firstNode) {
                this.firstNode = new Node(value) 
                this.lastNode = this.firstNode
                return
            }
                       
            if(targetNode === -1) {
                const newFirstNode = new Node(value)
                newFirstNode.nextNode = this.firstNode
                this.firstNode.prevNode = newFirstNode
                this.firstNode = newFirstNode

            }
            else if(targetNode === this.lastNode) {
                this.lastNode.nextNode = new Node(value, this.lastNode)
                this.lastNode = this.lastNode.nextNode
            } else {
                const tempNextNode = targetNode.nextNode
                targetNode.nextNode = new Node(value, targetNode, tempNextNode)
            }
        } catch(err) {
             console.error("Node not found or value not fitting")
        }
    }

    getNodeByIndex(index) {
        try {
            const incrementCounter = (node = this.firstNode, counter = 0) => { 
                if(counter !== index) {
                    return incrementCounter(node.nextNode, counter + 1)
                }
                else return node
            }
            return incrementCounter()
        } catch {
            console.error("Index not found")
        }
    }

    find(value) {
        const recursive = (node = this.firstNode) => {
            if(!node) return false
            if(node.value === value) return node
            else if(typeof node.value === "object" && typeof value === "object" && 
                JSON.stringify(node.value) === JSON.stringify(value)) return node
            if(node.nextNode) return recursive(node.nextNode)
            else return false
        }
        return recursive()
    }

    toArray() {
        const arr = []
        const recursive = (node = this.firstNode) => {
            if(!node) {
                console.error("List Empty")
                return
            }
            arr.push(node.value)
            if(node.nextNode) return recursive(node.nextNode)
            else return arr
        }
        return recursive()
    }

    remove(node) {
        if(!node) return
        if (node.prevNode) {
          node.prevNode.nextNode = node.nextNode;
        } else {
          this.firstNode = node.nextNode;
        }
      
        if (node.nextNode) {
          node.nextNode.prevNode = node.prevNode;
        }
        node.prevNode = null;
        node.nextNode = null;
      }
       
}

