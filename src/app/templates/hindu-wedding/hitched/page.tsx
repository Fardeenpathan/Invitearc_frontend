"use client";
import axios from "axios";
import config from "../../../../config/config";
import MarriageCountdown from "./components/MarriageCountdown";
import CoupleMessage from "./components/CoupleMessage";
// import DisableInspect from "./components/DisableInspect";
import { useEffect, useState, useRef, useMemo } from "react";
import "./hitched-globals.css";
import { assets } from "./assets";

const FloatingLamp = ({ className, style, reverse = false }: { className: string; style?: React.CSSProperties; reverse?: boolean }) => {
  // Memoize random values to prevent recalculation on re-renders
  const lampValues = useMemo(() => {
    const duration = 60 + Math.random() * 10;
    const delay = Math.random() * 15;

    const scale = Math.random() < 0.5
      ? 0.3 + Math.random() * 0.4
      : 1.2 + Math.random() * 0.8;

    const blur = scale < 0.7 ? "blur(1.5px)" : "blur(0px)";

    return { duration, delay, scale, blur };
  }, []); // Empty dependency array means these values are calculated only once

  return (
    <img
      src={assets.lamp}
      alt="Lamp"
      className={`floating-lamp ${className}`}
      style={{
        animationName: reverse ? 'lampFlowReverse' : 'lampFlow',
        animationDuration: `${lampValues.duration}s`,
        animationDelay: `${lampValues.delay}s`,
        transform: `scale(${lampValues.scale})`,
        filter: `drop-shadow(0 0 18px rgba(255,180,90,0.9)) ${lampValues.blur}`,
        '--scale': lampValues.scale,
        ...style,
      } as React.CSSProperties}
    />
  );
};

const initialData = {
  familyName: "The Kapoor Family",
  headline: "INVITES",
  inviteLine: "you to join us in the wedding celebrations of",
  groomName: "Dhiraj",
  groomDetails: "(Grandson of Mrs. Kanta & Mr. Kamal Bhawnani)\n(Son of Mrs. Kanchan & Mr. Sanjay Bhawnani)",
  brideName: "Ritika",
  brideDetails: "(Daughter of Mrs. Sarita & Mr. Pradeep Jain)",
  brideGrandParentsName: "(Granddaughter of Shri J.S. Kapoor)",
  blessingMessage: "With the heavenly blessings of",
  eventIntro: "On the following events",
  coupleMessageTitle: "Introducing",
  coupleMessageDescription: "The Couple",
  coupleMessageThingsToKnowTitle: "A Guide for Guests",
  coupleMessageThingsToKnowDescription: "To help you feel at ease and enjoy every moment of the celebrations, we’ve gathered a few thoughtful details we’d love for you to know before the big day.",
  coupleMessageClosingTitle: "Awaiting the Pleasure of Your Company",
  coupleMessageRsvpText: "Click on the Whatsapp icon to RSVP",
  coupleMessageLocationTitle: "Location",
  coupleMessageLocationDetails: "The Central Park Hotel\nBund Garden Road,\nAgarkar Nagar, Pune,\nMaharashtra, 411001",
  coupleMessageWeatherTitle: "Weather",
  coupleMessageWeatherDetails: "Clouds may drop by uninvited, but so will great vibes and better dance moves. A little rain never stopped a good celebration anyway.",
  coupleMessageParkingTitle: "Parking",
  coupleMessageParkingDetails: "Valet parking for all our guests will be available at the venue.",
  coupleMessageRouteLink: "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic",
  rsvpMode: "whatsapp",
  whatsappNumber: "919876543210",
  rsvpFields: [],
  noteText: "Note: Themes optional, vibes unmatched",
  events: [
    {
      title_ceremony: "Haldi + Mehendi",
      image: assets.mehandi,
      date: "Saturday, 20th June 2026",
      venue: "THE ASHOK HOTEL",
      venue_address: "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      time: "4pm Onwards",
      theme: "Pretty in Pink: Florals, Pastels & Pink Hues",
      link: "https://maps.app.goo.gl/TVyrP9mLFCpr4VXA9",
    },
    {
      title_ceremony: "Engagement + Sangeet",
      image: assets.cocktail,
      date: "Saturday, 20th June 2026",
      venue: "The Central Park Hotel",
      venue_address: "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      time: "8pm Onwards",
      theme: "Glitz & Glam: Shimmer, sequins & Statement Fits",
      link: "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic",
    },
    {
      title_ceremony: "Wedding + Reception",
      image: assets.engagement,
      date: "Sunday, 21st June 2026",
      venue: "The Central Park Hotel",
      venue_address: "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      time: "5pm Onwards",
      theme: "Timeless Royalty: Elegant Ethnic & Royal Silhouettes",
      link: "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic",
    },

  ],
};

