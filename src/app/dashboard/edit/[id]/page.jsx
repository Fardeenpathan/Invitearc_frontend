"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import config from "../../../../config/config";
import { AuthContext } from "../../../../context/AuthContext";
import ShareLinkModal from "../../../../components/ShareLinkModal";
import { SlNote, SlCalender } from "react-icons/sl";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";
import { LuUsers, LuUserRound } from "react-icons/lu";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { MdTabletMac } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import { IoDesktopOutline } from "react-icons/io5";
import {
  getTemplateFieldConfig,
  templateComponents,
} from "../../../templates/templateLoader";

export default function EditTemplatePage() {
  const { user, token, loading } = useContext(AuthContext);
  const params = useParams();
  const router = useRouter();

  const templateId = params.id;
  const [clientTemplate, setClientTemplate] = useState(null);
  const [editorData, setEditorData] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [view, setView] = useState("desktop");

  const previewWidth = {
    mobile: "375px",
    tablet: "768px",
    desktop: "1200px",
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/dashboard/edit/${templateId}`);
    }
  }, [loading, user, router, templateId]);

  useEffect(() => {
    if (loading) return;
    if (!user || !token || !templateId) return;

    const fetchClientTemplate = async () => {
      try {
        const response = await axios.get(
          `${config.api.baseUrl}/api/client-templates/${templateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        setClientTemplate(response.data.data);

        const defaultData = response.data.data?.templateId?.defaultData || {};
        const customData = response.data.data?.customData || {};

        setEditorData({
          ...defaultData,
          ...customData,
        });
      } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Token:", token);

        setMessage("Unable to load template details.");
      }
    };

    fetchClientTemplate();
  }, [loading, user, token, templateId]);
  const templateSlug = clientTemplate?.templateId?.slug;
  const TemplateComponent = templateSlug
    ? templateComponents[templateSlug]
    : null;

  const fieldConfig = useMemo(
    () => getTemplateFieldConfig(templateSlug),
    [templateSlug],
  );

  const detailFields = useMemo(() => {
    if (!editorData) return [];
    if (fieldConfig?.detailFields?.length) return fieldConfig.detailFields;
    return Object.keys(editorData)
      .filter(
        (field) =>
          ![
            "whatsappNumber",
            "rsvpFields",
            "backgroundMusicUrl",
            "backgroundMusicFileName",
            "backgroundMusicTitle",
          ].includes(field),
      )
      .map((name) => ({
        name,
        label: name
          .replace(/([A-Z])/g, " $1")
          .replace(/_/g, " ")
          .replace(/^./, (str) => str.toUpperCase()),
        type:
          typeof editorData[name] === "string" && editorData[name].length > 120
            ? "textarea"
            : "text",
      }));
  }, [editorData, fieldConfig]);

  const eventFields = useMemo(() => {
    if (fieldConfig?.eventFields?.length) return fieldConfig.eventFields;
    if (!Array.isArray(editorData?.events) || !editorData.events.length)
      return [];
    return Object.keys(editorData.events[0]).map((name) => ({
      name,
      label: name
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/^./, (str) => str.toUpperCase()),
      type: name === "venue_address" || name === "theme" ? "textarea" : "text",
    }));
  }, [editorData, fieldConfig]);

  const rsvpFields = useMemo(() => {
    if (!Array.isArray(editorData?.rsvpFields)) return [];
    return editorData.rsvpFields;
  }, [editorData]);

  const eventItems = useMemo(() => {
    if (!Array.isArray(editorData?.events)) return [];
    return editorData.events;
  }, [editorData]);

  const formatFieldLabel = (label, value) => {
    if (value === undefined || value === null || value === "") return label;
    let displayValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    if (displayValue.length > 80) {
      displayValue = `${displayValue.slice(0, 77)}...`;
    }
    return `${label}: ${displayValue}`;
  };

  const fieldIcons = {
    familyName: <LuUsers />,
    headline: <PiPencilSimpleLineDuotone />,
    inviteLine: <TfiEmail />,
    eventIntro: <BsCalendar2Event />,
    groomName: <LuUserRound />,
    brideName: <LuUserRound />,
    groomDetails: <LuUserRound />,
    brideDetails: <LuUserRound />,
    brideGrandParents: <LuUserRound />,
    whatsappNumber: "📱",
    title_ceremony: "🎊",
    date: "📅",
    venue: "📍",
    venue_address: "📌",
    time: "⏰",
    theme: "✨",
    link: "🔗",
  };

  const getFieldIcon = (name) => fieldIcons[name] || "✎";

  const updateEventField = (index, field, rawValue) => {
    const trimmed = typeof rawValue === "string" ? rawValue.trim() : rawValue;
    let value = rawValue;

    if (typeof trimmed === "string") {
      if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
      ) {
        try {
          value = JSON.parse(trimmed);
        } catch {
          value = rawValue;
        }
      }
    }

    setEditorData((prev) => {
      const events = Array.isArray(prev.events) ? [...prev.events] : [];
      events[index] = {
        ...events[index],
        [field]: value,
      };
      return {
        ...prev,
        events,
      };
    });
  };

  const addEventItem = () => {
    setEditorData((prev) => ({
      ...prev,
      events: [
        ...(Array.isArray(prev.events) ? prev.events : []),
        {
          title_ceremony: "New Event",
          date: "",
          venue: "",
          venue_address: "",
          time: "",
          theme: "",
          link: "",
          image: "",
        },
      ],
    }));
  };

  const removeEventItem = (index) => {
    setEditorData((prev) => {
      const events = Array.isArray(prev.events) ? [...prev.events] : [];
      events.splice(index, 1);
      return {
        ...prev,
        events,
      };
    });
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleEventImageUpload = async (index, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageDataUrl = await readFileAsDataUrl(file);
      setEditorData((prev) => {
        const events = Array.isArray(prev.events) ? [...prev.events] : [];
        events[index] = {
          ...events[index],
          image: imageDataUrl,
          imageFileName: file.name,
        };
        return {
          ...prev,
          events,
        };
      });
    } catch (error) {
      console.error("Failed to read event image file:", error);
    }
  };

  const updateField = (field, rawValue) => {
    const trimmed = typeof rawValue === "string" ? rawValue.trim() : rawValue;
    let value = rawValue;

    if (typeof trimmed === "string") {
      if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
      ) {
        try {
          value = JSON.parse(trimmed);
        } catch {
          value = rawValue;
        }
      }
    }

    setEditorData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateRsvpField = (index, key, value) => {
    setEditorData((prev) => {
      const updatedFields = Array.isArray(prev.rsvpFields)
        ? [...prev.rsvpFields]
        : [];
      updatedFields[index] = {
        ...updatedFields[index],
        [key]: value,
      };
      return {
        ...prev,
        rsvpFields: updatedFields,
      };
    });
  };

  const addRsvpField = () => {
    setEditorData((prev) => ({
      ...prev,
      rsvpFields: [
        ...(Array.isArray(prev.rsvpFields) ? prev.rsvpFields : []),
        { label: "New field", type: "text" },
      ],
    }));
  };

  const removeRsvpField = (index) => {
    setEditorData((prev) => {
      const updatedFields = Array.isArray(prev.rsvpFields)
        ? [...prev.rsvpFields]
        : [];
      updatedFields.splice(index, 1);
      return {
        ...prev,
        rsvpFields: updatedFields,
      };
    });
  };

  const handleMusicUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setEditorData((prev) => ({
      ...prev,
      backgroundMusicUrl: fileUrl,
      backgroundMusicFileName: file.name,
    }));
  };

  const saveEditorChanges = async () => {
    if (!templateId) return;
    setSaving(true);
    setMessage("");

    try {
      const response = await axios.put(
        `${config.api.baseUrl}/api/client-templates/${templateId}`,
        {
          customData: editorData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      setClientTemplate(response.data.data);
      setMessage("Saved successfully");
    } catch (error) {
      console.error(error);
      setMessage("Unable to save changes");
    } finally {
      setSaving(false);
    }
  };

  const publishTemplate = async () => {
    if (!token || !templateId) return;
    setPublishing(true);
    try {
      const response = await axios.put(
        `${config.api.baseUrl}/api/client-templates/${templateId}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      setClientTemplate(response.data.data);
      setShareModalOpen(true);
      setMessage("Template published. Share the link with clients.");
    } catch (error) {
      setMessage("Unable to publish. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const [activeTab, setActiveTab] = useState("details");
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const handleEditFromThumbnail = (index) => {
    setSelectedEventIndex(index);
    setActiveTab("events");
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <section className="mx-auto w-full  px-4 py-10 sm:px-8 lg:px-12">
        <div className="flex min-h-screen flex-col gap-6 rounded-3xl bg-white p-5 shadow-sm lg:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#861E1D] font-georgia">
                Template editor
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#861E1D] sm:text-4xl font-georgia">
                Edit your purchased template
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 cursor-pointer"
              >
                Back to dashboard
              </button>

              <button
                type="button"
                onClick={saveEditorChanges}
                disabled={saving}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                onClick={publishTemplate}
                disabled={publishing}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
              >
                {publishing ? "Publishing..." : "Publish & Share"}
              </button>
            </div>
          </div>

          {message && (
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              {message}
            </div>
          )}

          {/* <div className="grid gap-6 lg:grid-cols-[minmax(0,450px)_1fr] md:grid-cols-[minmax(0,350px)_1fr]"> */}
          <div className="grid gap-6 lg:grid-cols-[minmax(350px,400px)_1fr] 3xl:grid-cols-[minmax(450px,500px)_1fr] md:grid-cols-[minmax(300px,400px)_1fr] ">
            <aside className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex min-h-full">
                <div className="w-24 bg-[#861E1D] px-3 py-6 text-white">
                  <div className="space-y-8">
                    {[
                      { id: "details", label: "Details", icon: <SlNote /> },
                      { id: "events", label: "Events", icon: <SlCalender /> },
                      {
                        id: "rsvp",
                        label: "RSVP",
                        icon: <FaRegEnvelopeOpen />,
                      },
                      { id: "music", label: "Music", icon: <GiLoveSong /> },
                    ].map((tab) => (
                      <div key={tab.id} className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl cursor-pointer transition ${
                            activeTab === tab.id
                              ? "bg-white text-[#861E1D] shadow-sm"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          <div className="text-[24px]">{tab.icon}</div>
                        </button>

                        <span className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white font-georgia">
                          {tab.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="mb-6 text-center">
                    <p className="text-[18px] uppercase tracking-widest text-[#861E1D] font-extrabold font-georgia">
                      {activeTab === "details"
                        ? "Template Details"
                        : activeTab === "events"
                          ? "Events Details"
                          : activeTab === "rsvp"
                            ? "RSVP Details"
                            : "Music Details"}
                    </p>

                    <p className="mt-3 text-sm text-slate-600">
                      {activeTab === "details"
                        ? "Edit all template content fields from your purchased template."
                        : activeTab === "events"
                          ? "Manage event images, details, and add or remove events."
                          : activeTab === "rsvp"
                            ? "Configure WhatsApp RSVP or RSVP form fields for guests."
                            : "Add or upload background music for your invitation."}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {activeTab === "rsvp" && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-800">
                            {formatFieldLabel(
                              "WhatsApp RSVP number",
                              editorData.whatsappNumber,
                            )}
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
                              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
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
                                    className="text-xs font-semibold text-rose-600 hover:text-rose-800"
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
                                      updateRsvpField(
                                        index,
                                        "label",
                                        event.target.value,
                                      )
                                    }
                                    placeholder="Label"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-slate-800">
                                    {formatFieldLabel(
                                      "Type",
                                      field.type || "text",
                                    )}
                                  </label>
                                  <input
                                    value={field.type || "text"}
                                    onChange={(event) =>
                                      updateRsvpField(
                                        index,
                                        "type",
                                        event.target.value,
                                      )
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
                    )}

                    {activeTab === "music" && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-800">
                            Music URL
                          </label>
                          <input
                            value={editorData.backgroundMusicUrl || ""}
                            onChange={(event) =>
                              updateField(
                                "backgroundMusicUrl",
                                event.target.value,
                              )
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
                    )}
                  </div>

                  {activeTab === "details" && (
                    <div className="space-y-4">
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

                          return (
                            <div
                              key={name}
                              className="space-y-3  p-4 flex gap-4"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7EAEA] text-[#861E1D] text-lg">
                                {getFieldIcon(name)}
                              </div>
                              <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex items-center gap-3 ">
                                  <label className="text-sm font-semibold text-slate-800">
                                    {formatFieldLabel(label)}
                                  </label>
                                </div>
                                {type === "textarea" ||
                                typeof rawValue === "object" ? (
                                  <textarea
                                    rows={4}
                                    value={displayValue}
                                    onChange={(event) =>
                                      updateField(name, event.target.value)
                                    }
                                    className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                  />
                                ) : (
                                  <input
                                    value={displayValue}
                                    onChange={(event) =>
                                      updateField(name, event.target.value)
                                    }
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
                  )}

                  {activeTab === "events" && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            Events
                          </h3>
                          <p className="text-sm text-slate-600">
                            Manage event images, details, and add or remove
                            events.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={addEventItem}
                          className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Add event
                        </button>
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
                                      alt={
                                        ev.title_ceremony || `Event ${idx + 1}`
                                      }
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
                                      onChange={(e) =>
                                        handleEventImageUpload(idx, e)
                                      }
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
                              No events yet. Add an event to start configuring
                              images and details.
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
                                      .replace(/^./, (str) =>
                                        str.toUpperCase(),
                                      ),
                                    type:
                                      name === "venue_address" ||
                                      name === "theme"
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
                                  (typeof value === "string" &&
                                    value.length > 80);
                                return (
                                  <div
                                    key={fieldDef.name}
                                    className="space-y-2"
                                  >
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

                      {eventItems.length > 0 && (
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
                                      .replace(/^./, (str) =>
                                        str.toUpperCase(),
                                      ),
                                    type:
                                      name === "venue_address" ||
                                      name === "theme"
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
                                        onChange={(e) =>
                                          handleEventImageUpload(index, e)
                                        }
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
                                      (typeof value === "string" &&
                                        value.length > 80);
                                    return (
                                      <div
                                        key={fieldDef.name}
                                        className="space-y-2"
                                      >
                                        <label className="block text-sm font-semibold text-slate-800">
                                          {formatFieldLabel(
                                            fieldDef.label,
                                            value,
                                          )}
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
                  )}
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="rounded-3xl bg-white p-6 shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.14em] text-[#861E1D] font-semibold">
                      Preview mode
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setView("mobile")}
                      className={`cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        view === "mobile"
                          ? "bg-[#861E1D] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <HiDevicePhoneMobile className="text-lg" />
                      <span>Mobile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("tablet")}
                      className={`cursor-pointer inline-flex gap-2  items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                        view === "tablet"
                          ? "bg-[#861E1D] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <MdTabletMac /> <span>Tablet</span> 
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("desktop")}
                      className={`inline-flex gap-2 items-center cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                        view === "desktop"
                          ? "bg-[#861E1D] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <IoDesktopOutline /> <span> Desktop</span>

                    </button>
                  </div>
                </div>

                <div
                  className="mx-auto overflow-hidden rounded-4xl bg-white shadow-xl border-[6px] transition-all mt-6"
                  style={{
                    width: previewWidth[view],
                    maxWidth: "100%",
                  }}
                >
                  <div className="h-200 overflow-y-auto overflow-x-hidden bg-slate-100">
                    {TemplateComponent ? (
                      <TemplateComponent
                        data={editorData}
                        token={token}
                        templateId={templateId}
                        isOwner={true}
                      />
                    ) : (
                      <div className="p-10 text-center text-slate-600">
                        Template preview not available.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <ShareLinkModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        clientTemplate={clientTemplate}
        token={token}
      />
    </main>
  );
}
