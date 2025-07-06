
import { useState } from "react"

/**
 * BoardForm Component
 * @param {Object} props
 * @param {(title: string, description: string) => void} props.onSubmit
 * @param {() => void} props.onCancel
 * @param {Object | null} props.initialData
 * @param {boolean} props.isEditing
 */
export default function BoardForm({ onSubmit, onCancel, initialData = null, isEditing = false }) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title.trim(), description.trim())
      setTitle("")
      setDescription("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-scale-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{isEditing ? "Edit Board" : "Create New Board"}</h2>
          <p className="text-gray-600 text-sm">
            {isEditing ? "Update your board details" : "Set up a new workspace for your team"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Board Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input w-full px-4 py-3 text-sm"
              placeholder="Enter board title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="form-textarea w-full px-4 py-3 text-sm"
              placeholder="Describe what this board is for..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onCancel} className="btn-secondary px-6 py-3 text-sm font-medium">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-6 py-3 text-sm font-medium">
              {isEditing ? "Update Board" : "Create Board"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
