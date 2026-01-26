export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner">
        <div>
          <strong>SportFuel</strong>
          <p className="muted">Магазин спортивного питания</p>
        </div>

        <div>
          <p className="muted">support@OptimumNutrition.com</p>
          <p className="muted">+996 000 000 000</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <span className="muted">
          © {new Date().getFullYear()} SportFuel
        </span>
      </div>
    </footer>
  );
}
