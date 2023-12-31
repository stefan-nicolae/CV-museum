import {DoubleLinkedList} from "./double-linked-list.js"

export default class HashTable {
    constructor(){
        this.data = []
        for(let i = 0; i < 99; i++) 
            this.data[i] = new DoubleLinkedList()
    }

    insert(username, password) {
        const index = Math.abs(CryptoJS.SHA256(username + ';' + password).words[0]%100)
        this.data[index].insert(username)
        console.log("Username " + username + " inserted")
        console.log(this.data)
    }

    check(username, password) {
        const index = Math.abs(sha256(username + ';' + password).words[0]%100)
        if(this.data[index].find(username)) return true
        return false
    }
    
    remove(username, password) {
        const index = Math.abs(sha256(password).words[0]%100)
        const node = this.data[index].find(username)
        this.data[index].remove(node)
    }
}


