import React, { createContext, useContext, useReducer, useEffect, useState } from "react"
import { saveToLocalStorage, loadFromLocalStorage, generateId } from "../utils/localStorage.js"

/**
 * @typedef {Object} TaskBoardContextType
 * @property {import('../types/index.js').TaskBoardState} state
 * @property {(title: string, description: string) => void} createBoard
 * @property {(boardId: string, title: string, description: string) => void} updateBoard
 * @property {(boardId: string) => void} deleteBoard
 * @property {(boardId: string) => void} setCurrentBoard
 * @property {(boardId: string, title: string) => void} createColumn
 * @property {(columnId: string, title: string) => void} updateColumn
 * @property {(columnId: string) => void} deleteColumn
 * @property {(columnId: string, task: Omit<import('../types/index.js').Task, 'id' | 'createdAt' | 'order'>) => void} createTask
 * @property {(taskId: string, updates: Partial<import('../types/index.js').Task>) => void} updateTask
 * @property {(taskId: string) => void} deleteTask
 * @property {(taskId: string, targetColumnId: string, newOrder: number) => void} moveTask
 * @property {(taskId: string, newOrder: number) => void} reorderTask
 */

/** @type {import('../types/index.js').TaskBoardState} */
const initialState = {
  boards: [],
  currentBoard: null,
}

/**
 * Task board reducer function
 * @param {import('../types/index.js').TaskBoardState} state
 * @param {Object} action
 * @returns {import('../types/index.js').TaskBoardState}
 */
const taskBoardReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_BOARDS":
      return { ...state, boards: action.payload }

    case "CREATE_BOARD":
      return { ...state, boards: [...state.boards, action.payload] }

    case "DELETE_BOARD":
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payload),
        currentBoard: state.currentBoard?.id === action.payload ? null : state.currentBoard,
      }

    case "UPDATE_BOARD": {
      const updatedBoards = state.boards.map((board) =>
        board.id === action.payload.boardId
          ? { ...board, title: action.payload.title, description: action.payload.description }
          : board,
      )
      return {
        ...state,
        boards: updatedBoards,
        currentBoard:
          state.currentBoard?.id === action.payload.boardId
            ? updatedBoards.find((board) => board.id === action.payload.boardId) || null
            : state.currentBoard,
      }
    }

    case "SET_CURRENT_BOARD":
      return {
        ...state,
        currentBoard: state.boards.find((board) => board.id === action.payload) || null,
      }

    case "CREATE_COLUMN": {
      const updatedBoards = state.boards.map((board) =>
        board.id === action.payload.boardId ? { ...board, columns: [...board.columns, action.payload.column] } : board,
      )
      return {
        ...state,
        boards: updatedBoards,
        currentBoard:
          state.currentBoard?.id === action.payload.boardId
            ? updatedBoards.find((board) => board.id === action.payload.boardId) || null
            : state.currentBoard,
      }
    }

    case "UPDATE_COLUMN": {
      const updatedBoards = state.boards.map((board) => ({
        ...board,
        columns: board.columns.map((column) =>
          column.id === action.payload.columnId ? { ...column, title: action.payload.title } : column,
        ),
      }))
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: state.currentBoard
          ? updatedBoards.find((board) => board.id === state.currentBoard.id) || null
          : null,
      }
    }

    case "DELETE_COLUMN": {
      const updatedBoards = state.boards.map((board) => ({
        ...board,
        columns: board.columns.filter((column) => column.id !== action.payload),
      }))
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: state.currentBoard
          ? updatedBoards.find((board) => board.id === state.currentBoard.id) || null
          : null,
      }
    }

    case "CREATE_TASK": {
      const updatedBoards = state.boards.map((board) => ({
        ...board,
        columns: board.columns.map((column) =>
          column.id === action.payload.columnId ? { ...column, tasks: [...column.tasks, action.payload.task] } : column,
        ),
      }))
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: state.currentBoard
          ? updatedBoards.find((board) => board.id === state.currentBoard.id) || null
          : null,
      }
    }

    case "UPDATE_TASK": {
      const updatedBoards = state.boards.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === action.payload.taskId ? { ...task, ...action.payload.updates } : task,
          ),
        })),
      }))
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: state.currentBoard
          ? updatedBoards.find((board) => board.id === state.currentBoard.id) || null
          : null,
      }
    }

    case "DELETE_TASK": {
      const updatedBoards = state.boards.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => task.id !== action.payload),
        })),
      }))
      return {
        ...state,
        boards: updatedBoards,
        currentBoard: state.currentBoard
          ? updatedBoards.find((board) => board.id === state.currentBoard.id) || null
          : null,
      }
    }

    case "MOVE_TASK": {
      const { taskId, targetColumnId, newOrder } = action.payload
      let taskToMove = null

      // Find and remove the task from its current column
      const boardsWithTaskRemoved = state.boards.map((board) => ({
        ...board,
        columns: board.columns.map((column) => {
          const taskIndex = column.tasks.findIndex((task) => task.id === taskId)
          if (taskIndex !== -1) {
            taskToMove = { ...column.tasks[taskIndex], columnId: targetColumnId, order: newOrder }
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          }
          return column
        }),
      }))

      if (!taskToMove) return state

      // Add the task to the target column
      const updatedBoards = boardsWithTaskRemoved.map((board) => ({
        ...board,
        columns: board.columns.map((column) => {
          if (column.id === targetColumnId) {
            const updatedTasks = [...column.tasks, taskToMove]
            updatedTasks.sort((a, b) => a.order - b.order)
            return { ...column, tasks: updatedTasks }
          }
          return column
        }),
      }))

      return {
        ...state,
        boards: updatedBoards,
        currentBoard: state.currentBoard
          ? updatedBoards.find((board) => board.id === state.currentBoard.id) || null
          : null,
      }
    }

    case "REORDER_TASK": {
      const { taskId, newOrder } = action.payload
      const updatedBoards = state.boards.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks
            .map((task) => (task.id === taskId ? { ...task, order: newOrder } : task))
            .sort((a, b) => a.order - b.order),
        })),
      }))

      return {
        ...state,
        boards: updatedBoards,
        currentBoard: state.currentBoard
          ? updatedBoards.find((board) => board.id === state.currentBoard.id) || null
          : null,
      }
    }

    default:
      return state
  }
}

