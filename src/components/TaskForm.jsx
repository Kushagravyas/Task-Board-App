import { useState } from "react"

/**
 * TaskForm Component
 * @param {Object} props
 * @param {string} props.columnId
 * @param {string} props.boardId
 * @param {(columnId: string, taskData: Object) => void} props.onSubmit
 * @param {() => void} props.onCancel
 */
export default function TaskForm({ columnId, boardId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator: "",
    priority: "medium",
    dueDate: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(columnId, {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        creator: formData.creator.trim(),
        columnId,
        boardId,
      })
      setFormData({
        title: "",
        description: "",
        creator: "",
        priority: "medium",
        dueDate: "",
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl animate-scale-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Task</h2>
          <p className="text-gray-600 text-sm">Add a new task to organize your work</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input w-full px-4 py-3 text-sm"
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="form-textarea w-full px-4 py-3 text-sm"
              placeholder="Add more details about this task..."
            />
          </div>

          <div>
            <label htmlFor="creator" className="block text-sm font-semibold text-gray-700 mb-2">
              Assigned To
            </label>
            <input
              type="text"
              id="creator"
              value={formData.creator}
              onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              className="form-input w-full px-4 py-3 text-sm"
              placeholder="Who will work on this?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="form-input w-full px-4 py-3 text-sm"
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="form-input w-full px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button type="button" onClick={onCancel} className="btn-secondary px-6 py-3 text-sm font-medium">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-6 py-3 text-sm font-medium">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
