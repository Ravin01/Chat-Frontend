// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedPage from "./ProtectedPage";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import ForgotPass from "./Components/ForgotPass";
import ResetPass from "./Components/ResetPass";
import Page404 from "./pages/auth/Page404";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/*" element={<ProtectedPage element={<Home />} />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/404" element={<Page404 />} />

          {/* <Route path="/*" element={<Navigate to="/404" />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
