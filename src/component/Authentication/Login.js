import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [storedData, setStoredData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  useEffect(() => {
    const registrationData = localStorage.getItem("registrationData");
    if (registrationData) {
      setStoredData(JSON.parse(registrationData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      storedData &&
      formData.email === storedData.email &&
      formData.password === storedData.password
    ) {
      setSuccessMessage("Login successful!");
      setErrorMessage("");

      navigate("/fetchtodo");
    } else {
      setErrorMessage("Invalid email or password.");
      setSuccessMessage("");
    }
  };

  return (
    <div
      className=""
      style={{
        background: "linear-gradient(to bottom right, #141E30, #243B55)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-[100vh]">
         
          <div
            data-aos="fade-up" 
            className="w-full lg:w-[60%] xl:w-[40%] px-6 lg:px-20 py-6 lg:py-12 bg-white rounded-xl shadow-lg"
          >
            <h1 className="text-2xl font-bold mb-4 text-center text-[2rem] uppercase text-[#4CAF50]">
              Login
            </h1>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-[#333333] text-left font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border rounded w-full py-2 px-3 outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-[#333333] text-left font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border rounded w-full py-2 px-3 outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#4CAF50] text-white py-2 px-4 rounded w-full mt-4 transition-all hover:bg-[#388E3C]"
              >
                Login
              </button>

              <p className="text-center mt-5">
                Don't have an account?{" "}
                <a href="/registration">
                  {" "}
                  <span className="text-[orange] cursor-pointer">Sign up.</span>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;