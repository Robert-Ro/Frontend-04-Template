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

window.onload = () => {
    const pattern: number[][] = [
        [0, 0, 2],
        [0, 1, 0],
        [0, 0, 0],
    ]
    let color = 1
    const board: HTMLDivElement | null = document.getElementById(
        'board'
    ) as HTMLDivElement
    const move = (x: number, y: number) => {
        pattern[x][y] = color
        if (check(pattern, color)) {
            alert(color === 2 ? '⭕ is winner!' : '❌ is winner!')
        }
        color = 3 - color // TIPS  1,2 switch value
        show(pattern)
        if (willWin(pattern, color)) {
            alert(color === 2 ? '⭕ will winner!' : '❌ will winner!')
        }
    }
    const show = (pattern: number[][]) => {
        board.innerHTML = ''
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const value = pattern[i][j]
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
    const check = (pattern: number[][], color: number): boolean => {
        // horzontal direction
        // [0,0] = [0,1] = [0, 2]
        // [1,0] = [1,1] = [1, 2]
        // [2,0] = [2,1] = [2, 2]
        for (let i = 0; i < pattern.length; i++) {
            let win = true
            for (let j = 0; j < pattern[i].length; j++) {
                if (pattern[i][j] !== color) {
                    win = false
                }
            }
            if (win) return true
        }
        // vertical direction
        // [0,0] = [1,0] = [2, 0]
        // [0,1] = [1,1] = [2, 1]
        // [0,2] = [1,2] = [2, 2]
        for (let i = 0; i < pattern.length; i++) {
            let win = true
            for (let j = 0; j < pattern[i].length; j++) {
                if (pattern[j][i] !== color) {
                    win = false
                }
            }
            if (win) return true
        }
        // slash direction
        {
            let win = true
            // 0,0 1,1 2,2
            for (let i = 0; i < pattern.length; i++) {
                if (pattern[i][i] !== color) {
                    win = false
                }
            }
            if (win) return true
        }
        {
            let win = true
            // 0,2 1,1 2,0
            for (let i = 0; i < pattern.length; i++) {
                if (pattern[i][2 - i] !== color) {
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
    const willWin = (pattern: number[][], color: number): Point | null => {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const value = pattern[i][j]
                if (value) {
                    continue
                }
                const patternNew = clone(pattern)
                patternNew[i][j] = color
                if (check(patternNew, color)) {
                    return [i, j]
                }
            }
        }
        return null
    }
    const clone = (pattern: number[][]): number[][] => {
        return JSON.parse(JSON.stringify(pattern))
    }
    const bestChoice = (pattern: number[][], color: number): Result => {
        let p: Point | null = null
        if ((p = willWin(pattern, color))) {
            return {
                point: p,
                result: WinFlag.WIN,
            }
        }
        let result = -2
        let point: Point | null = null
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                if (pattern[i][j]) {
                    continue
                }
                let temp = clone(pattern)
                temp[i][j] = color
                let r = bestChoice(temp, 3 - color).result // 对方的最佳，我方的最差
                if (-r > result) {
                    point = [i, j]
                    result = -r
                }
            }
        }
        return {
            point: point ? point : [0, 0],
            result: point ? result : WinFlag.DRAW,
        }
    }

    show(pattern)
    console.log(bestChoice(pattern, color))
}
