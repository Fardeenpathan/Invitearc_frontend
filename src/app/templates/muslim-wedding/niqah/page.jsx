"use client";
import { useEffect, useState, useRef, useMemo } from "react";
// import FallingLamps from "@/app/components/FallingLamps";
import CoupleMessage from "./components/CoupleMessage";
import MarriageCountdown from "./components/MarriageCountdown";
import "./niqah-globals.css";
import { assets } from "./assets";

const FloatingLamp = ({ className, style, reverse = false }) => {
  // Memoize random values to prevent recalculation on re-renders
  const lampValues = useMemo(() => {
    // const duration = 60 + Math.random() * 40; // 60–100s (very slow flow)
    // const duration = 40 + Math.random() * 10; // 40–50s
    const duration = 60 + Math.random() * 10; // 60–70s
    const delay = Math.random() * 15;

    // depth feel - dramatic size variety
    const scale =
      Math.random() < 0.5
        ? 0.3 + Math.random() * 0.4 // 0.3–0.7 (small lamps)
        : 1.2 + Math.random() * 0.8; // 1.2–2.0 (large lamps)
    const blur = scale < 0.7 ? "blur(1.5px)" : "blur(0px)";

    return { duration, delay, scale, blur };
  }, []); // Empty dependency array means these values are calculated only once

  return (
    <img
      src={assets.lamp}
      alt="Lamp"
      className={`floating-lamp ${className}`}
      style={{
        animationName: reverse ? "lampFlowReverse" : "lampFlow",
        animationDuration: `${lampValues.duration}s`,
        animationDelay: `${lampValues.delay}s`,
        transform: `scale(${lampValues.scale})`,
        filter: `drop-shadow(0 0 18px rgba(255,180,90,0.9)) ${lampValues.blur}`,
        "--scale": lampValues.scale,
        ...style,
      }}
    />
  );
};

const initialData = {
  groomName: "FARDEEN",
  brideName: "ZARIN",
  religiousMantra: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْم",
  brideGrandParentsName: "Mrs. Fatima Begum & Mr. Zafar Ahmed",
  blessingMessage: "With the heavenly blessings of",
  groomDetails: "(Son of Mrs. Shabana Khan & Mr. Rehan Malik)",
  brideDetails: "(Daughter of Mrs. Akram Sheikh & Fatima Sheikh)",
  eventIntro: "On the following events",
  headline: "INVITES",
  inviteLine: "you to join us in the wedding celebrations of",
  thankyoutitle: "With Love From Us",
  thankyoumessage:
    "Thank you for being part our journey. Your presence makes this celebration truly meaningful, and we look forward to sharing these cherished moments with you.",

  coupleMessageClosingTitle: "Awaiting the Pleasure of Your Company",
  coupleMessageRsvpText: "Click on the Whatsapp icon to RSVP",
  rsvpMode: "whatsapp",
  rsvpWhatsappButtonText: "Click on the Whatsapp icon to RSVP",
  rsvpFormButtonText: "Fill RSVP Form",
  whatsappNumber: "919876543210",
  rsvpGoogleFormLink: "",
  Logo: "",

  events: [
    {
      title_ceremony: "Mehendi",
      image: assets.mehandi,
      date: "Saturday, April 18th 2026",
      time: "Join Us at 11 am",
      venue: "The Leela Palace, Udaipur",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      theme: "Glitz & Glam: Shimmer, sequins & Statement Fits",
      link: "https://maps.app.goo.gl/53z68ksx4cYgoNm59",
    },

    {
      title_ceremony: "Nikah",
      image: assets.niqah,
      date: "Saturday, April 18th 2026",
      time: "Join Us at 11 am",
      venue: "The Leela Palace, Udaipur",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      theme: "Glitz & Glam: Shimmer, sequins & Statement Fits",
      link: "https://maps.app.goo.gl/mxcwCxWhH1TXBC8c9",
    },

    {
      title_ceremony: "Walima",
      image: assets.walima,
      date: "Saturday, April 18th 2026",
      time: "Join Us at 11 am",
      venue: "The Leela Palace, Udaipur",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      theme: "Glitz & Glam: Shimmer, sequins & Statement Fits",
      link: "https://maps.app.goo.gl/f599YkTSEYKDEK5L7",
    },
  ],
};

