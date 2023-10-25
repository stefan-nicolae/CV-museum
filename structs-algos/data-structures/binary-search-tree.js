class Node {
    constructor(value = undefined, parent = undefined) {
        this.value = value
        this.parent = parent
        this.leftNode = undefined
        this.rightNode = undefined
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

class BinarySearchTree {
    insert(value) {
        if(!this.firstNode) {
            this.firstNode = new Node(value)
            return
        }
        const propagate = (node = this.firstNode) => {
            if(value <= node.value) {
                if(!node.leftNode) node.leftNode = new Node(value, node)
                else propagate(node.leftNode)
            } else {
                if(!node.rightNode) node.rightNode = new Node(value, node)
                else propagate(node.rightNode)
            }
        }
        propagate()
    }

    display() {
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
            console.log(string)
            printTree(level - 1)
        }   
        printTree()
    }      

    find(value) {
        const resultArr = []
        const propagate = (node = this.firstNode) => {
            if(node.value === value) resultArr.push(node)
            if(node.leftNode.value <= node.rightNode.value) propagate(node.leftNode)
            else propagate(node.leftNode)
        }
        propagate()
        return resultArr
    }

    _findSmallestNodeOnRight() {
        const propagate = (node=this.firstNode.rightNode) => {
            if(node.rightNode && node.rightNode.value < node.value) {
                propagate(node.rightNode)
            } else if(node.leftNode && node.leftNode.value < node.value) { 
                propagate(node.leftNode)
            } else {
                return node
            }
        }
        return propagate()
    }

    remove(node) {
        if(!node) return
        if(!node.parent) {
            if(node.rightNode) {
                node.replaceSelf(this._findSmallestNodeOnRight())
            } else {
                node.replaceSelf(node.leftNode)
            }
            return
        }

        const children = [node.leftNode, node.rightNode].filter(value => !value)

        if(!children.length) {
            node.disinheritSelf()
            return
        } else if (children[0] && !children[1]) {
            node.replaceSelf(children[0])
            return
        } else {
            //children[1] bigger than children[0]
            children[1].leftNode = children[0]
            node.replaceSelf(children[1])
        }
    }
}
 
//DOCS

//const tree = new BinarySearchTree( first node's value )

//tree.insert(value)

//tree.display() 
    //  displays the tree's content in the console
    //  looks the best with positive digits

//tree.find(value)
    //  finds all of the nodes with said value 
    //  returns them in an array

//tree.remove(node)
    //  removes node