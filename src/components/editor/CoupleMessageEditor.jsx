export default function CoupleMessageEditor({
  coupleMessageFields = [],
  editorData = {},
  updateCoupleMessageField,
  handleCoupleImageUpload,
  handleCoupleMessageImageUpload,
  removeCoupleMessageImage,
}) {
  const renderField = (field) => {
    const name = field.name || field.key || field;
    const label =
      field.label ||
      name
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/^./, (str) => str.toUpperCase());
    const type = field.type || "text";

    console.log(field);
    console.log(name);
    console.log(typeof name);
    if (type === "image") {
      const imageKey = name.split(".")[1];

      return (
      
<div key={name} className="space-y-3">
  <label className="block text-sm font-semibold text-slate-800">
    {label}
  </label>

  <div className="flex items-center gap-4">
    {/* Image Preview */}
    <div className="w-32 h-24 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center">
      {editorData?.coupleMessageImages?.[imageKey] ? (
        <img
          src={editorData.coupleMessageImages[imageKey]}
          alt={label}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[10px] text-slate-400 text-center">
          No Image
        </span>
      )}
    </div>

    {/* Upload */}
    <div className="flex flex-col gap-1">
      <label className="inline-flex cursor-pointer items-center rounded-xl bg-[#861E1D] px-4 py-2 text-sm font-normal text-white hover:bg-[#6f191c]">
        {editorData?.coupleMessageImages?.[imageKey]
          ? "Change Image"
          : "Choose File"}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleCoupleImageUpload(e, imageKey)}
          className="hidden"
        />
      </label>

      <p className="text-xs text-slate-500">
        {editorData?.coupleMessageImages?.[imageKey]
          ? "Image uploaded successfully ✓"
          : "No file selected"}
      </p>
    </div>
  </div>
</div>


      );

    }

    const value = editorData[name] || "";

    if (name === "coupleMessageCarouselImages") {
      return (
        <div key={name} className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 font-georgia">
            {label}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleCoupleMessageImageUpload}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-2 text-sm text-slate-900 cursor-pointer"
          />
          <label className="block text-[11px] font-normal text-slate-600 font-georgia">
            Please upload minimum 6 couple images
          </label>
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
                      className="mt-2 text-xs font-semibold text-rose-600 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={name} className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800 font-georgia">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            rows={3}
            value={value}
            onChange={(event) =>
              updateCoupleMessageField(name, event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) =>
              updateCoupleMessageField(name, event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {coupleMessageFields.length > 0 ? (
        coupleMessageFields.map((field) => renderField(field))
      ) : (
        <p className="text-sm text-slate-500">
          No couple message fields are available yet.
        </p>
      )}
    </div>
  );
}
