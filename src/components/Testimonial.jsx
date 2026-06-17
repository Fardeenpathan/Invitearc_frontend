"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Jasmeet & Manvi",
    image: "/images/couple1.jpg",
    text: "Creating our invite was quick, simple, and looked far better than printed cards.",
  },
  {
    id: 2,
    name: "Rahul & Preeti",
    image: "/images/couple2.jpg",
    text: "One link, all details - Invite Arc made our celebration planning smooth and modern.",
  },
  {
    id: 3,
    name: "Ankur & Kajal",
    image: "/images/couple3.jpg",
    text: "An invitation that few refuse and that very few forget. Just the type that people recall.",
  },
  {
    id: 4,
    name: "Amit & Riya",
    image: "/images/couple4.jpg",
    text: "Beautiful design and very easy to share with all our guests.",
  },
  {
    id: 5,
    name: "Karan & Simran",
    image: "/images/couple5.jpg",
    text: "The RSVP feature saved us so much time and effort.",
  },
];

export default function Testimonials() {
  return (
    <section>
        <div className="flex flex-col gap-4  md:items-center md:justify-between mt-10 mb-12">
        <h2 className="mt-3 text-[28px] font-bold  md:text-[40px] font-georgia text-[#861E1D] text-center md:leading-none leading-9">
         Testimonials
        </h2>
        <p className=" md:text-[18px] text-[16px] leading-6 text-slate-600 text-center font-poppins">
          See what our customers say about InviteArc, and how Invite Arc – invites made their celebrations easier.
        </p>
        </div>
      <div className="">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-14"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative bg-white rounded-3xl shadow-lg px-8 py-10 text-center  overflow-hidden mt-6 mb-12">
                
                {/* Quote Corner */}
                <div className="absolute top-0 right-0 w-20  bg-[#8B1E1E] rounded-bl-full flex items-start justify-center">
                  <span className="text-white text-4xl mt-1">
                    ❞
                  </span>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-2xl font-serif font-semibold text-black font-georgia">
                  {item.name}
                </h3>

                {/* Stars */}
                <div className="flex justify-center gap-1 text-[#8B1E1E] text-lg my-5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-500 leading-6 text-[16px] font-poppins">
                  {item.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination Style */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 0px !important;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cfcfcf;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: #666;
        }
      `}</style>
    </section>
  );
}