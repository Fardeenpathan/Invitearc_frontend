import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { assets } from "../assets";
import { useEffect, useState } from "react";
export default function CoupleMessage() {
  const [bgImage, setBgImage] = useState(assets.desktop_bg);
  const testimonial = [
    {
      img: "/assets/one.webp",
    },

    {
      img: "/assets/two.webp",
    },

    {
      img: "/assets/three.webp",
    },

    {
      img: "/assets/four.webp",
    },

    {
      img: "/assets/five.webp",
    },

    {
      img: "/assets/one.webp",
    },

    {
      img: "/assets/two.webp",
    },

    {
      img: "/assets/three.webp",
    },
  ];

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
          INTRODUCING
        </h1>
        <h2 className="parisienne-regular text-5xl md:text-6xl lg:text-[100px] text-center text-[#FFF097] px-3 md:px-17 lg:px-53 3xl:px-103 mt-12 lg:mt-36 leading-5 md:leading-tight">
          The Couple
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
            {testimonial.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-120 md:h-90 lg:h-135 3xl:h-175 object-cover rounded-[60px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <h1 className="parisienne-regular text-5xl md:text-6xl lg:text-[100px] text-center text-[#FFF097] pt-16 md:pt-20 lg:pt-32 leading-tight">
          A Guide For <br /> Guests
        </h1>

        <div className="flex justify-center mt-20 pb-24 md:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-50 3xl:gap-60">
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src="/assets/weather.png"
                alt="weather"
                className="lg:h-26 lg:w-28 h-26 w-32 "
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#FFF097] mt-2">
                Weather
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] text-[#FFF097] mt-1 md:leading-5">
                A delighful day awaits <br />
                with pleasant weather <br />
                and mild temperatures.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src="/assets/staff.png"
                alt="drive"
                className="md:h-26 lg:h-27 lg:w-21 h-36 w-29"
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#FFF097] mt-2">
                Staff
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] md:leading-5 text-[#FFF097] mt-1">
                For those traveling from afar, <br />
                Royal Orchid Suites offers a <br />
                comfortable stay nearby.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src="/assets/parking.png"
                alt="car"
                className="lg:h-27 lg:w-30 h-26 w-32 "
              />
              <h2 className="eb-garamond font-normal text-[40px] md:text-3xl lg:text-[42px] text-[#FFF097] mt-2">
                Parking
              </h2>
              <p className="eb-garamond font-medium text-[14px] lg:text-[15px] md:leading-5 text-[#FFF097] mt-1">
                Guests can enjoy hassle <br />
                free parking facilities <br />
                available at the venue.
              </p>
            </div>
          </div>
        </div>

        <h2 className="eb-garamond font-normal text-xl md:text-xl lg:text-[32px] text-center text-[#FFF097] px-4 md:px-20 lg:px-56 3xl:px-107 pt-10 md:pt-30 lg:pt-36 3xl:pt-16 mt-2 lg:mt-4 lg:leading-tight">
          Your presence means the world to us. To make your experience{" "}
          <br className="hidden md:block" />
          effortless and enjoyable, we've gathered a few useful details below.
        </h2>

        <div className="flex flex-col items-center md:mt-2 lg:mt-0 gap-10 3xl:gap-12">
          <div className="">
            <h2 className="eb-garamond font-normal text-center text-2xl md:text-3xl lg:text-[54px] text-[#FFF097] pt-43 md:pt-71 lg:pt-72 3xl:pt-150 leading-normal md:leading-8 lg:leading-16">
              Awaiting the pleasure <br /> of Your Company
            </h2>
            <div className="flex flex-col-1 md:gap-0 gap-0 lg:gap-0 justify-center items-center md:not-first:mt-4">
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
