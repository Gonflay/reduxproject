import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

export default function App() {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
