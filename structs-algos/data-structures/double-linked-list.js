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
        valuesArray.forEach((value) => {
            if(!this.lastNode) this.lastNode = new Node(value)
            else {
                this.lastNode.nextNode = new Node(value)
                this.lastNode.nextNode.prevNode = this.lastNode
                this.lastNode = this.lastNode.nextNode
            }
        })
    }

    insert(value, targetNode = this.lastNode) {
        try {
            if(!this.firstNode) {
                this.firstNode = new Node(value) 
                this.lastNode = this.firstNode
                return
            }
            
            if(targetNode === this.lastNode) {
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
        if(node.prevNode) {
            if(node.nextNode) node.prevNode.nextNode = node.nextNode
            else node.prevNode.nextNode = undefined
        }
        if(node.nextNode) {
            if(node.prevNode) node.nextNode.prevNode = node.prevNode
            else node.nextNode.prevNode = undefined
        }
        node.value = undefined
        node.prevNode = undefined
        node.nextNode = undefined
    }   
}

//DOCS

//const DLL = new DoubleLinkedList( [value1, value2, value3] )
    //  values should be numbers

//DLL.insert( value, targetNode )
    // by default, targetNode is the last node in the list

//DLL.getNodeByIndex( index )
    // works like array[ index ] 

//find ( value )
    // returns the first node that has the value

//remove ( node )
    