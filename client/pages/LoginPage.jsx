import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);

      localStorage.setItem("token", res.data.token);

      alert("Logged in successfully!");
      navigate("/roast");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full text-white">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Sign in to continue your roast battles.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-400 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
