"use client";
import { useEffect, useState } from "react";
import { assets } from "../assets";
export default function MarriageCountdown() {
    const TARGET_DATE = new Date("2026-06-09").getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = TARGET_DATE - now;
            if (diff <= 0) {
                setTimeLeft({ days: 30, hours: 10, minutes: 30 });
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) / (1000 * 60)
            );

            setTimeLeft({ days, hours, minutes });
        };

        updateCountdown(); // first run
        const interval = setInterval(updateCountdown, 60000); // every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <>
         <div
  className="bg-cover bg-no-repeat"
  style={{
    backgroundImage: `url(${assets.bg_four})`,
  }}
>
                <div className="flex flex-col h-50 md:h-89 lg:h-165 3xl:h-210 md:gap-3 lg::gap-8 3xl:gap-8">
                    <h2 className="parisienne-regular text-2xl md:text-4xl lg:text-[60px] text-center text-[#15528A] pt-4 md:pt-11 lg:pt-42 3xl:pt-55">The Journey Begins</h2>
                    <p className="eb-garamond font-medium text-xs md:text-xl lg:text-[32px] text-[#15528A] mt-4 text-center px-6 md:px-25 lg:px-65 3xl:px-120">
                        Surrounded by family and friends, we can't wait to celebrate <br />
                        this beautiful moment with you.
                    </p> 
                    <h2 className="eb-garamond font-normal text-xl md:text-4xl lg:text-[52px] text-center text-[#15528A]"> {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M</h2>
                    
                    <div className="flex flex-col-1 gap-4 justify-center items-center mt-2 md:mt-0">
                       <a href="https://www.instagram.com/theinvitearc/" target="_blank"><img src={assets.instagram} alt="icon" className="w-5 h-5 md:w-10 md:h-10"/></a>
                       
                    </div>
                    <p className="eb-garamond font-medium text-xs md:text-xl lg:text-[32px] text-[#15528A] mt-2 md:mt-0 text-center">
                        © <a href="https://invitearc.com/" target="_blank">InviteArc</a> 2026 </p>
                </div>
            </div>
        </>
    );
} 