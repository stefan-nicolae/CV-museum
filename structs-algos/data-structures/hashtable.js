import {DoubleLinkedList} from "./double-linked-list.js"

export default class HashTable {
    constructor(){
        this.data = []
        for(let i = 0; i <= 99; i++) 
            this.data[i] = new DoubleLinkedList()
    }

    insert(username, password) {
        const index = Math.abs(CryptoJS.SHA256(username + ';' + password).words[0]%100)
        this.data[index].insert(username)
        console.log("Username " + username + " inserted")
    }

    check(username, password) {
        const index = Math.abs(CryptoJS.SHA256(username + ';' + password).words[0]%100)
        if(this.data[index].find(username)) return true
        return false
    }
    
    remove(username, password) {
        const index = Math.abs(CryptoJS.SHA256(username + ';' + password).words[0]%100)
        this.data[index].remove(this.data[index].find(username))
    }
}


