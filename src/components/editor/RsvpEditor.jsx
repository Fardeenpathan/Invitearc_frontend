"use client";

export default function RsvpEditor({
  editorData = {},
  rsvpFields = [],
  updateField,
  addRsvpField,
  removeRsvpField,
  updateRsvpField,
  formatFieldLabel,
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-800">
          {formatFieldLabel("WhatsApp RSVP number")}
        </label>
        <input
          value={editorData.whatsappNumber || ""}
          onChange={(event) =>
            updateField("whatsappNumber", event.target.value)
          }
          placeholder="+911234567890"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">
            RSVP form fields
          </p>
          <button
            type="button"
            onClick={addRsvpField}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold cursor-pointer text-slate-700 hover:bg-slate-100"
          >
            Add field
          </button>
        </div>
        {rsvpFields.length > 0 ? (
          rsvpFields.map((field, index) => (
            <div
              key={index}
              className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-800">
                  Field {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeRsvpField(index)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  {formatFieldLabel("Label", field.label)}
                </label>
                <input
                  value={field.label || ""}
                  onChange={(event) =>
                    updateRsvpField(index, "label", event.target.value)
                  }
                  placeholder="Label"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  {formatFieldLabel("Type", field.type || "text")}
                </label>
                <input
                  value={field.type || "text"}
                  onChange={(event) =>
                    updateRsvpField(index, "type", event.target.value)
                  }
                  placeholder="Type (text, email, tel)"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No RSVP form fields added yet.
          </p>
        )}
      </div>
    </div>
  );
}
