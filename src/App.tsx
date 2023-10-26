import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Employee from "./pages/Employee";
import Details from "./pages/Details";
import ProductList from "./pages/Cart/ProductList";
import CartDetails from "./pages/Cart/CartDetails";
import { CartProvider } from "./contexts/CartContext";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/React_learn" element={<Employee />} />
          <Route path="/React_learn/details/:id" element={<Details />} />
          <Route path="/React_learn/products" element={<ProductList />} />
          <Route
            path="/React_learn/cartDetails"
            element={<CartDetails />}
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
