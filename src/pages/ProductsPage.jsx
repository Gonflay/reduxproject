import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../features/data/dataSlice";
import "./ProductsPage.css";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { status, error, products } = useSelector((s) => s.data);
  const [selectedId, setSelectedId] = useState(null);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId),
    [products, selectedId]
  );

  useEffect(() => {
    if (status === "idle") dispatch(loadData());
  }, [status, dispatch]);

  if (status === "loading")
    return (
      <section className="section">
        <div className="container">
          <div className="note">Загрузка...</div>
        </div>
      </section>
    );

  if (status === "failed")
    return (
      <section className="section">
        <div className="container">
          <div className="note">Ошибка: {error}</div>
        </div>
      </section>
    );

  return (
    <div>
      {/* КАТАЛОГ */}
      <section className="section" id="products">
        <div className="container">
          <h2 className="h2">Каталог</h2>
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p.id}>
                <div className="product-card__img-wrap">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="product-card__img"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  {!p.inStock && (
                    <span className="product-card__badge">Нет в наличии</span>
                  )}
                </div>

                <div className="product-card__body">
                  <div className="product-card__name">{p.name}</div>
                  <div className="product-card__desc muted">{p.desc}</div>

                  <div className="product-card__meta">
                    <span className="product-card__rating">
                      ★ {p.rating}
                    </span>
                    <span className={`product-card__stock ${p.inStock ? "in" : "out"}`}>
                      {p.inStock ? "В наличии" : "Нет в наличии"}
                    </span>
                  </div>

                  <div className="product-card__price">
                    {p.price} {p.currency}
                  </div>

                  <button
                    className="btn btn--primary product-card__btn"
                    onClick={() => setSelectedId(p.id)}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAIL */}
      {selectedProduct && (
        <section className="section">
          <div className="container">
            <h2 className="h2">Детали товара</h2>
            <div className="detail">
              <div className="detail__media">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="detail__info">
                <h3 className="detail__title">{selectedProduct.name}</h3>
                <p className="note">{selectedProduct.desc}</p>

                <div className="detail__row">
                  <span className="muted">Бренд:</span>{" "}
                  <b>{selectedProduct.details?.brand}</b>
                </div>
                <div className="detail__row">
                  <span className="muted">Вкус:</span>{" "}
                  <b>{selectedProduct.details?.flavor}</b>
                </div>
                <div className="detail__row">
                  <span className="muted">Порций:</span>{" "}
                  <b>{selectedProduct.details?.servings}</b>
                </div>
                <div className="detail__row">
                  <span className="muted">Рейтинг:</span>{" "}
                  <b>★ {selectedProduct.rating} / 5</b>
                </div>

                <div className="detail__benefits">
                  <div className="muted" style={{ marginBottom: 6 }}>Преимущества:</div>
                  <ul>
                    {selectedProduct.details?.benefits?.map((b) => (
                      <li key={b}>✔ {b}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail__actions">
                  <button
                    className="btn btn--ghost"
                    onClick={() => setSelectedId(null)}
                  >
                    ← Назад
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}