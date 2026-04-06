import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearError } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((s) => s.auth);

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
  });

  const handleChange = (e) => {
    dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (mode === "login") {
      dispatch(login({ username: form.username, password: form.password }));
      // небольшая задержка чтобы стейт обновился
      setTimeout(() => {
        navigate("/");
      }, 100);
    } else {
      dispatch(register(form));
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  };

  const switchMode = () => {
    dispatch(clearError());
    setForm({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      name: "",
    });
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-logo">
            <span className="auth-logo__dot" />
            <span>OptimumNutrition</span>
          </div>
          <h2 className="auth-card__title">
            {mode === "login" ? "Вход в аккаунт" : "Регистрация"}
          </h2>
          <p className="auth-card__sub">
            {mode === "login"
              ? "Введи логин и пароль"
              : "Заполни форму для создания аккаунта"}
          </p>
        </div>

        <div className="auth-fields">
          {mode === "register" && (
            <>
              <div className="auth-field">
                <label className="auth-label">Имя</label>
                <input
                  className="auth-input"
                  name="name"
                  placeholder="Твоё имя"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Email</label>
                <input
                  className="auth-input"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="auth-field">
            <label className="auth-label">Логин</label>
            <input
              className="auth-input"
              name="username"
              placeholder="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Пароль</label>
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {mode === "register" && (
            <div className="auth-field">
              <label className="auth-label">Повтори пароль</label>
              <input
                className="auth-input"
                name="confirmPassword"
                type="password"
                placeholder="••••••"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button
          className="btn btn--primary auth-submit"
          onClick={handleSubmit}
        >
          {mode === "login" ? "Войти" : "Зарегистрироваться"}
        </button>

        <p className="auth-switch">
          {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          <span onClick={switchMode} className="auth-switch__link">
            {mode === "login" ? " Зарегистрироваться" : " Войти"}
          </span>
        </p>
      </div>
    </div>
  );
}