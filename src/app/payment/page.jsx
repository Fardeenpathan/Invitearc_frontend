"use client";
export const dynamic = "force-dynamic";
import {Suspense, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import config from "../../config/config";
import { AuthContext } from "../../context/AuthContext";

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      "script[src='https://checkout.razorpay.com/v1/checkout.js']",
    );
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Unable to load Razorpay SDK"));
    document.body.appendChild(script);
  });
};

function PaymentContent() {
  const { user, loading, openAuthModal } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const [template, setTemplate] = useState(null);
  const [loadingTemplate, setLoadingTemplate] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   if (!loading && !user) {
  //     const redirectUrl = `/payment?templateId=${encodeURIComponent(templateId || "")}`;
  //     router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
  //   }
  // }, [loading, user, router, templateId]);
  useEffect(() => {
    if (!loading && !user) {
      openAuthModal("login");
    }
  }, [loading, user]);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) {
        setError("No template selected for payment.");
        setLoadingTemplate(false);
        return;
      }

      try {
        const response = await axios.get(
          `${config.api.baseUrl}${config.api.endpoints.templates.all}`,
        );
        const templates = response.data?.data || [];
        const found = templates.find(
          (item) => item._id === templateId || item.slug === templateId,
        );
        if (!found) {
          setError("Template not found.");
        } else {
          setTemplate(found);
        }
      } catch (err) {
        setError("Unable to load template details. Please try again later.");
      } finally {
        setLoadingTemplate(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const openRazorpayCheckout = async () => {
    if (!templateId || !user) {
      setError("Please login to continue.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      await loadRazorpayScript();

      // const orderResponse = await axios.post(
      //   `${config.api.baseUrl}${config.api.endpoints.clientTemplates.createOrder}`,
      //   { templateId },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );

      const orderResponse = await axios.post(
        `${config.api.baseUrl}${config.api.endpoints.clientTemplates.createOrder}`,
        { templateId },
        {
          withCredentials: true,
        },
      );

      if (!orderResponse.data?.success) {
        throw new Error(
          orderResponse.data?.message || "Unable to create Razorpay order.",
        );
      }

      const { orderId, amount, currency, key, dummy } = orderResponse.data.data;

      if (dummy) {
        // For testing without real Razorpay credentials, create the purchased template directly.
        // await axios.post(
        //   `${config.api.baseUrl}${config.api.endpoints.clientTemplates.buy}`,
        //   { templateId },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   },
        // );
        await axios.post(
          `${config.api.baseUrl}${config.api.endpoints.clientTemplates.buy}`,
          { templateId },
          {
            withCredentials: true,
          },
        );
        setSuccess(
          "Payment simulated successfully. Redirecting to your dashboard...",
        );
        router.push("/dashboard");
        return;
      }
console.log("Logo URL:", `${window.location.origin}/logo.png`);
      const options = {
        key,
        amount,
        currency,
        name: "InviteArc",
        // name: `InviteArc - ${template?.title || "Template"}`,
        description: template?.title || "Template purchase",
        image: `${window.location.origin}/logo.png`,
        
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              `${config.api.baseUrl}${config.api.endpoints.clientTemplates.verifyPayment}`,
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                templateId,
              },
              {
                withCredentials: true,
              },
            );

            if (!verifyResponse.data?.success) {
              setError(
                verifyResponse.data?.message || "Payment verification failed.",
              );
              return;
            }

            setSuccess("Payment successful! Redirecting to your dashboard...");
            router.push("/dashboard");
          } catch (verifyError) {
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to process payment.",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="rounded-4xl bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Secure checkout
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                {template?.title || "Complete your purchase"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/template"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Back to templates
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full bg-[#861E1D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                My dashboard
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              {loadingTemplate ? (
                <div className="space-y-4">
                  <div className="h-72 rounded-3xl bg-slate-200" />
                  <div className="h-6 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-200" />
                </div>
              ) : error ? (
                <div className="rounded-3xl bg-rose-50 p-6 text-sm text-rose-700">
                  {error}
                </div>
              ) : (
                <>
                  <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                    <img
                      src={template.previewImage || "/placeholder-template.jpg"}
                      alt={template.title}
                      className="h-96 w-full object-cover"
                    />
                  </div>
                  <div className="mt-6 space-y-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      {template.category || "Template"}
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {template.title}
                    </h2>
                    <p className="text-sm leading-7 text-slate-600">
                      {template.defaultData?.description ||
                        "Complete payment to add this template to your dashboard and start editing."}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                    Order summary
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-700">
                    <span>Template</span>
                    <span>{template?.title || "Selected template"}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 text-xl font-semibold text-slate-900">
                    <span>Total</span>
                    <span>
                      {template
                        ? template.indprice != null
                          ? `₹ ${template.indprice}`
                          : template.usaprice != null
                            ? `$ ${template.usaprice}`
                            : "Free"
                        : "—"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openRazorpayCheckout}
                  disabled={processing || !template || !!error}
                  className="w-full rounded-full bg-[#861E1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {processing ? "Processing payment..." : "Complete Purchase"}
                </button>

                {success ? (
                  <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">
                    {success}
                  </div>
                ) : null}
                {error ? (
                  <div className="rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">
                    {error}
                  </div>
                ) : (
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    After purchase, this template will appear in your dashboard
                    where you can edit and publish shareable links.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
