import React from "react"

/**
 * BoardCard Component
 * @param {Object} props
 * @param {import('../types/index.js').Board} props.board
 * @param {(boardId: string) => void} props.onView
 * @param {(boardId: string) => void} props.onEdit
 * @param {(boardId: string) => void} props.onDelete
 */
export default function BoardCard({ board, onView, onEdit, onDelete, style = {} }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete this board?")) {
      onDelete(board.id)
    }
  }

  return (
    <tr
      className="table-row cursor-pointer transition-all duration-300 hover-lift"
      style={style}
      onClick={() => onView(board.id)}
    >
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="text-base font-semibold text-primary">{board.title}</div>
      </td>
      <td className="px-8 py-6">
        <div className="text-sm text-secondary max-w-xs truncate">{board.description}</div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="text-sm text-secondary font-medium">{board.columns.length}</div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="text-sm text-secondary font-medium">
          {board.columns.reduce((total, column) => total + column.tasks.length, 0)}
        </div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap">
        <div className="text-sm text-secondary">{formatDate(board.createdAt)}</div>
      </td>
      <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(board.id)
          }}
          className="text-purple-600 hover:text-purple-800 transition-colors mr-6 font-semibold"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800 transition-colors font-semibold">
          Delete
        </button>
      </td>
    </tr>
  )
}
