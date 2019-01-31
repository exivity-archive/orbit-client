export const curried = (fn) => (...args) => {
  if (args.length === 2) return fn(...args)
  else return (value) => fn(...args, value)
}
