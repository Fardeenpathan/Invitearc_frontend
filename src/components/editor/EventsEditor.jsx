"use client";
export default function EventsEditor({
  editorData,
  eventItems,
  eventFields,
  selectedEventIndex,
  setSelectedEventIndex,
  addEventItem,
  removeEventItem,
  updateEventField,
  handleEventImageUpload,
  handleEditFromThumbnail,
  formatFieldLabel,
}) {
  return (
 
      
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex justify-between">
                <h3 className="text-base font-semibold text-slate-900">
                  Events
                </h3>
                <button
                  type="button"
                  onClick={addEventItem}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Add event
                </button>
              </div>

              <p className="text-sm text-slate-600">
                Manage event images, details, and add or remove events.
              </p>
            </div>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-semibold text-slate-900 mb-2">
              Event Images
            </h4>
            <div className="flex gap-3 overflow-x-auto py-2">
              {(eventItems || []).length > 0 ? (
                eventItems.map((ev, idx) => (
                  <div key={idx} className="shrink-0 w-20">
                    <div className="h-20 w-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      {ev?.image ? (
                        <img
                          src={ev.image}
                          alt={ev.title_ceremony || `Event ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <label className="block text-center text-xs cursor-pointer text-slate-600">
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleEventImageUpload(idx, e)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleEditFromThumbnail(idx)}
                        className="text-xs text-slate-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  No events yet. Add an event to start configuring images and
                  details.
                </div>
              )}
            </div>
          </div>

          {selectedEventIndex !== null &&
            Array.isArray(editorData?.events) &&
            editorData.events[selectedEventIndex] && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Editing Event {selectedEventIndex + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedEventIndex(null)}
                    className="text-xs text-slate-600"
                  >
                    Close
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(eventFields.length > 0
                    ? eventFields
                    : Object.keys(
                        editorData.events[selectedEventIndex] || {},
                      ).map((name) => ({
                        name,
                        label: name
                          .replace(/([A-Z])/g, " $1")
                          .replace(/_/g, " ")
                          .replace(/^./, (str) => str.toUpperCase()),
                        type:
                          name === "venue_address" || name === "theme"
                            ? "textarea"
                            : "text",
                      }))
                  ).map((fieldDef) => {
                    const value =
                      (editorData.events[selectedEventIndex] || {})[
                        fieldDef.name
                      ] ?? "";
                    const isLargeInput =
                      fieldDef.type === "textarea" ||
                      (typeof value === "string" && value.length > 80);
                    return (
                      <div key={fieldDef.name} className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-800">
                          {formatFieldLabel(fieldDef.label, value)}
                        </label>
                        {isLargeInput ? (
                          <textarea
                            rows={3}
                            value={value}
                            onChange={(e) =>
                              updateEventField(
                                selectedEventIndex,
                                fieldDef.name,
                                e.target.value,
                              )
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900"
                          />
                        ) : (
                          <input
                            value={value}
                            onChange={(e) =>
                              updateEventField(
                                selectedEventIndex,
                                fieldDef.name,
                                e.target.value,
                              )
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {eventItems?.length > 0 && (
            <div className="space-y-4">
              {eventItems.map((event, index) => {
                const fields =
                  eventFields.length > 0
                    ? eventFields
                    : Object.keys(event || {}).map((name) => ({
                        name,
                        label: name
                          .replace(/([A-Z])/g, " $1")
                          .replace(/_/g, " ")
                          .replace(/^./, (str) => str.toUpperCase()),
                        type:
                          name === "venue_address" || name === "theme"
                            ? "textarea"
                            : "text",
                      }));
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Event {index + 1}
                        </p>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                          {event.title_ceremony || "Untitled event"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeEventItem(index)}
                          aria-label="Remove event"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-300 bg-white text-rose-600 hover:bg-rose-50"
                        >
                          ✕
                        </button>
                        <label className="inline-flex cursor-pointer items-center rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
                          Upload image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleEventImageUpload(index, e)}
                            className="hidden"
                          />
                        </label>
                        {event.imageFileName ? (
                          <p className="text-xs text-slate-500">
                            {event.imageFileName}
                          </p>
                        ) : event.image ? (
                          <p className="text-xs text-slate-500">
                            Image selected
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {event.image && (
                      <div className="mb-4 rounded-3xl border border-slate-200 bg-white p-3">
                        <img
                          src={event.image}
                          alt={`Event ${index + 1} preview`}
                          className="h-40 w-full rounded-3xl object-cover"
                        />
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      {fields.map((fieldDef) => {
                        const value = event[fieldDef.name] ?? "";
                        const isLargeInput =
                          fieldDef.type === "textarea" ||
                          (typeof value === "string" && value.length > 80);
                        return (
                          <div key={fieldDef.name} className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-800">
                              {formatFieldLabel(fieldDef.label, value)}
                            </label>
                            {isLargeInput ? (
                              <textarea
                                rows={3}
                                value={value}
                                onChange={(event) =>
                                  updateEventField(
                                    index,
                                    fieldDef.name,
                                    event.target.value,
                                  )
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                              />
                            ) : (
                              <input
                                value={value}
                                onChange={(event) =>
                                  updateEventField(
                                    index,
                                    fieldDef.name,
                                    event.target.value,
                                  )
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
    
  );
}
