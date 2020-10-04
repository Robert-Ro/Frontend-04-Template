{
    const match = (target: string) => {
        let state = start
        for (const c of target) {
            state = state(c)
        }
        return state === end
    }

    const start = (char: string): any => {
        if (char === 'a') {
            return foundA
        } else {
            return start
        }
    }

    const end = (char: string) => {
        return end
    }

    const foundA = (char: string) => {
        if (char === 'b') {
            return foundB
        } else {
            return start(char)
        }
    }

    const foundB = (char: string) => {
        if (char === 'c') {
            return foundC
        } else if (char === 'x') {
            return end
        } else {
            return start(char)
        }
    }

    const foundC = (char: string) => {
        if (char === 'a') {
            return foundA
        } else {
            return start(char)
        }
    }

    console.log(match('abcabx'))
    console.log(match('abcabc'))
    console.log(match('abcabxc'))
}
