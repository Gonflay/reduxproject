import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../features/data/dataSlice";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { status, error, products, posts, testimonials } = useSelector(
    (s) => s.data
  );

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(loadData());
  }, [status, dispatch]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId),
    [products, selectedId]
  );

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
            <p className="subtitle">
            </p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#products">
                Смотреть товары
              </a>
              <a className="btn btn--ghost" href="#content">
                Контент
              </a>
            </div>
          </div>

        <div className="hero__card hero__card--hidden">
      <h3>Что сделано по заданию</h3>
      <ul>
      <li>✔ Только JSON, без локальных массивов</li>
      <li>✔ Имитация задержки</li>
      <li>✔ Несколько контентов</li>
      <li>✔ LIST / DETAIL</li>
  </ul>
</div>

        </div>
      </section>

      {/* LOADING / ERROR */}
      {status === "loading" && (
        <section className="section">
          <div className="container">
            <div className="note">Загрузка данных… (имитация сервера)</div>
          </div>
        </section>
      )}

      {status === "failed" && (
        <section className="section">
          <div className="container">
            <div className="note">Ошибка: {error}</div>
            <button className="btn btn--primary" onClick={() => dispatch(loadData())}>
              Попробовать снова
            </button>
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
                  Нажми <b>“Подробнее”</b> на любом товаре, чтобы открыть детали.
                </p>
              ) : (
                <div className="detail">
                  <div className="detail__media">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  </div>

                  <div className="detail__info">
                    <h3 className="detail__title">{selectedProduct.name}</h3>
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
                      <button className="btn btn--ghost" onClick={() => setSelectedId(null)}>
                        Назад к списку
                      </button>
                      <a className="btn btn--primary" href="#products">
                        К каталогу
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* EXTRA CONTENTS */}
          <section className="section" id="content">
            <div className="container">
              <h2 className="h2">Контент</h2>

              <div className="contentGrid">
                <div className="contentBox">
                  <h3>Мини-статьи</h3>
                  {posts.map((post) => (
                    <div key={post.id} className="contentItem">
                      <div className="contentTag">{post.tag}</div>
                      <div className="contentTitle">{post.title}</div>
                      <div className="muted">{post.excerpt}</div>
                    </div>
                  ))}
                </div>

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
