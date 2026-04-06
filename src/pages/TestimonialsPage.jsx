import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../features/data/dataSlice";
import "./TestimonialsPage.css";

export default function TestimonialsPage() {
  const dispatch = useDispatch();
  const { status, testimonials } = useSelector((s) => s.data);

  useEffect(() => {
    if (status === "idle") dispatch(loadData());
  }, [status, dispatch]);

  return (
    <div className="testimonials-page">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="h2">Отзывы</h2>
          <p className="muted testimonials-sub">
            Что говорят наши покупатели
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="t-card">
              <div className="t-card__top">
                <div className="t-card__avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="t-card__name">{t.name}</div>
                  <div className="t-card__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`t-star ${i < t.stars ? "t-star--on" : "t-star--off"}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="t-card__score muted">
                      {t.stars} / 5
                    </span>
                  </div>
                </div>
              </div>
              <p className="t-card__text">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}