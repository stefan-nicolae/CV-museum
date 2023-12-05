class Node {
    constructor(value = undefined, parent = undefined) {
        this.value = value
        this.parent = parent
        this.leftNode = undefined
        this.rightNode = undefined
        this.removed = false
    }

    disinheritSelf() {
        if(this.parent) {
            if(this.parent.leftNode === this) this.parent.leftNode = undefined
            else this.parent.rightNode = undefined
        }
    }

    replaceSelf(node) {
        if(this.parent) {
            if(this.parent.leftNode === this) this.parent.leftNode = node
            else this.parent.rightNode = node
        }
    }
}

export class BinarySearchTree {
    insert(value) {
        if(!this.firstNode) {
            this.firstNode = new Node(value)
            return this.firstNode
        }
        const propagate = (node = this.firstNode) => {
            if(value <= node.value) {
                if(!node.leftNode) {
                    node.leftNode = new Node(value, node)
                    return node.leftNode
                }
                else return propagate(node.leftNode)
            } else {
                if(!node.rightNode) {
                    node.rightNode = new Node(value, node)
                    return node.rightNode
                }
                else return propagate(node.rightNode)
            }
        }
        return propagate()
    }

    display(log=(msg)=>{console.log(msg)}) {
        const findOutDepth = () => {
            let maxDepth = 1
            const propagate = (node = this.firstNode, depth = 1) => {
                if(depth > maxDepth) maxDepth = depth
                if(node.leftNode) propagate(node.leftNode, depth + 1)
                if(node.rightNode) propagate(node.rightNode, depth + 1)
                return
            }
            propagate()
            return maxDepth
        }
        const depth = findOutDepth()
        
        const rows = []
        const getRows = (node = new Node(), level = depth - 1) => {
            if(level === depth - 1) node = this.firstNode
            if(level === -1) return
            if(!rows[level]) rows[level] = []
            rows[level].push(node.value)
            getRows(node.leftNode, level - 1)
            getRows(node.rightNode, level - 1)
        }
        getRows()
        
        const printTree = (level = depth - 1) => {
            if(level === -1) return
            let left = 0, mid = 0, spaces = Math.pow(2, level)
            for(let i = 0; i < level; i++) left += Math.pow(2, i)
            if(level < depth - 1) mid = Math.pow(2, level + 1) - 1
            if(level <= 1) mid = 3
            if(level === 0) { left = 1; spaces = 0;}        
            left -= 1;

            let string = " ".repeat(left)
            rows[level].forEach(item => {
    
                if(item === undefined) item = "*"
                string += "_".repeat(spaces)
                string += item
                string += "_".repeat(spaces)
                string += " ".repeat(mid)
            })
            log(string)
            printTree(level - 1)
        }   
        printTree()
    }      

    find(value) {
        let node = this.firstNode;
    
        while (node) {
            if (node.value === value && !node.removed) {
                return node; 
            }
    
            if (value < node.value) {
                node = node.leftNode; 
            } else {
                node = node.rightNode; 
            }
        }
    
        return null; 
    }

    remove(node) {
        if(!node) return
        const children = [node.leftNode, node.rightNode].filter(node => node)
        if(children.length === 0) {
            if(node === node.firstNode) return
            node.disinheritSelf()
        } else if (children.length === 1) {
            if(this.firstNode !== node) node.replaceSelf(children[0])
            else this.firstNode = children[0]
        } else if(children.length === 2) {
            if(this.firstNode !== node) node.replaceSelf(children[1])
            else this.firstNode = children[1]
            const newNode = this.insert(children[0].value)
            newNode.leftNode = children[0].leftNode
            newNode.rightNode = children[0].rightNode
        }
        node.removed = true
    }
}
 
