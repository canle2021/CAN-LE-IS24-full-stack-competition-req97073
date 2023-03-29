import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/header";
import HomePage from "./pages/homePage";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
