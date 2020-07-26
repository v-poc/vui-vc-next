/**
 * Convert kebab-case to camelCase
 */
export const transformCamelCase = function (str) {
  const re = /-(\w)/g
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}
