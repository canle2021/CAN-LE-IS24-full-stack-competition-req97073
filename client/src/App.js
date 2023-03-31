import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/header";
import HomePage from "./pages/homePage";
import "./App.css";
function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
