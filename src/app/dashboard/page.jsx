"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "../../config/config";
import { AuthContext } from "../../context/AuthContext";
import ShareLinkModal from "../../components/ShareLinkModal";

export default function DashboardPage() {
  const { user, token, loading } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
      return;
    }

    if (!user || !token) {
      return;
    }

    const fetchMyTemplates = async () => {
      try {
        const response = await axios.get(
          `${config.api.baseUrl}${config.api.endpoints.clientTemplates.myTemplates}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setTemplates(response.data.data || []);
      } catch (err) {
        setError("Unable to load your purchased templates.");
      } finally {
        setFetching(false);
      }
    };

    fetchMyTemplates();
  }, [loading, user, token, router]);
  console.log("Calling API with token:", token);

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Client dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Your purchased templates
              </h1>
            </div>
            <div className="rounded-3xl bg-[#861E1D] px-4 py-3 text-sm font-semibold text-white">
              {user ? `Welcome, ${user.name}` : "Loading user..."}
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Manage templates you've purchased, open the editor, and publish
            shareable links.
          </p>
          {error && (
            <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {fetching ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6"
              />
            ))
          ) : templates.length > 0 ? (
            templates.map((clientTemplate) => (
              <article
                key={clientTemplate._id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="overflow-hidden rounded-3xl bg-slate-100">
                  <img
                    src={
                      clientTemplate.templateId?.previewImage ||
                      "/placeholder-template.jpg"
                    }
                    alt={
                      clientTemplate.templateId?.title ||
                      "Purchased template preview"
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex flex-row gap-6 justify-stretch">
                    <h2 className=" text-xl font-semibold  font-georgia text-[#861E1D]">
                      {clientTemplate.templateId?.title || "Invitearc template"}
                    </h2>
                    <p className="inline-flex rounded-full bg-[#861E1D]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 whitespace-nowrap">
                      {clientTemplate.templateId?.category ||
                        "Purchased template"}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {
                      "Edit the template text and publish a shareable link."}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                      {clientTemplate.isPublished ? "Published" : "Draft"}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/edit/${clientTemplate._id}`}
                        className="rounded-full bg-[#861E1D] px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        Edit Template
                      </Link>
                      {clientTemplate.isPublished &&
                      clientTemplate.shareSlug ? (
                        <button
                          onClick={() => {
                            setSelectedTemplate(clientTemplate);
                            setShareModalOpen(true);
                          }}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 cursor-pointer"
                        >
                          View Share Link
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-3 rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
              You have no purchased templates yet. Buy a template first to start
              editing.
            </div>
          )}
        </div>

        <ShareLinkModal
          open={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            setSelectedTemplate(null);
          }}
          clientTemplate={selectedTemplate}
          token={token}
        />
      </section>
    </main>
  );
}
