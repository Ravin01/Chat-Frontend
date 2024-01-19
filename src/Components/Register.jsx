import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl } from "../../config";

const Register = () => {
  const [input, setInput] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const newUser = await fetch(`${backendUrl}/register`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await newUser.json();
      setLoading(false);
      if (newUser.status === 401) {
        toast.error("user Already exists", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }
      setInput({
        userName: "",
        userEmail: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (
    sessionStorage.getItem("user") &&
    JSON.parse(sessionStorage.getItem("user"))
  ) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="login-container">
      
    <h2 className="login-heading" >Create a new account</h2>
    <form action="" onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Enter your name"
        name="userName"
        id="userName"
        required
        onChange={handleChange}
        value={input.userName}
        className="login-input"
      />
      <input
        type="email"
        placeholder="Enter your email"
        name="userEmail"
        id="userEmail"
        required
        onChange={handleChange}
        value={input.userEmail}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Enter your Password"
        name="password"
        id="password"
        required
        onChange={handleChange}
        value={input.password}
        className="login-input"
      />
      <button type="submit" className="login-button" >Register</button>
    </form>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    {loading && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="login-loader-con">
          <p>Registering</p>
          <div className="login-loader"></div>
        </div>
      </div>
    )}
    <div className="form-link">
      <p>Already have an Account ? </p>
      <Link to="/auth/login" className="form-link-register">
        login
      </Link>
    </div>
    
  </div>
  )
}

export default Register