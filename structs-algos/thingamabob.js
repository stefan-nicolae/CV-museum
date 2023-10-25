import { bubblesort } from "./algorithms/bubblesort.js";
import { mergesort } from "./algorithms/mergesort.js";
import { quicksort } from "./algorithms/quicksort.js";

$(document).ready(function() {
    let selectedFirst, selectedLast
    const firstOutput = $(".screen-first")
    const lastOutput = $(".screen-last")
    const firstInput = $(".first-input")
    const lastInput = $(".last-input")
    const LOGS = {}

    $("nav:first-of-type button").each(function(index, button) {
        $(button).click(() => {
            $("nav:first-of-type button").removeClass("highlight");
            $(button).addClass("highlight");
            selectedFirst = button.textContent
        })
        if(index===0) $(button).click()
    });

    $("nav:last-of-type button").each(function(index, button) {
        $(button).click(() => {
            $("nav:last-of-type button").removeClass("highlight");
            $(button).addClass("highlight");
            selectedLast = button.textContent
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
            msgElement.scrollIntoView({ behavior: 'smooth' });
        });
    }
    

    function runStructs() {
        if(!selectedFirst) return
    }

    function runAlgos() {
        if(!selectedLast) return
        if(!lastInput.val()) return
        const id = generateID()
        LOGS[id] = []
        lastOutput.empty()
        const arr = lastInput.val().split(" ").map(Number)
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

    $("button.go-first").click(() => runStructs())
    $("button.go-last").click(() => runAlgos())
});