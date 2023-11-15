import { bubblesort } from "./algorithms/bubblesort.js";
import { mergesort } from "./algorithms/mergesort.js";
import { quicksort } from "./algorithms/quicksort.js"
import { BinarySearchTree } from "./data-structures/binary-search-tree.js";
import { DoubleLinkedList } from "./data-structures/double-linked-list.js";
import { Graph } from "./data-structures/graph2.js";
import { Node as GraphNode } from "./data-structures/graph2.js";
import { networkGraph } from "./thingamajig.js";

$(document).ready(function() {
    let selectedFirst, selectedLast
    const firstOutput = $(".screen-first")
    const lastOutput = $(".screen-last")
    const firstInput = $(".first-input")
    const lastInput = $(".last-input")
    const LOGS = {}
    let tree, DLL, graph, hashtable
    let globalID

    $("nav:first-of-type button").each(function(index, button) {
        $(button).click(() => {
            $("nav:first-of-type button").removeClass("highlight");
            $(button).addClass("highlight");
            selectedFirst = button.textContent
            runStructs()
        })
        if(index===0) $(button).click()
    });

    $("nav:last-of-type button").each(function(index, button) {
        $(button).click(() => {
            $("nav:last-of-type button").removeClass("highlight");
            $(button).addClass("highlight");
            selectedLast = button.textContent
            runAlgos()
        })
        if(index===0) $(button).click()
    });
      
    function generateID(length=20) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let id = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          id += charset[randomIndex];
        }
        return id;
    }

    function log(msg, id) {
        LOGS[id].push(msg)
    }

    function write(output, id, arr=false) {
        LOGS[id].forEach(msg => {
            if(arr) msg = msg.join(' ')
            const msgElement = $('<p>', {'text': msg}).get(0); 
            output.append(msgElement);
        });
    }
    
    function addButton(output, title, func) {
        const button = $(`<button>${title}</button>`);
        
        button.on('click', function() {
            if(output === firstOutput) cleanupFirstOutput()
            func();
        });
        
        output.append(button);
    }

    function addInput(output, placeholder, func) {
        
        const input = $('<input>').attr('type', 'text').attr('placeholder', placeholder);
        
        input.on('input', function() {
            if(output === firstOutput) cleanupFirstOutput()
            const inputValue = input.val(); 
            if(!inputValue) return
            func(inputValue); 
        });
        
        output.append(input);
        return input
    }

    function setupRun(selected, input, output) {
        if(!selected || !input.val()) return [null, null]
        const id = generateID()
        LOGS[id] = []
        output.empty()
        const arr = input.val().split(" ").map(Number)
        return [id, arr]
    }

    function stringifyCircular(obj) {
        const seen = new Map();
      
        return JSON.stringify(obj, function(key, value) {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return '[Circular]';
            }
            seen.set(value, true);
          }
          return value;
        });
    }

    function cleanupFirstOutput() {
        $(firstOutput).children().filter(":not(button, input)").remove();
        LOGS[globalID] = []
    }

    function runStructs() {
        firstInput.prop("disabled", false);
        const [id, arr] = setupRun(selectedFirst, firstInput, firstOutput)
        if(id === null) return
        globalID = id

        cleanupFirstOutput()

        switch(selectedFirst) {
            case "binary search tree":
                tree = new BinarySearchTree() 
                arr.forEach(nr => {
                    tree.insert(nr)
                })

                addButton(firstOutput, "Display", () => {
                    tree.display(msg => log(msg.replaceAll(" ", "-"), id))
                    write(firstOutput, id)
                })

                addButton(firstOutput, "Reload Tree", () => {
                    tree = new BinarySearchTree() 
                    arr.forEach(nr => {
                        tree.insert(nr)
                    })
                    $("button:contains('" + "Display" + "')").click()
                })

                addInput(firstOutput, "find(value)", (inputVal) => {
                    inputVal = parseFloat(inputVal)
                    log(stringifyCircular(tree.find(inputVal)), id)
                    write(firstOutput, id)
                })

                addInput(firstOutput, "remove(value)", (inputVal) => {
                    inputVal = parseFloat(inputVal)
                    log("Before: ", id)
                    tree.display(msg => log(msg.replaceAll(" ", "-"), id))
                    tree.remove(tree.find(inputVal))
                    log("After: ", id)
                    tree.display(msg => log(msg.replaceAll(" ", "-"), id))
                    write(firstOutput, id)
                })

                $("button:contains('" + "Display" + "')").click()
                break
            case "double linked list":
                DLL = new DoubleLinkedList(arr)

                addButton(firstOutput, "Reload", () => {
                    DLL = new DoubleLinkedList(arr)
                    $("button:contains('" + "toArray" + "')").click()
                })

                addButton(firstOutput, "toArray", () => {
                    log(DLL.toArray(), id)
                    write(firstOutput, id, true)
                })

                const insertInput = addInput(firstOutput, "insert(value, index [-1 -> length-1])", inputVal => {
                    let inputArr = inputVal.split(" ")
                    if(inputArr[1] === "") return
                    inputArr = inputArr.map(Number)
                    const value = inputArr[0]
                    const targetNode = inputArr[1] === -1 ? -1 : DLL.getNodeByIndex(inputArr[1])
                    if(inputArr.length===2 && !isNaN(inputArr[1])){
                        DLL.insert(value, targetNode)
                        log(DLL.toArray(), id)
                        write(firstOutput, id, true)
                        insertInput.val("")
                    }
                })

                addInput(firstOutput, "getNodeByIndex(index [0 -> length-1])", inputVal => {
                    log(stringifyCircular(DLL.getNodeByIndex(parseFloat(inputVal))), id)
                    write(firstOutput, id)
                }).on('input', function() {
                    if ($(this).val() === "") {
                        $("button:contains('" + "toArray" + "')").click()
                    }
                });

                addInput(firstOutput, "find(value)", inputVal => {
                    log(stringifyCircular(DLL.find(parseFloat(inputVal))), id)
                    write(firstOutput, id)
                }).on('input', function() {
                    if ($(this).val() === "") {
                        $("button:contains('" + "toArray" + "')").click()
                    }
                });

                addInput(firstOutput, "remove(value)", inputVal => {
                    DLL.remove(DLL.find(parseFloat(inputVal)))
                    $("button:contains('" + "toArray" + "')").click()
                }).on('input', function() {
                    if ($(this).val() === "") {
                        $("button:contains('" + "toArray" + "')").click()
                    }
                });

                $("button:contains('" + "toArray" + "')").click()
                break
            case "graph":
                graph = new Graph()
                firstInput.prop("disabled", true);

                addInput(firstOutput, "insertNodePair(v1, v2, twoWay T/F)", inputVal => {
                    let inputArr = inputVal.split(" ")
                    if(inputArr.length === 3 && inputArr[2] !== "" && inputArr[2] !== 0) {
                        const one = parseFloat(inputArr[0])
                        const two = parseFloat(inputArr[1])
                        //HERE
                        graph.insert(
                            graph.firstNode ? graph.findNodeByValue(one) : new GraphNode(one),
                            graph.findNodeByValue(two) ? graph.findNodeByValue(two) : new GraphNode(two),
                            inputArr[2] === "T" ? true : false
                        )
                        firstOutput.find("input").eq(0).val("");
                    }
                    $("button:contains('" + "Display" + "')").click()
                }).on('input', function() {
                    if ($(this).val() === "") {
                        $("button:contains('" + "Display" + "')").click()
                    }
                });
                addButton(firstOutput, "Reset", () => {
                    graph = new Graph()
                    $("button:contains('" + "Display" + "')").click()
                })
                addButton(firstOutput, "Display", () => {
                    firstOutput.append("<p>Made with d3.js</p>")
                    firstOutput.append("<div class='graph'></div>")
                    networkGraph(graph.nodeList)
                })
                $("button:contains('" + "Display" + "')").click()
                break
        }
    }

    function runAlgos() {
        const [id, arr] = setupRun(selectedLast, lastInput, lastOutput)
        if(id === null) return

        let func
        switch(selectedLast){
            case "bubble sort":
                func = bubblesort
                break
            case "merge sort":
                func = mergesort
                break
            case "quick sort":
                func = quicksort
                break
        }
        if(func) {
            func(arr, (msg) => log(msg, id))
            write(lastOutput, id, 1)
        }
    }

    firstInput.on("input", ()=>runStructs())
    lastInput.on("input", ()=>runAlgos())

});