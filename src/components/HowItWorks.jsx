"use client"

export default function HowItWorks () {
    return(
        <>
       <div className="flex flex-col gap-4  md:items-center md:justify-between mt-24">
        <h2 className="mt-3 text-[28px] font-bold  md:text-[40px] font-georgia text-[#861E1D] text-center md:leading-none leading-9">
         How It Works
        </h2>
        <p className=" md:text-[18px] text-[16px] leading-6 text-slate-600 text-center font-poppins">
          Whole process – simplified in 3 simple steps:
        </p>

        <section
          id="features"
          className="px-6 py-20 sm:px-10 lg:px-0"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <img
                src="/assets/how1.jpg"
                alt="InviteArc"
                className="rounded-3xl"
              />

               <img
                src="/assets/how2.png"
                alt="InviteArc"
                className="rounded-3xl shadow"
              />
               <img
                src="/assets/how3.png"
                alt="InviteArc"
                className="rounded-3xl"
              />
                
                
                </div></div></section>
        </div>
        </>
    )
}