"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";

export default function ShareLinkModal({ open, onClose, clientTemplate}) {
  const [prefix, setPrefix] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000");

  useEffect(() => {
    if (open && clientTemplate) {
      const current = clientTemplate.shareSlug || '';
      const defaultPrefix = current.split("-")[0] || '';
      setPrefix(defaultPrefix);
      setFullUrl(`${base}/share/${current}`);
    }
  }, [open, clientTemplate]);

  if (!open) return null;

  const savePrefix = async () => {
    if (!clientTemplate) return;
    setSaving(true);
    try {
      const res = await axios.put(
  `${config.api.baseUrl}/api/client-templates/${clientTemplate._id}/update-share`,
  {
    prefix,
  },
  {
    withCredentials: true,
  }
);

      if (res.data?.success) {
        const newSlug = res.data.data.shareSlug;
        setFullUrl(`${base}/share/${newSlug}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Unable to update share link.");
    } finally {
      setSaving(false);
    }
  };

  const copyLink = async () => {
    if (!fullUrl) return;
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert("Copied link to clipboard");
    } catch (err) {
      alert("Unable to copy link");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Share link</h3>
          <button onClick={onClose} className="text-white border rounded-full px-3 py-1.5 cursor-pointer bg-black hover:bg-slate-700">X</button>
        </div>

        <p className="mt-3 text-sm text-slate-600">Edit the starting word for your share link. The domain will remain the site URL.</p>

        <div className="mt-4 flex gap-2">
          <input
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="starting-word"
            className="w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
          <button
            onClick={savePrefix}
            disabled={saving}
            className="rounded-2xl bg-[#861E1D] px-4 py-2 text-white disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Preview</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <code className="break-all text-sm text-slate-700">{fullUrl}</code>
            <div className="flex gap-2">
              <button onClick={copyLink} className="rounded-full border px-3 py-1 text-sm cursor-pointer">Copy</button>
              <a href={fullUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#861E1D] px-3 py-1 text-sm text-white">Open</a>
            </div>
          </div>
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-sm text-slate-600">Close</button>
        </div>
      </div>
    </div>
  );
}
