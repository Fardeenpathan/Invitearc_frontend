export default function CoupleMessageEditor({
  editorData = {},
  updateCoupleMessageField,
  handleCoupleMessageImageUpload,
  removeCoupleMessageImage,
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Couple message title
        </label>
        <input
          value={editorData.coupleMessageTitle || ""}
          onChange={(event) =>
            updateCoupleMessageField("coupleMessageTitle", event.target.value)
          }
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Couple message description
        </label>
        <textarea
          rows={5}
          value={editorData.coupleMessageDescription || ""}
          onChange={(event) =>
            updateCoupleMessageField(
              "coupleMessageDescription",
              event.target.value,
            )
          }
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Carousel images
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoupleMessageImageUpload}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-2 text-sm text-slate-900"
        />
        {(Array.isArray(editorData.coupleMessageCarouselImages)
          ? editorData.coupleMessageCarouselImages
          : []
        ).length > 0 && (
          <div className="flex flex-wrap gap-3">
            {(Array.isArray(editorData.coupleMessageCarouselImages)
              ? editorData.coupleMessageCarouselImages
              : []
            ).map((image, index) => {
              const src =
                typeof image === "string"
                  ? image
                  : image?.image || image?.src || "";
              return (
                <div
                  key={index}
                  className="w-24 rounded-2xl border border-slate-200 bg-white p-2"
                >
                  {src ? (
                    <img
                      src={src}
                      alt={`Carousel ${index + 1}`}
                      className="h-20 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-full items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">
                      No image
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeCoupleMessageImage(index)}
                    className="mt-2 text-xs font-semibold text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Things to know title
        </label>
        <input
          value={editorData.coupleMessageThingsToKnowTitle || ""}
          onChange={(event) =>
            updateCoupleMessageField(
              "coupleMessageThingsToKnowTitle",
              event.target.value,
            )
          }
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Things to know description
        </label>
        <textarea
          rows={5}
          value={editorData.coupleMessageThingsToKnowDescription || ""}
          onChange={(event) =>
            updateCoupleMessageField(
              "coupleMessageThingsToKnowDescription",
              event.target.value,
            )
          }
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Location title
          </label>
          <input
            value={editorData.coupleMessageLocationTitle || ""}
            onChange={(event) =>
              updateCoupleMessageField(
                "coupleMessageLocationTitle",
                event.target.value,
              )
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Location details
          </label>
          <textarea
            rows={3}
            value={editorData.coupleMessageLocationDetails || ""}
            onChange={(event) =>
              updateCoupleMessageField(
                "coupleMessageLocationDetails",
                event.target.value,
              )
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Weather title
          </label>
          <input
            value={editorData.coupleMessageWeatherTitle || ""}
            onChange={(event) =>
              updateCoupleMessageField(
                "coupleMessageWeatherTitle",
                event.target.value,
              )
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Weather details
          </label>
          <textarea
            rows={3}
            value={editorData.coupleMessageWeatherDetails || ""}
            onChange={(event) =>
              updateCoupleMessageField(
                "coupleMessageWeatherDetails",
                event.target.value,
              )
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Parking title
          </label>
          <input
            value={editorData.coupleMessageParkingTitle || ""}
            onChange={(event) =>
              updateCoupleMessageField(
                "coupleMessageParkingTitle",
                event.target.value,
              )
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Parking details
          </label>
          <textarea
            rows={3}
            value={editorData.coupleMessageParkingDetails || ""}
            onChange={(event) =>
              updateCoupleMessageField(
                "coupleMessageParkingDetails",
                event.target.value,
              )
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>
    </div>
  );
}
