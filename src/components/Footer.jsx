import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">OptimumNutrition</div>
            <p className="muted">Магазин спортивного питания</p>
            <p className="muted">Лучшие товары для твоего результата</p>
          </div>

          <div>
            <div className="footer__col-title">Навигация</div>
            <p className="muted"><Link to="/products" style={{ color:"var(--muted)", textDecoration:"none" }}>Каталог</Link></p>
            <p className="muted"><Link to="/posts" style={{ color:"var(--muted)", textDecoration:"none" }}>Статьи</Link></p>
            <p className="muted"><Link to="/testimonials" style={{ color:"var(--muted)", textDecoration:"none" }}>Отзывы</Link></p>
          </div>

          <div>
            <div className="footer__col-title">Контакты</div>
            <p className="muted">support@OptimumNutrition.com</p>
            <p className="muted">+996 000 000 000</p>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="muted">© {new Date().getFullYear()} OptimumNutrition. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}