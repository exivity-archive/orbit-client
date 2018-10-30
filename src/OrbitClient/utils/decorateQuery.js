export const decorateQuery = (queryFn, options) => {
  const expressions = Object.keys(options).reduce((acc, key) => {
    if (options[key]) acc[key] = options[key]
    return acc
  }, {})

  return Object.entries(expressions).reduce((query, [key, value]) => {
    return (...args) => query(...args)[key](value)
  }, queryFn)
}