"use client";
import { FaWhatsapp } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";

export default function RsvpEditor({
  editorData = {},
  rsvpFields = [],
  updateField,
  addRsvpField,
  removeRsvpField,
  updateRsvpField,
  formatFieldLabel,
}) {

  const selectedMode = editorData.rsvpMode || "whatsapp";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800 font-georgia">RSVP option</p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateField("rsvpMode", "whatsapp")}
            className={`flex flex-col items-start gap-2 rounded-2xl p-4 transition border cursor-pointer ${
              selectedMode === "whatsapp"
                ? "border-[#861E1D] bg-[#fff5f5]"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <FaWhatsapp />

                <div className="text-sm font-semibold text-slate-900">WhatsApp</div>
             
            </div>
          </button>

          <button
            type="button"
            onClick={() => updateField("rsvpMode", "form")}
            className={`flex flex-col items-start gap-2 rounded-2xl p-4 transition border cursor-pointer ${
              selectedMode === "form"
                ? "border-[#861E1D] bg-[#fff5f5]"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* <svg className="h-6 w-6 text-[#861E1D]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 4H8a2 2 0 0 0-2 2v12" />
              </svg> */}
              <SiGoogleforms />

              <div>
                <div className="text-sm font-semibold text-slate-900">Form</div>
                {/* <div className="text-xs text-slate-500">Redirect guests to a Google Form to RSVP</div> */}
              </div>
            </div>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800 font-georgia">Section heading</label>
        <input
          value={editorData.rsvpSectionHeading || ""}
          onChange={(e) => updateField("rsvpSectionHeading", e.target.value)}
          placeholder="Looking Forward to Seeing You"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900"
        />
      </div>

      {/* <div>
        <label className="block text-sm font-semibold text-slate-800 font-georgia">Subtext</label>
        <textarea
          value={editorData.rsvpSubtext || ""}
          onChange={(e) => updateField("rsvpSubtext", e.target.value)}
          placeholder="Short message shown above the button"
          rows={4}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900"
        />
      </div> */}

      {selectedMode === "whatsapp" && (
        <div>
          <label className="block text-sm font-semibold text-slate-800 font-georgia">{formatFieldLabel("WhatsApp RSVP number")}</label>
          <input
            value={editorData.whatsappNumber || ""}
            onChange={(event) => updateField("whatsappNumber", event.target.value)}
            placeholder="+911234567890"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900"
          />
        </div>
      )}

      {selectedMode === "form" && (
        <div>
          <label className="block text-sm font-semibold text-slate-800 font-georgia">Google form link</label>
          <input
            value={editorData.rsvpGoogleFormLink || ""}
            onChange={(event) => updateField("rsvpGoogleFormLink", event.target.value)}
            placeholder="Paste your Google Form link here"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-800 font-georgia">Button text</label>
        <input
          value={editorData.rsvpButtonText || ""}
          onChange={(e) => updateField("rsvpButtonText", e.target.value)}
          placeholder="Yes, I'll be there"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900"
        />
      </div>

      {/* No inline form fields editor — only Google Form link is supported */}
    </div>
  );
}
