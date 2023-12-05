function swap(a, i, j) {
    const t = a[j]
    a[j] = a[i]
    a[i] = t
}

export function quicksort (a, log=()=>{}) {
    if(!a.length) return []
    let pivot = a[a.length - 1]
    let i = 0, j = 0; 
    while(j < a.length - 1) {
        if(a[j] < pivot) swap(a, i++, j)
        j++;
    }
    swap(a, i, a.length - 1) 
    pivot = a[i]
    const left = quicksort(a.slice(0, i), log)
    const right = quicksort(a.slice(i + 1, a.length), log)
    const merged = left.concat([pivot].concat(right))
    log([...left])
    log([...right])
    log([...merged])
    return merged
}   

