"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Eye, EyeOff } from "lucide-react";

export default function AuthModal({
  open,
  initialTab = "login",
  onClose,
  onSuccess,
}) {
  const [tab, setTab] = useState(initialTab);

  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, authSuccessCallback } = useContext(AuthContext);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setMobileNumber("");
      setError("");
      setLoading(false);
    }
  }, [open, initialTab]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (tab === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const payload =
        tab === "login"
          ? await login(email, password)
          : await register(name, email, mobileNumber, password);

      if (!payload.success) {
        setError(payload.message || "Unable to complete request.");
        setLoading(false);
        return;
      }

      // Login/Register successful

      if (authSuccessCallback) {
        await authSuccessCallback();
      }

      if (onSuccess) {
        await onSuccess(payload);
      }

      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {tab === "login" ? "Login to InviteArc" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {tab === "login"
                ? "Sign in to continue your template purchase and editing flow."
                : "Register to buy templates and access the editor."}
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

        <div className="mt-6 flex gap-2 overflow-hidden rounded-full border border-slate-200 bg-slate-50 p-1">
          {[
            { key: "login", label: "Login" },
            { key: "register", label: "Register" },
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => {
                setTab(option.key);
                setError("");
              }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                tab === option.key
                  ? "bg-[#861E1D] text-white"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <>
            {tab === "register" && (
              <>
                <label className="block text-sm font-medium text-slate-700">
                  Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Mobile Number
                  <div className="mt-2">
                    <PhoneInput
                      country={"in"}
                      value={mobileNumber}
                      onChange={(phone) => setMobileNumber(phone)}
                      inputClass="!w-full !h-12 !rounded-3xl"
                      containerClass="!w-full"
                      buttonClass="!border-slate-200"
                      inputStyle={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "24px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                      }}
                    />
                  </div>
                </label>
              </>
            )}

            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Password
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {tab === "register" && (
              <>
                <label className="block text-sm font-medium text-slate-700 mt-2 mb-0">
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </>
            )}

            {tab === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {error ? (
              <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#861E1D] px-6 py-3 text-sm font-semibold cursor-pointer text-white transition hover:bg-slate-700 disabled:opacity-50"
            >
              {loading
                ? tab === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : tab === "login"
                  ? "Login"
                  : "Register"}
            </button>
          </>
        </form>
      </div>
      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}
