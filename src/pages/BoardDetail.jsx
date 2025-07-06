import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTaskBoard } from "../context/TaskBoardContext"
import Column from "../components/Column"
import TaskForm from "../components/TaskForm"
import SearchFilter from "../components/SearchFilter"

export default function BoardDetail() {
  const { id } = useParams()
  const {
    state,
    setCurrentBoard,
    createColumn,
    updateColumn,
    deleteColumn,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useTaskBoard()
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [selectedColumnId, setSelectedColumnId] = useState("")
  const [newColumnTitle, setNewColumnTitle] = useState("")
  const [showColumnForm, setShowColumnForm] = useState(false)
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [filters, setFilters] = useState({
    searchTerm: "",
    priorityFilter: "all",
    dueDateFilter: "all",
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      setCurrentBoard(id)
    }
  }, [id, setCurrentBoard])

  // Filtering logic (as in your code)
  const filterTasks = (tasks) => {
    const { searchTerm, priorityFilter, dueDateFilter } = filters
    return tasks.filter((task) => {
      let matchesSearch = true
      let matchesPriority = true
      let matchesDueDate = true

      if (searchTerm) {
        matchesSearch =
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      if (priorityFilter !== "all") {
        matchesPriority = task.priority === priorityFilter
      }
      if (dueDateFilter !== "all" && task.dueDate) {
        const taskDate = new Date(task.dueDate)
        const today = new Date()
        const weekFromNow = new Date()
        weekFromNow.setDate(today.getDate() + 7)

        switch (dueDateFilter) {
          case "overdue":
            matchesDueDate = taskDate < today
            break
          case "today":
            matchesDueDate = taskDate.toDateString() === today.toDateString()
            break
          case "week":
            matchesDueDate = taskDate >= today && taskDate <= weekFromNow
            break
          default:
            matchesDueDate = true
        }
      } else if (dueDateFilter !== "all" && !task.dueDate) {
        matchesDueDate = false
      }

      return matchesSearch && matchesPriority && matchesDueDate
    })
  }

  // Handle create column
  const handleCreateColumn = () => {
    if (newColumnTitle.trim()) {
      createColumn(id, newColumnTitle.trim())
      setNewColumnTitle("")
      setShowColumnForm(false)
    }
  }

  // Handle create task
  const handleCreateTask = (columnId) => {
    setSelectedColumnId(columnId)
    setShowTaskForm(true)
  }

  const handleTaskSubmit = (columnId, taskData) => {
    createTask(columnId, taskData)
    setShowTaskForm(false)
    setSelectedColumnId("")
  }

  // Drag and drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()
    if (draggedTaskId && targetColumnId) {
      moveTask(draggedTaskId, targetColumnId)
      setDraggedTaskId(null)
    }
  }

  // If board not found
  if (!state.currentBoard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-12 rounded-3xl">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Board not found</h2>
          <p className="text-gray-600 mb-8">The board you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary px-6 py-3 text-base font-semibold rounded-xl hover-lift"
          >
            Back to Boards
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="animate-slide-in-left">
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Boards
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 gradient-text">{state.currentBoard.title}</h1>
            {state.currentBoard.description && (
              <p className="text-gray-600 text-lg opacity-80">{state.currentBoard.description}</p>
            )}
          </div>
          <button
            onClick={() => setShowColumnForm(true)}
            className="btn-primary px-6 py-3 text-base font-semibold rounded-xl animate-slide-in-left hover-lift"
            style={{ animationDelay: "0.2s" }}
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Column
          </button>
        </div>

        <SearchFilter filters={filters} onFiltersChange={setFilters} />

        <div className="flex space-x-6 overflow-x-auto pb-6">
          {state.currentBoard.columns
            .sort((a, b) => a.order - b.order)
            .map((column, index) => (
              <div key={column.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <Column
                  column={column}
                  filteredTasks={filterTasks(column.tasks)}
                  onEditColumn={updateColumn}
                  onDeleteColumn={deleteColumn}
                  onCreateTask={handleCreateTask}
                  onEditTask={updateTask}
                  onDeleteTask={deleteTask}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              </div>
            ))}

          {state.currentBoard.columns.length === 0 && (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="text-center glass-card p-16 rounded-3xl animate-fade-in">
                <svg
                  className="mx-auto h-20 w-20 text-gray-400 mb-8 opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No columns yet</h3>
                <p className="text-lg text-gray-600 opacity-80 mb-8">
                  Get started by creating your first column to organize your tasks.
                </p>
                <button
                  onClick={() => setShowColumnForm(true)}
                  className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl hover-lift"
                >
                  <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Your First Column
                </button>
              </div>
            </div>
          )}
        </div>

        {showColumnForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-scale-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Column</h2>
                <p className="text-gray-600 text-sm">Add a new column to organize your tasks</p>
              </div>

              <div className="mb-6">
                <label htmlFor="columnTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                  Column Title *
                </label>
                <input
                  type="text"
                  id="columnTitle"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  className="form-input w-full px-4 py-3 text-base"
                  placeholder="Enter column title (e.g., To Do, In Progress, Done)"
                  onKeyPress={(e) => e.key === "Enter" && handleCreateColumn()}
                  autoFocus
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowColumnForm(false)
                    setNewColumnTitle("")
                  }}
                  className="btn-secondary px-6 py-3 text-base font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateColumn}
                  disabled={!newColumnTitle.trim()}
                  className="btn-primary px-6 py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Column
                </button>
              </div>
            </div>
          </div>
        )}

        {showTaskForm && (
          <TaskForm
            columnId={selectedColumnId}
            boardId={id}
            onSubmit={handleTaskSubmit}
            onCancel={() => {
              setShowTaskForm(false)
              setSelectedColumnId("")
            }}
          />
        )}
      </div>
    </div>
  )
}