export default function Home({
  data: initialTemplateData,
  token,
  templateId,
  isOwner = false,
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState({
    ...initialData,
    ...(initialTemplateData || {}),
    events:
      initialTemplateData?.events ||
      initialData.events,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...initialTemplateData,
      events: initialTemplateData?.events || prev.events || initialData.events,
    }));
  }, [initialTemplateData]);
  const [editMode, setEditMode] = useState(false);
  const [bgImage, setBgImage] = useState(assets.Rohit_mobilebgn);


  // const updateField = (field: string, value: string) => {
  //   setData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const updateEvent = (index: number, field: string, value: string) => {
  //   setData((prev) => {
  //     const events = [...(prev?.events || [])];
  //     events[index] = {
  //       ...events[index],
  //       [field]: value,
  //     };
  //     return {
  //       ...prev,
  //       events,
  //     };
  //   });
  // };

  // const saveEdits = async () => {
  //   try {
  //     const response = await axios.put(
  //       `${config.api.baseUrl}/api/client-templates/${templateId}`,
  //       {
  //         customData: data,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     setData(response.data.data.customData);
  //     setEditMode(false);
  //     alert("Template saved successfully");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to save template");
  //   }
  // };




  // const resetEdits = () => {
  //   setData(initialTemplateData || initialData);
  //   setEditMode(false);
  // };

  const backgroundMusicUrl = data?.backgroundMusicUrl || assets.background_song;

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio || started) return;

    try {
      audio.volume = 0.3;
      await audio.play();
      setStarted(true);
      setPlaying(true);
    } catch { }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch { }
    }
  };

  // First user interaction (mobile + desktop)
  useEffect(() => {
    const handler = () => startMusic();

    window.addEventListener("click", handler);
    window.addEventListener("touchstart", handler);

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [started]);

  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth >= 1536) {
        // Desktop Large
        setBgImage(assets.Rohit_desktop);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setBgImage(assets.Rohit_bdmd);
      } else {
        // Mobile
        setBgImage(assets.Rohit_mobilebgn);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);
  return (

    <div>
      {/* <DisableInspect /> */}
      <button
        onClick={() => {
          started ? toggleMusic() : startMusic();
        }}
        className="fixed bottom-4 right-4 z-50 bg-[#FF35A1] text-white p-3 rounded-xl text-xl cursor-pointer"
      >
        {playing ? "⏸" : "▶"}
      </button>

      <audio key={backgroundMusicUrl} ref={audioRef} src={backgroundMusicUrl} loop preload="auto" playsInline />
      <div
        className="bg-cover bg-top bg-no-repeat min-h-screen w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >

        {editMode && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black/40 p-4">
            <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl">
              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Hitched editor</h2>
                  <p className="text-sm text-slate-600">Edit the template text and event details here.</p>
                </div>
                <button
                  onClick={() => setEditMode(false)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  X
                </button>
              </div> */}
              {/* <div className="mt-6 grid gap-4">
                <div className="grid gap-3 lg:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    Family name
                    <input
                      value={data.familyName}
                      onChange={(e) => updateField("familyName", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Headline
                    <input
                      value={data.headline}
                      onChange={(e) => updateField("headline", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Invitation line
                    <input
                      value={data.inviteLine}
                      onChange={(e) => updateField("inviteLine", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Event intro
                    <input
                      value={data.eventIntro}
                      onChange={(e) => updateField("eventIntro", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    Groom name
                    <input
                      value={data.groomName}
                      onChange={(e) => updateField("groomName", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Bride name
                    <input
                      value={data.brideName}
                      onChange={(e) => updateField("brideName", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    Groom details
                    <textarea
                      rows={3}
                      value={data.groomDetails}
                      onChange={(e) => updateField("groomDetails", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Bride details<br />
                    Bride Parents Name
                    <textarea
                      rows={3}
                      value={data.brideDetails}
                      onChange={(e) => updateField("brideDetails", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                    Bride GrandParents Name
                    <textarea
                      rows={3}
                      value={data.brideGrandParentsName}
                      onChange={(e) => updateField("brideGrandParentsName", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                </div>
                <div className="rounded-3xl border border-slate-200 p-4">
                  <h3 className="text-lg font-semibold text-slate-900">Event details</h3>
                  <div className="mt-4 space-y-4">
                    {(data?.events || []).map((event, index) => (
                      <div key={index} className="rounded-3xl border border-slate-200 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="font-semibold text-slate-900">Event {index + 1}</span>
                          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{event.title_ceremony}</span>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <label className="space-y-2 text-sm text-slate-700">
                            Title
                            <input
                              value={event.title_ceremony}
                              onChange={(e) => updateEvent(index, "title_ceremony", e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                            />
                          </label>
                          <label className="space-y-2 text-sm text-slate-700">
                            Date
                            <input
                              value={event.date}
                              onChange={(e) => updateEvent(index, "date", e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                            />
                          </label>
                          <label className="space-y-2 text-sm text-slate-700">
                            Time
                            <input
                              value={event.time}
                              onChange={(e) => updateEvent(index, "time", e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                            />
                          </label>
                          <label className="space-y-2 text-sm text-slate-700">
                            Venue
                            <input
                              value={event.venue}
                              onChange={(e) => updateEvent(index, "venue", e.target.value)}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                            />
                          </label>
                        </div>
                        <label className="mt-3 space-y-2 text-sm text-slate-700">
                          Address
                          <textarea
                            rows={2}
                            value={event.venue_address}
                            onChange={(e) => updateEvent(index, "venue_address", e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                          />
                        </label>
                        <label className="mt-3 space-y-2 text-sm text-slate-700">
                          Theme
                          <textarea
                            rows={2}
                            value={event.theme}
                            onChange={(e) => updateEvent(index, "theme", e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <label className="space-y-2 text-sm text-slate-700">
                  Note text
                  <input
                    value={data.noteText}
                    onChange={(e) => updateField("noteText", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                  />
                </label>

                <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                  <button
                    onClick={resetEdits}
                    className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold cursor-pointer"
                  >
                    Reset
                  </button>

                  <button
                    onClick={saveEdits}
                    className="rounded-full bg-[#861E1D] text-white px-5 py-2 text-sm font-semibold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        )}

        <FloatingLamp className="hidden lg:block absolute top-10 left-8 w-18 h-18 transform rotate-12 opacity-90" />
        <FloatingLamp className="hidden lg:block absolute top-30 left-20 w-16 h-16 transform rotate-45 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-20 h-20 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-70 left-60 w-14 h-14 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-90 left-80 w-20 h-20 transform rotate-25 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-110 left-100 w-18 h-18 transform rotate-10 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-130 left-120 w-20 h-20 transform rotate-35 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-150 left-140 w-16 h-16 transform rotate-22 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-170 left-160 w-20 h-20 transform rotate-18 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-190 left-180 w-18 h-18 transform rotate-28 opacity-85" />

        <FloatingLamp className="lg:hidden absolute top-10 left-8 w-12 h-12 transform rotate-12 opacity-90" />
        <FloatingLamp className="lg:hidden absolute top-30 left-20 w-12 h-12 transform rotate-45 opacity-80" />
        <FloatingLamp className="lg:hidden absolute top-50 left-40 w-10 h-10 transform rotate-30 opacity-85" />
        <FloatingLamp className="lg:hidden absolute top-70 left-60 w-10 h-10 transform rotate-15 opacity-80" />
        <FloatingLamp className="lg:hidden absolute top-90 left-80 w-12 h-12 transform rotate-25 opacity-75" />
        <FloatingLamp className="lg:hidden absolute top-110 left-100 w-12 h-12 transform rotate-10 opacity-85" />
        <FloatingLamp className="lg:hidden absolute top-130 left-120 w-12 h-12 transform rotate-35 opacity-75" />
        <FloatingLamp className="lg:hidden absolute top-150 left-140 w-12 h-12 transform rotate-22 opacity-85" />
        <FloatingLamp className="lg:hidden absolute top-170 left-160 w-12 h-12 transform rotate-18 opacity-80" />
        <FloatingLamp className="lg:hidden absolute top-190 left-180 w-12 h-12 transform rotate-28 opacity-85" />

        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-20 h-20 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-60 left-40 w-20 h-20 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-80 left-80 w-20 h-20 transform rotate-25 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-100 left-100 w-20 h-20 transform rotate-10 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-120 left-120 w-28 h-28 transform rotate-35 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-140 left-140 w-20 h-20 transform rotate-22 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-160 left-160 w-28 h-28 transform rotate-18 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-180 left-180 w-20 h-20 transform rotate-28 opacity-85" />

        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-20 h-20 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-60 left-40 w-20 h-20 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-80 left-80 w-20 h-20 transform rotate-25 opacity-75" />


        {/* Right-to-Left Lamps - Less crowded */}
        <FloatingLamp className="hidden lg:block absolute top-20 right-12 w-18 h-19 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-40 right-32 w-20 h-20 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-60 right-52 w-18 h-18 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-80 right-72 w-16 h-16 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-100 right-92 w-18 h-18 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-120 right-112 w-18 h-18 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-140 right-132 w-16 h-16 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-160 right-152 w-18 h-18 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-180 right-172 w-16 h-16 transform -rotate-22 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-200 right-192 w-18 h-18 transform -rotate-35 opacity-85" reverse={true} />


        <FloatingLamp className="hidden lg:block absolute top-30 right-12 w-20 h-20 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-50 right-32 w-20 h-20 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-70 right-52 w-20 h-20 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-90 right-72 w-20 h-20 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-110 right-92 w-18 h-18 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-130 right-112 w-20 h-20 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-150 right-132 w-20 h-20 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-170 right-152 w-18 h-18 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-190 right-172 w-20 h-20 transform -rotate-22 opacity-85" reverse={true} />


        <FloatingLamp className="hidden lg:block absolute top-150 right-132 w-20 h-20 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-170 right-152 w-20 h-20 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-190 right-172 w-20 h-20 transform -rotate-22 opacity-85" reverse={true} />

        <FloatingLamp className="lg:hidden absolute top-20 right-12 w-12 h-12 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-40 right-32 w-12 h-12 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-60 right-52 w-12 h-14 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-80 right-72 w-10 h-10 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-100 right-92 w-12 h-12 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-120 right-112 w-10 h-10 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-140 right-132 w-12 h-12 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-160 right-152 w-12 h-12 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-180 right-172 w-12 h-12 transform -rotate-22 opacity-85" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-200 right-192 w-10 h-10 transform -rotate-35 opacity-85" reverse={true} />


        {/* <FallingLamps /> */}


        <div className=" md:pt-24 pt-4 relative z-10 ">
          <h2 className="text-[#15528A]  text-center leading-tight text-[32px] sm:text-5xl lg:text-[100px] lg:pb-300 3xl:pb-370 md:pb-470 pb-0 flex flex-col items-center gap-y-2 ">
            <span className="font-parisienne [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)] font-extrabold">
              {data.groomName}
            </span>
            <span className="text-[12px] sm:text-3xl tracking-[10px] font-cormorant [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]">WEDS</span>
            <span className="font-parisienne [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]">{data.brideName}</span>
          </h2>

          <div className="flex flex-col items-center text-center gap-6 mt-0  lg:pt-250 pt-150 md:pt-0">
            <h2 className="text-white md:text-2xl text-[17px] text-center">
              || श्री गणेशाय नमः ||
            </h2>
            <img
              src={assets.ganesh}
              alt="ganesh"
              className="md:w-40 w-28 h-auto"
            />

            <h2 className="text-white lg:text-[30px] md:text-2xl text-[20px] font-Cormorant-upright">
              {data.blessingMessage}
              <br /> Late Smt. Kamla Kapoor
            </h2>
            <h2 className="text-white font-Cormorant-upright lg:text-[34px] md:text-2xl text-[26px]">
              {data.familyName}
            </h2>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-white font-cormorant 
            text-3xl sm:text-5xl lg:text-[60px] leading-tight lg:tracking-wide tracking-wider">
              {data.headline}
            </h2>

            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl text-[19px] mt-6">
              {data.inviteLine}
            </p>

            <h2 className="text-white font-Cormorant-upright text-center mt-14
            md:text-5xl text-[64px] lg:text-[100px] leading-tight font-bold">
              {data.groomName}
            </h2>

            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl mt-2 text-[16px] whitespace-pre-line">
              {data.groomDetails}
            </p>

            <h2 className="text-white font-Cormorant-upright text-center mt-4
            text-[64px] sm:text-7xl lg:text-[100px] leading-tight font-bold">
              <span className="text-white font-Cormorant-upright text-center lg:mt-10 mt-4 
            md:text-5xl text-[82px] lg:text-[150px] leading-tight">&</span>   <br />
              {data.brideName}
            </h2>

            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl text-[16px] mt-2 whitespace-pre-line">
              {data.brideDetails}
            </p>
            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl text-[16px] mt-2 whitespace-pre-line">
              {data.brideGrandParentsName}
            </p>

            <p className="text-white font-Cormorant-upright lg:text-3xl md:text-2xl text-[24px] mt-8">
              {data.eventIntro}
            </p>

          </div>

          <div className="flex justify-center mt-20 flex-wrap lg:px-0 md:px-10 px-12">

            <div
              className={`grid gap-16 lg:gap-26 lg:px-18 3xl:px-0 ${data?.events?.length === 1
                ? "grid-cols-1 justify-items-center"
                : data?.events?.length === 2
                  ? "grid-cols-2 justify-items-center"
                  : "grid-cols-1 sm:grid-cols-3"
                }`}
            >
              {(data?.events || []).map((event, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  {event.image && (
                    <div className="mb-4 w-full rounded-3xl ">
                      <img
                        src={event.image}
                        alt={event.title_ceremony ? `${event.title_ceremony} image` : `Event ${i + 1} image`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-white font-Cormorant-upright lg:text-[45px] md:text-2xl text-[37px] mt-4 font-bold">
                    {event.title_ceremony}
                  </h2>


                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
                    <span className="text-[22px]">{event.date}</span>  <br />
                    <span className="text-[22px]">{event.time}</span>
                  </p>
                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
                    <span className="text-[20px]">{event.theme}</span>
                  </p>

                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
                    <span className="text-[18px]">{event.venue}</span> <br />
                    {event.venue_address.split("\n").map((line, li) => (
                      <span key={li}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>

                  <a
                    href={event.link}
                    className="text-white underline md:text-sm md:text-[16px] text-[14px] mt-2 font-cormorant"
                    target="_blank"
                  >
                    View Directions
                  </a>
                </div>
              ))}

            </div>
          </div>

          <div className="flex justify-center md:mt-20 mt-10"><p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
            <span className="text-[22px] md:text-[24px]">Note: Themes optional, vibes unmatched</span></p>
          </div>

          <div className="relative w-full mt-30 ">
            <img
              src={assets.back_bottom}
              alt="ganesh"
              className="w-full"
            />

            {/* Left Side Text */}
            <div className="absolute inset-0 flex items-center text-left lg:ml-0 3xl:ml-50 ml-4 ">
              <div className="lg:pl-24 md:pl-14 pl-0">
                <h1 className="lg:text-7xl md:text-5xl text-[26px] text-[#E1EF1E] font-parisienne lg:pb-10 md:pb-8 pb-4">
                  With Love From Us
                </h1>

                <h2 className="3xl:text-[40px] lg:text-[36px] md:text-2xl text-[14px] text-[#00EAFF] font-Cormorant-upright lg:leading-12.5 md:leading-10 leading-5 md:pr-90 pr-40 3xl:pr-220 lg:pr-150 text-center mb-20">
                  Thank you for being part of our journey. Your presence makes this celebration truly meaningful, and we look forward to sharing these cherished moments with you.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CoupleMessage data={data} />

      <div
        className="hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.moon})` }}
      >
        <div className="flex justify-center md:h-175 lg:h-237.5 xl:h-275 2xl:h-325 3xl:h-[1600px] md:pt-48 lg:pt-72 3xl:pt-96" />
      </div>

      <div className="md:hidden relative flex items-start justify-center">

        <img
          src={assets.moon_mobile2}
          alt="background"
          className="w-full h-full object-contain"
        />
        <div className="absolute top-[25svh] left-0 right-0 flex justify-center">
        </div>
      </div>

      <MarriageCountdown data={data} />

    </div>
  );
}