/** @type {React.Context<TaskBoardContextType | undefined>} */
const TaskBoardContext = createContext(undefined)

/**
 * TaskBoard Provider Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const TaskBoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskBoardReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBoards = loadFromLocalStorage()
    dispatch({ type: "LOAD_BOARDS", payload: savedBoards })
  }, [])

  // Save to localStorage whenever boards change
  useEffect(() => {
    if (state.boards.length > 0) {
      saveToLocalStorage(state.boards)
    }
  }, [state.boards])

  const createBoard = (title, description) => {
    const newBoard = {
      id: generateId(),
      title,
      description,
      createdAt: new Date().toISOString(),
      columns: [],
    }
    dispatch({ type: "CREATE_BOARD", payload: newBoard })
  }

  const updateBoard = (boardId, title, description) => {
    dispatch({ type: "UPDATE_BOARD", payload: { boardId, title, description } })
  }

  const deleteBoard = (boardId) => {
    dispatch({ type: "DELETE_BOARD", payload: boardId })
  }

  const setCurrentBoard = (boardId) => {
    dispatch({ type: "SET_CURRENT_BOARD", payload: boardId })
  }

  const createColumn = (boardId, title) => {
    const newColumn = {
      id: generateId(),
      title,
      boardId,
      order: state.boards.find((b) => b.id === boardId)?.columns.length || 0,
      tasks: [],
    }
    dispatch({ type: "CREATE_COLUMN", payload: { boardId, column: newColumn } })
  }

  const updateColumn = (columnId, title) => {
    dispatch({ type: "UPDATE_COLUMN", payload: { columnId, title } })
  }

  const deleteColumn = (columnId) => {
    dispatch({ type: "DELETE_COLUMN", payload: columnId })
  }

  const createTask = (columnId, taskData) => {
    const column = state.currentBoard?.columns.find((c) => c.id === columnId)
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      order: column?.tasks.length || 0,
    }
    dispatch({ type: "CREATE_TASK", payload: { columnId, task: newTask } })
  }

  const updateTask = (taskId, updates) => {
    dispatch({ type: "UPDATE_TASK", payload: { taskId, updates } })
  }

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId })
  }

  const moveTask = (taskId, targetColumnId, newOrder) => {
    dispatch({ type: "MOVE_TASK", payload: { taskId, targetColumnId, newOrder } })
  }

  const reorderTask = (taskId, newOrder) => {
    dispatch({ type: "REORDER_TASK", payload: { taskId, newOrder } })
  }

  return (
    <TaskBoardContext.Provider
      value={{
        state,
        createBoard,
        updateBoard,
        deleteBoard,
        setCurrentBoard,
        createColumn,
        updateColumn,
        deleteColumn,
        createTask,
        updateTask,
        deleteTask,
        moveTask,
        reorderTask,
      }}
    >
      {children}
    </TaskBoardContext.Provider>
  )
}

/**
 * Hook to use TaskBoard context
 * @returns {TaskBoardContextType}
 */
export const useTaskBoard = () => {
  const context = useContext(TaskBoardContext)
  if (!context) {
    throw new Error("useTaskBoard must be used within a TaskBoardProvider")
  }
  return context
}
