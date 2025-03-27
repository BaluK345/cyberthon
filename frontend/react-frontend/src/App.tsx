import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./pages/sidebar"; 
import "./App.css";
import Logo from "./pages/logo";
import FileAnalyze from "./pages/fileanalyze";
import Category from "./pages/category";
import Complaint from "./pages/complaint";
import LoginPage from "./pages/login page";
import RegistrationPage from "./pages/registrationpage";
import OTPPage from "./pages/otp";
import { DescriptionProvider } from "./pages/DescriptionContext";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DescriptionProvider>
      <Router>
        <div className="App">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Navigation Bar */}
          <nav className="flex gap-4 p-4 bg-gray-100 relative">
            <button
              className="bg-gray-200 px-4 py-2 rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              Your Profile
            </button>
            <Link to="/complaint" className="bg-gray-200 px-4 py-2 rounded">
              Your Complaint
            </Link>
          </nav>

          {/* Routing */}
          <Routes>
            <Route path="/" element={<Logo />} />
            <Route path="/analyze" element={<FileAnalyze />} />
            <Route path="/category" element={<Category />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/otp" element={<OTPPage />} />
          </Routes>
        </div>
      </Router>
    </DescriptionProvider>
  );
}

export default App;
