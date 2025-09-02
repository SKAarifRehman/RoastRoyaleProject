import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        console.error("Token not found in response:", data);
      }
    } catch (err) {
      console.error("Google Login Failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome Back!</h1>
        <p className="text-gray-300 mb-8">
          Sign in to continue and join the roast battles 🔥
        </p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full bg-white text-gray-900 font-medium py-3 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
