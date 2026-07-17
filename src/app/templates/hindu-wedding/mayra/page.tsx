"use client";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import FallingLamps from "./components/FallingLamps";
import CoupleMessage from "./components/CoupleMessage";
import MarriageCountdown from "./components/MarriageCountdown";
import "./mayra-globals.css";
import { assets } from "./assets";
const FloatingLamp = ({ className, style, reverse = false }: { className: string; style?: React.CSSProperties; reverse?: boolean }) => {

  const lampValues = useMemo(() => {

    const duration = 60 + Math.random() * 10; // 60–70s
    const delay = Math.random() * 15;


    const scale = Math.random() < 0.5
      ? 0.3 + Math.random() * 0.4  // 0.3–0.7 (small lamps)
      : 1.2 + Math.random() * 0.8; // 1.2–2.0 (large lamps)
    const blur = scale < 0.7 ? "blur(1.5px)" : "blur(0px)";

    return { duration, delay, scale, blur };
  }, []);

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
  groomName: "VEERENDRA",
  brideName: "MEERA",
  religiousMantra: "ॐ श्री गणेशाय नम",
  groomDetails: "(Son of Mrs. Kanchan & Mr. Sanjay Bhawnani)",
  blessingMessage: "With the heavenly blessings of",
  brideGrandParentsName: "Shri Rajesh Gaur & Shrimati Sunita Gaur",
  brideDetails: "(Daughter of Mrs. Sarita & Mr. Pradeep Jain)",
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

  events: [
    {
      title_ceremony: "Mehendi",
      image: assets.mehandi,
      date: "Saturday, 20th June 2026",
      venue: "THE ASHOK HOTEL",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      time: "4pm Onwards",
      theme: "Pretty in Pink: Florals, Pastels & Pink Hues",
      link: "https://maps.app.goo.gl/TVyrP9mLFCpr4VXA9",
    },



    {
      title_ceremony: "Shaadi",
      image: assets.shaadi,
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
      image: assets.reception,
      date: "Sunday, 21st June 2026",
      venue: "The Central Park Hotel",
      venue_address:
        "Bund Garden Road, Agarkar Nagar\nPune, Maharashtra, 411001",
      time: "5pm Onwards",
      theme: "Timeless Royalty: Elegant Ethnic & Royal Silhouettes",
      link: "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic",
    },


  ],
}


