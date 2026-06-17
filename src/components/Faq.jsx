'use client'
import { useState } from "react";
import { Headphones, ChevronDown, ChevronUp } from "lucide-react";


const faqs = [
  {
    question: "Can the preview image be changed after the link is generated?",
    answer:
      "No, once the invite link preview is generated, it cannot be modified. Please ensure all details are final before approval.",
  },
  {
    question: "Why is the invite preview not visible on WhatsApp?",
    answer:
      "WhatsApp caches metadata. It may take some time for the preview to appear after the link is generated.",
  },
  {
    question: "Why is music not autoplaying on Android?",
    answer:
      "Most Android browsers block autoplay audio unless initiated by user interaction.",
  },
  {
    question: "How long is the invite link valid?",
    answer:
      "Invite links remain active according to the validity period selected during setup.",
  },
  {
    question:
      "Can we create different links for different guest categories?",
    answer:
      "Yes, separate invite links can be created for different guest groups.",
  },
  {
    question: "How many URLs are included?",
    answer:
      "The number of URLs included depends on the selected package.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Revision limits vary according to the plan you have chosen.",
  },
];


export default function Faq (){
      const [openIndex, setOpenIndex] = useState(0);
    return (
        <>
        <div className="flex flex-col gap-4  md:items-center md:justify-between mt-24">
        <h2 className="mt-3 text-[28px] font-bold  md:text-[40px] font-georgia text-[#861E1D] text-center md:leading-none leading-9">
         Got Questions? We’re Here to Help
        </h2>
        <p className=" md:text-[18px] text-[16px] leading-6 text-slate-600 text-center font-poppins">
          Find answers to common questions about creating, customizing, and sharing your Invite Arc story-driven digital invites.
        </p>
        </div>
       
      <div className="mx-auto max-w-7xl px-4 pt-12">
        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
          {/* Left Card */}
          <div><div className="rounded-[40px] border border-[#b36a4a] bg-[#f8f4f1] p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8b1f1f] text-white">
              <Headphones size={28} />
            </div>

            <h2 className="mt-8 md:text-3xl text-2xl font-bold text-[#8b1f1f] font-georgia">
              Help Desk Support
            </h2>

            <p className="mt-6 text-[16px] leading-6 text-gray-600">
              Need help with your InviteArc invitation? Chat with our team for
              quick assistance.
            </p>

            <button className="mt-8 rounded-full bg-[#9f2222] px-8 py-2 text-[16px] font-semibold text-white transition  font-georgia cursor-pointer">
              Chat With Us
            </button>

            <p className="mt-8 text-[#b36a4a]">Or send us an email</p>
          </div></div>
          

          {/* FAQ */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-gray-300 bg-white"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? -1 : index)
                    }
                    className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="text-[18px] font-medium text-black font-georgia">
                      {index + 1}. {faq.question}
                    </span>

                    {isOpen ? (
                      <ChevronUp size={22} />
                    ) : (
                      <ChevronDown size={22} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-200 px-6 py-5 text-[16px] text-gray-600 font-poppins">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
   
        </>
    )
}