/* Global utilities */

export const capitalizeWord = (word) => {
  const lower = word.toLowerCase()
  return word.charAt(0).toUpperCase() + lower.slice(1)
}

export const paginateArray = (array, page_number, page_size ) => {
  return array.slice(page_number * page_size, page_number * page_size + page_size);
}

export function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}