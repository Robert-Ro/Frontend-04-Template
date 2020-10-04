const findChars2 = (target: string): boolean => {
    let foundA, foundB, foundC, foundD, foundE
    for (const char of target) {
        if (char === 'a') {
            foundA = true
        } else if (foundA && char === 'b') {
            foundB = true
        } else if (foundB && char === 'c') {
            foundC = true
        } else if (foundC && char === 'd') {
            foundD = true
        } else if (foundD && char === 'e') {
            foundE = true
        } else if (foundE && char === 'f') {
            return true
        } else {
            foundA = false
            foundB = false
            foundC = false
            foundD = false
            foundE = false
        }
    }
    return false
}
console.log(findChars2('abcdefg'))
console.log(findChars2('abcdeg'))
