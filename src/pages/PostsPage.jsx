import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadData,
  addPost,
  updatePost,
  deletePost,
} from "../features/data/dataSlice";
import "./PostsPage.css";

export default function PostsPage() {
  const dispatch = useDispatch();
  const { status, posts } = useSelector((s) => s.data);

  const [form, setForm] = useState({ title: "", excerpt: "", tag: "гайд" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(loadData());
  }, [status, dispatch]);

  const submitPost = () => {
    if (!form.title.trim() || !form.excerpt.trim()) return;
    if (editId) {
      dispatch(updatePost({ id: editId, patch: form }));
    } else {
      dispatch(addPost({ id: Date.now(), ...form }));
    }
    setForm({ title: "", excerpt: "", tag: "гайд" });
    setEditId(null);
  };

  const startEdit = (post) => {
    setEditId(post.id);
    setForm({ title: post.title, excerpt: post.excerpt, tag: post.tag });
  };

  const tagColors = {
    гайд: "#3b82f6",
    наука: "#8b5cf6",
    разбор: "#10b981",
    совет: "#f59e0b",
  };

  return (
    <div className="posts-page">
      <div className="container">
        <div className="posts-header">
          <h2 className="h2">Мини-статьи</h2>
          <p className="posts-sub muted">Полезный контент о спортивном питании</p>
        </div>

        <div className="posts-layout">
          {/* ФОРМА */}
          <div className="posts-form-box">
            <h3 className="posts-form-title">
              {editId ? "✏️ Редактировать" : "✚ Новая статья"}
            </h3>

            <div className="posts-form">
              <div className="posts-field">
                <label className="posts-label">Заголовок</label>
                <input
                  className="posts-input"
                  placeholder="Введи заголовок"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="posts-field">
                <label className="posts-label">Тег</label>
                <select
                  className="posts-input"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                >
                  <option value="гайд">гайд</option>
                  <option value="наука">наука</option>
                  <option value="разбор">разбор</option>
                  <option value="совет">совет</option>
                </select>
              </div>

              <div className="posts-field">
                <label className="posts-label">Описание</label>
                <textarea
                  className="posts-input posts-textarea"
                  rows={4}
                  placeholder="О чём статья?"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </div>

              <button className="btn btn--primary posts-submit" onClick={submitPost}>
                {editId ? "Сохранить" : "Добавить"}
              </button>

              {editId && (
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setEditId(null);
                    setForm({ title: "", excerpt: "", tag: "гайд" });
                  }}
                >
                  Отмена
                </button>
              )}
            </div>
          </div>

          {/* СПИСОК */}
          <div className="posts-list">
            {posts.length === 0 && (
              <p className="muted">Статей пока нет. Добавь первую!</p>
            )}
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-card__top">
                  <span
                    className="post-card__tag"
                    style={{
                      background: `${tagColors[post.tag] || "#6b7280"}18`,
                      color: tagColors[post.tag] || "#6b7280",
                      borderColor: `${tagColors[post.tag] || "#6b7280"}40`,
                    }}
                  >
                    {post.tag}
                  </span>
                </div>

                <div className="post-card__title">{post.title}</div>
                <div className="post-card__excerpt muted">{post.excerpt}</div>

                <div className="post-card__actions">
                  <button
                    className="post-btn post-btn--edit"
                    onClick={() => startEdit(post)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="post-btn post-btn--delete"
                    onClick={() => dispatch(deletePost(post.id))}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}