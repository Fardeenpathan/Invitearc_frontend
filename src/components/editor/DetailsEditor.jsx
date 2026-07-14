import { IoCloudUploadOutline } from "react-icons/io5";
import { assets } from "../../app/templates/sikh-wedding/laavan/assets";
export default function DetailsEditor({
  detailFields,
  editorData,
  updateField,
  formatFieldLabel,
  getFieldIcon,
  handleLogoUpload,
}) {
  return (
    <div className="space-y-1">
      {detailFields.length > 0 ? (
        detailFields.map((field) => {
          const name = field.name || field;

          const label =
            field.label ||
            name
              .replace(/([A-Z])/g, " $1")
              .replace(/_/g, " ")
              .replace(/^./, (str) => str.toUpperCase());

          const type =
            field.type ||
            (typeof editorData[name] === "string" &&
            editorData[name]?.length > 120
              ? "textarea"
              : "text");

          const rawValue = editorData[name];

          const displayValue =
            typeof rawValue === "object" && rawValue !== null
              ? JSON.stringify(rawValue, null, 2)
              : (rawValue ?? "");

          if (type === "logo") {
            return (
              <div key={name} className="space-y-4 py-2 flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7EAEA] text-[#861E1D] text-lg">
              <IoCloudUploadOutline />

                </div>

                <div className="space-y-2 flex-1">
                  <label className="text-sm font-semibold text-slate-800">
                    {formatFieldLabel(label)}
                  </label>

                  <div className=" items-center mt-3">
                    <div className="w-48 h-32 rounded-xl overflow-hidden border border-slate-200 bg-white">
                      <img
                        src={editorData?.Logo || assets.logo}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-2 mt-3">
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#861E1D] px-4 py-2 text-sm font-medium text-white hover:bg-[#6f191c]">
                        {editorData?.Logo ? "Change Logo" : "Choose Logo"}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>

                      <p className="text-xs text-slate-500">
                        {editorData?.Logo
                          ? "✓ Custom logo uploaded"
                          : "Your logo"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={name} className="space-y-4 py-2 flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7EAEA] text-[#861E1D] text-lg">
                {getFieldIcon(name)}
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-slate-800">
                    {formatFieldLabel(label)}
                  </label>
                </div>

                {type === "textarea" || typeof rawValue === "object" ? (
                  <textarea
                    rows={4}
                    value={displayValue}
                    onChange={(e) => updateField(name, e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                ) : (
                  <input
                    value={displayValue}
                    onChange={(e) => updateField(name, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-slate-500">
          No detail fields are available yet.
        </p>
      )}
    </div>
  );
}
