import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { user } = useSelector((s) => s.auth);

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div>
          <span className="badge"></span>
          <h1 className="title">
            Спортпит <span className="accent">для результата</span>
          </h1>
          {user && (
            <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: 8 }}>
              👋 Привет, {user.username}!
            </p>
          )}
          <p className="subtitle">
            Лучший магазин спортивного питания
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/products">
              Смотреть товары
            </Link>
            <Link className="btn btn--ghost" to="/posts">
              Статьи
            </Link>
            <Link className="btn btn--ghost" to="/todo">
              Todo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}