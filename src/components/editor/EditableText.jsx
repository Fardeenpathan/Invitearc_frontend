"use client";

import { useState } from "react";

export default function EditableText({ field, value, onSave, inline = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    if (editValue.trim() !== "") {
      onSave(editValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          rows={inline ? 2 : 4}
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="rounded-lg bg-[#861E1D] px-3 py-1 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer rounded-lg p-2 transition hover:bg-slate-100"
      title="Click to edit"
    >
      {value}
    </div>
  );
}
