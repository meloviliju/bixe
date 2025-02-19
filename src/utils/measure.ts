export const measure = (name: string, func: (...args: never[]) => unknown) => {
  const start = performance.now()
  func()
  const end = performance.now()

  const elapsed = end - start
  const elapsedStr = elapsed.toPrecision(3)
  console.log(`${name}: ${elapsedStr}`)
}