import co from 'co'
const container: HTMLElement | null = document.getElementById('container')
for (let index = 0; index < 3; index++) {
  const element: HTMLDivElement | null = document.createElement('div');
  element.classList.add('element')
  container?.appendChild(element)
}
// @ts-ignore
const duration = (timeout: number) => (new Promise<any>((resolve: Function) => setTimeout(resolve, timeout)))

const lightOff = () => {
  for (let index = 0; index < container?.childElementCount!; index++) {
    (container?.children[index] as HTMLDivElement).style.backgroundColor = 'grey';
  }
}
const lightOn = (color: string, index: number) => {
  lightOff();
  (container?.children[index] as HTMLDivElement).style.backgroundColor = color
}

/**
 * async/await实现
 */
const start = async () => {
  while (true) {
    lightOn('red', 0)
    await duration(1000)
    lightOn('yellow', 1)
    await duration(500)
    lightOn('green', 2)
    await duration(300)
  }
}

/**
 * 手动控制
 */
const go = async () => {
  const btn = document.getElementById('button')
  while (true) {
    lightOn('red', 0)
    await new Promise((resolve) => {
      btn?.addEventListener('click', resolve, { passive: true })
    })
    lightOn('yellow', 1)
    await new Promise((resolve) => {
      btn?.addEventListener('click', resolve, { passive: true })
    })
    lightOn('green', 2)
    await new Promise((resolve) => {
      btn?.addEventListener('click', resolve, { passive: true })
    })
  }
}

function* useGenerator(): IterableIterator<Promise<undefined>> {
  while (true) {
    lightOn('red', 0)
    yield duration(1000)
    lightOn('yellow', 1)
    yield duration(500)
    lightOn('green', 2)
    yield duration(300)
  }
}
const run = (iterator: IterableIterator<Promise<undefined>>) => {
  const { value, done } = iterator.next()
  if (done) {
    return
  }
  if (value instanceof Promise) {
    value.then(() => {
      run(iterator)
    })
  }
}

const co = (generator: Function) => {
  return () => {
    run(generator())
  }
}
//@ts-ignore
useGenerator = co(useGenerator)

async function* counter() {
  let i = 0
  while (true) {
    await duration(1000)
    yield i++
  }
}
(async () => {
  // @ts-ignore
  for await (let index of counter()) {
    console.log(index)
  }
})()
