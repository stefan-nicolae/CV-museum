import { bubblesort } from "./algorithms/bubblesort.js";
import { mergesort } from "./algorithms/mergesort.js";
import { quicksort } from "./algorithms/quicksort.js";

$(document).ready(() => {
    let currentTitle1 = "ct1", currentTitle2 = "ct2"
    const backlog = {}

    function generateRandomString(length=20) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
      
        return result;
    }
      
    function addToBacklog(session, message) {
        backlog[session].push(message)
    }

    function write(session, output) {
        backlog[session].forEach(arr => {
            output.append(`<p>${arr.join(", ")}</p>`)
        })
    }
    
    function go(input, output, index) {
        output.empty()
        const currentTitle = index ? currentTitle2 : currentTitle1
        const session = generateRandomString()
        if(index) {
            let func = () => {}
            switch(currentTitle) {
                case 'bubble sort':
                    func = bubblesort
                    break
                case 'merge sort':
                    func = mergesort
                    break
                case 'quick sort':
                    func = quicksort
                    break
            }
            backlog[session] = [] 
            const result = func(input.val().trimLeft().split(" ").map(Number), (message) => addToBacklog(session, message))
            addToBacklog(session, result)
            write(session, output)
        } else {
            //you have the input and the output
            //you can manipulate the output however you want
            //add buttons to it here
        }   
    }
    
    $("nav:first-of-type button").click((e) => {
        currentTitle1 = e.currentTarget.textContent
        $("nav:first-of-type button").removeClass("highlight")
        $(e.currentTarget).addClass("highlight")
    });

    $("nav:last-of-type button").click((e) => {
        currentTitle2 = e.currentTarget.textContent
        $("nav:last-of-type button").removeClass("highlight")
        $(e.currentTarget).addClass("highlight")
    });

    $("section menu button").each((index, element) => {
        $(element).click(() => {
            const input = $("section").eq(index).find("input")
            const output = $("section").eq(index).find(".screen")
            go(input, output, index)
        })
    })
});
