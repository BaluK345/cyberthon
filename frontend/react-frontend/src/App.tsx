import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Logo from "./pages/logo";
import Analyze from "./pages/fileanalyze"
import Description from "./pages/description"
import Category from "./pages/category"
import Complaint from "./pages/complaint";
import LoginPage from "./pages/login page";
import RegistrationPage from "./pages/registrationpage";
import OTPPage from "./pages/otp";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/logo">Logo</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <div>
                <a href="https://vitejs.dev" target="_blank">
                  <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </div>
          } />
          <Route path="/logo" element={<Logo />} />
          <Route path="/analyze" element={<Analyze/>} />
          <Route path="/description" element={<Description/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/complaint" element={<Complaint/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/registration" element={<RegistrationPage/>} />
          <Route path="/otp" element={<OTPPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
