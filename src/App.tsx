import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Employee from "./pages/Employee";
import Details from "./pages/Details";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/React_learn" element={<Employee />} />
        <Route path="React_learn/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
