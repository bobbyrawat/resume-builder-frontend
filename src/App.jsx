import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeEditor from "./pages/ResumeEditor";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import ThemePage from "./pages/ThemePage";
import Payment from "./pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/resume/:id" element={
          <ProtectedRoute>
            <ResumeEditor />
          </ProtectedRoute>
        } />
        <Route path="/theme/:id" element={
          <ProtectedRoute>
            <ThemePage />
          </ProtectedRoute>
        } />
<Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;