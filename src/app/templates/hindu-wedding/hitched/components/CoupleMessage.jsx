"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { assets } from "../assets";
export default function CoupleMessage({ data }) {
  const [coupleBg, setCoupleBg] = useState(assets.couple_bg);
  const extractImageSrc = (image) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    return image?.image || image?.src || image?.url || "";
  };
  const carouselImages =
    Array.isArray(data?.coupleMessageCarouselImages) &&
    data.coupleMessageCarouselImages.length > 0
      ? data.coupleMessageCarouselImages
      : [
          assets.image1,
          assets.image2,
          assets.image3,
          assets.image4,
          assets.image5,
          // assets.image6,
        ];

  const coupleTitle = data?.coupleMessageTitle || "Introducing";
  const coupleDescription = data?.coupleMessageDescription || "The Couple";
  const thingsToKnowTitle =
    data?.coupleMessageThingsToKnowTitle || "A Guide for Guests";
  const thingsToKnowDescription =
    data?.coupleMessageThingsToKnowDescription ||
    "To help you feel at ease and enjoy every moment of the celebrations, we’ve gathered a few thoughtful details we’d love for you to know before the big day.";
  const locationTitle = data?.coupleMessageLocationTitle || "Location";
  const locationDetails =
    data?.coupleMessageLocationDetails ||
    "The Central Park Hotel\nBund Garden Road,\nAgarkar Nagar, Pune,\nMaharashtra, 411001";
  const weatherTitle = data?.coupleMessageWeatherTitle || "Weather";
  const weatherDetails =
    data?.coupleMessageWeatherDetails ||
    "Clouds may drop by uninvited, but so will great vibes and better dance moves. A little rain never stopped a good celebration anyway.";
  const parkingTitle = data?.coupleMessageParkingTitle || "Parking";
  const parkingDetails =
    data?.coupleMessageParkingDetails ||
    "Valet parking for all our guests will be available at the venue.";
  const routeLink =
    data?.coupleMessageRouteLink ||
    "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic";

  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth >= 1536) {
        // Desktop Large
        setCoupleBg(assets.couple_bg);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setCoupleBg(assets.couple_bg);
      } else {
        // Mobile
        setCoupleBg(assets.couple_bg);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);

  return (
    <>
      <div
        className="bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${assets.couple_bg})`,
        }}
      >
        <div className="lg:h-520 md:h-400 h-530 pt-2 flex flex-col  items-center">
          <h1 className="lg:text-[60px] md:text-3xl text-[32px] text-center text-[#FFF5B9] lg:pt-36 pt-12 font-garamond px-6 leading-12">
            {coupleTitle}
          </h1>
          <h2 className="lg:text-[100px] text-[60px]  text-center text-[#FFF5B9] lg:px-60 font-parisienne px-6 lg:mt-28 mt-12 font-Cormorant-upright lg:leading-8 md:leading-8 leading-6">
            {coupleDescription}
          </h2>
          <div className="w-full md:w-3/4 md:mt-32 mt-12">
            <Swiper
              effect={"coverflow"}
              centeredSlides={true}
              // slidesPerView={5}
              breakpoints={{
                0: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              spaceBetween={-60}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              speed={1200}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 300,
                modifier: 2,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper"
            >
              {carouselImages.map((image, index) => {
                const src = extractImageSrc(image);
                if (!src) return null;

                return (
                  <SwiperSlide key={`${src}-${index}`}>
                    <img src={src} alt={`Couple ${index + 1}`} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <h1 className=" lg:text-[100px] text-[60px] md:text-7xl text-center text-[#FFF5B9] lg:pt-32 pt-12 font-parisienne ">
            {thingsToKnowTitle}
          </h1>

          <div className="flex justify-center mt-10 md:pb-12 pb-16 lg:px-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 lg:gap-4 gap-10 sm:gap-16">
              <div className="flex flex-col items-center justify-center text-center md:mt-15">
                <img
                  src={assets.location}
                  alt="car"
                  className="lg:h-20 lg:w-24 h-26 w-32 "
                />
                <h2 className="lg:text-[32px] text-[50px] text-[#FFF5B9] mt-2 font-garamond">
                  {locationTitle}
                </h2>
                <span className="md:text-[20px] text-[16px] md:leading-5 text-[#FFF5B9] mt-1 font-cormorant">
                  {locationDetails.split("\n")[0]}
                </span>
                <p className="md:text-[18px] text-[14px] md:leading-5 text-[#FFF5B9] mt-1 font-cormorant">
                  {locationDetails
                    .split("\n")
                    .slice(1)
                    .map((line, index) => (
                      <span key={`${line}-${index}`}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
                <a
                  href={routeLink}
                  className="text-[#FFF5B9] underline md:text-sm md:text-[16px] text-[14px] mt-2 font-cormorant"
                  target="_blank"
                >
                  View Directions
                </a>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={assets.weather}
                  alt="weather"
                  className="lg:h-20 lg:w-24 h-26 w-32 "
                />
                <h2 className="lg:text-[32px] text-[50px] text-[#FFF5B9] mt-2 font-garamond">
                  {weatherTitle}
                </h2>
                <p className="md:text-[18px] text-[14px] text-[#FFF5B9] mt-1 font-cormorant md:leading-5">
                  {weatherDetails}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={assets.car}
                  alt="car"
                  className="lg:h-20 lg:w-24 h-26 w-32 "
                />
                <h2 className="lg:text-[32px] text-[50px] text-[#FFF5B9] mt-2 font-garamond">
                  {parkingTitle}
                </h2>
                <p className="md:text-[18px] text-[14px] md:leading-5 text-[#FFF5B9] mt-1 font-cormorant">
                  {parkingDetails}
                </p>
              </div>
            </div>
          </div>
          <h2 className="lg:text-[30px] text-[18px] text-center text-[#FFF5B9] lg:px-60 px-6  mb-12 font-cormorant">
            {thingsToKnowDescription}
          </h2>
          {/* <div className="flex flex-col justify-center items-center 3xl:mt-0 lg:ml-140 ml-34 md:ml-50 lg:mt-40 md:mt-0 mt-40">
            {rsvpMode === "form" ? (
              <div className="w-full max-w-xl rounded-3xl px-1 py-4 md:mt-4 flex flex-col items-center text-center">
                <h3 className="lg:text-6xl text-[32px] md:text-[30px] text-[#FFF5B9] lg:pt-63 pt-1 font-Cormorant-upright md:leading-12 leading-8">
                  {rsvpSectionHeading}
                </h3>
                <a
                  href={rsvpGoogleFormLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4"
                >
                  <button
                    type="button"
                    className="rounded-xl bg-[#FFF5B9] px-8 py-1 text-[20px] font-bold text-[#861E1D] font-Cormorant-upright cursor-pointer"
                  >
                    {rsvpButtonText}
                  </button>
                </a>
              </div>
            ) : (
              <div className="flex justify-center items-center mt-4">
                <div className="flex flex-col items-center text-center">
                  <h3 className="lg:text-6xl text-[32px] md:text-[40px] text-[#FFF5B9] lg:pt-63 pt-1 font-Cormorant-upright md:leading-12 leading-8">
                    {rsvpSectionHeading}
                  </h3>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <img
                      src={assets.whatsapp}
                      alt="WhatsApp"
                      className="lg:h-10 lg:w-10 h-6 w-6"
                    />

                    <button className="rounded-full md:px-4 py-2 px-1 text-[20px] md:text-[30px] font-semibold text-[#FFF5B9] cursor-pointer font-Cormorant-upright">
                      {rsvpButtonText}
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
