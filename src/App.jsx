import { Routes, Route } from "react-router-dom"
import { TaskBoardProvider } from "./context/TaskBoardContext"
import Home from "./pages/Home"
import BoardDetail from "./pages/BoardDetail"
import "./App.css"

function App() {
  return (
    <TaskBoardProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/:id" element={<BoardDetail />} />
        </Routes>
      </div>
    </TaskBoardProvider>
  )
}

export default App
