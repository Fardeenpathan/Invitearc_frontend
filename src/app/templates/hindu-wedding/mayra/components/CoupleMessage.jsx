import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { assets } from "../assets";
import "swiper/css";
import "swiper/css/pagination";

import { useEffect, useState } from "react";

export default function CoupleMessage({ data }) {
  const [bgImage, setBgImage] = useState(assets.desktop_bg);
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
          assets.one,
          assets.two,
          assets.three,
          assets.four,
          assets.five,
          // assets.image6,
        ];

  const coupleTitle = data?.coupleMessageTitle || "Introducing";
  const coupleDescription = data?.coupleMessageDescription || "The Couple";
  const thingsToKnowTitle =
    data?.coupleMessageThingsToKnowTitle || "A Guide for Guests";

  const coupleMessageThingsToKnowDescription =
    data?.coupleMessageThingsToKnowDescription ||
    "Your presence means the world to us. To make your experience effortless and enjoyable, we've gathered a few useful details below.";
  const StaffTitle = data?.coupleMessageStaffTitle || "Staff";
  const StaffDetails =
    data?.coupleMessageStaffDetails ||
    "For those traveling from afar, Royal Orchid Suites offers a comfortable stay nearby.";
  const weatherTitle = data?.coupleMessageWeatherTitle || "Weather";
  const weatherDetails =
    data?.coupleMessageWeatherDetails ||
    "Clouds may drop by uninvited, but so will great vibes and better dance moves. A little rain never stopped a good celebration anyway.";
  const parkingTitle = data?.coupleMessageParkingTitle || "Parking";
  const parkingDetails =
    data?.coupleMessageParkingDetails ||
    "Valet parking for all our guests will be available at the venue.";

  const rsvpMode = data?.rsvpMode || data?.customData?.rsvpMode || "whatsapp";

  const whatsappNumber =
    data?.whatsappNumber || data?.customData?.whatsappNumber || "919876543210";

  const whatsappHref = `https://wa.me/${String(whatsappNumber).replace(/\D/g, "")}`;

  const rsvpSectionHeading =
    data?.rsvpSectionHeading ||
    data?.coupleMessageClosingTitle ||
    data?.customData?.coupleMessageClosingTitle ||
    "Awaiting the Pleasure of Your Company";

  const rsvpButtonText =
    rsvpMode === "form"
      ? data?.rsvpFormButtonText ||
        data?.customData?.rsvpFormButtonText ||
        "Fill RSVP Form"
      : data?.rsvpWhatsappButtonText ||
        data?.customData?.rsvpWhatsappButtonText ||
        "Click on the Whatsapp icon to RSVP";

  const rsvpGoogleFormLink =
    data?.rsvpGoogleFormLink || data?.customData?.rsvpGoogleFormLink || "";

  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth >= 1536) {
        // Desktop Large
        setBgImage(assets.bg_two);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setBgImage(assets.bg_two);
      } else {
        // Mobile
        setBgImage(assets.respo_two);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);

  return (
    <div
      className="bg-[url('/assets/respo_two.webp')] md:bg-[url('/assets/bg_two.webp')] bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="h-696 md:h-585 lg:h-893 3xl:h-1054">
        <h1 className="eb-garamond font-medium text-base md:text-2xl lg:text-[38px] text-center text-[#FFF097] lg:pt-40 pt-20">
          {coupleTitle}
        </h1>
        <h2 className="parisienne-regular text-5xl md:text-6xl lg:text-[100px] text-center text-[#FFF097] px-3 md:px-17 lg:px-53 3xl:px-103 mt-12 lg:mt-36 leading-5 md:leading-tight">
          {coupleDescription}
        </h2>
        <div className="md:mt-32 mt-26 lg:mt-44 flex justify-center items-center overflow-visible">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            centeredSlides={true}
            pagination={{ clickable: true }}
            className="w-full py-12 max-w-screen-3xl overflow-visible"
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1536: {
                slidesPerView: 3.5,
                spaceBetween: 50,
              },
            }}
          >
           
            {carouselImages.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <img
                  src={extractImageSrc(item)}
                  alt={`Carousel ${index + 1}`}
                  className="w-full h-120 md:h-90 lg:h-135 3xl:h-175 object-cover rounded-[60px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <h1 className="parisienne-regular text-5xl md:text-6xl lg:text-[100px] text-center text-[#FFF097] pt-16 md:pt-20 lg:pt-32 leading-tight">
          {thingsToKnowTitle}
        </h1>

        <div className="flex justify-center mt-20 pb-24 md:pb-0 lg:px-40 px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-30 3xl:gap-30">
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.weather}
                alt="weather"
                className="lg:h-26 lg:w-28 h-26 w-32 "
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#FFF097] mt-2">
                {weatherTitle}
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] text-[#FFF097] mt-1 md:leading-5">
                {weatherDetails}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.staff}
                alt="drive"
                className="md:h-26 lg:h-27 lg:w-21 h-36 w-29"
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#FFF097] mt-2">
                {StaffTitle}
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] md:leading-5 text-[#FFF097] mt-1">
                {StaffDetails}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.parking}
                alt="car"
                className="lg:h-27 lg:w-30 h-26 w-32 "
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#FFF097] mt-2">
                {parkingTitle}
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] md:leading-5 text-[#FFF097] mt-1">
                {parkingDetails}
              </p>
            </div>
          </div>
        </div>

        <h2 className="eb-garamond font-normal text-xl md:text-xl lg:text-[32px] text-center text-[#FFF097] px-4 md:px-20 lg:px-56 3xl:px-107 pt-10 md:pt-30 lg:pt-36 3xl:pt-16 mt-2 lg:mt-4 lg:leading-tight">
          {coupleMessageThingsToKnowDescription}
        </h2>

        <div className="flex flex-col items-center md:mt-2 lg:mt-0 gap-10 3xl:gap-12">
          <div className="">
            {/* <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#FFF097] pt-43 md:pt-71 lg:pt-72 3xl:pt-150 leading-normal md:leading-8 lg:leading-16">
              {rsvpSectionHeading}
            </h2> */}
            {/* <div className="flex flex-col-1 md:gap-0 gap-0 lg:gap-0 justify-center items-center md:not-first:mt-4">
              <a href="#" target="_blank">
                <img
                  src="/assets/whatsapp.webp"
                  alt="icon"
                  className="h-6 w-6 md:w-12 md:h-12 lg:w-10.5 lg:h-10.5 3xl:w-20 3xl:h-20"
                />
              </a>
              <h2 className="eb-garamond font-normal text-center text-xs md:text-base lg:text-[22px] text-[#FFF097]">
                Share Your RSVP 
              </h2>
            </div> */}

            <div className="flex flex-col-1 md:gap-0 gap-0 lg:gap-0 justify-center items-center md:not-first:mt-4">
              {rsvpMode === "form" ? (
                <div className="flex flex-col items-center text-center">
                  <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#FFF097]  pt-15 md:pt-80 lg:pt-50 3xl:pt-150 leading-normal md:leading-8 lg:leading-12 lg:w-140 w-70">
                    {rsvpSectionHeading}
                  </h2>

                  <a
                    href={rsvpGoogleFormLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6"
                  >
                    <button
                      type="button"
                      className="rounded-xl bg-[#FFF097] text-black px-6 py-2 text-sm md:text-lg font-semibold cursor-pointer"
                    >
                      {rsvpButtonText}
                    </button>
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#FFF097] pt-15 md:pt-80 lg:pt-50 3xl:pt-150 leading-normal md:leading-8 lg:leading-12 lg:w-140 w-70">
                    {rsvpSectionHeading}
                  </h2>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 mt-4"
                  >
                    <img
                      src={assets.whatsapp}
                      alt="WhatsApp"
                      className="h-8 w-8 md:h-8 md:w-8 lg:h-16 lg:w-16"
                    />

                    <span className="eb-garamond font-normal text-xs md:text-sm lg:text-[22px] text-[#FFF097]">
                      {rsvpButtonText}
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
          <img
            src={assets.couple_second}
            alt="couple"
            className="w-108 h-88 md:w-205 md:h-103 lg:w-full lg:h-full 3xl:w-480 3xl:h-243 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
