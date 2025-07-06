
/**
 * SearchFilter Component
 * @param {Object} props
 * @param {import('../types/index.js').SearchFilters} props.filters
 * @param {(filters: import('../types/index.js').SearchFilters) => void} props.onFiltersChange
 */
export default function SearchFilter({ filters, onFiltersChange }) {
  return (
    <div className="search-filter-container p-6 rounded-2xl mb-8 animate-fade-in">
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex-1 min-w-[300px]">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={filters.searchTerm}
            onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
            className="form-input w-full px-5 py-3 text-base placeholder-neutral-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-base font-semibold text-gray-700">Priority:</label>
          <select
            value={filters.priorityFilter}
            onChange={(e) => onFiltersChange({ ...filters, priorityFilter: e.target.value })}
            className="form-input px-4 py-3 text-base min-w-[140px]"
          >
            <option value="all">All Priorities</option>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-base font-semibold text-gray-700">Due Date:</label>
          <select
            value={filters.dueDateFilter}
            onChange={(e) => onFiltersChange({ ...filters, dueDateFilter: e.target.value })}
            className="form-input px-4 py-3 text-base min-w-[160px]"
          >
            <option value="all">All Dates</option>
            <option value="overdue">⚠️ Overdue</option>
            <option value="today">📅 Due Today</option>
            <option value="week">📆 This Week</option>
          </select>
        </div>

        <button
          onClick={() => onFiltersChange({ searchTerm: "", priorityFilter: "all", dueDateFilter: "all" })}
          className="btn-secondary px-6 py-3 text-base font-semibold whitespace-nowrap"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}
