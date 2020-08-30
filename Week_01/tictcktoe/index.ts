type Point = [number, number]
enum WinFlag {
    LOST = -1,
    DRAW = 0,
    WIN = 1,
}
interface Result {
    point: Point
    result: WinFlag
}
const dimension = 3
window.onload = () => {
    const pattern: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    let color = 1
    const board: HTMLDivElement | null = document.getElementById(
        'board'
    ) as HTMLDivElement
    const move = (x: number, y: number) => {
        pattern[x * dimension + y] = color
        if (check(pattern, color)) {
            alert(color === 2 ? '⭕ is winner!' : '❌ is winner!')
        }
        color = dimension - color // TIPS  1,2 switch value
        console.log(bestChoice(pattern, color))
        show(pattern)
        // if (willWin(pattern, color)) {
        //     alert(color === 2 ? '⭕ will winner!' : '❌ will winner!')
        // }
    }
    const show = (pattern: number[]) => {
        board.innerHTML = ''
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                const value = pattern[i * dimension + j]
                const cell: HTMLDivElement = document.createElement('div')
                // div.setAttribute('class', 'cell')
                cell.classList.add('cell')
                cell.innerText = value === 0 ? ' ' : value === 1 ? '❌' : '⭕'
                cell.addEventListener('click', (e: MouseEvent) => {
                    cell.innerText == '' && move(i, j)
                })
                board?.appendChild(cell)
            }
            board?.appendChild(document.createElement('br'))
        }
    }
    const check = (pattern: number[], color: number): boolean => {
        // horzontal direction 012 dimension45 678
        for (let i = 0; i < dimension; i++) {
            let win = true
            for (let j = 0; j < dimension; j++) {
                if (pattern[i * dimension + j] !== color) {
                    win = false
                }
            }
            if (win) return true
        }
        // vertical direction 0dimension6 147 258
        for (let i = 0; i < dimension; i++) {
            let win = true
            for (let j = 0; j < dimension; j++) {
                if (pattern[j * dimension + i] !== color) {
                    win = false
                }
            }
            if (win) return true
        }
        // slash direction
        {
            let win = true
            // 0,4,8
            for (let i = 0; i < dimension; i++) {
                if (pattern[i * dimension + i] !== color) {
                    win = false
                }
            }
            if (win) return true
        }
        {
            let win = true
            // 2,4,6
            for (let i = 0; i < dimension; i++) {
                if (pattern[i * 2 + 2] !== color) {
                    win = false
                }
            }
            if (win) return true
        }
        return false
    }
    /**
     * 遍历空节点，走下一步有没有哪一方将赢
     * @param pattern
     * @param color
     */
    const willWin = (pattern: number[], color: number): Point | null => {
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                const value = pattern[i * dimension + j]
                if (value) {
                    continue
                }
                const patternNew = clone(pattern)
                patternNew[i * dimension + j] = color
                if (check(patternNew, color)) {
                    return [i, j]
                }
            }
        }
        return null
    }
    const clone = (pattern: number[]): number[] => {
        return Object.create(pattern) // memory
    }
    const bestChoice = (pattern: number[], color: number): Result => {
        let p: Point | null = null
        if ((p = willWin(pattern, color))) {
            return {
                point: p,
                result: WinFlag.WIN,
            }
        }
        let result = -2
        let point: Point | null = null
        outer: for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                if (pattern[i * dimension + j]) {
                    continue
                }
                let temp = clone(pattern)
                temp[i * dimension + j] = color
                let r = bestChoice(temp, dimension - color).result // 对方的最佳，我方的最差
                if (-r > result) {
                    point = [i, j]
                    result = -r
                }
                if (result === 1) {
                    break outer // 胜负分枝
                }
            }
        }
        return {
            point: point ? point : [0, 0],
            result: point ? result : WinFlag.DRAW,
        }
    }

    show(pattern)
}
