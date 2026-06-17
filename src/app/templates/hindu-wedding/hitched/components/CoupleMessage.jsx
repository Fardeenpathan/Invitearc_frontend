"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {assets} from "../assets";

export default function CoupleMessage() {
const [coupleBg, setCoupleBg] = useState(assets.couple_bgt)


  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth >= 1536) {
        // Desktop Large
        setCoupleBg(assets.couple_bgt);
      } else if (window.innerWidth >= 768) {
        // Tablet/Desktop
        setCoupleBg(assets.couple_bgt);
      } else {
        // Mobile
        setCoupleBg(assets.couplemobile_bg);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);


  return (
    <>
      <div className="md:bg-[url('/assets/couple_bgt.png')] bg-[url('/assets/couple_mobilebgn.webp')] bg-cover bg-no-repeat" style={{
          backgroundImage: `url(${coupleBg})`,
        }}>
        <div className="lg:h-850 md:h-550 h-610 pt-2 flex flex-col  items-center">
          <h1 className="lg:text-[40px] md:text-3xl text-[32px] text-center text-[#FFF5B9] lg:pt-36 pt-12 font-Cormorant-upright px-6 leading-12">
            A message from the couple  
          </h1>
          <h2 className="lg:text-[30px] text-[18px]  text-center text-[#FFF5B9] lg:px-60 px-6 lg:mt-28 mt-12 font-Cormorant-upright lg:leading-8 md:leading-8 leading-6">
            From different traditions to one beautiful journey, join us as we
            celebrate love, laughter, and forever. This moment wouldn’t be the
            same without the people we love most. Thank you for your love,
            blessings, and for making our journey even more special, we’re so
            excited to celebrate together!
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
              <SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773722874/Image2_fdxmez.png" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773722870/Image1_wvcres.webp" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773723233/Image3_wntz2h.png"/>
              </SwiperSlide>

              <SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773723242/Image4_u4mg9j.webp" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773723250/Image5_ziugxm.png" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773722874/Image2_fdxmez.png" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773723233/Image3_wntz2h.png" />
              </SwiperSlide>
<SwiperSlide>
                <img src="https://res.cloudinary.com/dx2di0mvx/image/upload/v1773723242/Image4_u4mg9j.webp" />
              </SwiperSlide>

            </Swiper>
            
          </div>

          <h1 className=" lg:text-[100px] text-[60px] md:text-3xl text-center text-[#FFF5B9] lg:pt-32 pt-12 font-Cormorant-upright">
            Things to <br /> know
          </h1>
          <h2 className="lg:text-[30px] text-[18px] text-center text-[#FFF5B9] lg:pt-6 lg:px-60 px-6 lg:mt-4 mt-2 font-cormorant">
            To help you feel at ease and enjoy every moment of the celebrations,
            we’ve gathered a few thoughtful details we’d love for you to know
            before the big day.
          </h2>
          <div className="flex justify-center mt-10 md:pb-24 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 lg:gap-24 gap-10 sm:gap-16">
              <div className="flex flex-col items-center justify-center text-center md:mt-15">
                <img
                  src={assets.location}
                  alt="car"
                  className="lg:h-20 lg:w-24 h-26 w-32 "
                />
                <h2 className="lg:text-[32px] text-[50px] text-[#FFF5B9] mt-2 font-Cormorant-upright">
                  Location
                </h2>
                <span className="md:text-[20px] text-[16px] md:leading-5 text-[#FFF5B9] mt-1 font-cormorant">
            
                  The Central Park Hotel
                </span>
                <p className="md:text-[18px] text-[14px] md:leading-5 text-[#FFF5B9] mt-1 font-cormorant">
                  Bund Garden Road,
                  <br /> Agarkar Nagar, Pune, <br /> Maharashtra, 411001
                </p>
                <a
                  href="https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic"
                  className="text-[#FFF5B9] underline md:text-sm md:text-[16px] text-[14px] mt-2 font-cormorant"
                  target="_blank"
                >
                  See the route
                </a>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={assets.weather}
                  alt="weather"
                  className="lg:h-20 lg:w-24 h-26 w-32 "
                />
                <h2 className="lg:text-[32px] text-[50px] text-[#FFF5B9] mt-2 font-Cormorant-upright">
                  Weather
                </h2>
                <p className="md:text-[18px] text-[14px] text-[#FFF5B9] mt-1 font-cormorant md:leading-5">
                  Clouds may drop by uninvited, <br />
                  but so will great vibes and better dance moves.
                  <br />A little rain never stopped a good celebration anyway.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={assets.car}
                  alt="car"
                  className="lg:h-20 lg:w-24 h-26 w-32 "
                />
                <h2 className="lg:text-[32px] text-[50px] text-[#FFF5B9] mt-2 font-Cormorant-upright">
                  Parking
                </h2>
                <p className="md:text-[18px] text-[14px] md:leading-5 text-[#FFF5B9] mt-1 font-cormorant">
                  Valet parking for all our <br />
                  guests will be available <br />
                  at the venue.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center 3xl:mt-0 lg:mt-20 lg:ml-140 ml-34 md:ml-50">
            <h2 className="lg:text-5xl text-[22px] md:text-[30px] text-center text-[#FFF5B9] lg:pt-63 pt-1 font-Cormorant-upright md:leading-12 leading-6">
              Looking Forward to <br /> Seeing You
            </h2>
            {/* <div className="flex flex-col-1 md:gap-4 gap-2 justify-center items-center md:not-first:mt-4 ">
              <a href="https://wa.link/5ad8dn" target="_blank">
                <img src="/assets/whatsapp_n.png" alt="" className="lg:h-10 lg:w-10 h-4 w-4" />
              </a>
              <h2 className="lg:text-3xl md:text-xl text-[16px] text-center text-[#FFF5B9]  font-Cormorant-upright">
                Click on the Whatsapp icon to RSVP
              </h2>
            </div> */}
            <div className="flex md:gap-4 gap-2 justify-center items-start md:items-center md:mt-4">
              <a href="https://wa.me/919876543210" target="_blank">
                <img
                  src={assets.whatsapp}
                  alt=""
                  className="lg:h-10 lg:w-10 h-4 w-4 mt-1 md:mt-0"
                />
              </a>

              <h2 className="lg:text-3xl md:text-xl text-[16px] text-[#FFF5B9] font-Cormorant-upright leading-tight">
                Click on the Whatsapp icon to RSVP
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
