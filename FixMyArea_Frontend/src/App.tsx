import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth from "./Components/Auth"
import LandingPage from "./Components/LandingPage";
import Report from "./Components/Report";
import AdminAuth from "./Components/AdminAuth";
import AdminDashboard from "./Components/AdminDashboard";
import RoleSelectionPage from "./Components/RoleSelection.";

function App() {


  const GoogleWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='418714674341-7bvmkecu25os7dm09g723te6v65dgima.apps.googleusercontent.com'>
        <Auth />
      </GoogleOAuthProvider>
    );
  };




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<GoogleWrapper />}></Route>
        <Route path="/" element={<LandingPage />} ></Route>
        <Route path="reportIssue" element={<Report />}></Route>
        <Route path="/adminAuth" element={<AdminAuth/>} ></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard/>} ></Route>
        <Route path="/role" element={<RoleSelectionPage/>} ></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
