import React, { useState } from 'react'
import './auth.css'
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function () {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userData, setuserData] = useState({
    username: "",
    password: ""
  })
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = userData;
    if (!username || !password) {
      toast.warning("please fill the form completely")
    }
    try {
      setLoading(true);
      const result = await loginApi(userData)
      console.log("login result", result);
      if (result.status === 200) {
        sessionStorage.setItem("LoggedUser", JSON.stringify(result.data.data))
        sessionStorage.setItem("token", result.data.token)
        setuserData({
          username: "",
          password: ""
        })
        navigate("/dashboard")
        toast.success("Login successful!");
      }
      else if (result.status === 401) {
        toast.error('Invalid Email or Password')
      }
      else {
        toast.error('Somthing went wrong')
      }
    }
    catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again later.");
    }finally {
      setLoading(false);
  }

  }

  return (
    <div>

      <div className="dashboard-background">
        <div className="login-form-container">
          <img src='https://wallpapers.com/images/hd/mumen-rider-848-x-1200-wallpaper-4a2cghk5brjs8dnp.jpg' alt="Hero" className="hero-image" />
          <h2>Superhero Login</h2>
          {loading ? (
                <p className="comic-loading">Loading...</p>
            ) : (
              <form className="comic-login-form">
              <label>
                Username:
                <input
                  value={userData.username}
                  onChange={(e) => setuserData({ ...userData, username: e.target.value })}
                  type="text" name="username" placeholder="Enter your username" required />
              </label>
              <label>
                Password:
                <input
                  value={userData.password}
                  onChange={(e) => setuserData({ ...userData, password: e.target.value })}
                  type="password" name="password" placeholder="Enter your password" required />
              </label>
              <button onClick={handleLogin} type="submit">Login</button>
            </form>
            )}
          
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
