"use client";

export default function PublishShareEditor({
  editorData,
  clientTemplate,
  baseUrl,
  sharePrefix,
  setSharePrefix,
  shareSaving,
  saveSharePrefix,
  copyShareLink,
  handlePreviewImageUpload,
  previewUploading,
  updateField,
  publishTemplate,
  publishing,
}) {
  const shareUrl = `${baseUrl}/share/${clientTemplate?.shareSlug || ""}`;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-lg font-semibold text-slate-900 font-georgia">
          Share link settings
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Update the editable share link prefix for this template.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
          <input
            value={sharePrefix}
            onChange={(e) => setSharePrefix(e.target.value)}
            placeholder="Enter share prefix"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#861E1D] focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="button"
            onClick={saveSharePrefix}
            disabled={shareSaving}
            className="inline-flex items-center justify-center rounded-2xl bg-[#861E1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f191c] disabled:opacity-50 cursor-pointer"
          >
            {shareSaving ? "Saving..." : "Save link"}
          </button>
        </div>

        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-georgia">
            Share URL preview
          </p>
          <div className="mt-3 flex flex-col gap-3 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900 font-georgia">Full share link</p>
              <p className="break-all">{shareUrl}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyShareLink}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-100 cursor-pointer"
              >
                Copy link
              </button>
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[#861E1D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6f191c]"
              >
                Open share page
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-6 sm:grid-row-[220px_1fr]">
          {/* <div className="rounded-3xl overflow-hidden bg-white shadow-sm">
            <img
              src={
                editorData?.sharePreviewImage ||
                clientTemplate?.templateId?.previewImage ||
                "/og.jpg"
              }
              alt="Preview image"
              className="h-full w-full object-cover"
            />
          </div> */}

          <div className="space-y-4">
            <div className="space-y-2">
              

<div className="max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow mb-6">
  <img
    src={
      editorData?.sharePreviewImage ||
      clientTemplate?.templateId?.previewImage ||
      "/og.jpg"
    }
    className="aspect-[1.91/1] w-full object-cover"
  />

  <div className="p-4">
    

    <h3 className=" line-clamp-2 text-base font-bold">
      {editorData?.sharePreviewTitle ||
        clientTemplate?.templateId?.title}
    </h3>

    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
      {editorData?.sharePreviewDescription}
    </p>

    <p className="mt-1 text-xs  text-slate-400">
     {shareUrl}
    </p>
  </div>
</div>


              <p className="text-xs uppercase tracking-widest text-slate-500 font-georgia">
                Preview image
              </p>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition hover:bg-slate-50">
                <span>
                  {editorData?.sharePreviewImage
                    ? "Change preview image"
                    : "Upload preview image"}
                </span>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePreviewImageUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-500">
                  1200x600px and below 200KB
                </span>
              {previewUploading && (
                <p className="text-sm text-slate-500">
                  Uploading preview image...
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-georgia">
                Preview title
              </p>
              <input
                value={
                  editorData?.sharePreviewTitle ||
                  clientTemplate?.templateId?.title ||
                  editorData?.headline ||
                  "Invitation Preview"
                }
                onChange={(e) =>
                  updateField("sharePreviewTitle", e.target.value)
                }
                placeholder="Enter preview title"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#861E1D] focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-georgiar̥r̥">
                Preview description
              </p>
              <textarea
                value={
                  editorData?.sharePreviewDescription ||
                  editorData?.inviteLine ||
                  editorData?.eventIntro ||
                  clientTemplate?.templateId?.category ||
                  "A custom invitation preview description for this template."
                }
                onChange={(e) =>
                  updateField("sharePreviewDescription", e.target.value)
                }
                placeholder="Enter preview description"
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#861E1D] focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                {clientTemplate?.isPublished ? "Published" : "Draft"}
              </span>
              {!clientTemplate?.isPublished && (
                <button
                  type="button"
                  onClick={publishTemplate}
                  disabled={publishing}
                  className="rounded-2xl bg-[#861E1D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6f191c] disabled:opacity-50"
                >
                  {publishing ? "Publishing..." : "Publish now"}
                </button>
              )}
            </div>
          </div>






        </div>
      </div>
    </div>
  );
}
