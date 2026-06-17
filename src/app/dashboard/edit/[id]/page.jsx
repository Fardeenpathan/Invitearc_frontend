"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import config from "../../../../config/config";
import { AuthContext } from "../../../../context/AuthContext";
import ShareLinkModal from "../../../../components/ShareLinkModal";
import { getTemplateComponent } from "../../../templates/templateLoader";

export default function EditTemplatePage() {
  const { user, token, loading } = useContext(AuthContext);
  const params = useParams();
  const router = useRouter();
  const templateId = params.id;
  const [clientTemplate, setClientTemplate] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  // const [view, setView] = useState("desktop");
  const [view, setView] = useState("mobile");

  const previewWidth = {
    mobile: "375px",
    tablet: "768px",
    desktop: "1200px",
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!templateId) return;

    const fetchClientTemplate = async () => {
      try {
        console.log("TOKEN:", token);

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
      } catch (error) {
        setMessage("Unable to load template details.");
      }
    };

    fetchClientTemplate();
  }, [token, templateId]);

  const customData = useMemo(() => {
    return (
      clientTemplate?.customData ||
      clientTemplate?.templateId?.defaultData ||
      {}
    );
  }, [clientTemplate]);

  const templateSlug = clientTemplate?.templateId?.slug;

  const TemplateComponent = templateSlug
    ? getTemplateComponent(templateSlug)
    : null;

  const fields = useMemo(() => Object.keys(customData), [customData]);

  const selectField = (field) => {
    setSelectedField(field);
    setEditValue(customData[field] ?? "");
    setMessage("");
  };

  const saveField = async () => {
    if (!selectedField) {
      setMessage("Select a field first.");
      return;
    }

    setSaving(true);

    try {
      const updatedData = {
        ...customData,
        [selectedField]: editValue,
      };

      const response = await axios.put(
        `${config.api.baseUrl}/api/client-templates/${templateId}`,
        {
          customData: updatedData,
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

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <section className="mx-auto max-w-[1450px] px-6 py-20 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Template editor
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
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

          <div className="grid gap-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm flex justify-center items-center gap-6">
                <p className="text-sm uppercase tracking-[0.14em] text-[#861E1D] font-semibold">
                  Preview mode
                </p>

                <div className="flex flex-wrap gap-2">
                  {/* Mobile - always visible */}
                  <button
                    type="button"
                    onClick={() => setView("mobile")}
                    className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                      view === "mobile"
                        ? "bg-[#861E1D] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Mobile
                  </button>

                  {/* Tablet - tablet & desktop only */}
                  <button
                    type="button"
                    onClick={() => setView("tablet")}
                    className={`hidden md:block cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                      view === "tablet"
                        ? "bg-[#861E1D] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Tablet
                  </button>

                  {/* Desktop - desktop only */}
                  <button
                    type="button"
                    onClick={() => setView("desktop")}
                    className={`hidden lg:block cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                      view === "desktop"
                        ? "bg-[#861E1D] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Desktop
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
                <div className="h-175 overflow-y-auto overflow-x-hidden bg-slate-100">
                  {TemplateComponent ? (
                    <TemplateComponent
                      data={customData}
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
