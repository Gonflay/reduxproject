import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand__dot" />
          <span className="brand__text">OptimumNutrition</span>
        </a>

        <nav className="nav" aria-label="Навигация">
          {/* Эти ссылки ты будешь использовать дальше в разработке */}
          <a href="#top">Главная</a>
          <a href="#products">Каталог</a>
          <a href="#about">О нас</a>
          <a href="#delivery">Доставка</a>
          <a href="#contact">Контакты</a>
          <a href="#cart">Корзина</a>
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
