import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="brand" to="/">
          <span className="brand__dot" />
          <span className="brand__text">OptimumNutrition</span>
        </Link>

        <nav className="nav" aria-label="Навигация">
          <Link to="/">Главная</Link>
          <Link to="/products">Каталог</Link>
          <Link to="/posts">Статьи</Link>
          <Link to="/testimonials">Отзывы</Link>
          <Link to="/todo">Todo</Link>
        </nav>

        <div className="header__actions">
          <button
            className="btn btn--ghost"
            onClick={() => dispatch(toggleTheme())}
            title="Сменить тему"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {isAuthenticated ? (
            <>
              <span
                className="muted"
                style={{ alignSelf: "center", fontSize: 14 }}
              >
                {user?.username}
              </span>
              <button className="btn btn--ghost" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <Link className="btn btn--primary" to="/auth">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}