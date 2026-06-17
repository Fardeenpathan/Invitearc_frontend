"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AuthModal from "../components/AuthModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  if (pathname.startsWith("/share")) {
    return null;
  }

  const {
    user,
    logout,
    openAuthModal,
    closeAuthModal,
    authModalOpen,
    authTab,
  } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            <img src="/assets/INLOGO.png" className="h-16 w-18" />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <Link
              href="/"
              className="hover:text-slate-900 transition-colors text-[16px] font-semibold text-black font-poppins"
            >
              Home
            </Link>
            <Link
              href="#templates"
              className="hover:text-slate-900 transition-colors text-[16px] font-semibold text-black font-poppins"
            >
              Invitation Template
            </Link>
            <Link
              href="#faqs"
              className="hover:text-slate-900 transition-colors text-[16px] font-semibold text-black font-poppins"
            >
              Faqs
            </Link>
            <Link
              href="#about" 
              className="hover:text-slate-900 transition-colors text-[16px] font-semibold text-black font-poppins "
            >
              Blogs
            </Link>
          </nav>

          <div className="relative flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((c) => !c)}
                  className="flex items-center gap-2 rounded-full bg-[#861E1D] px-6 py-4 text-white shadow-lg transition cursor-pointer hover:bg-slate-800"
                  aria-label="Open user menu"
                >
                  <span className="text-xs font-bold text-slate-100">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 mt-3 w-52 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="mb-3 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block rounded-3xl px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 w-full rounded-3xl bg-[#861E1D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#861E1D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 cursor-pointer"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <AuthModal
        open={authModalOpen}
        initialTab={authTab}
        onClose={closeAuthModal}
        onSuccess={closeAuthModal}
      />
    </>
  );
}
