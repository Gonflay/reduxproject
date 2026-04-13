import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";

export default function HomePage() {
  const { user } = useSelector((s) => s.auth);

  const stats = [
    { value: "500+", label: "Товаров" },
    { value: "2K+",  label: "Клиентов" },
    { value: "4.9",  label: "Рейтинг" },
    { value: "24/7", label: "Поддержка" },
  ];

  const features = [
    { icon: "⚡", title: "Быстрая доставка", desc: "По всему Кыргызстану за 1–2 дня" },
    { icon: "✓",  title: "Оригинальный товар", desc: "Только проверенные бренды" },
    { icon: "💰", title: "Лучшие цены",    desc: "Без переплат и скрытых комиссий" },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            {user && (
              <div className="hero-greeting">
                Добро пожаловать, {user.username}
              </div>
            )}
            <h1 className="hero-title">
              Спортпит<br />
              <span className="hero-title__accent">для результата</span>
            </h1>
            <p className="hero-sub">
              Лучший магазин спортивного питания в Кыргызстане
            </p>
            <div className="hero-actions">
              <Link className="btn btn--primary" to="/products">
                Смотреть каталог
              </Link>
              <Link className="btn btn--ghost" to="/posts">
                Читать статьи
              </Link>
            </div>
          </div>

          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-card__val">{s.value}</div>
                <div className="stat-card__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <div className="feature-card__title">{f.title}</div>
                <div className="feature-card__desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}