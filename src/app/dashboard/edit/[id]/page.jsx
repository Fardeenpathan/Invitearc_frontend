"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import config from "../../../../config/config";
import { AuthContext } from "../../../../context/AuthContext";
import ShareLinkModal from "../../../../components/ShareLinkModal";

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

  // const handleEventImageUpload = async (index, event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   try {
  //     const imageDataUrl = await readFileAsDataUrl(file);
  //     setEditorData((prev) => {
  //       const events = Array.isArray(prev.events) ? [...prev.events] : [];
  //       events[index] = {
  //         ...events[index],
  //         image: imageDataUrl,
  //         imageFileName: file.name,
  //       };
  //       return {
 
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

  // const handleMusicUpload = (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   const fileUrl = URL.createObjectURL(file);
  //   setEditorData((prev) => ({
  //     ...prev,
  //     backgroundMusicUrl: fileUrl,
  //     backgroundMusicFileName: file.name,
  //   }));
  // };

  // const handleMusicUpload = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   try {
  //     const musicUrl = await uploadFile(file, "invitearc/music", "music");

  //     setEditorData((prev) => ({
  //       ...prev,
  //       backgroundMusicUrl: musicUrl,
  //       backgroundMusicFileName: file.name,
  //     }));

  //     event.target.value = "";
  //   } catch (error) {
  //     console.error("Failed to upload music:", error);
  //   }
  // };


const handleMusicUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const musicUrl = await uploadFile(
      file,
      "invitearc/music",
      "video" // Cloudinary me audio = video resource type
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
    editorData.coupleMessageCarouselImages
  )
    ? editorData.coupleMessageCarouselImages.length
    : 0;

  if (totalCarouselImages < 6) {
    setMessage("Please upload at least 6 couple images.");
    return;
  }

  if (totalCarouselImages > 10) {
    setMessage("Maximum 10 couple images are allowed.");
    return;
  }
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
                className="inline-flex items-center justify-center rounded-full border border-slate-200 cursor-pointer bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                onClick={publishTemplate}
                disabled={publishing}
                className="inline-flex items-center justify-center rounded-full border cursor-pointer border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
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
                                : "Music Details"}
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
                                : "Upload background music for your invitation."}
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

      <ShareLinkModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        clientTemplate={clientTemplate}
        token={token}
      />
    </main>
  );
}
