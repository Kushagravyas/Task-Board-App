import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTaskBoard } from "../context/TaskBoardContext"
import BoardCard from "../components/BoardCard"
import BoardForm from "../components/BoardForm"

export default function Home() {
  const { state, createBoard, updateBoard, deleteBoard } = useTaskBoard()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingBoard, setEditingBoard] = useState(null)
  const navigate = useNavigate()

  const handleCreateBoard = (title, description) => {
    createBoard(title, description)
    setShowCreateForm(false)
  }

  const handleViewBoard = (boardId) => {
    navigate(`/board/${boardId}`)
  }

  const handleDeleteBoard = (boardId) => {
    deleteBoard(boardId)
  }

  const handleEditBoard = (boardId) => {
    const boardToEdit = state.boards.find((board) => board.id === boardId)
    setEditingBoard(boardToEdit)
    setShowCreateForm(true)
  }

  const handleFormSubmit = (title, description) => {
    if (editingBoard) {
      updateBoard(editingBoard.id, title, description)
    } else {
      createBoard(title, description)
    }
    setShowCreateForm(false)
    setEditingBoard(null)
  }

  const handleFormCancel = () => {
    setShowCreateForm(false)
    setEditingBoard(null)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div className="animate-slide-in-left">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 gradient-text">Task Boards</h1>
            <p className="text-gray-600 text-xl">Organize your work with beautiful, collaborative task boards</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl animate-slide-in-left hover-lift"
            style={{ animationDelay: "0.2s" }}
          >
            Create New Board
          </button>
        </div>

        {state.boards.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-lg mx-auto glass-card p-12 rounded-3xl">
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No boards yet</h3>
              <p className="text-lg text-gray-600 opacity-80 mb-8">
                Get started by creating your first task board to organize your work.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl hover-lift"
              >
                Create Your First Board
              </button>
            </div>
          </div>
        ) : (
          <div className="table-container rounded-3xl overflow-hidden animate-slide-in-up">
            <table className="min-w-full divide-y divide-white divide-opacity-20">
              <thead className="table-header">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Board Name
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Columns
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-primary uppercase tracking-wider">Tasks</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Created
                  </th>
                  <th className="relative px-8 py-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white divide-opacity-10">
                {state.boards.map((board, index) => (
                  <BoardCard
                    key={board.id}
                    board={board}
                    onView={handleViewBoard}
                    onEdit={handleEditBoard}
                    onDelete={handleDeleteBoard}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showCreateForm && (
          <BoardForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            initialData={editingBoard}
            isEditing={!!editingBoard}
          />
        )}
      </div>
    </div>
  )
}
