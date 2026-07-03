"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../../../config/config";
import { AuthContext } from "../../../../context/AuthContext";
import { LuUsers, LuUserRound } from "react-icons/lu";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { MdTabletMac } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import { IoDesktopOutline } from "react-icons/io5";
import { uploadImage } from "../../../utils/uploadImage";
import { uploadFile } from "../../../utils/uploadFile";
import {
  getTemplateFieldConfig,
  templateComponents,
} from "../../../templates/templateLoader";
import Sidebar from "../../../../components/editor/Sidebar";
import DetailsEditor from "../../../../components/editor/DetailsEditor";
import EventsEditor from "../../../../components/editor/EventsEditor";
import CoupleMessageEditor from "../../../../components/editor/CoupleMessageEditor";
import RsvpEditor from "../../../../components/editor/RsvpEditor";
import CountdownEditor from "../../../../components/editor/CountdownEditor";
import MusicEditor from "../../../../components/editor/MusicEditor";

export default function EditTemplatePage() {
  const { user, token, loading } = useContext(AuthContext);
  const params = useParams();
  const router = useRouter();

  const templateId = params.id;
  const [clientTemplate, setClientTemplate] = useState(null);
  const [editorData, setEditorData] = useState({});
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [shareSaving, setShareSaving] = useState(false);
  const [previewUploading, setPreviewUploading] = useState(false);
  const [sharePrefix, setSharePrefix] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
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
        setSharePrefix(
          response.data.data?.shareSlug?.split("-")?.[0] || ""
        );

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

        toast.error("Unable to load template details.");
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
    // whatsappNumber: "📱",
    // title_ceremony: "🎊",
    // date: "📅",
    // venue: "📍",
    // venue_address: "📌",
    // time: "⏰",
    // theme: "✨",
    // link: "🔗",
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
      const imageUrl = await uploadImage(file, "invitearc/events");

      setEditorData((prev) => {
        const events = [...(prev.events || [])];

        events[index] = {
          ...events[index],
          image: imageUrl,
          imageFileName: file.name,
        };

        return {
          ...prev,
          events,
        };
      });
    } catch (error) {
      console.error("Failed to upload event image:", error);
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

  const handleMusicUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const musicUrl = await uploadFile(
        file,
        "invitearc/music",
        "video", // Cloudinary me audio = video resource type
      );

      setEditorData((prev) => ({
        ...prev,
        backgroundMusicUrl: musicUrl,
        backgroundMusicFileName: file.name,
      }));

      event.target.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const updateCoupleMessageField = (field, value) => {
    setEditorData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validatePreviewImageFile = (file) => {
    if (!file) return "No file selected.";
    if (!file.type.startsWith("image/")) {
      return "Please upload a valid image file.";
    }
    if (file.size > 200 * 1024) {
      return "Preview image must be below 200KB.";
    }
    return null;
  };

  const getImageDimensions = (file) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Unable to read image dimensions."));
      };
      img.src = url;
    });

  const handlePreviewImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validatePreviewImageFile(file);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const { width, height } = await getImageDimensions(file);
      if (width !== 1200 || height !== 600) {
        toast.error("Preview image must be exactly 1200x600 pixels.");
        return;
      }

      setPreviewUploading(true);
      const imageUrl = await uploadImage(file, "invitearc/preview-images");
      setEditorData((prev) => ({
        ...prev,
        sharePreviewImage: imageUrl,
      }));
      toast.success("Preview image uploaded successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to upload preview image. Please try again.");
    } finally {
      setPreviewUploading(false);
      event.target.value = "";
    }
  };

  const handleCoupleMessageImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const existingImages = Array.isArray(editorData.coupleMessageCarouselImages)
      ? editorData.coupleMessageCarouselImages
      : [];

    if (existingImages.length + files.length > 10) {
      alert("You can upload a maximum of 10 carousel images.");
      event.target.value = "";
      return;
    }
    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await uploadImage(file, "invitearc/couple-carousel");

          return {
            image: imageUrl,
            imageFileName: file.name,
          };
        }),
      );

      setEditorData((prev) => ({
        ...prev,
        coupleMessageCarouselImages: [
          ...(Array.isArray(prev.coupleMessageCarouselImages)
            ? prev.coupleMessageCarouselImages
            : []),
          ...uploadedImages,
        ],
      }));

      // Same files dubara select karne ke liye
      event.target.value = "";
    } catch (error) {
      console.error("Failed to upload couple message image files:", error);
    }
  };

  const removeCoupleMessageImage = (index) => {
    setEditorData((prev) => ({
      ...prev,
      coupleMessageCarouselImages: (Array.isArray(
        prev.coupleMessageCarouselImages,
      )
        ? prev.coupleMessageCarouselImages
        : []
      ).filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const saveEditorChanges = async () => {
    if (!templateId) return;

    const totalCarouselImages = Array.isArray(
      editorData.coupleMessageCarouselImages,
    )
      ? editorData.coupleMessageCarouselImages.length
      : 0;

    if (totalCarouselImages < 6) {
      toast.error("Please upload at least 6 couple images.");
      return;
    }

    if (totalCarouselImages > 10) {
      toast.error("Maximum 10 couple images are allowed.");
      return;
    }
    setSaving(true);

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
      toast.success("Saved successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to save changes.");
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
      toast.success("Template published. Share the link with clients.");
    } catch (error) {
      toast.error("Unable to publish. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const saveSharePrefix = async () => {
    if (!token || !templateId || !sharePrefix) return;
    setShareSaving(true);
    try {
      const response = await axios.put(
        `${config.api.baseUrl}/api/client-templates/${templateId}/update-share`,
        { prefix: sharePrefix },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      const updatedTemplate = response.data.data;
      setClientTemplate((prev) => {
        const previousTemplateId = prev?.templateId;
        const newTemplateId = updatedTemplate.templateId;
        const templateIdToUse =
          newTemplateId && newTemplateId.slug ? newTemplateId : previousTemplateId;
        return {
          ...updatedTemplate,
          templateId: templateIdToUse,
        };
      });
      toast.success("Share link updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update share link.",
      );
    } finally {
      setShareSaving(false);
    }
  };

  const copyShareLink = async () => {
    const link = `${baseUrl}/share/${clientTemplate?.shareSlug || ""}`;
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Share link copied to clipboard.");
    } catch (error) {
      toast.error("Unable to copy share link.");
    }
  };

  const [activeTab, setActiveTab] = useState("details");
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

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
                className="inline-flex items-center justify-center rounded-full border border-slate-200 cursor-pointer bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>

          {/* <div className="grid gap-6 lg:grid-cols-[minmax(0,450px)_1fr] md:grid-cols-[minmax(0,350px)_1fr]"> */}
          <div className="grid gap-6 lg:grid-cols-[minmax(350px,400px)_1fr] 3xl:grid-cols-[minmax(450px,500px)_1fr] md:grid-cols-[minmax(300px,400px)_1fr] ">
            <aside className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex min-h-full">
                <Sidebar
                  tabs={fieldConfig?.tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <div className="flex-1 p-6">
                  <div className="mb-6 text-center">
                    <p className="text-[18px] uppercase tracking-widest text-[#861E1D] font-extrabold font-georgia">
                      {activeTab === "details"
                        ? "Template Details"
                        : activeTab === "events"
                          ? "Events Details"
                          : activeTab === "coupleMessage"
                            ? "Couple Message Details"
                            : activeTab === "rsvp"
                              ? "RSVP Details"
                              : activeTab === "countdown"
                                ? "Countdown Details"
                                : activeTab === "music"
                                  ? "Music Details"
                                  : "Publish & Share"}
                    </p>

                    <p className="mt-3 text-sm text-slate-600">
                      {activeTab === "details"
                        ? "Edit all template content fields from your purchased template."
                        : activeTab === "events"
                          ? "Manage event images, details, and add or remove events."
                          : activeTab === "coupleMessage"
                            ? "Customize the couple message section, carousel images, and things-to-know content."
                            : activeTab === "rsvp"
                              ? "Configure WhatsApp RSVP or RSVP form fields for guests."
                              : activeTab === "countdown"
                                ? "Set the countdown title, target date, and description for the marriage countdown section."
                                : activeTab === "music"
                                  ? "Upload background music for your invitation."
                                  : "Publish your template and update the share link, preview image, title, and description."}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {activeTab === "rsvp" && (
                      <RsvpEditor
                        editorData={editorData}
                        rsvpFields={rsvpFields}
                        updateField={updateField}
                        addRsvpField={addRsvpField}
                        removeRsvpField={removeRsvpField}
                        updateRsvpField={updateRsvpField}
                        formatFieldLabel={formatFieldLabel}
                      />
                    )}

                    {activeTab === "countdown" && (
                      <CountdownEditor
                        editorData={editorData}
                        updateCoupleMessageField={updateCoupleMessageField}
                      />
                    )}

                    {activeTab === "music" && (
                      <MusicEditor
                        editorData={editorData}
                        updateField={updateField}
                        handleMusicUpload={handleMusicUpload}
                      />
                    )}

                    {activeTab === "publish" && (
                      <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                          <h2 className="text-lg font-semibold text-slate-900">
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
                              className="inline-flex items-center justify-center rounded-2xl bg-[#861E1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f191c] disabled:opacity-50"
                            >
                              {shareSaving ? "Saving..." : "Save link"}
                            </button>
                          </div>

                          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                              Share URL preview
                            </p>
                            <div className="mt-3 flex flex-col gap-3 text-sm text-slate-700">
                              <div>
                                <p className="font-semibold text-slate-900">Full share link</p>
                                <p className="break-all">{`${baseUrl}/share/${clientTemplate?.shareSlug || ""}`}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={copyShareLink}
                                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-100"
                                >
                                  Copy link
                                </button>
                                <a
                                  href={`${baseUrl}/share/${clientTemplate?.shareSlug || ""}`}
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

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                          <div className="grid gap-6 sm:grid-row-[220px_1fr]">
                            <div className="rounded-3xl overflow-hidden bg-white shadow-sm">
                              <img
                                src={editorData?.sharePreviewImage || clientTemplate?.templateId?.previewImage || "/placeholder-template.jpg"}
                                alt="Preview image"
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                  Preview image
                                </p>
                                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition hover:bg-slate-50">
                                  <span>{editorData?.sharePreviewImage ? "Change preview image" : "Upload preview image"}</span>
                                  <span className="text-xs text-slate-500">1200x600px · &lt; 200KB</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePreviewImageUpload}
                                    className="hidden"
                                  />
                                </label>
                                {previewUploading && (
                                  <p className="text-sm text-slate-500">Uploading preview image...</p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                  Preview title
                                </p>
                                <input
                                  value={editorData?.sharePreviewTitle || clientTemplate?.templateId?.title || editorData?.headline || "Invitation Preview"}
                                  onChange={(e) => updateField("sharePreviewTitle", e.target.value)}
                                  placeholder="Enter preview title"
                                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#861E1D] focus:outline-none focus:ring-2 focus:ring-slate-200"
                                />
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                  Preview description
                                </p>
                                <textarea
                                  value={editorData?.sharePreviewDescription || editorData?.inviteLine || editorData?.eventIntro || clientTemplate?.templateId?.category || "A custom invitation preview description for this template."}
                                  onChange={(e) => updateField("sharePreviewDescription", e.target.value)}
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
                    )}
                  </div>

                  {activeTab === "details" && (
                    <DetailsEditor
                      detailFields={detailFields}
                      editorData={editorData}
                      updateField={updateField}
                      formatFieldLabel={formatFieldLabel}
                      getFieldIcon={getFieldIcon}
                    />
                  )}

                  {activeTab === "events" && (
                    <EventsEditor
                      editorData={editorData}
                      eventItems={eventItems}
                      eventFields={eventFields}
                      selectedEventIndex={selectedEventIndex}
                      setSelectedEventIndex={setSelectedEventIndex}
                      addEventItem={addEventItem}
                      removeEventItem={removeEventItem}
                      updateEventField={updateEventField}
                      handleEventImageUpload={handleEventImageUpload}
                      handleEditFromThumbnail={handleEditFromThumbnail}
                      formatFieldLabel={formatFieldLabel}
                    />
                  )}

                  {activeTab === "coupleMessage" && (
                    <CoupleMessageEditor
                      editorData={editorData}
                      updateCoupleMessageField={updateCoupleMessageField}
                      handleCoupleMessageImageUpload={
                        handleCoupleMessageImageUpload
                      }
                      removeCoupleMessageImage={removeCoupleMessageImage}
                    />
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
    </main>
  );
}