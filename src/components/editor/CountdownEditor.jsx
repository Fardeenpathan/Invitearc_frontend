"use client";

export default function CountdownEditor({
  editorData = {},
  updateCoupleMessageField,
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Marriage Countdown title
        </label>
        <input
          value={editorData.marriageCountdownTitle || ""}
          onChange={(event) =>
            updateCoupleMessageField(
              "marriageCountdownTitle",
              event.target.value,
            )
          }
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Marriage Countdown target date
        </label>
        <input
          type="date"
          value={editorData.marriageCountdownDate || ""}
          onChange={(event) =>
            updateCoupleMessageField(
              "marriageCountdownDate",
              event.target.value,
            )
          }
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Marriage Countdown description
        </label>
        <textarea
          rows={5}
          value={editorData.marriageCountdownDescription || ""}
          onChange={(event) =>
            updateCoupleMessageField(
              "marriageCountdownDescription",
              event.target.value,
            )
          }
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>
    </div>
  );
}
