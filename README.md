# Task Board App

A beautiful, collaborative task management application built with **React**, **Vite**, and **Tailwind CSS**. Organize your work with boards, columns, and tasks. Supports drag-and-drop, priorities, due dates, and more.

---

## ✨ Features

- **Create, edit, and delete boards**
- **Add columns** to boards (e.g., To Do, In Progress, Done)
- **Add tasks** to columns with:
  - Title, description, assignee, priority, and due date
- **Drag and drop** tasks between columns
- **Search and filter** tasks by priority, due date, or text
- **Responsive design** for desktop and mobile
- **Persistent data** using localStorage
- **Modern UI** with glassmorphism and smooth animations

---

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/YOUR-USERNAME/task-board-app.git
cd task-board-app
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Project Structure

```
task-board-app/
├─ public/
│  └─ index.html
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  ├─ App.css
│  ├─ components/
│  │   ├─ BoardCard.jsx
│  │   ├─ BoardForm.jsx
│  │   ├─ Column.jsx
│  │   ├─ SearchFilter.jsx
│  │   ├─ Task.jsx
│  │   └─ TaskForm.jsx
│  ├─ context/
│  │   └─ TaskBoardContext.jsx
│  ├─ pages/
│  │   ├─ BoardDetail.jsx
│  │   └─ Home.jsx
│  ├─ types/
│  │   └─ index.js
│  └─ utils/
│      └─ localStorage.js
├─ .gitignore
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
```

---

## 🧑‍💻 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for persistence

---

## 📝 Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build

---

## 🌐 Deployment

This app can be easily deployed to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/):

1. Push your code to GitHub.
2. Connect your repo on Vercel/Netlify.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Deploy!

---

## 📦 Environment & Configuration

No environment variables are required.  
All data is stored in the browser's localStorage.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/) (for SVG icons)
