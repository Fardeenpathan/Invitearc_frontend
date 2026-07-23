"use client";
import { useEffect, useState } from "react";
import {assets} from "../assets";


export default function MarriageCountdown({data}) {
      const targetDate = data?.marriageCountdownDate || "2026-09-21";
    const TARGET_DATE = new Date(targetDate).getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    // useEffect(() => {
    //     const updateCountdown = () => {
    //         const now = new Date().getTime();
    //         const diff = TARGET_DATE - now;
    //         if (diff <= 0) {
    //             setTimeLeft({ days: 30, hours: 6, minutes: 30 });
    //             return;
    //         }
    //         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    //         const hours = Math.floor(
    //             (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //         );
    //         const minutes = Math.floor(
    //             (diff % (1000 * 60 * 60)) / (1000 * 60)
    //         );

    //         setTimeLeft({ days, hours, minutes });
    //     };

    //     updateCountdown(); // first run
    //     const interval = setInterval(updateCountdown, 60000); // every minute

    //     return () => clearInterval(interval);
    // }, []);

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
    }, [targetDate]);


    const title = data?.marriageCountdownTitle || "The Journey Begins"; 
    const description =
      data?.marriageCountdownDescription ||
      "Surrounded by family and friends, we can't wait to celebrate this beautiful moment with you.";

    return (
        <>
            <div className="bg-[url('/assets/bg_last.webp')] bg-cover bg-no-repeat pb-12" style={{backgroundImage: `url(${assets.bg_last})`,}}>
                <div className="flex flex-col items-center h-65 md:h-100 lg:h-170 gap-2 md:gap-4">
                    <h2 className="font-parisienne-regular font-normal text-2xl md:text-4xl lg:text-6xl text-center text-[#FFF4B9] pt-12 md:pt-18 lg:pt-20 3xl:pt-45">{title}</h2>
                    <p className="font-eb-garamond font-medium text-[#FFF4B9] text-center text-xs md:text-xl lg:text-[28px] mt-2">
                        {description}
                    </p>
                    <hr className="w-42 md:w-66 lg:w-94 border lg:border-2 border-[#FFF4B9] my-1 md:my-1 lg:my-2" />
                    <h2 className="font-eb-garamond font-normal text-2xl md:text-4xl lg:text-[62px] text-center text-[#FFF4B9]"> {timeLeft.days}D - {timeLeft.hours}H - {timeLeft.minutes}M</h2>
                    <div className="flex flex-col-1 gap-4 justify-center items-center mt-2">
                       <a href="https://www.instagram.com/theinvitearc/" target="_blank"><img src={assets.instagram} alt="" className="w-7.5 h-7.5 md:w-10 md:h-10 lg:w-12 lg:h-12"/></a>
                       
                    </div>
                    
                    <p className="font-eb-garamond font-medium text-xs md:text-sm lg:text-base text-[#FFF5B9] mt-2 text-center"> 
                        © <a href="https://invitearc.com/" target="_blank">InviteArc</a> 2026 </p>
                </div>
            </div>
        </>
    );
} 8