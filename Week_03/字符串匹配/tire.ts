const $ = Symbol('$')
/**
 * 字典树
 */
class Tire {
    root: any
    constructor() {
        this.root = Object.create(null)
    }
    inert(word: string) {
        let node = this.root
        for (let c of word) {
            if (!node[c]) {
                node[c] = Object.create(null)
            }
            node = node[c]
        }
        if (!($ in node)) {
            node[$] = 0
        }
        node[$]++
    }

    most(): [number, string | null] {
        let max = 0
        let maxWord = null
        let visit = (node: any, word: string) => {
            if (node[$] && node[$] > max) {
                max = node[$]
                maxWord = word
            }
            for (let p in node) {
                visit(node[p], word + p)
            }
        }
        visit(this.root, '')
        return [max, maxWord]
    }
}

let tire = new Tire()
const random = (count: number): string => {
    let s = ''
    for (let index = 0; index < count; index++) {
        s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
    }
    return s
}
for (let index = 0; index < 100000; index++) {
    tire.inert(random(4))
}

const most = tire.most()
console.log(most)