export default function Home({ data: initialTemplateData, isOwner = false }) {
   const [bgImage, setBgImage] = useState(assets.desktop_bg);
  const [data, setData] = useState({
    ...initialData,
    ...(initialTemplateData || {}),
    events:
      (initialTemplateData?.events || []).map((event, index) => ({
        ...initialData.events?.[index],
        ...event,
      })).length > 0
        ? (initialTemplateData?.events || []).map((event, index) => ({
            ...initialData.events?.[index],
            ...event,
          }))
        : initialData.events,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...initialTemplateData,
      events:
        (initialTemplateData?.events || []).length > 0
          ? (initialTemplateData?.events || []).map((event, index) => ({
              ...initialData.events?.[index],
              ...event,
            }))
          : prev.events || initialData.events,
    }));
  }, [initialTemplateData]);

  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const backgroundMusicUrl = data?.backgroundMusicUrl || assets.background_song;

  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio || started) return;

    try {
      audio.volume = 0.3;
      await audio.play();
      setStarted(true);
      setPlaying(true);
    } catch {}
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
      } catch {}
    }
  };


  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth >= 1536) {
        // Desktop Large
        setBgImage(assets.background);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setBgImage(assets.responsive);
      } else {
        // Mobile
        setBgImage(assets.responsive);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);



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

  return (
    <>
      <button
        onClick={() => {
          started ? toggleMusic() : startMusic();
        }}
        className="fixed bottom-4 right-4 z-50 bg-[#FF35A1] text-white p-3 rounded-xl text-xl"
      >
        {playing ? "⏸" : "▶"}
      </button>

      <audio
        key={backgroundMusicUrl}
        ref={audioRef}
        src={backgroundMusicUrl}
        loop
        preload="auto"
        playsInline
      />

      <div
        className="bg-[url('/assets/responsive.webp')] md:bg-[url('/assets/background.webp')]
                      bg-cover bg-top bg-no-repeat min-h-screen w-full relative overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Decorative Lamps - Natural Flow Pattern */}
        {/* Left-to-Right Lamps - Less crowded */}
        <FloatingLamp className="absolute top-10 left-8 w-40 h-40 transform rotate-12 opacity-90" />
        <FloatingLamp className="absolute top-30 left-20 w-36 h-36 transform rotate-45 opacity-80" />
        <FloatingLamp className="absolute top-50 left-40 w-32 h-32 transform rotate-30 opacity-85" />
        <FloatingLamp className="absolute top-70 left-60 w-38 h-38 transform rotate-15 opacity-80" />
        <FloatingLamp className="absolute top-90 left-80 w-34 h-34 transform rotate-25 opacity-75" />
        <FloatingLamp className="absolute top-110 left-100 w-28 h-28 transform rotate-10 opacity-85" />
        <FloatingLamp className="absolute top-130 left-120 w-36 h-36 transform rotate-35 opacity-75" />
        <FloatingLamp className="absolute top-150 left-140 w-30 h-30 transform rotate-22 opacity-85" />
        <FloatingLamp className="absolute top-170 left-160 w-32 h-32 transform rotate-18 opacity-80" />
        <FloatingLamp className="absolute top-190 left-180 w-40 h-40 transform rotate-28 opacity-85" />

        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-40 h-40 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-60 left-40 w-40 h-40 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-80 left-80 w-40 h-40 transform rotate-25 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-100 left-100 w-40 h-40 transform rotate-10 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-120 left-120 w-32 h-32 transform rotate-35 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-140 left-140 w-40 h-40 transform rotate-22 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-160 left-160 w-32 h-32 transform rotate-18 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-180 left-180 w-40 h-40 transform rotate-28 opacity-85" />

        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-40 h-40 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-60 left-40 w-40 h-40 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-80 left-80 w-40 h-40 transform rotate-25 opacity-75" />

        {/* Right-to-Left Lamps - Less crowded */}
        <FloatingLamp
          className="absolute top-20 right-12 w-32 h-32 transform -rotate-6 opacity-85"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-40 right-32 w-28 h-28 transform -rotate-12 opacity-75"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-60 right-52 w-36 h-36 transform -rotate-20 opacity-90"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-80 right-72 w-30 h-30 transform -rotate-8 opacity-85"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-100 right-92 w-34 h-34 transform -rotate-15 opacity-80"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-120 right-112 w-38 h-38 transform -rotate-25 opacity-90"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-140 right-132 w-26 h-26 transform -rotate-18 opacity-80"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-160 right-152 w-32 h-32 transform -rotate-30 opacity-75"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-180 right-172 w-36 h-36 transform -rotate-22 opacity-85"
          reverse={true}
        />
        <FloatingLamp
          className="absolute top-200 right-192 w-30 h-30 transform -rotate-35 opacity-85"
          reverse={true}
        />

        <FloatingLamp
          className="hidden lg:block absolute top-30 right-12 w-40 h-40 transform -rotate-6 opacity-85"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-50 right-32 w-40 h-40 transform -rotate-12 opacity-75"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-70 right-52 w-40 h-40 transform -rotate-20 opacity-90"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-90 right-72 w-40 h-40 transform -rotate-8 opacity-85"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-110 right-92 w-32 h-32 transform -rotate-15 opacity-80"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-130 right-112 w-40 h-40 transform -rotate-25 opacity-90"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-150 right-132 w-40 h-40 transform -rotate-18 opacity-80"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-170 right-152 w-32 h-32 transform -rotate-30 opacity-75"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-190 right-172 w-40 h-40 transform -rotate-22 opacity-85"
          reverse={true}
        />

        <FloatingLamp
          className="hidden lg:block absolute top-150 right-132 w-40 h-40 transform -rotate-18 opacity-80"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-170 right-152 w-40 h-40 transform -rotate-30 opacity-75"
          reverse={true}
        />
        <FloatingLamp
          className="hidden lg:block absolute top-190 right-172 w-40 h-40 transform -rotate-22 opacity-85"
          reverse={true}
        />

        {/* <FallingLamps /> */}
        <div className="pt-12 md:pt-44 lg:pt-64 md:pb-0 relative z-10">
          <h2
            className="text-[#FFF097] text-center leading-tight text-3xl md:text-5xl lg:text-[64px] lg:pb-400  3xl:pb-540
                           md:pb-450 pb-120 flex flex-col items-center gap-y-2 lg:gap-y-5"
          >
            <span className="font-eb-garamond font-medium">
              {data.groomName}
            </span>
            <span className="font-eb-garamond font-medium text-xl md:text-3xl lg:text-5xl tracking-widest">
              WEDS
            </span>
            <span className="font-eb-garamond font-medium">
              {data.brideName}
            </span>
          </h2>
          <div className="flex flex-col items-center text-center gap-6 mt-0  lg:pt-50 pt-0">
            <p className="font-eb-garamond font-medium text-base md:text-2xl lg:text-3xl text-[#FFF4B9] text-center">
              {data.religiousMantra}
            </p>
            <p className="font-eb-garamond font-medium text-base md:text-2xl lg:text-3xl text-[#FFF4B9] text-center">
              Bismillahir Rahmanir Raheem
            </p>
            <h2 className="font-eb-garamond font-medium text-base md:text-2xl lg:text-3xl text-[#FFF4B9]">
              {data.blessingMessage} <br /> {data.brideGrandParentsName}
            </h2>
            <hr className="lg:w-24 w-16 border-[#FFF4B9] lg:my-4" />
            <h2 className="font-eb-garamond font-medium text-base md:text-2xl lg:text-3xl text-[#FFF4B9]">
              {data.groomDetails}
            </h2>
          </div>

          <div className="mt-8 text-center">
            <h2 className="font-eb-garamond font-medium text-[#FFF4B9] text-3xl md:text-5xl lg:text-6xl leading-tight lg:tracking-wide tracking-wider">
              {data.headline}
            </h2>
            <p className="font-eb-garamond font-medium text-[#FFF4B9] text-base md:text-2xl lg:text-3xl mt-6">
              {data.inviteLine}
            </p>
            <h2 className="font-eb-garamond font-medium text-[#FFF097] text-center mt-4 lg:mt-14 text-[54px] md:text-6xl lg:text-[80px] leading-tight">
              {data.groomName}
            </h2>
            <h2 className="font-eb-garamond font-medium text-[#FFF097] text-center mt-4 text-[54px] md:text-6xl lg:text-[80px] leading-tight">
              <span
                className="font-jacques-francois font-normal text-[#FFF097] text-center lg:mt-10 mt-4 
                               text-[50px] md:text-4xl lg:text-5xl leading-tight"
              >
                &
              </span>{" "}
              <br />
              {data.brideName}
            </h2>

            <p className="font-eb-garamond font-medium text-[#FFF4B9] text-base md:text-2xl lg:text-3xl mt-2">
              {data.brideDetails}
            </p>
            <p className="font-eb-garamond font-medium text-[#FFF4B9] text-2xl md:text-2xl lg:text-3xl mt-8 lg:mt-14">
              {data.eventIntro}
            </p>
          </div>

          <div className="flex justify-center mt-20 lg:mt-40 pb-40">
            <div
              className={`grid gap-16 lg:gap-26 lg:px-18 3xl:px-0 ${
                data?.events?.length === 1
                  ? "grid-cols-1 justify-items-center"
                  : data?.events?.length === 2
                    ? "grid-cols-2 justify-items-center"
                    : "grid-cols-1 sm:grid-cols-3"
              }`}
            >
              {(data?.events || []).map((event, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <img
                    src={event.image}
                    alt={event.venue}
                    className="lg:w-80 w-75 sm:w-76 h-auto"
                  />

                  <h2 className="font-eb-garamond font-medium text-[#FFF4B9] text-3xl md:text-2xl lg:text-[42px] mt-4">
                    {event.title_ceremony}
                  </h2>

                  <p className="font-eb-garamond font-medium text-[#FFF4B9] mt-2">
                    <span className="text-base md:text-base lg:text-[15px]">
                      {event.date}
                    </span>
                    <br />
                    <span className="text-base md:text-base lg:text-[15px]">
                      {event.time}
                    </span>
                    <br />
                    <span className="text-base md:text-base lg:text-[15px] uppercase">
                      {event.venue}
                    </span>
                    <br />
                    <span className="text-base md:text-base lg:text-[15px] ">
                      {event.venue_address}
                    </span>
                    <br />
                    <span className="text-base md:text-base lg:text-[15px] ">
                      {event.theme}
                    </span>
                  </p>

                  <a
                    href={event.link}
                    className="font-eb-garamond font-medium text-[#FFF4B9] underline text-lg md:text-sm mt-2"
                    target="_blank"
                  >
                    View Directions
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block  md:flex items-center justify-between pt-30 lg:pt-100">
            <img
              src={assets.couple}
              alt="couple"
              className="w-60 h-138 md:w-104 md:h-133 lg:w-205 lg:h-284 3xl:w-6xl 3xl:h-365 object-cover"
            />

            {/* Center Text */}
            <div className="flex flex-col justify-center items-center text-center md:mb-54 lg:mb-130">
              <p className="font-parisienne-regular text-center text-2xl md:text-[40px] lg:text-7xl lg:leading-22 text-[#E1EF1E]">
                {data.thankyoutitle}
              </p>
              <h2 className="text-[10px] md:text-base lg:text-3xl text-center pt-0 md:pt-2 md:leading-6 lg:leading-10">
                <span className="font-eb-garamond font-normal text-[#EAD670]">
                  {data.thankyoumessage}
                </span>
              </h2>
            </div>
            <div className="self-end">
              <img
                src={assets.lights}
                alt="lights"
                className="w-20 h-58 md:w-30 md:h-100 lg:w-42 lg:h-162 3xl:h-190 object-cover"
              />
            </div>
          </div>

          {/* Mobile responsive */}
          <div className="block md:hidden pt-30">
            {/* Center Text */}
            <div className="flex flex-col justify-center items-center text-center">
              <p className="font-parisienne-regular text-3xl text-[#E1EF1E]">
                With <br /> Love From Us
              </p>
              <h2 className="text-sm text-center lg:pt-12 leading-4 pt-4">
                <span className="font-eb-garamond font-normal text-[#EAD670]">
                  Thank you for being part our journey. <br />
                  Your presence makes this celebration truly <br />
                  meaningful, and we look forward to sharing <br />
                  these cherished moments with you.
                </span>
              </h2>
            </div>

            <div className="flex items-center justify-between pt-20">
              <img
                src={assets.couple}
                alt="couple"
                className="w-90 h-108 lg:w-286 lg:h-365 object-cover"
              />
              <div className="self-end">
                <img
                  src={assets.lights}
                  alt="lights"
                  className="w-20 h-58 lg:w-60 lg:h-185 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CoupleMessage data={data} isOwner={isOwner} updateField={updateField} />

      <div
        className="hidden md:block bg-cover bg-no-repeat "
        style={{ backgroundImage: `url(${assets.sunset_img})` }}
      >
        <div className="md:h-176 lg:h-326 3xl:h-409 flex flex-col items-center">
          <img
            src={data?.Logo || assets.logo}
            alt="logo"
            width={250}
            height={300}
            className=" top-80 lg:w-70 lg:h-20 lg:mt-110 md:mt-50"
          />
        </div>
      </div>

      {/* mobile visible section */}
      <div className="md:hidden bg-[url('/assets/sunset.png')] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${assets.sunset})` }}>
        <div className="flex flex-col items-center h-230">
          <img
            src={data?.Logo || assets.logo}
            alt="logo"
            width={250}
            height={300}
            className=" top-80 lg:w-70 lg:h-20 mt-48"
          />
        </div>
      </div>

      <MarriageCountdown
        data={data}
        isOwner={isOwner}
        updateField={updateField}
      />
    </>
  );
}
