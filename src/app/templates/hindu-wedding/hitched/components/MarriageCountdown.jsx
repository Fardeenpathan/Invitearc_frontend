"use client";
import { useEffect, useState } from "react";
import { assets } from "../assets";


export default function MarriageCountdown() {
    const TARGET_DATE = new Date("2026-09-21").getTime();
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
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
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
            <div className="`bg-[url('/assets/countdown_bg.jpg')]` bg-cover bg-no-repeat pb-12 md:pb-50 3xl:pb-40" style={{
          backgroundImage: `url(${assets.countdown_bg})`,
        }}>
                <div className="lg:h-130 md:h-75 h-130">
                    <h2 className="lg:text-[40px] text-4xl text-center text-[#FFF5B9] lg:pt-42 pt-12 font-Cormorant-upright">The countdown begins</h2> 
                      <h2 className="lg:text-[40px] text-2xl text-center text-[#FFF5B9] font-Cormorant-upright"> {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M</h2>
                    <p className="lg:text-[22px] text-[20px] text-[#FFF5B9] mt-4 text-center lg:px-100 md:px-25 px-10 font-Cormorant-upright">
                        Our families are excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.
                    </p>
                     <p className="lg:text-[22px] text-[20px] text-[#FFF5B9] mt-4 text-center lg:px-100 md:px-25 px-10 font-Cormorant-upright">
                        With Best Compliments, <br/>Kanta & Kamal,<br/> Kanchan & Sanjay,<br/> Rohit & Harsh
                    </p>
                    <div className="flex flex-col-1 gap-4 justify-center items-center mt-4">
                       <a href="https://www.instagram.com/theinvitearc/" target="_blank"><img src={assets.instagram} alt="" className="h-10 w-10"/></a>
                        
                    </div>
                    <p className="lg:text-[22px] text-xl text-[#FFF5B9] mt-6 text-center font-Cormorant-upright">
                        © <a href="https://invitearc.com/" target="_blank">InviteArc</a> 2026 </p>
                </div>
            </div>
        </>
    );
} 8