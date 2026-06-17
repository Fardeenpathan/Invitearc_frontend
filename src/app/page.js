"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import AuthModal from "./../components/AuthModal";
import TemplateGrid from "../components/TemplateGrid";
import { AuthContext } from "./../context/AuthContext";
import TraditionalInvites from "./../components/TraditionalInvites";
import HowItWorks from "./../components/HowItWorks";
import Testimonial from "./../components/Testimonial";
import Faq from "./../components/Faq";

const slides = [
  {
    title: "Build your perfect event invite",
    description:
      "Fast, modern invitation templates for celebrations, meetings, and launches.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    button: "Browse Templates",
    href: "/template",
  },
  {
    title: "Launch stunning RSVP pages",
    description:
      "Create beautiful, responsive templates in minutes with ready-made designs.",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80",
    button: "See Featured Designs",
    href: "/template",
  },
  {
    title: "Invite guests with style",
    description:
      "Showcase your event with premium visuals and seamless sharing options.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
    button: "Get Started",
    href: "/register",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const router = useRouter();

  const openAuthModal = (tab) => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main>
        <section className="relative overflow-hidden bg-[#861E1D] text-white">
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950/50" />
          <div className="relative mx-auto flex min-h-128 max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-12">
            <div className="overflow-hidden rounded-4xl border border-white/10 bg-slate-950 shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div
                    key={slide.title}
                    className="min-w-full shrink-0 relative"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-128 w-full object-cover brightness-[0.55]"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-y-0 left-0 flex w-full items-center px-8 md:px-16">
                      <div className="max-w-2xl space-y-6 text-white">
                        <p className="text-sm uppercase tracking-[0.32em] text-slate-300">
                          Featured design experience
                        </p>
                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                          {slide.title}
                        </h1>
                        <p className="max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
                          {slide.description}
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          {slide.href === "/register" ? (
                            <button
                              type="button"
                              onClick={() => openAuthModal("register")}
                              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                            >
                              {slide.button}
                            </button>
                          ) : (
                            <Link
                              href={slide.href}
                              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                            >
                              {slide.button}
                            </Link>
                          )}
                          <Link
                            href="#templates"
                            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                          >
                            Explore templates
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  setActive(
                    (prev) => (prev - 1 + slides.length) % slides.length,
                  )
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#861E1D]/80 text-white transition hover:bg-slate-800"
                aria-label="Previous slide"
              >
                ‹
              </button>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-2 w-10 rounded-full transition ${
                    index === active ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
              <button
                onClick={() => setActive((prev) => (prev + 1) % slides.length)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#861E1D]/80 text-white transition hover:bg-slate-800"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section
          id="templates"
          className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12"
        >
          <div className="flex flex-col gap-4  md:items-center md:justify-between">
            <h2 className="mt-3 text-[28px] font-bold  md:text-[40px] font-georgia text-[#861E1D] text-center md:leading-none leading-9">
              Explore Our InviteArc Invitation Templates
            </h2>
            <p className=" md:text-[18px] text-[16px] leading-6 text-slate-600 text-center font-poppins">
              We offer modern wedding card designs that users can customize for
              weddings, engagements, birthdays, and other special celebration
              events.
            </p>
          </div>

          <TemplateGrid />
          <TraditionalInvites />
          <HowItWorks />
          <Testimonial/>
          <Faq id="faqs"/>
        </section>

        <section id="about" className="mx-auto">
          <div className="bg-[#861E1D] px-8 py-12 text-white shadow-xl sm:px-12">
            <div className="flex flex-col gap-6  lg:items-center lg:justify-between">
              <div className="">
                <h2 className="mt-3 text-[28px] font-bold  md:text-[40px] font-georgia text-white text-center md:leading-none leading-9">
                  Beautiful InviteArc - invites made for your celebrations.
                </h2>
                <p className=" md:text-[18px] text-[16px] leading-6 text-white text-center font-poppins mt-4">
                  Have your own design? We’ll build it for you.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="inline-flex shrink-0 items-center justify-center rounded-full cursor-pointer bg-white px-6 py-3 text-sm font-semibold text-[#861E1D] transition font-georgia hover:bg-slate-100"
              >
                Order a Custom Invite
              </button>
            </div>
          </div>
        </section>
      </main>
      <AuthModal
        open={authModalOpen}
        initialTab={authTab}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
