"use client";

export default function MusicEditor({
  editorData = {},
  updateField,
  handleMusicUpload,
}) {
  return (
    <div className="space-y-6">
      <div>
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
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800">
          Upload audio file
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleMusicUpload}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-2 text-sm text-slate-900"
        />
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
