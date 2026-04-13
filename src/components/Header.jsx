import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.ui.theme);
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const navLinks = [
    { to: "/",            label: "Главная" },
    { to: "/products",    label: "Каталог" },
    { to: "/posts",       label: "Статьи" },
    { to: "/testimonials",label: "Отзывы" },
    { to: "/todo",        label: "Todo" },
  ];

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="brand" to="/">
          <span className="brand__dot" />
          <span className="brand__text">OptimumNutrition</span>
        </Link>

        <nav className="nav" aria-label="Навигация">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <button
            className="btn btn--ghost"
            onClick={() => dispatch(toggleTheme())}
            title="Сменить тему"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {isAuthenticated ? (
            <>
              <div className="header__user">
                <div className="header__avatar">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="header__username">{user?.username}</span>
              </div>
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