# FocusFlow — React Task Manager

A responsive task management dashboard built with React, Vite, and plain CSS. It is a beginner-friendly frontend portfolio project you can study, customize, and publish to GitHub.

## Features

- Add tasks with a category and priority
- Mark tasks complete or active
- Delete tasks
- Filter all, active, and completed tasks
- Search by task title, category, or priority
- Task counts and progress bar update automatically
- Saves tasks in the browser using `localStorage`
- Responsive layout for desktop and mobile
- Accessible labels for key controls

## Tech stack

- React 18
- JavaScript (ES6+)
- CSS3
- Vite
- Browser localStorage

## Run locally

1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Extract this project ZIP and open the `react-task-manager` folder in VS Code.
3. Open a terminal in that folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite in your terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

## Suggested learning tasks

1. Read `src/App.jsx` and identify the state used for tasks, filters, and the form.
2. Change the starter tasks and categories to suit your own workflow.
3. Add due dates or a dark mode.
4. Test empty states, search, filters, and refreshing the page.
5. Add screenshots to the README after running the app.

## Publish to GitHub

Create a new public repository (for example, `focusflow-task-manager`), then run these commands from this folder after creating the repository:

```bash
git init
git add .
git commit -m "Build FocusFlow task manager with React"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/focusflow-task-manager.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Do not upload `node_modules`; it is excluded automatically if you add a `.gitignore` file. Recommended `.gitignore` contents:

```text
node_modules
dist
.env
.DS_Store
```

## Resume note

Only list this as a completed project after you have run it, tested it, and understood the main features. Be prepared to explain React state, `useEffect`, `useMemo`, event handlers, filtering, and `localStorage` in an interview.
