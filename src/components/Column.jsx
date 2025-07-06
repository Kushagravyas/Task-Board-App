
import { useState } from "react"
import Task from "./Task.jsx"

/**
 * Column Component
 * @param {Object} props
 * @param {import('../types/index.js').Column} props.column
 * @param {import('../types/index.js').Task[]} props.filteredTasks
 * @param {(columnId: string, title: string) => void} props.onEditColumn
 * @param {(columnId: string) => void} props.onDeleteColumn
 * @param {(columnId: string) => void} props.onCreateTask
 * @param {(taskId: string, updates: Partial<import('../types/index.js').Task>) => void} props.onEditTask
 * @param {(taskId: string) => void} props.onDeleteTask
 * @param {(e: React.DragEvent, taskId: string) => void} props.onDragStart
 * @param {(e: React.DragEvent) => void} props.onDragOver
 * @param {(e: React.DragEvent, columnId: string) => void} props.onDrop
 */
export default function Column({
  column,
  filteredTasks,
  onEditColumn,
  onDeleteColumn,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(column.title)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleSave = () => {
    if (editTitle.trim()) {
      onEditColumn(column.id, editTitle.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(column.title)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this column? All tasks in this column will be deleted.")) {
      onDeleteColumn(column.id)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
    onDragOver(e)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    onDrop(e, column.id)
  }

  return (
    <div className="column-container p-6 w-80 flex-shrink-0 animate-slide-in-left">
      <div className="flex items-center justify-between mb-6">
        {isEditing ? (
          <div className="flex-1 flex items-center space-x-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="form-input flex-1 px-4 py-2 text-lg font-bold text-gray-800"
              onKeyPress={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            <button
              onClick={handleSave}
              className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400 hover:bg-opacity-20 rounded-lg transition-all duration-200"
              title="Save changes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Cancel editing"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <h3 className="font-bold text-gray-800 text-xl">{column.title}</h3>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-3 py-1.5 rounded-full font-semibold shadow-sm">
                {filteredTasks.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Edit column"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Delete column"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <div
        className={`column-drop-zone pb-4 ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {filteredTasks
          .sort((a, b) => a.order - b.order)
          .map((task, index) => (
            <div key={task.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <Task task={task} onEdit={onEditTask} onDelete={onDeleteTask} onDragStart={onDragStart} />
            </div>
          ))}

        {filteredTasks.length === 0 && !isDragOver && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-base font-medium text-gray-600">No tasks yet</p>
              <p className="text-sm text-gray-500 mt-1">Add your first task below</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onCreateTask(column.id)}
        className="w-full py-4 px-6 text-base font-semibold flex items-center justify-center space-x-3 group bg-white bg-opacity-20 hover:bg-opacity-30 border-2 border-dashed border-gray-400 hover:border-blue-500 rounded-2xl text-gray-700 hover:text-blue-600 transition-all duration-300"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add a task</span>
      </button>
    </div>
  )
}
