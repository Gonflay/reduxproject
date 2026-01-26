const products = [
  { name: "Whey Protein", desc: "900 г • сывороточный", price: "2990 сом" },
  { name: "Creatine", desc: "300 г • моногидрат", price: "1490 сом" },
  { name: "BCAA", desc: "2:1:1 • 400 г", price: "1790 сом" },
  { name: "Gainer", desc: "3 кг • набор массы", price: "2490 сом" },
];

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <h1 className="title">
              Спортпит <span className="accent">для результата</span>
            </h1>
            <p className="subtitle">
              Протеин, креатин и добавки для роста силы и мышц.
            </p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#products">
                Смотреть товары
              </a>
              <a className="btn btn--ghost" href="#contact">
                Связаться
              </a>
            </div>
          </div>

          <div className="hero__card">
            <h3>Почему мы?</h3>
            <ul>
              <li>✔ Оригинальная продукция</li>
              <li>✔ Быстрая доставка</li>
              <li>✔ Лучшие цены</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="container">
          <h2 className="h2">Популярные товары</h2>

          <div className="grid">
            {products.map((p) => (
              <div className="card" key={p.name}>
                <div className="thumb">Фото</div>
                <div className="card__title">{p.name}</div>
                <div className="muted">{p.desc}</div>
                <div className="price">{p.price}</div>
                <button className="btn btn--ghost">В корзину</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
