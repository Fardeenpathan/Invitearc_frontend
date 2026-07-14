"use client";
import Image from "next/image";
import axios from "axios";
import config from "../../../../config/config";
import { useEffect, useState, useRef, useMemo } from "react";
import RoseHeroTemp from "./components/RoseHeroTemp";
import CoupleMessage from "./components/CoupleMessage";
import MarriageCountdown from "./components/MarriageCountdown";
import "./laavan-globals.css";
import { assets } from "./assets";

// const FloatingLamp = ({ className, style, reverse = false }) => {
//   // Memoize random values to prevent recalculation on re-renders
//   const lampValues = useMemo(() => {
//     // const duration = 60 + Math.random() * 40; // 60–100s (very slow flow)
//     // const duration = 40 + Math.random() * 10; // 40–50s
//     const duration = 60 + Math.random() * 10; // 60–70s
//     const delay = Math.random() * 15;

//     // depth feel - dramatic size variety
//     const scale = Math.random() < 0.5
//       ? 0.3 + Math.random() * 0.4  // 0.3–0.7 (small lamps)
//       : 1.2 + Math.random() * 0.8; // 1.2–2.0 (large lamps)
//     const blur = scale < 0.7 ? "blur(1.5px)" : "blur(0px)";

//     return { duration, delay, scale, blur };
//   }, []); // Empty dependency array means these values are calculated only once

//   return (
//     <img
//       src={assets.petals}
//       alt="petal"
//       className={`floating-lamp ${className}`}
//       style={{
//         animationName: reverse ? 'lampFlowReverse' : 'lampFlow',
//         animationDuration: `${lampValues.duration}s`,
//         animationDelay: `${lampValues.delay}s`,
//         transform: `scale(${lampValues.scale})`,
//         filter: `drop-shadow(0 0 18px rgba(255,180,90,0.9)) ${lampValues.blur}`,
//         '--scale': lampValues.scale,
//         ...style,
//       }}
//     />
//   );
// };

