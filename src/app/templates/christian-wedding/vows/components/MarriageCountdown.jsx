"use client";
import { useEffect, useState } from "react";
import {assets} from "../assets";

export default function MarriageCountdown({data}) {
        const [coupleBg, setCoupleBg] = useState(assets.couple_bg);
        const targetDate = data?.marriageCountdownDate || "2026-09-21";
    const TARGET_DATE = new Date(targetDate).getTime();
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
    }, [targetDate]);


    const title = data?.marriageCountdownTitle || "The Journey Begins"; 
    const description =
      data?.marriageCountdownDescription ||
      "Surrounded by family and friends, we can't wait to celebrate this beautiful moment with you.";

    return (
        <>
            <div className=" bg-cover bg-no-repeat pb-12" style={{backgroundImage: `url(${assets.countdown_bg})`,}}>
                <div className="flex flex-col justify-center items-center h-70 md:h-90 lg:h-125 3xl:h-115">
                    <h2 className="font-parisienne-regular text-2xl md:text-4xl lg:text-6xl text-center text-[#FFF097] pt-12 lg:pt-22">{title}</h2> 
                    <p className="font-eb-garamond font-medium text-base md:text-xl lg:text-[28px] text-[#FFF097] mt-4 lg:mt-6 text-center lg:leading-8">
                        {description}
                    </p>
                    <hr className="w-42 md:w-66 lg:w-94 border lg:border-2 border-[#FFF097] my-3 md:my-4 lg:my-4" />
                    <h2 className="font-eb-garamond font-medium text-2xl md:text-4xl lg:text-[80px] text-center text-[#FFF097]"> {timeLeft.days}D - {timeLeft.hours}H - {timeLeft.minutes}M</h2>
                    <div className="flex flex-col-1 gap-4 justify-center items-center mt-4 lg:mt-6">
                       <a href="https://www.instagram.com/theinvitearc/" target="_blank"><img src={assets.instagram} alt="instagram" className="w-7.5 h-7.5 lg:w-10 lg:h-10"/></a>
                    </div>
                    <p className="font-eb-garamond font-medium text-xs md:text-sm lg:text-base mt-4 lg:mt-6 text-center text-[#FFF097]">
                        © <a href="https://invitearc.com/" target="_blank">InviteArc</a> 2026 </p>
                </div>
            </div>
        </>
    );
} 