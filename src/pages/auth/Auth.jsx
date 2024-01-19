import { Route, Routes } from "react-router-dom"
import Login from "../../Components/Login"
import Register from "../../Components/Register"
import '../../Styles/Auth.css'
import Lottie from "react-lottie";
import loginAnimation from '../../assets/Ja2D9wpi9b.json';

const Auth = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation, // Lottie JSON file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="auth-container">
      
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        <div className="auth-json">
          <h1>Chat App</h1>
          <div className="auth-json-ani">
      <Lottie options={defaultOptions}  />
          </div>
      </div>
    </div>
  )
}

export default Auth