"use client";
import { useContext, useEffect, useMemo, useState, useRef } from "react";
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
import PublishShareEditor from "../../../../components/editor/PublishShareEditor";
export default function EditTemplatePage() {
  const { user, token, loading } = useContext(AuthContext);
  const params = useParams();
  const router = useRouter();
  const iframeRef = useRef(null);
  const templateId = params.id;
  const [clientTemplate, setClientTemplate] = useState(null);
  const [editorData, setEditorData] = useState({});
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [shareSaving, setShareSaving] = useState(false);
  const [previewUploading, setPreviewUploading] = useState(false);
  const [sharePrefix, setSharePrefix] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [view, setView] = useState(() => {
    if (typeof window === "undefined") return "mobile";
    if (window.innerWidth < 768) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
  });

  const deviceConfig = {
    mobile: {
      width: 390,
      scale: 1,
    },
    tablet: {
      width: 768,
      scale: 0.78,
    },
    desktop: {
      width: 1440,
      scale:
        typeof window !== "undefined" && window.innerWidth >= 1600
          ? 0.78
          : 0.62,
    },
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/dashboard/edit/${templateId}`);
    }
  }, [loading, user, router, templateId]);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow?.postMessage(
      {
        type: "EDITOR_UPDATE",
        data: editorData,
      },
      window.location.origin,
    );
  }, [editorData]);

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
        setSharePrefix(response.data.data?.shareSlug?.split("-")?.[0] || "");

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
          date: "Saturday, 10th December 2026",
          venue: "Royal Palace",
          venue_address: "Bund Garden Road, Agarkar Nagar Pune, Maharashtra, 411001",
          time: "6pm Onwards",
          theme: "Pretty in Pink: Florals, Pastels & Pink Hues Royal Palace",
          link: "https://maps.app.goo.gl/4GdkKFJfvdJCszja9",
          image: "https://res.cloudinary.com/drl4fmhrq/image/upload/v1783490546/Group_2147225087_hyxljf.png",
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
      const musicUrl = await uploadFile(file, "invitearc/music", "video");

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

const validatePreviewImageFile = async (file) => {
  if (!file) {
    return "No file selected.";
  }

  if (!file.type.startsWith("image/")) {
    return "Please upload a valid image file.";
  }

  if (file.size > 200 * 1024) {
    return "Preview image must be below 200 KB.";
  }

  try {
    const { width, height } = await getImageDimensions(file);

    if (width !== 1200 || height !== 630) {
      return "Preview image must be exactly 1200 × 630 pixels.";
    }
  } catch (error) {
    return "Unable to validate image dimensions.";
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

  // const handlePreviewImageUpload = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   const error = validatePreviewImageFile(file);
  //   if (error) {
  //     toast.error(error);
  //     return;
  //   }

  //   try {
  //     setPreviewUploading(true);
  //     const imageUrl = await uploadImage(file, "invitearc/preview-images");
  //     setEditorData((prev) => ({
  //       ...prev,
  //       sharePreviewImage: imageUrl,
  //     }));
  //     toast.success(
  //       "Preview image uploaded successfully. Save changes to persist.",
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Unable to upload preview image. Please try again.");
  //   } finally {
  //     setPreviewUploading(false);
  //     event.target.value = "";
  //   }
  // };


const handlePreviewImageUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const error = await validatePreviewImageFile(file);

  if (error) {
    toast.error(error);
    event.target.value = "";
    return;
  }

  try {
    setPreviewUploading(true);

    const imageUrl = await uploadImage(file, "invitearc/preview-images");

    setEditorData((prev) => ({
      ...prev,
      sharePreviewImage: imageUrl,
    }));

    toast.success(
      "Preview image uploaded successfully."
    );
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
          newTemplateId && newTemplateId.slug
            ? newTemplateId
            : previousTemplateId;
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

      const updateViewForViewport = () => {
        if (window.innerWidth < 768) {
          setView("mobile");
        } else if (window.innerWidth < 1024) {
          setView("tablet");
        } else {
          setView("desktop");
        }
      };

      updateViewForViewport();
      window.addEventListener("resize", updateViewForViewport);

      return () => window.removeEventListener("resize", updateViewForViewport);
    }
  }, []);

  const handleEditFromThumbnail = (index) => {
    setSelectedEventIndex(index);
    setActiveTab("events");
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <section className="mx-auto w-full  px-4 py-10 sm:px-8 lg:px-12">
        <div className="flex min-h-screen flex-col gap-6 rounded-3xl lg:bg-white  lg:shadow-sm lg:p-8">
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

          <div className="grid gap-6 lg:grid-cols-[minmax(350px,400px)_1fr] 3xl:grid-cols-[minmax(450px,500px)_1fr]  ">
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
                      <PublishShareEditor
                        editorData={editorData}
                        clientTemplate={clientTemplate}
                        baseUrl={baseUrl}
                        sharePrefix={sharePrefix}
                        setSharePrefix={setSharePrefix}
                        shareSaving={shareSaving}
                        saveSharePrefix={saveSharePrefix}
                        copyShareLink={copyShareLink}
                        handlePreviewImageUpload={handlePreviewImageUpload}
                        previewUploading={previewUploading}
                        updateField={updateField}
                        publishTemplate={publishTemplate}
                        publishing={publishing}
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

            <section className="space-y-4">
              <div className="rounded-3xl bg-white lg:p-6 p-4 shadow-sm flex flex-col gap-4 lg:flex-row items-center lg:justify-between">
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
                    className={`hidden md:inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      view === "tablet"
                        ? "bg-[#861E1D] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <MdTabletMac />
                    <span>Tablet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("desktop")}
                    className={`hidden lg:inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      view === "desktop"
                        ? "bg-[#861E1D] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <IoDesktopOutline />
                    <span>Desktop</span>
                  </button>
                </div>
              </div>

              <div
                className="mx-auto mt-6 w-full overflow-hidden rounded-4xl border-[6px] bg-white shadow-xl transition-all"
                style={{
                  width: "100%",
                  maxWidth:
                    view === "mobile"
                      ? "393px"
                      : view === "tablet"
                        ? "820px"
                        : typeof window !== "undefined" &&
                            window.innerWidth >= 1600
                          ? "1300px"
                          : "950px",
                }}
              >
                <div className="h-200 overflow-y-auto overflow-x-hidden bg-slate-100">
                  <iframe
                    ref={iframeRef}
                    src={`/preview/${templateId}`}
                    className="w-full h-full border-0 bg-white"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
