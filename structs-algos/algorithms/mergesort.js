function merge(a, b) {
    let R = []
    while(1) {
        if(a[0] === undefined) { R = R.concat(b); return R }
        if(b[0] === undefined) { R = R.concat(a); return R }
        if(a[0] <= b[0]) { R.push(a.shift(0)) }
        else R.push(b.shift(0))
    }
}

export function mergesort (a, log=()=>{}) {
    if(a.length === 1) { return a }
    const left = mergesort(a.splice(0, a.length/2), log)
    const right = mergesort(a, log)
    const merged = merge(left, right)
    log([...left])
    log([...right])
    log([...merged])
    return merged
}
