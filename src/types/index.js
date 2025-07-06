/**
 * @typedef {'high' | 'medium' | 'low'} Priority
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} creator
 * @property {Priority} priority
 * @property {string} dueDate
 * @property {string} columnId
 * @property {string} boardId
 * @property {string} createdAt
 * @property {number} order
 */

/**
 * @typedef {Object} Column
 * @property {string} id
 * @property {string} title
 * @property {string} boardId
 * @property {number} order
 * @property {Task[]} tasks
 */

/**
 * @typedef {Object} Board
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} createdAt
 * @property {Column[]} columns
 */

/**
 * @typedef {Object} TaskBoardState
 * @property {Board[]} boards
 * @property {Board | null} currentBoard
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} searchTerm
 * @property {Priority | 'all'} priorityFilter
 * @property {'all' | 'overdue' | 'today' | 'week'} dueDateFilter
 */

export {}
