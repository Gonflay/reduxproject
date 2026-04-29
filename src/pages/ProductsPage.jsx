import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../features/data/dataSlice";
import ProductInteractions from "../components/ProductInteractions";
import "./ProductsPage.css";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { status, error, products } = useSelector((s) => s.data);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStock, setFilterStock] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId),
    [products, selectedId]
  );

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterStock === "inStock") result = result.filter((p) => p.inStock);
    if (filterStock === "outStock") result = result.filter((p) => !p.inStock);

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, search, filterStock, sortBy]);

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
      <section className="section" id="products">
        <div className="container">
          <h2 className="h2">Каталог</h2>

          <div className="catalog-controls">
            <div className="catalog-search-wrap">
              <svg className="catalog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="catalog-search"
                placeholder="Поиск товаров..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedId(null);
                }}
              />
              {search && (
                <button className="catalog-search-clear" onClick={() => setSearch("")}>✕</button>
              )}
            </div>

            <div className="catalog-filters">
              <select
                className="catalog-select"
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
              >
                <option value="all">Все товары</option>
                <option value="inStock">В наличии</option>
                <option value="outStock">Нет в наличии</option>
              </select>

              <select
                className="catalog-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена ↑</option>
                <option value="price-desc">Цена ↓</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          {search && (
            <div className="catalog-result-info">
              Найдено: <b>{filtered.length}</b> товаров по запросу «{search}»
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="catalog-empty">
              <div className="catalog-empty__icon">🔍</div>
              <p>Ничего не найдено</p>
              <button className="btn btn--ghost" onClick={() => { setSearch(""); setFilterStock("all"); }}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p) => (
                <div className="product-card" key={p.id}>
                  <div className="product-card__img-wrap">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="product-card__img"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    {!p.inStock && (
                      <span className="product-card__badge">Нет в наличии</span>
                    )}
                  </div>

                  <div className="product-card__body">
                    <div className="product-card__name">{p.name}</div>
                    <div className="product-card__desc muted">{p.desc}</div>

                    <div className="product-card__meta">
                      <span className="product-card__rating">★ {p.rating}</span>
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
          )}
        </div>
      </section>

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

                <ProductInteractions productId={selectedProduct.id} />

                <div className="detail__actions">
                  <button className="btn btn--ghost" onClick={() => setSelectedId(null)}>
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