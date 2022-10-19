import Header from "./componenets/Header.jsx";
import "./app.scss";
import ProductList from "./pages/ProductList.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details.jsx";
import { useState } from "react";

function App() {
  const [isTrue, setIsTrue] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<ProductList istrue={isTrue} setistrue={setIsTrue} />}
          />
          <Route
            path="/details/:id"
            element={<Details istrue={isTrue} setistrue={setIsTrue} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
