import React, {useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AOS from 'aos'; 
import 'aos/dist/aos.css';

function Registration() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values, { resetForm }) => {
      localStorage.setItem("registrationData", JSON.stringify(values));

      alert("Registration successful!");

      resetForm();
    },
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #141E30, #243B55)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-[100vh]">
          <div  data-aos="fade-up"  className="w-full lg:w-[60%] xl:w-[40%] px-6 lg:px-20 py-6 lg:py-12 bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-[2rem] uppercase text-[#4CAF50] Lexend-Medium">
              Register
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-left font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border rounded w-full py-2 px-3 outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500">{formik.errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-left font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border rounded w-full py-2 px-3 outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-left font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border rounded w-full py-2 px-3 outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-left font-bold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border rounded w-full py-2 px-3 outline-none border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <button
                type="submit"
                className="bg-[#4CAF50] text-white py-2 px-4 mt-4 rounded w-full transition-all hover:bg-[#388E3C]"
              >
                Register
              </button>

              <p className="text-center mt-5">Do you have an account? <a href="/"> <span className="text-[orange] cursor-pointer">Sign in.</span></a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
