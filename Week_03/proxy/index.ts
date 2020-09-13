const callbacks = new Map()
const reactivties = new Map()

let usedReactivties: any[] = []
const reactive = (obj: any): any => {
    if (reactivties.has(obj)) {
        return reactivties.get(obj)
    }
    let proxy = new Proxy(obj, {
        set(obj, pro, value) {
            obj[pro] = value
            if (callbacks.get(obj)) {
                if (callbacks.get(obj).get(pro)) {
                    for (const callback of callbacks.get(obj).get(pro)) {
                        callback()
                    }
                }
            }
            return obj[pro]
        },
        get(obj, pro) {
            usedReactivties.push([obj, pro])
            if (typeof obj[pro] === 'object') {
                return reactive(obj[pro])
            }
            return obj[pro]
        },
    })
    reactivties.set(obj, proxy)
    return proxy
}
const effect = (cb: Function) => {
    usedReactivties = []
    cb()
    for (const reactive of usedReactivties) {
        if (!callbacks.has(reactive[0])) {
            callbacks.set(reactive[0], new Map())
        }
        if (!callbacks.get(reactive[0]).has(reactive[1])) {
            callbacks.get(reactive[0]).set(reactive[1], [])
        }
        callbacks.get(reactive[0]).get(reactive[1]).push(cb)
    }
}
const obj = {
    r: 0,
    g: 0,
    b: 0,
}
const po = reactive(obj)

effect(() => {
    ;(document.getElementById('r')! as HTMLInputElement).value = po.r
})
effect(() => {
    ;(document.getElementById('g')! as HTMLInputElement).value = po.g
})
effect(() => {
    ;(document.getElementById('b')! as HTMLInputElement).value = po.b
})
effect(() => {
    ;(document.getElementById(
        'color'
    ) as HTMLDivElement).style.backgroundColor = `rgb(${po.r},${po.g},${po.b})`
})

document.getElementById('r')?.addEventListener('input', (e) => {
    if (!e.target) {
        return
    }
    po.r = (e.target as HTMLInputElement).value
})
document.getElementById('g')?.addEventListener('input', (e) => {
    if (!e.target) {
        return
    }
    po.g = (e.target as HTMLInputElement).value
})
document.getElementById('b')?.addEventListener('input', (e) => {
    if (!e.target) {
        return
    }
    po.b = (e.target as HTMLInputElement).value
})
