import { useState } from "react"

/**
 * Task Component
 * @param {Object} props
 * @param {import('../types/index.js').Task} props.task
 * @param {(taskId: string, updates: Partial<import('../types/index.js').Task>) => void} props.onEdit
 * @param {(taskId: string) => void} props.onDelete
 * @param {(e: React.DragEvent, taskId: string) => void} props.onDragStart
 */
export default function Task({ task, onEdit, onDelete, onDragStart }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    creator: task.creator,
    priority: task.priority,
    dueDate: task.dueDate,
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high"
      case "medium":
        return "priority-medium"
      case "low":
        return "priority-low"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isOverdue = () => {
    return new Date(task.dueDate) < new Date() && task.dueDate
  }

  const handleSave = () => {
    onEdit(task.id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      creator: task.creator,
      priority: task.priority,
      dueDate: task.dueDate,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id)
    }
  }

  if (isEditing) {
    return (
      <div className="task-card p-5 mb-4 animate-scale-in">
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="form-input w-full px-4 py-3 text-sm font-medium"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="form-textarea w-full px-4 py-3 text-sm"
            placeholder="Task description"
            rows={3}
          />
          <input
            type="text"
            value={editData.creator}
            onChange={(e) => setEditData({ ...editData, creator: e.target.value })}
            className="form-input w-full px-4 py-3 text-sm"
            placeholder="Assigned to"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              className="form-input px-4 py-3 text-sm"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="form-input px-4 py-3 text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button onClick={handleCancel} className="btn-secondary px-5 py-2 text-sm rounded-lg">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary px-5 py-2 text-sm rounded-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="task-card p-5 mb-4 cursor-move animate-slide-in-up group"
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-semibold text-primary text-base leading-tight pr-3">{task.title}</h4>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-neutral-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {task.description && <p className="text-secondary text-sm mb-4 leading-relaxed">{task.description}</p>}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          {task.creator && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-semibold">{task.creator.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-secondary text-sm font-medium">{task.creator}</span>
            </div>
          )}
        </div>

        {task.dueDate && (
          <div className="flex items-center space-x-1.5">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span
              className={`text-sm font-medium ${
                isOverdue() ? "text-red-700 bg-red-100 px-2 py-1 rounded-md" : "text-secondary"
              }`}
            >
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
