import React, { useState, useEffect } from "react";
import axios from "axios";

const Roast = () => {
  const [userRoast, setUserRoast] = useState("");
  const [roastResult, setRoastResult] = useState(null);
  const [roastHistory, setRoastHistory] = useState([]);

  const userId = localStorage.getItem("userId"); // Ensure this is set after login

  const handleRoast = async () => {
    if (!userRoast.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/roast/create", {
        userRoast,
        userId,
      });

      setRoastResult(res.data.roast);
      setUserRoast("");
      fetchRoastHistory();
    } catch (err) {
      console.error("Roast error:", err);
    }
  };

  const fetchRoastHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/roast/all");
      setRoastHistory(res.data.roasts.reverse());
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  useEffect(() => {
    fetchRoastHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          🔥 Roast the AI 🤖
        </h2>

        <textarea
          rows="3"
          placeholder="Write your roast..."
          value={userRoast}
          onChange={(e) => setUserRoast(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none mb-4 resize-none"
        ></textarea>

        <button
          onClick={handleRoast}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition mb-6"
        >
          Submit Roast
        </button>

        {roastResult && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-8 shadow-md">
            <h4 className="text-xl font-bold mb-2 text-yellow-800">
              Battle Result ⚔️
            </h4>
            <p className="mb-1">
              <strong>You:</strong> {roastResult.userRoast}
            </p>
            <p className="mb-1">
              <strong>AI:</strong> {roastResult.aiRoast}
            </p>
            <p className="font-bold text-lg text-red-600">
              🏆 Winner: {roastResult.winner}
            </p>
          </div>
        )}

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Past Roasts 🕰
        </h3>
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {roastHistory.map((roast) => (
            <div
              key={roast._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p>
                <strong>You:</strong> {roast.userRoast}
              </p>
              <p>
                <strong>AI:</strong> {roast.aiRoast}
              </p>
              <p className="text-sm text-gray-600">
                Winner:{" "}
                <span
                  className={
                    roast.winner === "User"
                      ? "text-green-600 font-bold"
                      : "text-blue-600 font-bold"
                  }
                >
                  {roast.winner}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roast;
