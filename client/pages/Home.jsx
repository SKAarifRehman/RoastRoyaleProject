import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Welcome to Roast Arena 🔥
        </h1>
        <p className="text-gray-300 mb-8">
          Battle the AI in hilarious roast wars or watch others get roasted.  
          Sign in to start your roast journey.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
