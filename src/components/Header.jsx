import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <span className="brand__dot" />
          <span className="brand__text">OptimumNutrition</span>
        </div>

        <nav className="nav">
          <a href="#products">Товары</a>
          <a href="#contact">Контакты</a>
        </nav>

        <div className="header__actions">
          <button
            className="btn btn--ghost"
            onClick={() => dispatch(toggleTheme())}
            title="Сменить тему"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="btn btn--primary">Войти</button>
        </div>
      </div>
    </header>
  );
}
