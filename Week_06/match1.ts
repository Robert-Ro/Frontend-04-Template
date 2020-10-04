const findChars1 = (target: string): boolean => {
    let foundA = false
    for (const c of target) {
        if (c === 'a') {
            foundA = true
        } else if (foundA && c === 'b') {
            return true
        } else {
            foundA = false
        }
    }
    return false
}
console.log(findChars1('abc'))
console.log(findChars1('acbc'))
console.log(findChars1('acab'))
//abcdef
