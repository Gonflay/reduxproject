import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  selectTodo,
  clearSelected,
} from "../features/todo/todoSlice";
import "./TodoPage.css";

export default function TodoPage() {
  const dispatch = useDispatch();
  const { items, selectedId } = useSelector((s) => s.todo);

  const [form, setForm] = useState({ title: "", desc: "", priority: "medium" });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = items.filter((t) => {
    if (filter === "done") return t.done;
    if (filter === "active") return !t.done;
    return true;
  });

  const submit = () => {
    if (!form.title.trim()) return;
    if (editId) {
      dispatch(updateTodo({ id: editId, patch: form }));
      setEditId(null);
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          ...form,
          done: false,
          createdAt: new Date().toLocaleDateString("ru"),
        })
      );
    }
    setForm({ title: "", desc: "", priority: "medium" });
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setForm({
      title: todo.title,
      desc: todo.desc || "",
      priority: todo.priority || "medium",
    });
    dispatch(clearSelected());
  };

  const priorityConfig = {
    low:    { label: "Низкий",   color: "#10b981" },
    medium: { label: "Средний",  color: "#f59e0b" },
    high:   { label: "Высокий",  color: "#ef4444" },
  };

  const doneCount = items.filter((t) => t.done).length;
  const progress = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <div className="todo-page">
      <div className="container">
        <div className="todo-header">
          <h2 className="h2">Todo список</h2>
          <p className="muted todo-sub">Управляй своими задачами</p>
        </div>

        <div className="todo-layout">
          {/* ФОРМА */}
          <div className="todo-form-box">
            <h3 className="todo-form-title">
              {editId ? "Редактировать" : "Новая задача"}
            </h3>

            <div className="todo-form">
              <div className="todo-field">
                <label className="todo-label">Название</label>
                <input
                  className="todo-input"
                  placeholder="Что нужно сделать?"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="todo-field">
                <label className="todo-label">Описание</label>
                <textarea
                  className="todo-input todo-textarea"
                  rows={3}
                  placeholder="Детали задачи..."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>

              <div className="todo-field">
                <label className="todo-label">Приоритет</label>
                <div className="todo-priority-btns">
                  {Object.entries(priorityConfig).map(([key, cfg]) => (
                    <button
                      key={key}
                      className={`todo-priority-btn ${form.priority === key ? "active" : ""}`}
                      style={{
                        "--p-color": cfg.color,
                      }}
                      onClick={() => setForm({ ...form, priority: key })}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn btn--primary todo-submit" onClick={submit}>
                {editId ? "Сохранить" : "Добавить задачу"}
              </button>

              {editId && (
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setEditId(null);
                    setForm({ title: "", desc: "", priority: "medium" });
                  }}
                >
                  Отмена
                </button>
              )}
            </div>

            {/* ПРОГРЕСС */}
            {items.length > 0 && (
              <div className="todo-progress">
                <div className="todo-progress__top">
                  <span className="todo-label">Прогресс</span>
                  <span className="todo-label">{doneCount}/{items.length}</span>
                </div>
                <div className="todo-progress__bar">
                  <div
                    className="todo-progress__fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                  {progress}% выполнено
                </div>
              </div>
            )}
          </div>

          {/* СПИСОК */}
          <div className="todo-list-box">
            {/* ФИЛЬТРЫ */}
            <div className="todo-filters">
              {[
                { key: "all", label: "Все" },
                { key: "active", label: "Активные" },
                { key: "done", label: "Выполненные" },
              ].map((f) => (
                <button
                  key={f.key}
                  className={`todo-filter-btn ${filter === f.key ? "active" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  <span className="todo-filter-count">
                    {f.key === "all"
                      ? items.length
                      : f.key === "done"
                      ? items.filter((t) => t.done).length
                      : items.filter((t) => !t.done).length}
                  </span>
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="todo-empty">
                <div className="todo-empty__icon">—</div>
                <p className="muted">Задач нет</p>
              </div>
            )}

            {filtered.map((todo) => {
              const cfg = priorityConfig[todo.priority] || priorityConfig.medium;
              const isSelected = selectedId === todo.id;

              return (
                <div
                  key={todo.id}
                  className={`todo-card ${todo.done ? "todo-card--done" : ""} ${isSelected ? "todo-card--open" : ""}`}
                >
                  <div className="todo-card__main">
                    <label className="todo-check-wrap">
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => dispatch(toggleTodo(todo.id))}
                        className="todo-check-input"
                      />
                      <span className="todo-check-box" />
                    </label>

                    <div className="todo-card__content">
                      <div className="todo-card__title">{todo.title}</div>
                      <div className="todo-card__meta">
                        <span
                          className="todo-card__priority"
                          style={{ color: cfg.color, borderColor: `${cfg.color}40`, background: `${cfg.color}12` }}
                        >
                          {cfg.label}
                        </span>
                        <span className="muted" style={{ fontSize: 12 }}>
                          {todo.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="todo-card__btns">
                      <button
                        className="todo-icon-btn"
                        title="Детали"
                        onClick={() =>
                          dispatch(isSelected ? clearSelected() : selectTodo(todo.id))
                        }
                      >
                        {isSelected ? "▲" : "▼"}
                      </button>
                      <button
                        className="todo-icon-btn"
                        title="Редактировать"
                        onClick={() => startEdit(todo)}
                      >
                        ✎
                      </button>
                      <button
                        className="todo-icon-btn todo-icon-btn--del"
                        title="Удалить"
                        onClick={() => dispatch(deleteTodo(todo.id))}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* DETAIL */}
                  {isSelected && (
                    <div className="todo-card__detail">
                      <div className="todo-detail-row">
                        <span className="todo-label">Описание</span>
                        <span className="muted">
                          {todo.desc || "Не указано"}
                        </span>
                      </div>
                      <div className="todo-detail-row">
                        <span className="todo-label">Статус</span>
                        <span style={{ color: todo.done ? "#10b981" : "#f59e0b", fontWeight: 700 }}>
                          {todo.done ? "Выполнено" : "В процессе"}
                        </span>
                      </div>
                      <div className="todo-detail-row">
                        <span className="todo-label">Приоритет</span>
                        <span style={{ color: cfg.color, fontWeight: 700 }}>
                          {cfg.label}
                        </span>
                      </div>
                      <div className="todo-detail-row">
                        <span className="todo-label">Создано</span>
                        <span className="muted">{todo.createdAt}</span>
                      </div>
                      <div className="todo-detail-row">
                        <span className="todo-label">ID</span>
                        <span className="muted" style={{ fontSize: 12 }}>{todo.id}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}