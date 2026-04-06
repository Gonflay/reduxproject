import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import PostsPage from "./pages/PostsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import TodoPage from "./pages/TodoPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}