import React from "react";
import { useEffect, useMemo, useState } from "react";

const starterTasks = [
  {
    id: 1,
    title: "Review JavaScript array methods",
    category: "Learning",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Build the portfolio page layout",
    category: "Project",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Organize this week’s study plan",
    category: "Personal",
    priority: "Low",
    completed: true,
  },
];

const filters = ["All tasks", "Active", "Completed"];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2m-11 0 1 14h12l1-14M10 10v6m4-6v6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
        <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function readTasks() {
  try {
    const saved = localStorage.getItem("focusflow-tasks");
    return saved ? JSON.parse(saved) : starterTasks;
  } catch {
    return starterTasks;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(readTasks);
  const [filter, setFilter] = useState("All tasks");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Learning");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    localStorage.setItem("focusflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const visibleTasks = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "All tasks" ||
        (filter === "Active" && !task.completed) ||
        (filter === "Completed" && task.completed);
      const matchesSearch =
        !term ||
        `${task.title} ${task.category} ${task.priority}`
          .toLowerCase()
          .includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  function addTask(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    setTasks((current) => [
      {
        id: Date.now(),
        title: cleanTitle,
        category,
        priority,
        completed: false,
      },
      ...current,
    ]);
    setTitle("");
    setCategory("Learning");
    setPriority("Medium");
    setShowForm(false);
    setFilter("All tasks");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="FocusFlow home">
          <span className="brand-mark">
            <Icon name="spark" size={21} />
          </span>
          <span>
            focus<span className="brand-light">flow</span>
          </span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#tasks">
            <Icon name="grid" />
            <span>My tasks</span>
            <span className="nav-count">{activeCount}</span>
          </a>
          <button
            className="nav-link"
            onClick={() => {
              setFilter("Active");
              document
                .getElementById("tasks")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Icon name="calendar" />
            <span>In progress</span>
          </button>
          <button
            className="nav-link"
            onClick={() => {
              setFilter("Completed");
              document
                .getElementById("tasks")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Icon name="check" />
            <span>Completed</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="tip-card">
            <span className="tip-icon">
              <Icon name="spark" size={18} />
            </span>
            <h3>Small steps add up.</h3>
            <p>Focus on progress, not perfection. You’ve got this.</p>
          </div>
          <div className="profile-row">
            <div className="avatar">N</div>
            <div className="profile-copy">
              <strong>Your workspace</strong>
              <span>Personal plan</span>
            </div>
            <span className="profile-dot" aria-label="Active" />
          </div>
        </div>
      </aside>

      <main className="main-content" id="top">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>My tasks</strong>
          </div>
          <div className="topbar-date">
            <Icon name="calendar" size={16} /> {today}
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" /> YOUR PERSONAL DASHBOARD
            </div>
            <h1>
              Make today <span>count.</span>
            </h1>
            <p className="welcome-copy">
              A little progress each day adds up to big results.
            </p>
          </div>
          <button
            className="primary-button"
            onClick={() => setShowForm((value) => !value)}
          >
            <Icon name="plus" size={19} /> Add a task
          </button>
        </section>

        <section className="stats-grid" aria-label="Task summary">
          <article className="stat-card stat-total">
            <div className="stat-top">
              <span>Total tasks</span>
              <span className="stat-icon">
                <Icon name="grid" />
              </span>
            </div>
            <div className="stat-number">
              {tasks.length.toString().padStart(2, "0")}
            </div>
            <div className="stat-foot">Across all categories</div>
          </article>
          <article className="stat-card stat-active">
            <div className="stat-top">
              <span>In progress</span>
              <span className="stat-icon">
                <Icon name="calendar" />
              </span>
            </div>
            <div className="stat-number">
              {activeCount.toString().padStart(2, "0")}
            </div>
            <div className="stat-foot">
              <span className="tiny-dot orange" /> Ready for your focus
            </div>
          </article>
          <article className="stat-card stat-completed">
            <div className="stat-top">
              <span>Completed</span>
              <span className="stat-icon">
                <Icon name="check" />
              </span>
            </div>
            <div className="stat-number">
              {completedCount.toString().padStart(2, "0")}
            </div>
            <div className="stat-foot">
              <span className="tiny-dot green" /> Keep up the momentum
            </div>
          </article>
        </section>

        <section className="progress-panel" aria-label="Overall progress">
          <div className="progress-heading">
            <div>
              <span className="progress-kicker">YOUR PROGRESS</span>
              <h2>You’re moving forward</h2>
            </div>
            <div className="progress-percent">
              {progress}
              <span>%</span>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-caption">
            <span>
              {completedCount} of {tasks.length} tasks completed
            </span>
            <span>
              {progress === 100 && tasks.length
                ? "All done — amazing work!"
                : "Every task is a step forward"}
            </span>
          </div>
        </section>

        {showForm && (
          <section className="task-form-panel" aria-label="Add new task">
            <div className="form-heading">
              <div>
                <span className="progress-kicker">NEW TASK</span>
                <h2>What do you want to do?</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                ×
              </button>
            </div>
            <form onSubmit={addTask}>
              <label className="field-label" htmlFor="task-title">
                Task name
              </label>
              <input
                id="task-title"
                className="text-input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Practice React components"
                autoFocus
                maxLength={100}
                required
              />
              <div className="form-row">
                <div className="form-field">
                  <label className="field-label" htmlFor="task-category">
                    Category
                  </label>
                  <select
                    id="task-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option>Learning</option>
                    <option>Project</option>
                    <option>Personal</option>
                    <option>Work</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="field-label" htmlFor="task-priority">
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <button className="primary-button submit-button" type="submit">
                <Icon name="plus" size={18} /> Create task
              </button>
            </form>
          </section>
        )}

        <section className="tasks-section" id="tasks">
          <div className="tasks-header">
            <div>
              <span className="progress-kicker">YOUR LIST</span>
              <h2>
                Tasks <span className="task-count">{visibleTasks.length}</span>
              </h2>
            </div>
            <div className="search-wrap">
              <Icon name="search" size={17} />
              <input
                aria-label="Search tasks"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
              />
            </div>
          </div>
          <div className="task-toolbar">
            <div className="filter-tabs" role="group" aria-label="Filter tasks">
              {filters.map((item) => (
                <button
                  key={item}
                  className={`filter-tab ${filter === item ? "selected" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  {item === "All tasks" && <span>{tasks.length}</span>}
                </button>
              ))}
            </div>
            <span className="sort-label">
              Sorted by <strong>recently added</strong>
            </span>
          </div>
          <div className="task-list">
            {visibleTasks.map((task) => (
              <article
                className={`task-row ${task.completed ? "is-completed" : ""}`}
                key={task.id}
              >
                <button
                  className={`task-check ${task.completed ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.completed
                      ? `Mark ${task.title} as active`
                      : `Complete ${task.title}`
                  }
                >
                  <Icon name="check" size={15} />
                </button>
                <div className="task-main">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span
                      className={`category-pill category-${task.category.toLowerCase()}`}
                    >
                      {task.category}
                    </span>
                    <span className="meta-separator">·</span>
                    <span className="task-priority">
                      <span
                        className={`priority-dot priority-${task.priority.toLowerCase()}`}
                      />
                      {task.priority} priority
                    </span>
                  </div>
                </div>
                <span
                  className={`status-pill ${task.completed ? "status-done" : "status-open"}`}
                >
                  {task.completed ? "Completed" : "In progress"}
                </span>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  title="Delete task"
                >
                  <Icon name="trash" size={17} />
                </button>
              </article>
            ))}
            {visibleTasks.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">
                  <Icon name="spark" size={24} />
                </span>
                <h3>
                  {search ? "No matching tasks" : "Nothing on this list yet"}
                </h3>
                <p>
                  {search
                    ? "Try a different search term."
                    : "Add a task to get started and keep your day moving."}
                </p>
                {!search && (
                  <button
                    className="secondary-button"
                    onClick={() => setShowForm(true)}
                  >
                    <Icon name="plus" size={16} /> Create your first task
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="list-footer">
            <span>
              <span className="footer-status-dot" /> All changes save
              automatically on this device
            </span>
            <span>
              {activeCount} task{activeCount === 1 ? "" : "s"} left
            </span>
          </div>
        </section>
        <footer className="page-footer">
          Made for focused days <span>✦</span> FocusFlow Task Manager
        </footer>
      </main>
    </div>
  );
}
