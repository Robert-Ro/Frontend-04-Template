let dragableEle = document.getElementById('dragable')
let baseX = 0,
    baseY = 0
dragableEle!.addEventListener('mousedown', (e: MouseEvent) => {
    const { clientX: startX, clientY: startY } = e
    const up = (e1: MouseEvent) => {
        baseX = baseX + e1.clientX - startX
        baseY = baseY + e1.clientY - startY
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    const move = (e2: MouseEvent) => {
        const { clientX, clientY } = e2
        const x = clientX - startX > 0 ? clientX - startX : 0
        const y = clientY - startY > 0 ? clientY - startY : 0
        // dragableEle!.style.transform = `translate(${x + baseX}px, ${
        //     y + baseY
        // }px)`
        let range = getNearest(clientX, clientY)
        range?.insertNode(dragableEle!)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
})

let container = document.getElementById('container')!
let ranges: Range[] = []
for (let i = 0; i < container.childNodes[0].textContent!.length; i++) {
    let range = document.createRange()
    range.setStart(container.childNodes[0], i)
    range.setEnd(container.childNodes[0], i)
    console.log(range.getBoundingClientRect())
    ranges.push(range)
}

const getNearest = (x: number, y: number) => {
    let min = Infinity
    let nearest: Range | null = null
    for (let range of ranges) {
        let rect = range.getBoundingClientRect()
        let distance = (rect.x - x) ** 2 + (rect.y - y) ** 2
        if (distance < min) {
            nearest = range
            min = distance
        }
    }
    return nearest
}
