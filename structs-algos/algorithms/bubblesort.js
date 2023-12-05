function swap(a, i, j) {
    const t = a[j]
    a[j] = a[i]
    a[i] = t
}

export function bubblesort (a, log=()=>{}) {
    while(true) {
        log([...a])
        let done = true
        for(let i = 0; i < a.length - 1; i++) {
            if(a[i] > a[i + 1]) { 
                {
                    swap(a, i, i + 1)
                    done = false
                    break
                }
            }
        }
        if(done) return a
    }
}

