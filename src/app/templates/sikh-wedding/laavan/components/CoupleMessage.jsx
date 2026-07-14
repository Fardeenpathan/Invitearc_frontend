import { assets } from "../assets";
import { useEffect, useState } from "react";
export default function CoupleMessage({  data }) {
  const [bgImage, setBgImage] = useState(assets.bg_two);
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
        setBgImage(assets.respo_bg_two);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);

  const coupleTitle = data?.coupleMessageTitle || "Introducing";
  const coupleDescription = data?.coupleMessageDescription || "The Couple";
  const thingsToKnowTitle =
    data?.coupleMessageThingsToKnowTitle || "A Guide for Guests";
  const thingsToKnowDescription =
    data?.coupleMessageThingsToKnowDescription ||
    "To help you feel at ease and enjoy every moment of the celebrations, we’ve gathered a few thoughtful details we’d love for you to know before the big day.";
  const StaffTitle = data?.coupleMessageStaffTitle || "Staff";
  const StaffDetails =
    data?.coupleMessageStaffDetails ||
    "The Central Park Hotel\nBund Garden Road,\nAgarkar Nagar, Pune,\nMaharashtra, 411001";
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
  data?.coupleMessageClosingTitle ||
  data?.customData?.coupleMessageClosingTitle ||
  "Awaiting the Pleasure of Your Company";

  const rsvpButtonText =
    rsvpMode === "form"
      ? (
          data?.rsvpFormButtonText ||
          data?.customData?.rsvpFormButtonText ||
          "Fill RSVP Form"
        )
      : (
          data?.rsvpWhatsappButtonText ||
          data?.customData?.rsvpWhatsappButtonText ||
          "Click on the Whatsapp icon to RSVP"
        );

  const rsvpGoogleFormLink =
    data?.rsvpGoogleFormLink || data?.customData?.rsvpGoogleFormLink || "";


  return (
    <div
      className=" bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="h-689 md:h-585 lg:h-1083 3xl:h-1367">
        <h1 className="eb-garamond font-medium text-base md:text-2xl lg:text-[38px] text-center text-[#15528A] lg:pt-40 pt-20">
          {coupleTitle}
        </h1>
        <h2 className="parisienne-regular text-5xl md:text-6xl lg:text-[100px] text-center text-[#15528A] px-3 md:px-17 lg:px-51 3xl:px-103 mt-12 lg:mt-24 leading-5 md:leading-tight">
          {coupleDescription}
        </h2>
        <div className="relative flex flex-col items-center mt-12 md:mt-12 lg:mt-20 3xl:mt-30">
          <h2 className=" text-[#15528A] text-left text-xl md:text-4xl lg:text-[68px] 3xl:text-[78px] pl-60 md:pl-104 lg:pl-210 3xl:pl-280 md:mt-2 lg:mt-3 3xl:mt-5 flex flex-col justify-end ">
            <span className="eb-garamond font-medium uppercase">{data.groomName}</span>
            <span className="eb-garamond font-medium opacity-50 text-[#6CB9FF] text-5xl md:text-7xl lg:text-[150px] tracking-widest -mt-6 pl-7 md:-mt-9 md:pl-13 lg:-mt-18 lg:pl-24 -rotate-26">
              &
            </span>
            <span className="eb-garamond font-medium -mt-4 md:-mt-6 lg:-mt-8 uppercase">
             {data.brideName}
            </span>
          </h2>

          <img
            src={data?.coupleMessageImages?.image1 || assets.one}
            alt="couple"
            className="absolute right-33 w-35 h-28 md:right-78 md:w-60 md:h-46 lg:right-143 lg:w-106 lg:h-83 3xl:right-167 3xl:w-146 3xl:h-103 z-20"
          />
      
          <img
            src={data?.coupleMessageImages?.image2 ||assets.two}
            alt="couple_one"
            className=" absolute top-15 left-6 w-32 h-55 md:left-21 md:top-24 md:w-54 md:h-90 lg:left-50 lg:top-45 lg:w-97 lg:h-166 3xl:left-68 3xl:top-60 3xl:w-117 3xl:h-186 z-10"
          />

          <img
            src={assets.three}
            alt="flowers"
            className="absolute right-42 top-20 w-27 h-37 md:right-82 md:top-34 md:w-45 md:h-59 lg:right-150 lg:top-61 lg:w-82 lg:h-110 3xl:right-180 3xl:top-75 3xl:w-102 3xl:h-130 z-40"
          />
          <img
            src={data?.coupleMessageImages?.image3 || assets.four}
            alt="couple"
            className="absolute right-9 top-18 w-39 h-59 md:right-22 md:top-30 md:w-69 md:h-98 lg:right-49 lg:top-55 lg:w-118 lg:h-176 3xl:right-61 3xl:top-67 3xl:w-138 3xl:h-196 z-30"
          />
          <img
            src={data?.coupleMessageImages?.image4 || assets.five}
            alt="couple"
            className="absolute top-60 right-38 w-40 h-30 md:right-76 md:top-97 md:w-70 md:h-50 lg:right-142 lg:top-181 lg:w-120 lg:h-91 3xl:top-212 3xl:right-170 3xl:w-160 3xl:h-111 z-20"
          />
        </div>

        <h1 className="parisienne-regular text-5xl md:text-6xl lg:text-[100px] text-center text-[#15528A] pt-86 md:pt-130 lg:pt-250 3xl:pt-320 leading-tight">
          {thingsToKnowTitle}
        </h1>

        <div className="flex justify-center mt-20 pb-24 md:pb-0 lg:px-70 px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-10 lg:gap-20 3xl:gap-20">
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.weather}
                alt="weather"
                className="w-31 h-25 md:w-24 md:h-22 lg:w-28 lg:h-26"
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#15528A] mt-1">
                {weatherTitle}
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] text-[#15528A] mt-1 md:leading-5">
                {weatherDetails}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.staff}
                alt="drive"
                className="w-28 h-35 md:w-17 md:h-23 lg:w-21 lg:h-27"
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#15528A] mt-1">
                {StaffTitle}
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] md:leading-5 text-[#15528A] mt-1">
                {StaffDetails}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.parking}
                alt="car"
                className="w-31 h-25 md:w-26 md:h-23 lg:w-30 lg:h-27"
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#15528A] mt-1">
                {parkingTitle}
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] md:leading-5 text-[#15528A] mt-1">
                {parkingDetails}
              </p>
            </div>
          </div>
        </div>

        <h2 className="eb-garamond font-normal text-[16px] md:text-xl lg:text-[32px] text-center text-[#15528A] px-4 md:px-20 lg:px-56 3xl:px-107 pt-10 md:pt-22 lg:pt-40 3xl:pt-46 mt-2 lg:mt-4 lg:leading-tight">
          {thingsToKnowDescription}
        </h2>

        <div className="flex justify-center md:justify-end md:mt-2 lg:mt-135 3xl:mt-210 md:pr-5 lg:pr-10 3xl:pr-30">
          {rsvpMode === "form" ? (
            <div className="flex flex-col items-center text-center">
              <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#15528A] pt-15 md:pt-80 lg:pt-50 3xl:pt-150 leading-normal md:leading-8 lg:leading-12 lg:w-140 w-70">
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
                  className="rounded-xl bg-[#15528A] text-white px-6 py-2 text-sm md:text-lg font-semibold cursor-pointer"
                >
                  {rsvpButtonText}
                </button>
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#15528A] pt-15 md:pt-80 lg:pt-50 3xl:pt-150 leading-normal md:leading-8 lg:leading-12 lg:w-140 w-70">
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

                <span className="eb-garamond font-normal text-xs md:text-sm lg:text-[22px] text-[#15528A]">
                  {rsvpButtonText}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