export default function Home({
  data: initialTemplateData,
  isOwner = false,
}) {
  const [bgImage, setBgImage] = useState(assets.desktop_bg);
  const [coupleImage, setCoupleImage] = useState(assets.desktop_bg);

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


  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

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
        setBgImage(assets.desktop_bg);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setBgImage(assets.desktop_bg);
      } else {
        // Mobile
        setBgImage(assets.mobile_bg);
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
        className="fixed bottom-4 right-4 z-50 bg-[#FF35A1] text-white p-3 rounded-xl text-xl cursor-pointer"
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


      <div className=" bg-cover bg-top bg-no-repeat min-h-screen w-full relative overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})`, }} >

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
        <FloatingLamp className="absolute top-20 right-12 w-32 h-32 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="absolute top-40 right-32 w-28 h-28 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="absolute top-60 right-52 w-36 h-36 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="absolute top-80 right-72 w-30 h-30 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="absolute top-100 right-92 w-34 h-34 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="absolute top-120 right-112 w-38 h-38 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="absolute top-140 right-132 w-26 h-26 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="absolute top-160 right-152 w-32 h-32 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="absolute top-180 right-172 w-36 h-36 transform -rotate-22 opacity-85" reverse={true} />
        <FloatingLamp className="absolute top-200 right-192 w-30 h-30 transform -rotate-35 opacity-85" reverse={true} />


        <FloatingLamp className="hidden lg:block absolute top-30 right-12 w-40 h-40 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-50 right-32 w-40 h-40 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-70 right-52 w-40 h-40 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-90 right-72 w-40 h-40 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-110 right-92 w-32 h-32 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-130 right-112 w-40 h-40 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-150 right-132 w-40 h-40 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-170 right-152 w-32 h-32 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-190 right-172 w-40 h-40 transform -rotate-22 opacity-85" reverse={true} />


        <FloatingLamp className="hidden lg:block absolute top-150 right-132 w-40 h-40 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-170 right-152 w-40 h-40 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-190 right-172 w-40 h-40 transform -rotate-22 opacity-85" reverse={true} />

        <div className="lg:pt-40 md:pt-30 md:pb-0 relative z-10 pt-6">
          <h2 className="text-[#AF630E] text-center leading-tight text-3xl md:text-5xl lg:text-[64px] pb-120
                          md:pb-400 lg:pb-470 3xl:pb-500 flex flex-col items-center gap-y-0 lg:gap-y-5">

            <span className="eb-garamond font-medium">{data.groomName}</span>

            <span className="eb-garamond font-medium text-xl md:text-3xl lg:text-5xl tracking-widest">WEDS</span>

            <span className="eb-garamond font-medium">{data.brideName}</span>

          </h2>

          <div className="flex flex-col items-center text-center gap-6 mt-0  lg:pt-50 pt-0">
            <p className="eb-garamond font-normal text-base md:text-2xl lg:text-3xl text-[#FFF097] text-center">{data.religiousMantra}</p>
            <Image
              src={assets.ganesha}
              alt="idol" width={100} height={100}
              className="w-23 h-30 md:w-35 md:h-46 lg:w-41 lg:h-53  object-cover" />

            <h2 className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-[26px] md:pt-8">
              {data.blessingMessage} <br />
              {data.brideGrandParentsName}
            </h2>

            <hr className="lg:w-24 w-16 border-[#FFF097] my-2 md:my-4" />
            <h2 className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-[26px]">
              Shri Amit Chauhan & Shrimati Vaishali Chauhan
            </h2>
          </div>

          <div className="mt-8 text-center">
            <h2 className="eb-garamond font-medium text-[#FFF097] text-3xl md:text-5xl lg:text-[64px] leading-tight lg:tracking-wide tracking-wider">
              {data.headline}
            </h2>

            <p className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-[26px] mt-6">
              {data.inviteLine}
            </p>

            <h2 className="eb-garamond font-medium text-[#FFF097] text-center mt-14 text-3xl md:text-5xl lg:text-[64px] leading-tight">
              {data.groomName}
            </h2>
            <p className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-3xl mt-2">
              {data.groomDetails}
            </p>
            <h2 className="eb-garamond font-medium text-[#FFF097] text-center mt-0 text-3xl md:text-5xl lg:text-[64px] leading-tight">
              <span className="eb-garamond font-medium text-[#FFF097] text-center lg:mt-10 mt-0 text-xl md:text-3xl lg:text-5xl leading-tight">&
              </span>   <br />
              {data.brideName}
            </h2>

            <p className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-3xl mt-2">
              {data.brideDetails}
            </p>

            <p className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-3xl mt-8 md:mt-24">
              {data.eventIntro}
            </p>
          </div>

          <div className="flex justify-center mt-20 lg:mt-40">
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
                  <img
                    src={event.image}
                    className="lg:w-80 w-75 sm:w-76 h-auto" />

                  <h2 className="eb-garamond font-medium text-[#FFF097] lg:text-[45px] md:text-2xl text-3xl mt-4">
                    {event.title_ceremony}
                  </h2>
                  <p className="text-[#FFF097] eb-garamond text-[14px] sm:text-base mt-2">
                    <span className="text-[22px]">{event.date}</span>  <br />
                    <span className="text-[22px]">{event.time}</span>
                  </p>
                  <p className="text-[#FFF097] eb-garamond text-[14px] sm:text-base mt-2">
                    <span className="text-[20px]">{event.theme}</span>
                  </p>




                  <p className="eb-garamond font-medium text-[#FFF097] text-[14px] sm:text-base mt-2">
                    <span className="text-[18px]">{event.venue}</span> <br />
                    <span className="text-sm md:text-base lg:text-[20px]">{event.venue_address}</span> <br />
                  </p>

                  <a
                    href={event.link}
                    className="eb-garamond font-medium text-[#FFF097] underline md:text-sm text-[18px] mt-2"
                    target="_blank">
                    View Directions
                  </a>

                </div>
              ))}
            </div>
          </div>


          <div className="flex items-center pt-30 lg:pt-50 3xl:pt-90 3xl:gap-0 md:mr-8 mr-2">
            <Image
              src={assets.couple_one}
              alt="couple" width={900} height={1200}
              className="w-60 h-90 md:w-121 md:h-190 lg:w-219 lg:h-294 3xl:w-270 3xl:h-346 object-cover" />

            {/* Center Text */}
            <div className="flex flex-col justify-center items-center text-center md:mb-0 lg:mb-0">
              <p className="parisienne-regular text-2xl md:text-5xl lg:text-7xl lg:leading-22 text-[#FFF097]">
                {data.thankyoutitle}
              </p>

              <h2 className="eb-garamond font-normal text-[10px] md:text-[18px] lg:text-3xl text-center text-[#FF8170] pt-2 md:pt-6 lg:leading-10 md:leading-7 leading-4">
                <span className="eb-garamond font-normal text-[#FFF097]">
                  {data.thankyoumessage}
                </span>
              </h2>
            </div>
          </div>

        </div>
      </div>

      <CoupleMessage data={data}/>

      <div className="bg-[url('/assets/respo_three.webp')] md:bg-[url('/assets/bg_three.webp')] bg-cover bg-no-repeat" style={{
        backgroundImage: `url(${coupleImage})`,
      }} >
        <div className="h-255 md:h-179 lg:h-440 3xl:h-419 flex flex-col items-center relative">
          <img src={data?.Logo || assets.logo} alt="logo" width={250} height={300} className="absolute top-28 w-42 h-48 md:top-41 md:w-28 md:h-35 lg:top-78 lg:w-48 lg:h-55 3xl:top-101" />
        </div>
      </div>

      <MarriageCountdown data={data}
         />

    </>
  );
}
