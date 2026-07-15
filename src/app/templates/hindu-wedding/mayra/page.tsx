"use client";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import FallingLamps from "./components/FallingLamps";
import CoupleMessage from "./components/CoupleMessage";
import MarriageCountdown from "./components/MarriageCountdown";
import "./mayra-globals.css";
import { assets } from "./assets";
const FloatingLamp = ({ className, style, reverse = false }: { className: string; style?: React.CSSProperties; reverse?: boolean }) => {
  // Memoize random values to prevent recalculation on re-renders
  const lampValues = useMemo(() => {

    const duration = 60 + Math.random() * 10; // 60–70s
    const delay = Math.random() * 15;

    // depth feel - dramatic size variety
    const scale = Math.random() < 0.5
      ? 0.3 + Math.random() * 0.4  // 0.3–0.7 (small lamps)
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


const intialData = {

}


export default function Home() {
  const [bgImage, setBgImage] = useState(assets.desktop_bg);
  const [coupleImage, setCoupleImage] = useState(assets.desktop_bg);
  const events = [
    {
      title_ceremony: "Mehendi",
      image: assets.mehandi,
      venue_address: <>Saturday, April 18th 2026 <br /> Join Us at 11 am <br /> The Leela Palace, Udaipur</>,
      link: "https://maps.app.goo.gl/53z68ksx4cYgoNm59",
    },

    // {
    //   title_ceremony: "Haldi",
    //   image: "/assets/haldi.webp",
    //   venue_address: <>Saturday, April 18th 2026 <br /> Join Us at 11 am <br /> The Leela Palace, Udaipur</>,
    //   link: "https://maps.app.goo.gl/ywMPWwHjbXvqwiWc8",
    // },

    // {
    //   title_ceremony: "Cocktail",
    //   image: "/assets/cocktail.webp",
    //   venue_address: <>Saturday, April 18th 2026 <br /> Join Us at 11 am <br /> The Leela Palace, Udaipur</>,
    //   link: "https://maps.app.goo.gl/f599YkTSEYKDEK5L7",
    // },

    // {
    //   title_ceremony: "Engagement",
    //   image: "/assets/engagement.webp",
    //   venue_address: <>Saturday, April 18th 2026 <br /> Join Us at 11 am <br /> The Leela Palace, Udaipur</>,
    //   link: "https://maps.app.goo.gl/53z68ksx4cYgoNm59",
    // },

    {
      title_ceremony: "Shaadi",
      image: assets.shaadi,
      venue_address: <>Saturday, April 18th 2026 <br /> Join Us at 11 am <br /> The Leela Palace, Udaipur</>,
      link: "https://maps.app.goo.gl/mxcwCxWhH1TXBC8c9",
    },

    {
      title_ceremony: "Reception",
      image: assets.reception,
      venue_address: <>Saturday, April 18th 2026 <br /> Join Us at 11 am <br /> The Leela Palace, Udaipur</>,
      link: "https://maps.app.goo.gl/f599YkTSEYKDEK5L7",
    },


  ];
  // const [data, setData] = useState({
  //     ...initialData,
  //     ...(initialTemplateData || {}),
  //     events:
  //       initialTemplateData?.events ||
  //       initialData.events,
  //   });
  
  //   useEffect(() => {
  //     setData((prev) => ({
  //       ...prev,
  //       ...initialTemplateData,
  //       events: initialTemplateData?.events || prev.events || initialData.events,
  //     }));
  //   }, [initialTemplateData]);
  //   const [editMode, setEditMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

// const backgroundMusicUrl = data?.backgroundMusicUrl || assets.background_song;


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
        className="fixed bottom-4 right-4 z-50 bg-[#FF35A1] text-white p-3 rounded-xl text-xl"
      >
        {playing ? "⏸" : "▶"}
      </button>

      <audio ref={audioRef} src="/assets/background_song.mp3" loop preload="auto" playsInline />

      
      <div className=" bg-cover bg-top bg-no-repeat min-h-screen w-full relative overflow-hidden"
        style={{  backgroundImage: `url(${bgImage})`, }} >

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

            <span className="eb-garamond font-medium">VEERENDRA</span>

            <span className="eb-garamond font-medium text-xl md:text-3xl lg:text-5xl tracking-widest">WEDS</span>

            <span className="eb-garamond font-medium">MEERA</span>

          </h2>

          <div className="flex flex-col items-center text-center gap-6 mt-0  lg:pt-50 pt-0">
            <p className="eb-garamond font-normal text-base md:text-2xl lg:text-3xl text-[#FFF097] text-center">ॐ श्री गणेशाय नम</p>
            <Image
              src={assets.ganesha}
              alt="idol" width={100} height={100}
              className="w-23 h-30 md:w-35 md:h-46 lg:w-41 lg:h-53  object-cover" />

            <h2 className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-[26px] md:pt-8">
              With the heavenly blessings of <br />
              Shri Rajesh Gaur & Shrimati Sunita Gaur
            </h2>

            <hr className="lg:w-24 w-16 border-[#FFF097] my-2 md:my-4" />
            <h2 className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-[26px]">
              Shri Amit Chauhan & Shrimati Vaishali Chauhan
            </h2>
          </div>

          <div className="mt-8 text-center">
            <h2 className="eb-garamond font-medium text-[#FFF097] text-3xl md:text-5xl lg:text-[64px] leading-tight lg:tracking-wide tracking-wider">
              INVITE
            </h2>

            <p className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-[26px] mt-6">
              You to join us in the wedding celebrations of
            </p>

            <h2 className="eb-garamond font-medium text-[#FFF097] text-center mt-14 text-3xl md:text-5xl lg:text-[64px] leading-tight">
              VEERENDRA
            </h2>

            <h2 className="eb-garamond font-medium text-[#FFF097] text-center mt-0 text-3xl md:text-5xl lg:text-[64px] leading-tight">
              <span className="eb-garamond font-medium text-[#FFF097] text-center lg:mt-10 mt-0 text-xl md:text-3xl lg:text-5xl leading-tight">&
              </span>   <br />
              MEERA
            </h2>

            <p className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-3xl mt-8 md:mt-14">
              Daughter of <br /> Shri Mahesh Rajput & Shrimati Asha Rajput
            </p>

            <p className="eb-garamond font-medium text-[#FFF097] text-sm md:text-xl lg:text-3xl mt-8">
              On the following events
            </p>
          </div>

          <div className="flex justify-center mt-20 lg:mt-40">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-28 3xl:gap-50">
              {events.map((event, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <img
                    src={event.image}
                    className="lg:w-80 w-75 sm:w-76 h-auto" />

                  <h2 className="eb-garamond font-medium text-[#FFF097] lg:text-[45px] md:text-2xl text-3xl mt-4">
                    {event.title_ceremony}
                  </h2>

                  <p className="eb-garamond font-medium text-[#FFF097] text-[14px] sm:text-base mt-2">
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


          <div className="flex items-center pt-30 lg:pt-50 3xl:pt-90 3xl:gap-60">
            <Image
              src={assets.couple_one}
              alt="couple" width={900} height={1200}
              className="w-60 h-90 md:w-121 md:h-190 lg:w-219 lg:h-294 3xl:w-270 3xl:h-346 object-cover" />

            {/* Center Text */}
            <div className="flex flex-col justify-center items-center text-center md:mb-0 lg:mb-0">
              <p className="parisienne-regular text-2xl md:text-5xl lg:text-7xl lg:leading-22 text-[#FFF097]">
                With <br /> Love From Us
              </p>

              <h2 className="eb-garamond font-normal text-[10px] md:text-[18px] lg:text-3xl text-center text-[#FF8170] pt-2 md:pt-6 lg:leading-10 md:leading-7 leading-4">
                <span className="eb-garamond font-normal text-[#FFF097]">
                  Thank you for being part our journey. <br />
                  Your presence makes this celebration truly <br />
                  meaningful, and we look forward to sharing <br />
                  these cherished moments with you.
                </span>
              </h2>
            </div>
          </div>

        </div>
      </div>

      <CoupleMessage />

      <div className="bg-[url('/assets/respo_three.webp')] md:bg-[url('/assets/bg_three.webp')] bg-cover bg-no-repeat" style={{
          backgroundImage: `url(${coupleImage})`,
        }} >
        <div className="h-255 md:h-179 lg:h-440 3xl:h-419 flex flex-col items-center relative">
          <img src="/assets/logo.webp" alt="logo" width={250} height={300} className="absolute top-28 w-42 h-48 md:top-41 md:w-28 md:h-35 lg:top-78 lg:w-48 lg:h-55 3xl:top-101" />
        </div>
      </div>

      <MarriageCountdown />

    </>
  );
}
