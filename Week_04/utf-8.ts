const stringToUtf8 = (string) => {
    const list = []
    let byteSize = 0
    for (let i = 0, l = string.length; i < l; i++) {
        let code = string.codePointAt(i)
        if (code > 0x00 && code < 0x7f) {
            byteSize += 1
            list.push(code)
        } else if (code > 0x80 && code < 0x7ff) {
            byteSize += 2
            list.push(192 | (31 & (code >> 6)))
            list.push(128 | (63 & code))
        } else if (
            (code > 0x800 && code <= 0xd7ff) ||
            (code >= 0xe000 && code <= 0xffff)
        ) {
            byteSize += 3
            list.push(224 | (15 & (code >> 12)))
            list.push(128 | (63 & (code >> 6)))
            list.push(128 | (63 & code))
        }
    }
    for (let i = 0; i < list.length; i++) {
        list[i] &= 0xff
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(list)
    } else {
        return [byteSize >> 8, byteSize & 0xff].concat(list)
    }
}
let res = stringToUtf8('A')
console.log(res)