const initialData = {
  groomName: "Harpreet",
  brideName: "Ritika",
  blessingMessage: "With the heavenly blessings of",
  brideGrandParentsName: "Sdn. Gurmeet Kapoor and Sd. Maninder Singh",
  familyName: "The Kapoor Family",
  headline: "INVITES",
  religiousMantra: "ਪ੍ਰੀਤ ਸਹਿਤ ਆਪ ਸਭਦਾ ਜੀ ਆਇਆਂ ਨੂੰ...",
  inviteLine: "you to join us in the wedding celebrations of",
  groomDetails: "(Son of Dharmender Singh and Jaya Kaur)",
  brideDetails: "(Daughter of Manak Kapoor and Rani Kapoor)",
  eventIntro: "On the following events",
  thankyoutitle: "With Love From Us",
  thankyoumessage:
    "Thank you for being part our journey. Your presence makes this celebration truly meaningful, and we look forward to sharing these cherished moments with you.",
  coupleMessageTitle: "Introducing",
  coupleMessageDescription: "The Couple",
  coupleMessageThingsToKnowTitle: "A Guide for Guests",
  coupleMessageWeatherTitle: "Weather",
  coupleMessageWeatherDetails:
    "Clouds may drop by uninvited, but so will great vibes and better dance moves. A little rain never stopped a good celebration anyway.",
  coupleMessageStaffTitle: "Staff",
  coupleMessageStaffDetails:
    "The Central Park Hotel\nBund Garden Road,\nAgarkar Nagar, Pune,\nMaharashtra, 411001",
  coupleMessageParkingTitle: "Parking",
  coupleMessageParkingDetails:
    "Valet parking for all our guests will be available at the venue.",
  coupleMessageThingsToKnowDescription:
    "Your presence means the world to us. To make your experience effortless and enjoyable, we've gathered a few useful details below.",
  coupleMessageClosingTitle: "Awaiting the Pleasure of Your Company",
  coupleMessageRsvpText: "Click on the Whatsapp icon to RSVP",
  rsvpMode: "whatsapp",
  rsvpWhatsappButtonText: "Click on the Whatsapp icon to RSVP",
  rsvpFormButtonText: "Fill RSVP Form",
  whatsappNumber: "919876543210",
  Logo: "",

  events: [
    {
      title_ceremony: "Mehendi",
      image: assets.Mehendi,
      date: "Saturday, 20th June 2026",
      venue: "THE ASHOK HOTEL",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      time: "4pm Onwards",
      theme: "Pretty in Pink: Florals, Pastels & Pink Hues",
      link: "https://maps.app.goo.gl/TVyrP9mLFCpr4VXA9",
    },
    {
      title_ceremony: "Anand Karaj",
      image: assets.Anand_Karaj,
      date: "Saturday, 20th June 2026",
      venue: "The Central Park Hotel",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      time: "8pm Onwards",
      theme: "Glitz & Glam: Shimmer, sequins & Statement Fits",
      link: "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic",
    },
    {
      title_ceremony: "Reception",
      image: assets.Reception,
      date: "Sunday, 21st June 2026",
      venue: "The Central Park Hotel",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
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
  const [bgImage, setBgImage] = useState(assets.desktop_bg);
 const [coupleImage, setCoupleImage] = useState(assets.desktop_bg);
  const [data, setData] = useState({
    ...initialData,
    ...(initialTemplateData || {}),
    events: (initialTemplateData?.events || []).map((event, index) => ({
      ...initialData.events?.[index],
      ...event,
    })).length > 0 ? (initialTemplateData?.events || []).map((event, index) => ({
      ...initialData.events?.[index],
      ...event,
    })) : initialData.events,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...initialTemplateData,
      events: (initialTemplateData?.events || []).length > 0 
        ? (initialTemplateData?.events || []).map((event, index) => ({
            ...initialData.events?.[index],
            ...event,
          }))
        : prev.events || initialData.events,
    }));
  }, [initialTemplateData]);

  const [editMode, setEditMode] = useState(false);
  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateEvent = (index, field, value) => {
    setData((prev) => {
      const events = [...(prev?.events || [])];
      events[index] = {
        ...events[index],
        [field]: value,
      };
      return {
        ...prev,
        events,
      };
    });
  };

  const saveEdits = async () => {
    try {
      const response = await axios.put(
        `${config.api.baseUrl}/api/client-templates/${templateId}`,
        {
          customData: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      setData(response.data.data.customData);
      setEditMode(false);
      alert("Template saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save template");
    }
  };

  const resetEdits = () => {
    setData(initialTemplateData || initialData);
    setEditMode(false);
  };

  const backgroundMusicUrl = data?.backgroundMusicUrl || assets.background_song;

  // const audioRef = useRef<HTMLAudioElement | null>(null);
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
        setBgImage(assets.desktop_bg);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setBgImage(assets.small_laavan);
      } else {
        // Mobile
        setBgImage(assets.laavan_mobile);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);


   useEffect(() => {
    const coupleBg = () => {
      if (window.innerWidth >= 1536) {
        // Desktop Large
        setCoupleImage(assets.bg_three);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setCoupleImage(assets.bg_three);
      } else {
        // Mobile
        setCoupleImage(assets.respo_three);
      }
    };

    coupleBg();
    window.addEventListener("resize", coupleBg);

    return () => window.removeEventListener("resize", coupleBg);
  }, []);

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

      {/* <audio ref={audioRef} src="/assets/background_song.mp3" loop preload="auto" playsInline /> */}
      <audio
        key={backgroundMusicUrl}
        ref={audioRef}
        src={backgroundMusicUrl}
        loop
        preload="auto"
        playsInline
      />

      <div
        className="bg-cover bg-top bg-no-repeat min-h-screen w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <RoseHeroTemp />

        <div className="pt-36 md:pt-128 lg:pt-145 3xl:pt-200 relative z-10">
          <h2
            className="text-[#AE633A] text-center leading-tight text-2xl md:text-5xl lg:text-[80px] pb-120
                          md:pb-350 lg:pb-470 3xl:pb-550 flex flex-col items-center gap-y-0 lg:gap-y-5"
          >
            <span className="parisienne-regular">{data.groomName}</span>

            <span className="jacques-francois text-base md:text-2xl lg:text-[38px] tracking-widest">
              WEDS
            </span>

            <span className="parisienne-regular">{data.brideName}</span>
          </h2>

          <div className="flex flex-col items-center text-center gap-6 mt-0 lg:pt-50 pt-0">
           
             <p className="text-[#15528A] eb-garamond font-medium text-sm md:text-xl lg:text-2xl mt-6 md:w-50 w-30">
              {data.religiousMantra}
            </p>

            <Image
              src={assets.vachan}
              alt="idol"
              width={100}
              height={100}
              className="w-20 h-15 md:w-40 md:h-30 lg:w-59 lg:h-45 object-cover"
            />

            <p className="text-[#15528A] text-sm md:text-xl lg:text-3xl md:pt-8 eb-garamond font-medium">
              {data.blessingMessage}
              <br />
              {data.brideGrandParentsName}
            </p>

            <hr className="w-16 lg:w-24 border-[#15528A] my-2 md:my-4" />
            <h2 className="text-[#15528A] text-xs md:text-lg lg:text-[26px] eb-garamond font-medium">
              {data.familyName}
            </h2>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-[#15528A] eb-garamond font-medium text-3xl md:text-5xl lg:text-6xl leading-tight lg:tracking-wide tracking-wider">
              {data.headline}
            </h2>

            <p className="text-[#15528A] eb-garamond font-medium text-sm md:text-xl lg:text-3xl mt-6">
              {data.inviteLine}
            </p>

            <h2 className="text-[#15528A] eb-garamond font-medium text-center mt-6 md:mt-14 text-4xl md:text-6xl lg:text-[100px] leading-tight">
              {data.groomName}
            </h2>

            <p className="text-[#15528A] eb-garamond font-medium text-sm md:text-xl lg:text-3xl mt-4">
              {data.groomDetails}
            </p>

            <h2 className="text-[#15528A] eb-garamond font-medium text-center mt-4 text-4xl md:text-6xl lg:text-[100px] leading-tight">
              <span className="text-[#15528A] eb-garamond font-medium text-center lg:mt-10 mt-0 text-4xl md:text-6xl lg:text-[100px] leading-tight">
                &{" "}
              </span>{" "}
              <br /> {data.brideName}
            </h2>

            <p className="text-[#15528A] eb-garamond font-medium text-sm md:text-xl lg:text-3xl mt-4">
              {data.brideDetails}
            </p>

            <p className="text-[#15528A] eb-garamond font-medium text-sm md:text-xl lg:text-3xl mt-8">
              {data.eventIntro}
            </p>
          </div>

          <div className="flex justify-center mt-20 lg:mt-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-32 3xl:gap-50 px-15">
              {(data.events || []).map((event, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title_ceremony ? `${event.title_ceremony} image` : `Event ${i + 1} image`}
                      className="w-75 md:w-76 lg:w-80 3xl:w-100 h-auto"
                    />
                  )}

                  <h2 className="text-[#15528A] eb-garamond font-medium text-3xl md:text-2xl lg:text-[42px] mt-4">
                    {event.title_ceremony}
                  </h2>

                  <h2 className="text-[#15528A] eb-garamond font-medium text-sm md:text-base mt-2">
                    <p className="text-sm md:text-base lg:text-xl">
                      {event.date}
                    </p>
                     <p className="text-sm md:text-base lg:text-xl">
                      {event.time}
                    </p>
                    
                   
                  </h2>

                  <h2 className="text-[#15528A] eb-garamond font-medium text-sm md:text-base">
                    <p className="text-sm md:text-base lg:text-xl">
                      {event.venue}
                    </p>
                     <p className="text-sm md:text-base lg:text-xl">
                      {event.venue_address}
                    </p>
                    <br />
                  </h2>

                  <a
                    href={event.link}
                    className="text-[#15528A] underline md:text-sm text-lg mt-2 eb-garamond font-medium"
                    target="_blank"
                  >
                    View Directions
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center pt-30 lg:pt-80 3xl:pt-90 3xl:gap-60">
            {/* Center Text */}
            <div className="absolute flex flex-col justify-center items-center text-center md:mb-0 top-28 md:top-31 lg:top-84 3xl:top-152">
              <p className="parisienne-regular text-3xl md:text-5xl lg:text-7xl lg:leading-22 text-[#0064BF]">
                {data.thankyoutitle}
              </p>

              <h2 className="eb-garamond font-normal text-xs md:text-xl lg:text-3xl text-center text-[#6CB9FF] pt-2 md:pt-6 lg:leading-10 md:leading-7 leading-4 lg:w-155 md:w-100 w-55">
                <span className="eb-garamond font-normal text-[#15528A]">
                  {data.thankyoumessage}
                </span>
              </h2>
            </div>
            <Image
              src={assets.couple}
              alt="couple"
              width={900}
              height={1200}
              className="w-108 h-104 md:w-205 md:h-198 lg:w-393 lg:h-374 3xl:w-480 3xl:h-463 object-cover"
            />
          </div>
        </div>
      </div>

      <CoupleMessage data={data} isOwner={isOwner} updateField={updateField} />
      <div className="bg-[url('/assets/respo_three.webp')] md:bg-[url('/assets/bg_three.webp')] bg-cover bg-no-repeat" style={{
        backgroundImage: `url(${coupleImage})`,
      }}>
        <div className="h-253 md:h-179 lg:h-330 3xl:h-421 flex flex-col items-center relative">
          <img
            src={data?.Logo || assets.logo}
            // src={assets.logo}
            alt="logo"
            width={250}
            height={300}
            className="absolute top-50 w-20 h-24 md:top-41 md:w-31 md:h-35 lg:top-84 lg:w-46 lg:h-52 3xl:top-118"
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
