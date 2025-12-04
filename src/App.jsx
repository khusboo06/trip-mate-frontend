



import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TripDetail from "./pages/TripDetail";
import CreateTrip from "./pages/CreateTrip";
import JoinTrip from "./pages/JoinTrip";
import ExpensePage from "./pages/ExpensePage";
import MapWeatherPage from "./pages/MapWeatherPage";
import CurrencyConverterPage from "./pages/CurrencyConverterPage";
import GroupChatPage from "./pages/GroupChatPage";
import PollsPage from "./pages/PollsPage";
import GalleryPage from "./pages/GalleryPage";
import AiAssistant from "./pages/AIAssistant";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AiAssistantFloatingButton from "./components/AiAssistantFloatingButton";
import Contact from "./pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useTheme } from "./context/ThemeContext";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const { darkMode } = useTheme();

  const showAiButton =
    location.pathname === "/dashboard" ||
    location.pathname.startsWith("/trip") ||
    location.pathname.startsWith("/trips");

  const isContactPage = location.pathname === "/contact";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : isContactPage
          ? "bg-white text-gray-800"
          : "bg-blue-100 text-gray-800"
      }`}
    >
      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🧱 Main Content: FULL WIDTH, NO SIDE PADDING */}
      <main className={`flex-grow w-full py-0 px-0 sm:px-0 sm:py-0 lg:py-0 lg:pt-8 ${darkMode ? "bg-gray-900" : ""}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dashboard & Trips */}
          <Route path="/dashboard" element={<Dashboard token={token} user={user} />} />
          <Route path="/trip/:id" element={<TripDetail token={token} user={user} />} />
          <Route path="/create-trip" element={<CreateTrip token={token} user={user} />} />
          <Route path="/join-trip" element={<JoinTrip />} />

          {/* Trip Features */}
          <Route path="/trips/:id/expenses" element={<ExpensePage />} />
          <Route path="/trips/:id/map-weather" element={<MapWeatherPage />} />
          <Route path="/trips/:id/currency-converter" element={<CurrencyConverterPage />} />
          <Route path="/trips/:id/chat" element={<GroupChatPage />} />
          <Route path="/trips/:id/polls" element={<PollsPage />} />
          <Route path="/trips/:id/gallery" element={<GalleryPage />} />

          {/* Profile & Settings */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* AI Assistant */}
          <Route path="/ai-assistant" element={<AiAssistant />} />
        </Routes>
      </main>

      {/* 💬 Floating AI Button */}
      {showAiButton && <AiAssistantFloatingButton />}

      {/* 📜 Footer */}
      <Footer />
    </div>
  );
}

export default App;

