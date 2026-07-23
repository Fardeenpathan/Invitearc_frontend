import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { assets } from "../assets";

export default function CoupleMessage({ data }) {


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
          assets.coupleimage1,
          assets.coupleimage2,
          assets.coupleimage3,
          assets.coupleimage4,
          assets.coupleimage5,
          
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


  return (
    <div
      className="bg-[url('/assets/bg_second.webp')] bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${assets.bg_second})` }}
    >
      <div className="3xl:h-1017 lg:h-982 md:h-607 h-652">
        <h1 className="font-eb-garamond font-medium text-base md:text-2xl lg:text-[38px] text-center text-[#FFF4B9] lg:pt-40 pt-20">
          {coupleTitle}
        </h1>
        <h2 className="font-parisienne-regular font-normal text-5xl md:text-6xl lg:text-[100px] text-center text-[#FFF4B9] px-3 md:px-17 lg:px-51 3xl:px-103 mt-12 lg:mt-24 leading-5 md:leading-tight">
          {coupleDescription}
        </h2>
        <div className="md:mt-32 mt-26 lg:mt-44 flex justify-center items-center">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            centeredSlides={true}
            pagination={{ clickable: true }}
            className="w-full py-12 overflow-visible"
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

        <h1 className="font-parisienne-regular text-5xl md:text-6xl lg:text-[100px] text-center text-[#FFF4B9] pt-20 md:pt-35 lg:pt-30 3xl:pt-20 leading-tight">
          {thingsToKnowTitle}
        </h1>

        <div className="flex justify-center mt-20 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-20 lg:gap-0">
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.weather}
                alt="weather"
                className="lg:h-26 lg:w-28 h-26 w-32 "
              />
              <h2 className="font-eb-garamond font-medium text-[50px] md:text-3xl lg:text-[42px] text-[#FFF4B9] mt-2">
                {weatherTitle}
              </h2>
              <p className="font-eb-garamond font-medium text-sm lg:text-[15px] text-[#FFF4B9] mt-1 md:leading-5">
                {weatherDetails}
              </p>
            </div>

            <hr className="hidden lg:block lg:rotate-90 lg:w-65 lg:border-2 border-[#FFF4B9] lg:my-28" />
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.staff}
                alt="staff"
                className="md:h-26 lg:h-27 lg:w-21 h-34 w-29"
              />
              <h2 className="font-eb-garamond font-medium text-[50px] md:text-3xl lg:text-[42px] text-[#FFF4B9] mt-2">
                {StaffTitle}
              </h2>
              <p className="font-eb-garamond font-medium text-sm lg:text-[15px] text-[#FFF4B9] mt-1 md:leading-5">
                {StaffDetails}
              </p>
            </div>

            <hr className="hidden lg:block lg:rotate-90 lg:w-65 lg:border-2 border-[#FFF4B9] lg:my-28" />
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={assets.parking}
                alt="car"
                className="lg:h-27 lg:w-30 h-26 w-32 "
              />
              <h2 className="font-eb-garamond font-medium text-[50px] md:text-3xl lg:text-[42px] text-[#FFF4B9] mt-2">
                {parkingTitle}
              </h2>
              <p className="font-eb-garamond font-medium text-sm lg:text-[15px] text-[#FFF4B9] mt-1 md:leading-5">
                {parkingDetails}
              </p>
            </div>
          </div>
        </div>

        <h2
          className="font-eb-garamond font-normal text-xl md:text-2xl lg:text-[32px] text-center text-[#FFF4B9] 
                         px-4 md:px-20 lg:px-56 3xl:px-107 pt-4 md:pt-10 lg:pt-30 3xl:pt-46 mt-2 lg:mt-4 lg:leading-tight"
        >
          {coupleMessageThingsToKnowDescription}
        </h2>

        <div className="hidden md:block md:flex items-center md:mt-49 lg:mt-70 gap-0">
          <img
            src={assets.couple_img2}
            alt="couple"
            className="w-70 h-90 md:w-120 md:h-140 lg:w-260 lg:h-307 3xl:w-300 3xl:h-336 object-cover "
          />
          {/* <div className="">
            <h2 className="font-eb-garamond font-medium text-center text-xl md:text-3xl lg:text-5xl text-[#FFF4B9] pt-26 md:pt-20 lg:pt-40 3xl:pt-150 leading-6 md:leading-10 lg:leading-14">
              Awaiting the Pleasure <br/> of Your Company
            </h2>
            <div className="flex flex-col-1 justify-center items-center md:not-first:mt-0">
              <a href="#" target="_blank">
                <img src={assets.whatsapp} alt="whatsapp" className="h-6 w-6 md:w-9 md:h-9 lg:w-10.5 lg:h-10.5 3xl:w-20 3xl:h-20 mt-1" />
              </a>
              <h2 className="font-eb-garamond font-medium text-center text-xs md:text-sm lg:text-[22px] 3xl:text-2xl text-[#FFF4B9]">
                Share Your RSVP
              </h2>
            </div>
            </div> */}
          {rsvpMode === "form" ? (
            <div className="flex flex-col items-center text-center">
              <h2 className="font-eb-garamond font-medium text-center text-xl md:text-3xl lg:text-5xl text-[#FFF4B9] pt-26 md:pt-20 lg:pt-40 3xl:pt-150 leading-6 md:leading-10 lg:leading-14">
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
              <h2 className="font-eb-garamond font-medium text-center text-xl md:text-3xl lg:text-5xl text-[#FFF4B9] pt-26 md:pt-20 lg:pt-40 3xl:pt-150 leading-6 md:leading-10 lg:leading-14">
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

                <span className="font-eb-garamond font-medium text-center text-xs md:text-sm lg:text-[22px] 3xl:text-2xl text-[#FFF4B9]">
                  {rsvpButtonText}
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Mobile responsive */}
        <div className="block md:hidden gap-0">
          <div className="text-center">
            {/* <h2 className="font-eb-garamond font-medium text-center text-3xl text-[#FFF5B9] pt-34 leading-10">
              Awaiting the Pleasure <br/> of Your Company
            </h2> */}
            <div className="flex flex-col-1 md:gap-4 gap-0 lg:gap-0 justify-center items-center md:not-first:mt-4">
              {/* <a href="#" target="_blank">
                <img src="/assets/whatsapp.webp" alt="" className="h-7.5 w-7.5 mt-1" />
              </a>
              <h2 className="font-eb-garamond font-medium text-center text-lg text-[#FFF5B9]">
                Share Your RSVP
              </h2> */}
              {/* {rsvpMode === "form" ? (
                                      <div className="flex flex-col items-center text-center">
                                        <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#FFF097]  pt-5 md:pt-80 lg:pt-50 3xl:pt-150 leading-normal md:leading-8 lg:leading-12 lg:w-140 w-70">
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
                                        <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#FFF097] pt-5 md:pt-30 lg:pt-50 3xl:pt-150 leading-normal md:leading-8 lg:leading-12 lg:w-140 w-70">
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
                                    )} */}
            </div>
          </div>
          <img
            src={assets.couple_img2}
            alt="couple"
            className="w-108 h-120 md:w-100 md:h-128 lg:w-285 lg:h-320 object-cover mt-35"
          />
        </div>
      </div>
    </div>
  );
}
