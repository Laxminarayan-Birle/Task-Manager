import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { photo } from "../assets/images";
export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send as JSON
      await axios.post("http://localhost:5000/api/user/signup", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5 bg-gray-100 p-4">
      <div className="flex  gap-5 text-2xl font-bold">
      <img src={photo}
        alt="logo" 
        className="top-0 left-0 w-10 h-10 object-contain " />
        <h1 className="sm:block hidden">Task Manager</h1>
        </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={form.firstName}
          required
          className="border rounded w-full p-2"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={form.lastName}
          required
          className="border rounded w-full p-2"
        />
        <input
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          value={form.mobile}
          required
          className="border rounded w-full p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
          className="border rounded w-full p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          className="border rounded w-full p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
      </form>
       
    </div>
  );
}
