/**
 * letcode 28
 * @param source
 * @param pattern
 */
const kmp = (source: string, pattern: string) => {
    let table: number[] = new Array(pattern.length).fill('0').map((_) => 0)
    {
        let i = 1,
            j = 0
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++i
                ++j
                table[i] = j
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    ++i
                }
            }
        }
        console.log(table)
    }
    {
        let i = 0,
            j = 0
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                ++i, ++j
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    ++i
                }
            }
            if (j === pattern.length) {
                return true
            }
        }
        return false
    }
}

console.log(kmp('hello', 'll'))
