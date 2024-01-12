import { bubblesort } from "./algorithms/bubblesort.js";
import { mergesort } from "./algorithms/mergesort.js";
import { quicksort } from "./algorithms/quicksort.js"
import { BinarySearchTree } from "./data-structures/binary-search-tree.js";
import { DoubleLinkedList } from "./data-structures/double-linked-list.js";
import { Graph } from "./data-structures/graph2.js";
import { Node as GraphNode } from "./data-structures/graph2.js";
import { networkGraph } from "./thingamajig.js";
import HashTable from "./data-structures/hashtable.js";

const rootStyles = getComputedStyle(document.documentElement);
const backgroundColor = rootStyles.getPropertyValue('--backgroundColor');
const darkGray = rootStyles.getPropertyValue('--darkGray');
const highlightColor = rootStyles.getPropertyValue('--highlightColor');
const textColor = rootStyles.getPropertyValue('--textColor');

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function scrollToBottom(element) {
    const $element = $(element);
    $element.scrollTop($element.prop('scrollHeight'));
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

function generateID(length=20) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      id += charset[randomIndex];
    }
    return id;
}

$(document).ready(function() {
    let selectedFirst, selectedLast
    const firstOutput = $(".screen-first")
    const lastOutput = $(".screen-last")
    const firstInput = $(".first-input")
    const lastInput = $(".last-input")

    const LOGS = {}
    let tree, DLL, graph, hashtable, globalID, displayFunc, enterFunc = () => {}, GNODEtimer, currentOutput

    const listener = function(event) {
        if (event.key === 'Enter' && selectedFirst !== "hashtable") {
            $('.screen-first input').val('');
            enterFunc();
            enterFunc = () => {}
        }
    }
    document.addEventListener('keydown', listener);
    

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
      
    function log(msg, id) {
        LOGS[id].push(msg)
    }

    function write(output, id, arr=false, gradual=false) {
        LOGS[id].forEach((msg, index) => {
            const run = () => {
                if(arr) msg = msg.join(' ')
                const msgElement = $('<p>', {'text': msg}).get(0); 
                output.append(msgElement);
                if(currentOutput === lastOutput) scrollToBottom(currentOutput)
            }

            if(!gradual) run()
            else {
                setTimeout(() => {
                    run()
                }, index * 100)
            }
        });
        LOGS[id] = [];
    }
    
    function addButton(output, title, func) {
        const button = $(`<button>${title}</button>`);
        
        button.on('click', function() {
            if(output === firstOutput) cleanupFirstOutput()
            func();
            displayFunc()
        });
        output.find('.controls').append(button);

        return button
    }

    function validateInput(inputValue, requiredLength=-1) {
        if (!inputValue) {
            displayFunc();
            return null;
        }
        if(inputValue.startsWith(" ") || inputValue.endsWith(" ")) return null
        let inputArr = inputValue.trim().split(" ");
        if(inputArr.includes("")) return null
        if (requiredLength !== -1 && inputArr.length !== requiredLength) return null;
    
        inputArr = inputArr.map(element => element === "T" ? 1 : element === "F" ? 0 : Number(element));
    
        for (const element of inputArr) {
            if (!/^-?\d+$/.test(element)) {
                return null;
            }
        }
    
        return inputArr.map(Number);
    }

    function addInput(output, title, placheolder, func, requiredLength = 1) {
        const input = $('<input>').attr('type', 'text').attr('placeholder', placheolder);
    
        input.on('input', function() {
            enterFunc = () => {};
            if (output === firstOutput) cleanupFirstOutput();
    
            const inputValue = input.val();
            const inputArr = validateInput(inputValue, requiredLength);
            if (inputArr === null) return;
    
            if (requiredLength === 1) {
                enterFunc = () => func(inputArr[0]);
            } else {
                enterFunc = () => func(inputArr);
            }
        });
    
        output.find('.controls').append($('<div class="input"></div>').append(`<h3>${title}</h3>`).append(input));
    
        return input;
    }

    function setupRun(selected, input, output) {
        if (!selected || !input.val()) return [null, null];
    
        const validatedInput = validateInput(input.val()); 
        if (validatedInput === null) return [null, null];
    
        const id = generateID();
        LOGS[id] = [];
        output.empty();
        
 
        if (firstOutput.find('.controls').length === 0) {
            firstOutput.append($('<div class="controls"></div>'));
        }

        return [id, validatedInput];
    }
    
    function cleanupFirstOutput() {
        $(firstOutput).children().filter(":not(.controls)").remove();
        LOGS[globalID] = []
    }

    function selectGNODE(value) {
        GNODEtimer += 200
        setTimeout(() => {
            $('.node text')
                .filter((_, element) => $(element).text() == value)
                .prev('circle')
                .attr('fill', 'red');
        }, GNODEtimer)
    }

    function runStructs() {
        currentOutput = firstOutput
        firstInput.prop("disabled", false);
        const [id, arr] = setupRun(selectedFirst, firstInput, firstOutput)
        if(id === null) return
        globalID = id

        cleanupFirstOutput()
        
        if(selectedFirst !== "graph" && selectedFirst !== "hashtable") addButton(firstOutput, "Display", () => {
            $(firstOutput).children().filter(":not(.controls)").remove();
        })


        switch(selectedFirst) {    
            case "binary search tree":
                tree = new BinarySearchTree() 
                arr.forEach(nr => {
                    tree.insert(nr)
                })

                const hideDashes = () => {
                    $('.screen-first p').each(function() {
                        const paragraph = $(this);
                        const content = paragraph.text();
                        const coloredContent = content.split('-').join('<span class="colored-dash">-</span>');
                        paragraph.html(coloredContent);
                    });
                }
 
                displayFunc = () => {
                    tree.display(msg => log(msg.replaceAll(" ", "-"), id))
                    write(firstOutput, id)
                    hideDashes()
            
                }

                addButton(firstOutput, "Reload", () => {
                    tree = new BinarySearchTree() 
                    arr.forEach(nr => {
                        tree.insert(nr)
                    })
                })

                addInput(firstOutput, "find(value)", "4", (inputVal) => {
                    log("Node Found:", id)
                    log(stringifyCircular(tree.find(inputVal)), id)
                    write(firstOutput, id)
                })

                addInput(firstOutput, "remove(value)", "4", (inputVal) => {
                    log("Value Removed:", id)
                    log("Before: ", id)
                    tree.display(msg => log(msg.replaceAll(" ", "-"), id))
                    tree.remove(tree.find(inputVal))
                    log("After: ", id)
                    tree.display(msg => log(msg.replaceAll(" ", "-"), id))
                    write(firstOutput, id)
                    hideDashes()
                })

                break
            case "double linked list":
                DLL = new DoubleLinkedList(arr)

                addButton(firstOutput, "Reload", () => {
                    DLL = new DoubleLinkedList(arr)
                })


                displayFunc = () => {
                    log(DLL.toArray(), id)
                    write(firstOutput, id, true)
                }
                
              addInput(firstOutput, "find(value)", "4", inputVal => {
                    log("Node Found:", id)
                    log(stringifyCircular(DLL.find(inputVal)), id)
                    write(firstOutput, id)
                })

                addInput(firstOutput, "remove(value)","4", inputVal => {
                    log("Node Removed:", id)
                    write(firstOutput, id)
                    DLL.remove(DLL.find(inputVal))
                    displayFunc()
                })

                const insertInput = addInput(firstOutput, "insert(value, index [-1 to len - 1])", "3 0", inputArr => {
                    const targetNode = inputArr[1] === -1 ? -1 : DLL.getNodeByIndex(inputArr[1])
                    DLL.insert(inputArr[0], targetNode)
                    log(DLL.toArray(), id)
                    write(firstOutput, id, true)
                    insertInput.val("")
                }, 2)

                addInput(firstOutput, "getNodeByIndex(index [0 to len - 1])", "3", inputVal => {
                    log(stringifyCircular(DLL.getNodeByIndex(inputVal)), id)
                    write(firstOutput, id)
                })

  

                break
            case "graph":
                graph = new Graph()

                const addToGraph = (one, two, twoWay) => {
                    graph.insert( 
                        graph.firstNode ? graph.findNodeByValue(one) : new GraphNode(one),
                        graph.findNodeByValue(two) ? graph.findNodeByValue(two) : new GraphNode(two),
                        twoWay
                    )
                }

                firstInput.prop("disabled", true);

                addButton(firstOutput, "Reload", () => {
                    graph = new Graph()
                })

                const reloadDemo = addButton(firstOutput, "Reload DEMO", () => {
                    graph = new Graph()
                    addToGraph(1, 2, 'T')
                    addToGraph(2, 3, 'F')
                })

                setTimeout(() => {
                    reloadDemo.click()
                },200)

                addInput(firstOutput, 'addNodePair(v1, v2, twoWay ["T" or "F"])', "3 4 F", inputArr => {
                    const one = inputArr[0]
                    const two = inputArr[1]
                    const twoWay = inputArr[2]
                    addToGraph(one, two, twoWay)
                    displayFunc()
                }, 3)

                const graphSearch = (inputVal, BFS = true) => {
                    GNODEtimer = 200
                    const result = BFS ? graph.BFS(inputVal, val => selectGNODE(val)):graph.DFS(inputVal, val => selectGNODE(val))
                    log(stringifyCircular(result), id)
                    displayFunc()
                    write(firstOutput, id)
                }

                addInput(firstOutput, 'breadthFirstSearch(value)', "3", inputVal => {
                    graphSearch(inputVal)
            
                })

                addInput(firstOutput, 'depthFirstSearch(value)', "3", inputVal => {
                    graphSearch(inputVal, 0)

                })
                
                addInput(firstOutput, 'check(v1, v2, twoWay ["T" or "F"])', "3 4 F", inputArr => {
                    const one = inputArr[0]
                    const two = inputArr[1]
                    let result = false
                    try {
                        result = graph.check(
                            graph.findNodeByValue(one),
                            graph.findNodeByValue(two),
                            inputArr[2]
                        )
                    } catch(err) {

                    }
                    log(result, id)
                    write(firstOutput, id)
                    displayFunc()
                }, 3)   
 
                addInput(firstOutput, 'remove(value)', "3", value => {
                    graph.remove(graph.findNodeByValue(value))
                    displayFunc()
                })

                displayFunc = () => {
                    $('.node text')
                        .prev('circle')
                        .attr('fill', highlightColor);
                    firstOutput.append("<div class='graph'></div>")
                    networkGraph(graph.nodeList)
                }
                break
            case "hashtable":
                firstInput.prop("disabled", true);
                hashtable = new HashTable()

                addButton(firstOutput, "Reset", () => {
                    hashtable = new HashTable()
                })

                let username, password
                var usernameInput = addInput(firstOutput, "username", "John")
                var passwordInput = addInput(firstOutput, "password", "cat123")

                console.log(passwordInput,usernameInput)

                addButton(firstOutput, "Submit", () => {
                    username = $(usernameInput).val()
                    password = $(passwordInput).val()
                    $('.screen-first input').val('');
                    if(isNonEmptyString(username) && isNonEmptyString(password) && !hashtable.check(username, password))
                        hashtable.insert(username, password)
                })

                let check = false
         
                addButton(firstOutput, "Check", () => {
                    username = $(usernameInput).val()
                    password = $(passwordInput).val()
                    $('.screen-first input').val('');
                    if(isNonEmptyString(username) && isNonEmptyString(password))
                    {
                        log(hashtable.check(username, password), id)
                        write(firstOutput, id)
                        check = true
                    }
                })

                addButton(firstOutput, "Remove", () => {
                    username = $(usernameInput).val()
                    password = $(passwordInput).val()
                    $('.screen-first input').val('');
                    if(isNonEmptyString(username) && isNonEmptyString(password) && hashtable.check(username, password))
                        hashtable.remove(username, password)
                })
         

                displayFunc = () => {

                    if(!check) {
                        const silly_number = CryptoJS.SHA256(username + ';' + password).words[0]
                        hashtable.data.forEach((obj, index) => {
                            log(
                                index + stringifyCircular(obj)
                            , id)
                            if(username && password && index == silly_number%100) {                
                                log(`index: hash (${silly_number}) % 100 = ${Math.abs(silly_number%100)}`, id)
                            }
                        })
                        write(firstOutput, id)

                        if(username && password) {
                            const targetParagraph = $('.screen-first p').filter(function() {
                                return $(this).text().trim().startsWith(Math.abs(silly_number%100));
                            });
                            
                            if (targetParagraph.length > 0) {
                                const topOffset = targetParagraph.offset().top - $('.screen-first').offset().top;
                                
                                $('.screen-first').animate({
                                    scrollTop: topOffset
                                }, 'slow');
                            }
                        }
                    } 
                    username = ""
                    password = ""
                    check = false
                }
            }

        displayFunc()

        $('.screen-first input').on('focus', function() {
            if(selectedFirst === "hashtable") return
            $('.screen-first input').val('');
            const containsParagraphOrGraph = firstOutput.find('p, .graph').length > 0;

            if(!containsParagraphOrGraph)            
                displayFunc()
        });
    }

    function runAlgos() {
        currentOutput = lastOutput
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
            write(lastOutput, id, 1, 1)
        }
    }

    firstInput.on("input", ()=>runStructs())
    lastInput.on("input", ()=>runAlgos())
});