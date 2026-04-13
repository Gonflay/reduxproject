import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, toggleFavorite, addRating } from "../features/interactions/interactionsSlice";
import "./ProductInteractions.css";

export default function ProductInteractions({ productId }) {
  const dispatch = useDispatch();
  const data = useSelector((s) => s.interactions[productId]) || {
    liked: false,
    favorited: false,
    ratings: [],
  };

  const [hovered, setHovered] = useState(0);

  const avgRating =
    data.ratings.length > 0
      ? (data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length).toFixed(1)
      : null;

  const alreadyRated = data.ratings.length > 0;

  return (
    <div className="pi">
      <div className="pi__row">
        <button
          className={`pi__btn ${data.liked ? "pi__btn--liked" : ""}`}
          onClick={() => dispatch(toggleLike(productId))}
          title="Лайк"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={data.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {data.liked ? "Нравится" : "Лайк"}
        </button>

        <button
          className={`pi__btn ${data.favorited ? "pi__btn--fav" : ""}`}
          onClick={() => dispatch(toggleFavorite(productId))}
          title="Избранное"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={data.favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {data.favorited ? "В избранном" : "Избранное"}
        </button>
      </div>

      <div className="pi__rating-box">
        <div className="pi__rating-label">
          Оценить товар:
        </div>

        <div className="pi__stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`pi__star ${star <= (hovered || (alreadyRated ? Math.round(data.ratings[data.ratings.length - 1]) : 0)) ? "pi__star--on" : ""}`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => dispatch(addRating({ id: productId, rating: star }))}
            >
              ★
            </button>
          ))}
        </div>

        {avgRating && (
          <div className="pi__avg">
            Средняя оценка:
            <span className="pi__avg-val">{avgRating}</span>
            <span className="pi__avg-count">({data.ratings.length} оценок)</span>
          </div>
        )}
      </div>
    </div>
  );
}