"use client";

import { useState } from "react";
import config from "../config/config"

export default function ForgotPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${config.api.baseUrl}/api/auth/forgot-password`,
       
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setOtpSent(true);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${config.api.baseUrl}/api/auth/verify-otp`,
        // "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setOtpVerified(true);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError("");

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch(
         `${config.api.baseUrl}/api/auth/reset-password`,
        // "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      alert("Password reset successfully");

      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setOtpSent(false);
      setOtpVerified(false);

      onClose();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 px-4 py-8">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Forgot Password
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Reset your account password.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-slate-600 transition hover:bg-slate-100 cursor-pointer"
          >
            X
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={email}
              disabled={otpSent}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
            />
          </label>

          {otpSent && (
            <label className="block text-sm font-medium text-slate-700">
              OTP
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
          )}

          {otpVerified && (
            <>
              <label className="block text-sm font-medium text-slate-700">
                New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
                />
              </label>
            </>
          )}

          {error && (
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {!otpSent && (
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full rounded-full bg-[#861E1D] px-6 py-3 text-white cursor-pointer"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          )}

          {otpSent && !otpVerified && (
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full rounded-full bg-[#861E1D] px-6 py-3 text-white cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          )}

          {otpVerified && (
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full rounded-full bg-green-600 px-6 py-3 text-white cursor-pointer"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
