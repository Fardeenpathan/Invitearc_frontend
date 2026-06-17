"use client";
import Link from "next/link";
export default function TraditionalInvites() {
  return (
    <>
      <div className="flex flex-col gap-4  md:items-center md:justify-between mt-24">
        <h2 className="mt-3 text-[28px] font-bold  md:text-[40px] font-georgia text-[#861E1D] text-center md:leading-none leading-9">
          What Traditional Invites Can’t Do, InviteArc Can
        </h2>
        <p className=" md:text-[18px] text-[16px] leading-6 text-slate-600 text-center font-poppins">
          See how your invite can go from a single message to a complete
          experience – without printing, re-sending, or extra effort.
        </p>

        <div className="md:max-w-5xl md:mx-auto md:px-6">
          {/* Header */}
          <div className="grid grid-cols-3 items-center text-center mt-10 md:gap-32 gap-14">
            <div></div>

            <h2 className="md:text-[28px] text-[18px] font-semibold text-black font-georgia">
              Printed Cards
            </h2>

            <div>
              <img
                src="/assets/INLOGO.png"
                alt="InviteArc"
                className="md:h-20 mx-auto h-14"
              />
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-0">
            <div className="grid grid-cols-3 items-center py-6 border-b border-gray-300 md:gap-66 gap-14">
              <div className="flex items-center md:gap-3 text-2xl">
                <span>₹ </span>
                <span className="md:text-2xl text-[18px] font-georgia">
                  Cost
                </span>
              </div>

              <div className="md:text-2xl text-[18px] font-georgia">High</div>

              <div className="md:text-2xl text-[18px] font-semibold font-georgia">
                Low
              </div>
            </div>

            <div className="grid grid-cols-3 items-center py-6 border-b border-gray-300 md:gap-66 gap-14">
              <div className="flex items-center gap-3 text-2xl">
                <span>✎</span>
                <span className="md:text-2xl text-[18px] font-georgia">
                  Editing
                </span>
              </div>

              <div className="md:text-2xl text-[18px] font-georgia">
                Limited
              </div>

              <div className="md:text-2xl text-[18px] font-semibold font-georgia">
                Easy
              </div>
            </div>

            <div className="grid grid-cols-3 items-center py-6 border-b border-gray-300 md:gap-66 gap-14">
              <div className="flex items-center gap-3 text-2xl">
                <span>☝</span>
                <span className="md:text-2xl text-[18px] font-georgia">
                  Touch
                </span>
              </div>

              <div className="md:text-2xl text-[18px] font-georgia">Static</div>

              <div className="md:text-2xl text-[18px] font-semibold font-georgia">
                Responsive
              </div>
            </div>

            <div className="grid grid-cols-3 items-center py-6 border-b border-gray-300 md:gap-66 gap-14">
              <div className="flex items-center gap-3 text-2xl">
                <span>↻</span>
                <span className="md:text-2xl text-[20px] font-georgia">
                  Updating
                </span>
              </div>

              <div className="md:text-2xl text-[20px] font-georgia">
                Impossible
              </div>

              <div className="md:text-2xl text-[20px] font-semibold font-georgia">
                Instant
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-14">
            <Link
              href="#template"
              className="bg-[#8B1E1E] hover:bg-[#751818] text-white px-6 py-2.5 rounded-full font-semibold text-[16px] transition font-georgia"
            >
              Choose a Template
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
