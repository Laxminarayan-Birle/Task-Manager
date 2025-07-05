import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { photo } from "../assets/images";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      window.location.href = "/dashboard"; // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100 p-4">
      <div className="flex  gap-5 text-2xl font-bold">
            <img src={photo}
              alt="logo" 
              className="top-0 left-0 w-10 h-10 object-contain " />
              <h1 className="sm:block hidden">Task Manager</h1>
              </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Login
        </button>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
