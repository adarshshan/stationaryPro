import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { AuthState } from "../store/useAuthStore";
import api from "../api"; // Import the Axios instance

const LoginPage: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const login = useAuthStore((state: AuthState) => state.login);
  const navigate = useNavigate();

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtp(true);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { mobile, otp });

      if (response.status === 200) {
        login(response.data.user, response.data.token);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white drop-shadow mb-6">
          Welcome Back 👋
        </h1>
        <p className="text-center text-white/80 mb-8">
          {showOtp
            ? "Enter the OTP sent to your mobile number"
            : "Login with your mobile number"}
        </p>

        {!showOtp ? (
          /* MOBILE FORM */
          <form onSubmit={handleMobileSubmit} className="space-y-5">
            <div>
              <label className="text-white text-sm font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 text-gray-800 shadow focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter mobile number"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-lg transition-all"
            >
              Get OTP
            </button>
          </form>
        ) : (
          /* OTP FORM */
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label className="text-white text-sm font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 text-gray-800 shadow focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter OTP"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-lg transition-all"
            >
              Verify & Login
            </button>

            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="w-full py-2 text-sm text-white/80 hover:text-white transition"
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
