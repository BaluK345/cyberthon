import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
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
import Profile from "./pages/profilepage"; // Import Profile component

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
            <Link to="/profile" className="bg-gray-200 px-4 py-2 rounded">
              Your Profile
            </Link>
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
            
            {/* Profile Route with Close Functionality */}
            <Route path="/profile" element={<ProfileWithClose />} />
          </Routes>
        </div>
      </Router>
    </DescriptionProvider>
  );
}

// Wrapper for Profile to handle closing
const ProfileWithClose = () => {
  const navigate = useNavigate(); // React Router Hook to navigate
  return <Profile onClose={() => navigate(-1)} />; // Navigates back when closing
};

export default App;
