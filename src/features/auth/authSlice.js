import { createSlice } from "@reduxjs/toolkit";

// MIDDLEWARE — проверка при логине и регистрации
export const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "auth/register") {
    const { username, password, confirmPassword } = action.payload;

    if (!username || username.length < 3) {
      return next({
        type: "auth/setError",
        payload: "Логин минимум 3 символа",
      });
    }
    if (!password || password.length < 6) {
      return next({
        type: "auth/setError",
        payload: "Пароль минимум 6 символов",
      });
    }
    if (password !== confirmPassword) {
      return next({
        type: "auth/setError",
        payload: "Пароли не совпадают",
      });
    }

    const users = JSON.parse(localStorage.getItem("sf_users") || "[]");
    const exists = users.find((u) => u.username === username);
    if (exists) {
      return next({
        type: "auth/setError",
        payload: "Такой пользователь уже существует",
      });
    }

    const newUser = { id: Date.now(), username, password };
    users.push(newUser);
    localStorage.setItem("sf_users", JSON.stringify(users));

    const userData = { id: newUser.id, username: newUser.username };
    localStorage.setItem("sf_current", JSON.stringify(userData));

    return next({ type: "auth/loginSuccess", payload: userData });
  }

  if (action.type === "auth/login") {
    const { username, password } = action.payload;

    if (!username || !password) {
      return next({
        type: "auth/setError",
        payload: "Заполни все поля",
      });
    }

    const users = JSON.parse(localStorage.getItem("sf_users") || "[]");
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return next({
        type: "auth/setError",
        payload: "Неверный логин или пароль",
      });
    }

    const userData = { id: user.id, username: user.username };
    localStorage.setItem("sf_current", JSON.stringify(userData));

    return next({ type: "auth/loginSuccess", payload: userData });
  }

  return next(action);
};

const savedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("sf_current") || "null");
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    isAuthenticated: !!savedUser,
    error: null,
  },
  reducers: {
    login() {},
    register() {},
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("sf_current");
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, register, logout, setError, clearError, loginSuccess } =
  authSlice.actions;
export default authSlice.reducer;