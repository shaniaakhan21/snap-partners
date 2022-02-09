export const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))

export const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const removeLocalStorage = (key) => window.localStorage.removeItem(key)
