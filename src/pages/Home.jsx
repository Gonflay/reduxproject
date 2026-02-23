import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadData,
  addPost,
  updatePost,
  deletePost
} from "../features/data/dataSlice";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { status, error, products, posts, testimonials } = useSelector(
    (s) => s.data
  );

  /* ---------- PRODUCT DETAIL ---------- */
  const [selectedId, setSelectedId] = useState(null);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId),
    [products, selectedId]
  );

  /* ---------- CRUD STATE (POSTS) ---------- */
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    tag: "гайд"
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(loadData());
  }, [status, dispatch]);

  const submitPost = () => {
    if (!form.title.trim() || !form.excerpt.trim()) return;

    if (editId) {
      dispatch(
        updatePost({
          id: editId,
          patch: form
        })
      );
    } else {
      dispatch(
        addPost({
          id: Date.now(),
          ...form
        })
      );
    }

    setForm({ title: "", excerpt: "", tag: "гайд" });
    setEditId(null);
  };

  const startEdit = (post) => {
    setEditId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      tag: post.tag
    });
  };

  return (
    <div className="home" id="top">
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <span className="badge"></span>
            <h1 className="title">
              Спортпит <span className="accent">для результата</span>
            </h1>
            <p className="subtitle"></p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#products">
                Смотреть товары
              </a>
              <a className="btn btn--ghost" href="#content">
                Контент
              </a>
            </div>
          </div>

          {/* учебный блок скрыт */}
          <div className="hero__card hero__card--hidden">
            <h3>Что сделано по заданию</h3>
            <ul>
              <li>✔ JSON</li>
              <li>✔ LIST / DETAIL</li>
              <li>✔ CRUD</li>
            </ul>
          </div>
        </div>
      </section>

      {/* LOADING / ERROR */}
      {status === "loading" && (
        <section className="section">
          <div className="container">
            <div className="note">Загрузка данных…</div>
          </div>
        </section>
      )}

      {status === "failed" && (
        <section className="section">
          <div className="container">
            <div className="note">Ошибка: {error}</div>
          </div>
        </section>
      )}

      {status === "succeeded" && (
        <>
          {/* PRODUCTS LIST */}
          <section className="section" id="products">
            <div className="container">
              <h2 className="h2">Каталог</h2>

              <div className="grid">
                {products.map((p) => (
                  <div className="card" key={p.id}>
                    <div className="thumb thumb--img">
                      <img src={p.image} alt={p.name} />
                    </div>

                    <div className="card__title">{p.name}</div>
                    <div className="muted">{p.desc}</div>
                    <div className="price">
                      {p.price} {p.currency}
                    </div>

                    <div className="muted">
                      {p.inStock ? "В наличии" : "Нет в наличии"} • ⭐ {p.rating}
                    </div>

                    <button
                      className="btn btn--primary"
                      onClick={() => setSelectedId(p.id)}
                    >
                      Подробнее
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRODUCT DETAIL */}
          <section className="section" id="detail">
            <div className="container">
              <h2 className="h2">DETAIL</h2>

              {!selectedProduct ? (
                <p className="note">
                  Нажми <b>«Подробнее»</b> на товаре
                </p>
              ) : (
                <div className="detail">
                  <div className="detail__media">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                    />
                  </div>

                  <div className="detail__info">
                    <h3 className="detail__title">
                      {selectedProduct.name}
                    </h3>
                    <p className="note">{selectedProduct.desc}</p>

                    <div className="detail__row">
                      <span className="muted">Бренд:</span>{" "}
                      <b>{selectedProduct.details.brand}</b>
                    </div>
                    <div className="detail__row">
                      <span className="muted">Вкус:</span>{" "}
                      <b>{selectedProduct.details.flavor}</b>
                    </div>
                    <div className="detail__row">
                      <span className="muted">Порций:</span>{" "}
                      <b>{selectedProduct.details.servings}</b>
                    </div>

                    <div className="detail__benefits">
                      <div className="muted">Преимущества:</div>
                      <ul>
                        {selectedProduct.details.benefits.map((b) => (
                          <li key={b}>✔ {b}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail__actions">
                      <button
                        className="btn btn--ghost"
                        onClick={() => setSelectedId(null)}
                      >
                        Назад
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CONTENT + CRUD */}
          <section className="section" id="content">
            <div className="container">
              <h2 className="h2">Контент</h2>

              <div className="contentGrid">
                {/* POSTS CRUD */}
                <div className="contentBox">
                  <h3>Мини-статьи</h3>

                  <div className="crudForm">
                    <input
                      className="crudInput"
                      placeholder="Заголовок"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                    <input
                      className="crudInput"
                      placeholder="Тег"
                      value={form.tag}
                      onChange={(e) =>
                        setForm({ ...form, tag: e.target.value })
                      }
                    />
                    <textarea
                      className="crudTextarea"
                      rows={3}
                      placeholder="Описание"
                      value={form.excerpt}
                      onChange={(e) =>
                        setForm({ ...form, excerpt: e.target.value })
                      }
                    />
                    <button
                      className="btn btn--primary"
                      onClick={submitPost}
                    >
                      {editId ? "Сохранить" : "Добавить"}
                    </button>
                  </div>

                  {posts.map((post) => (
                    <div key={post.id} className="contentItem">
                      <div className="contentTag">{post.tag}</div>
                      <div className="contentTitle">{post.title}</div>
                      <div className="muted">{post.excerpt}</div>

                      <div className="crudItemActions">
                        <button
                          className="btn btn--ghost"
                          onClick={() => startEdit(post)}
                        >
                          Редактировать
                        </button>
                        <button
                          className="btn btn--ghost"
                          onClick={() =>
                            dispatch(deletePost(post.id))
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TESTIMONIALS */}
                <div className="contentBox">
                  <h3>Отзывы</h3>
                  {testimonials.map((t) => (
                    <div key={t.id} className="contentItem">
                      <div className="contentTitle">{t.name}</div>
                      <div className="muted">{t.text}</div>
                      <div className="muted">⭐ {t.stars} / 5</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
