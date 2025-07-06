const STORAGE_KEY = "taskboard_data"

/**
 * Save boards data to localStorage
 * @param {import('../types/index.js').Board[]} boards
 */
export const saveToLocalStorage = (boards) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

/**
 * Load boards data from localStorage
 * @returns {import('../types/index.js').Board[]}
 */
export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return []
  }
}

/**
 * Generate a unique ID
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
