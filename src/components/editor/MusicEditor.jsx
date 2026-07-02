"use client";

export default function MusicEditor({
  editorData = {},
  updateField,
  handleMusicUpload,
}) {
  return (
    <div className="space-y-6">
      {/* <div>
        <label className="block text-sm font-semibold text-slate-800">
          Music URL
        </label>
        <input
          value={editorData.backgroundMusicUrl || ""}
          onChange={(event) =>
            updateField("backgroundMusicUrl", event.target.value)
          }
          placeholder="https://..."
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div> */}

      <div>
        <label className="block text-sm font-semibold text-slate-800 font-georgia">
          Upload background song
        </label>
        {/* <input
          type="file"
          accept="audio/*"
          onChange={handleMusicUpload}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-2 text-sm text-slate-900"
        /> */}


        <label className="mt-2 flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-white">
  <div className="flex items-center gap-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-[#861E1D]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19V6l12-2v13M9 19a2 2 0 11-4 0 2 2 0 014 0zm12-2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>

    <span className="text-sm text-slate-600">
      {editorData.backgroundMusicFileName || "Upload background music"}
    </span>
  </div>


  <input
    type="file"
    accept="audio/*"
    onChange={handleMusicUpload}
    className="hidden"
  />
</label>
        {editorData.backgroundMusicFileName && (
          <p className="mt-2 text-sm text-slate-600">
            Selected: {editorData.backgroundMusicFileName}
          </p>
        )}
      </div>

      {editorData.backgroundMusicUrl && (
        <audio
          controls
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3"
        >
          <source src={editorData.backgroundMusicUrl} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
